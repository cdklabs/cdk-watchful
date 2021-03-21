import { GraphWidget, Row } from '@aws-cdk/aws-cloudwatch';
import { IWidget } from '@aws-cdk/aws-cloudwatch/lib/widget';
import { CfnTable, ITable, Operation } from '@aws-cdk/aws-dynamodb';
import { WatchfulContext } from '../../../core/context';
import { WatchfulMetric } from '../../../core/metric';
import { WatchfulMonitoring } from '../../../core/monitoring';
import { SectionWidget } from '../../../widget/section';
import { DynamoDbMetricFactory } from './metrics';

/**
 * Props to create DefaultDynamoDbTableLatencyMonitoring.
 */
export interface DefaultDynamoDbTableMonitoringProps {
  readonly table: ITable;
}

/**
 * Default monitoring for Dynamo DB.
 */
export class DefaultDynamoDbTableMonitoring implements WatchfulMonitoring {
  protected readonly context: WatchfulContext;
  protected readonly metricFactory: DynamoDbMetricFactory;
  protected readonly tableName: string;
  protected readonly provisionedThroughput?: CfnTable.ProvisionedThroughputProperty;
  protected readonly metricProvisionedReadCapacityUnitsMaximum: WatchfulMetric;
  protected readonly metricConsumedReadCapacityUnitsSum: WatchfulMetric;
  protected readonly metricMaxProvisionedReadCapacityUtilization: WatchfulMetric;
  protected readonly metricProvisionedWriteCapacityUnitsMaximum: WatchfulMetric;
  protected readonly metricConsumedWriteCapacityUnitsSum: WatchfulMetric;
  protected readonly metricMaxProvisionedWriteCapacityUtilization: WatchfulMetric;
  protected readonly metricSuccessfulRequestLatencyAverage: WatchfulMetric[];
  protected readonly metricSystemErrorsSum: WatchfulMetric[];

  constructor(context: WatchfulContext, props: DefaultDynamoDbTableMonitoringProps) {
    function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
      return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }

    this.context = context;
    this.metricFactory = new DynamoDbMetricFactory(context);
    this.tableName = props.table.tableName;
    const cfnTable = props.table.node.defaultChild as CfnTable;
    this.provisionedThroughput = cfnTable.provisionedThroughput as CfnTable.ProvisionedThroughputProperty;
    this.metricSystemErrorsSum = [];
    this.metricSuccessfulRequestLatencyAverage = [];

    for (const key of enumKeys(Operation)) {
      this.metricSystemErrorsSum.push(this.metricFactory.metricSystemErrorsSum(this.tableName, Operation[key]));
      this.metricSuccessfulRequestLatencyAverage.push(this.metricFactory.metricSuccessfulRequestLatencyAverage(this.tableName, Operation[key]));
    }

    const metricProvisionedCapacityUnitsMaximum = this.metricFactory.metricProvisionedCapacityUnitsMaximum(this.tableName);
    this.metricProvisionedReadCapacityUnitsMaximum = metricProvisionedCapacityUnitsMaximum.read;
    this.metricProvisionedWriteCapacityUnitsMaximum = metricProvisionedCapacityUnitsMaximum.write;
    const metricConsumedCapacityUnitsSum = this.metricFactory.metricConsumedCapacityUnitsSum(this.tableName);
    this.metricConsumedReadCapacityUnitsSum = metricConsumedCapacityUnitsSum.read;
    this.metricConsumedWriteCapacityUnitsSum = metricConsumedCapacityUnitsSum.write;
    const metricMaxProvisionedCapacityUtilizationAverage = this.metricFactory.metricMaxProvisionedTableCapacityUtilizationAverage(this.tableName);
    this.metricMaxProvisionedReadCapacityUtilization = metricMaxProvisionedCapacityUtilizationAverage.read;
    this.metricMaxProvisionedWriteCapacityUtilization = metricMaxProvisionedCapacityUtilizationAverage.write;
  }

  widgets(): IWidget[] {
    return [
      new SectionWidget({
        titleMarkdown: `DynamoDB Table **${this.tableName}**`,
        quicklinks: [
          { title: 'Items', url: this.dynamoDbTableItemsUrl() },
          { title: 'Capacity', url: this.dynamoDbTableCapacityUrl() },
        ],
      }),
      new Row(
        this.latencyWidget(6, 5),
        this.readCapacityWidget(6, 5),
        this.writeCapacityWidget(6, 5),
        this.systemErrorWidget(6, 5),
      ),
    ];
  }

  protected dynamoDbTableItemsUrl(): string {
    const awsRegion = this.context.awsAccountRegion;
    return `https://${awsRegion}.console.aws.amazon.com/dynamodbv2/home?region=${awsRegion}#table?name=${this.tableName}&tab=items`;
  }

  protected dynamoDbTableCapacityUrl(): string {
    const awsRegion = this.context.awsAccountRegion;
    return `https://${awsRegion}.console.aws.amazon.com/dynamodbv2/home?region=${awsRegion}#table?name=${this.tableName}&tab=settings`;
  }

  protected latencyWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Latency',
      left: this.metricSuccessfulRequestLatencyAverage.map(metric => metric.unwrap()),
    });
  }

  protected readCapacityWidget(width: number, height: number) {
    if (this.provisionedThroughput && this.provisionedThroughput.readCapacityUnits > 0) {
      return this.readProvisionedCapacityWidget(width, height, this.provisionedThroughput.readCapacityUnits);
    }
    return this.readOnDemandCapacityWidget(width, height);
  }

  protected writeCapacityWidget(width: number, height: number) {
    if (this.provisionedThroughput && this.provisionedThroughput.writeCapacityUnits > 0) {
      return this.writeProvisionedCapacityWidget(width, height, this.provisionedThroughput.writeCapacityUnits);
    }
    return this.writeOnDemandCapacityWidget(width, height);
  }

  protected readProvisionedCapacityWidget(width: number, height: number, capacity: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Read Capacity',
      left: [this.metricConsumedReadCapacityUnitsSum.unwrap()],
      leftAnnotations: [{ label: 'Provisioned', value: capacity }],
      right: [this.metricMaxProvisionedReadCapacityUtilization.unwrap()],
    });
  }

  protected writeProvisionedCapacityWidget(width: number, height: number, capacity: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Write Capacity',
      left: [this.metricConsumedWriteCapacityUnitsSum.unwrap()],
      leftAnnotations: [{ label: 'Provisioned', value: capacity }],
      right: [this.metricMaxProvisionedWriteCapacityUtilization.unwrap()],
    });
  }

  protected readOnDemandCapacityWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Read Capacity',
      left: [
        this.metricProvisionedReadCapacityUnitsMaximum.unwrap(),
        this.metricConsumedReadCapacityUnitsSum.unwrap(),
      ],
      right: [
        this.metricMaxProvisionedReadCapacityUtilization.unwrap(),
      ],
    });
  }

  protected writeOnDemandCapacityWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Write Capacity',
      left: [
        this.metricProvisionedWriteCapacityUnitsMaximum.unwrap(),
        this.metricConsumedWriteCapacityUnitsSum.unwrap(),
      ],
      right: [
        this.metricMaxProvisionedWriteCapacityUtilization.unwrap(),
      ],
    });
  }

  protected systemErrorWidget(width?: number, height?: number) {
    return new GraphWidget({
      width,
      height,
      title: 'System Errors',
      left: this.metricSystemErrorsSum.map(metric => metric.unwrap()),
    });
  }
}
