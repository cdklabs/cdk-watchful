import { Duration } from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { IWatchful } from './api';
import { DynamoDbMetricFactory } from './monitoring/aws/dynamodb/metrics';

const DEFAULT_PERCENT = 80;

export interface WatchDynamoTableOptions {
  /**
   * Threshold for read capacity alarm (percentage)
   * @default 80
   */
  readonly readCapacityThresholdPercent?: number;

  /**
   * Threshold for read capacity alarm (percentage)
   * @default 80
   */
  readonly writeCapacityThresholdPercent?: number;
}

export interface WatchDynamoTableProps extends WatchDynamoTableOptions{
  readonly title: string;
  readonly watchful: IWatchful;
  readonly table: dynamodb.Table;
}

export class WatchDynamoTable extends Construct {
  private readonly watchful: IWatchful;
  private readonly metrics: DynamoDbMetricFactory;

  constructor(scope: Construct, id: string, props: WatchDynamoTableProps) {
    super(scope, id);

    const table = props.table;
    this.watchful = props.watchful;
    this.metrics = new DynamoDbMetricFactory();

    const cfnTable = table.node.defaultChild as dynamodb.CfnTable;
    const billingMode = cfnTable.billingMode as dynamodb.BillingMode ?? dynamodb.BillingMode.PROVISIONED;

    switch (billingMode) {
      case dynamodb.BillingMode.PAY_PER_REQUEST:
        this.createWidgetsForPayPerRequestTable(props.title, table);
        break;

      case dynamodb.BillingMode.PROVISIONED:
        this.createWidgetsForProvisionedTable(props.title,
          table,
          props.readCapacityThresholdPercent,
          props.writeCapacityThresholdPercent,
        );
        break;
    }
  }

  /**
   * Create widgets for tables with billingMode=PROVISIONED
   * Include alarms when capacity is over 80% of the provisioned value
   */
  private createWidgetsForProvisionedTable(title: string,
    table: dynamodb.Table,
    readCapacityThresholdPercent?: number,
    writeCapacityThresholdPercent?: number) {
    const cfnTable = table.node.defaultChild as dynamodb.CfnTable;

    const metrics = this.metrics.metricConsumedCapacityUnits(table.tableName);
    const readCapacityMetric = metrics.read;
    const writeCapacityMetric = metrics.write;
    const throughput = cfnTable.provisionedThroughput as dynamodb.CfnTable.ProvisionedThroughputProperty;

    this.watchful.addAlarm(this.createDynamoCapacityAlarm('read', readCapacityMetric, throughput.readCapacityUnits, readCapacityThresholdPercent));
    this.watchful.addAlarm(this.createDynamoCapacityAlarm('write', writeCapacityMetric, throughput.writeCapacityUnits, writeCapacityThresholdPercent));

    this.watchful.addSection(title, {
      links: [{ title: 'Amazon DynamoDB Console', url: linkForDynamoTable(table) }],
    });

    this.watchful.addWidgets(
      this.createDynamoCapacityGraph('Read', readCapacityMetric, throughput.readCapacityUnits, readCapacityThresholdPercent),
      this.createDynamoCapacityGraph('Write', writeCapacityMetric, throughput.writeCapacityUnits, writeCapacityThresholdPercent),
    );
  }

  /**
   * Create widgets for tables with billingMode=PAY_PER_REQUEST
   * Include consumed capacity metrics
   */
  private createWidgetsForPayPerRequestTable(title: string, table: dynamodb.Table) {
    const metrics = this.metrics.metricConsumedCapacityUnits(table.tableName);
    const readCapacityMetric = metrics.read;
    const writeCapacityMetric = metrics.write;

    this.watchful.addSection(title, {
      links: [{ title: 'Amazon DynamoDB Console', url: linkForDynamoTable(table) }],
    });

    this.watchful.addWidgets(
      this.createDynamoPPRGraph('Read', readCapacityMetric),
      this.createDynamoPPRGraph('Write', writeCapacityMetric),
    );
  }

  private createDynamoCapacityGraph(type: string, metric: cloudwatch.Metric, provisioned: number, percent: number = DEFAULT_PERCENT) {
    return new cloudwatch.GraphWidget({
      title: `${type} Capacity Units/${metric.period.toMinutes()}min`,
      width: 12,
      stacked: true,
      left: [metric],
      leftAnnotations: [
        {
          label: 'Provisioned',
          value: provisioned * metric.period.toSeconds(),
          color: '#58D68D',
        },
        {
          color: '#FF3333',
          label: `Alarm on ${percent}%`,
          value: calculateUnits(provisioned, percent, metric.period),
        },
      ],
    });
  }

  private createDynamoPPRGraph(type: string, metric: cloudwatch.Metric) {
    return new cloudwatch.GraphWidget({
      title: `${type} Capacity Units/${metric.period.toMinutes()}min`,
      width: 12,
      stacked: true,
      left: [metric],
    });
  }

  private createDynamoCapacityAlarm(type: string, metric: cloudwatch.Metric, provisioned: number, percent: number = DEFAULT_PERCENT) {
    const periodMinutes = 5;
    const threshold = calculateUnits(provisioned, percent, Duration.minutes(periodMinutes));
    metric.with({
      statistic: 'sum',
      period: Duration.minutes(periodMinutes),
    });
    const alarm = metric.createAlarm(this, `CapacityAlarm:${type}`, {
      alarmDescription: `at ${threshold}% of ${type} capacity`,
      threshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    return alarm;
  }
}


function linkForDynamoTable(table: dynamodb.Table, tab = 'overview') {
  return `https://console.aws.amazon.com/dynamodb/home?region=${table.stack.region}#tables:selected=${table.tableName};tab=${tab}`;
}

function calculateUnits(provisioned: number, percent: number | undefined, period: Duration) {
  return provisioned * ((percent === undefined ? DEFAULT_PERCENT : percent) / 100) * period.toSeconds();
}

