import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { Construct, Duration } from '@aws-cdk/core';
import { IWatchful } from './api';

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

  constructor(scope: Construct, id: string, props: WatchDynamoTableProps) {
    super(scope, id);

    const table = props.table;
    this.watchful = props.watchful;

    const cfnTable = table.node.defaultChild as dynamodb.CfnTable;
    const billingMode = cfnTable.billingMode as dynamodb.BillingMode;

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

    const readCapacityMetric = metricForDynamoTable(table, 'ConsumedReadCapacityUnits', {
      label: 'Consumed',
      period: Duration.minutes(1),
      statistic: 'sum',
    });

    const writeCapacityMetric = metricForDynamoTable(table, 'ConsumedWriteCapacityUnits', {
      label: 'Consumed',
      period: Duration.minutes(1),
      statistic: 'sum',
    });
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
    const readCapacityMetric = metricForDynamoTable(table, 'ConsumedReadCapacityUnits', {
      label: 'Consumed',
      period: Duration.minutes(1),
      statistic: 'sum',
    });

    const writeCapacityMetric = metricForDynamoTable(table, 'ConsumedWriteCapacityUnits', {
      label: 'Consumed',
      period: Duration.minutes(1),
      statistic: 'sum',
    });
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
    const alarm = metric.createAlarm(this, `CapacityAlarm:${type}`, {
      alarmDescription: `at ${threshold}% of ${type} capacity`,
      threshold,
      period: Duration.minutes(periodMinutes),
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      statistic: 'sum',
    });
    return alarm;
  }
}


function linkForDynamoTable(table: dynamodb.Table, tab = 'overview') {
  return `https://console.aws.amazon.com/dynamodb/home?region=${table.stack.region}#tables:selected=${table.tableName};tab=${tab}`;
}

function calculateUnits(provisioned: number, percent: number | undefined, period: Duration) {
  return provisioned * ((percent === undefined ? 80 : percent) / 100) * period.toSeconds();
}


function metricForDynamoTable(table: dynamodb.Table, metricName: string, options: cloudwatch.MetricOptions = { }): cloudwatch.Metric {
  return new cloudwatch.Metric({
    metricName,
    namespace: 'AWS/DynamoDB',
    dimensions: {
      TableName: table.tableName,
    },
    unit: cloudwatch.Unit.COUNT,
    label: metricName,
    ...options,
  });
}
