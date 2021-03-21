import { Operation } from '@aws-cdk/aws-dynamodb';
import { WatchfulContext } from '../../../core/context';
import { SimpleWatchfulMetric, WatchfulMetricSearch, WatchfulMetricStatistic } from '../../../core/metric';

/**
 * Provides metrics for AWS Dynamo DB.
 */
export class DynamoDbMetricFactory {
  protected static readonly Namespace = 'AWS/DynamoDB';

  protected context: WatchfulContext;

  constructor(context: WatchfulContext) {
    this.context = context;
  }

  metricSuccessfulRequestLatencyAverage(tableName: string, operation: Operation) {
    return new SimpleWatchfulMetric({
      namespace: DynamoDbMetricFactory.Namespace,
      metricName: 'SuccessfulRequestLatency',
      statistic: WatchfulMetricStatistic.AVERAGE,
      dimensions: { TableName: tableName, Operation: operation },
      period: this.context.defaultMetricPeriod,
    });
  }

  metricSearchSuccessfulRequestLatencyAverage(tableName: string) {
    return new WatchfulMetricSearch({
      namespace: DynamoDbMetricFactory.Namespace,
      searchQuery: 'MetricName="SuccessfulRequestLatency"',
      label: 'Latency',
      statistic: WatchfulMetricStatistic.AVERAGE,
      dimensions: { TableName: tableName, Operation: '' },
      period: this.context.defaultMetricPeriod,
    });
  }

  metricSystemErrorsSum(tableName: string, operation: Operation) {
    return new SimpleWatchfulMetric({
      namespace: DynamoDbMetricFactory.Namespace,
      metricName: 'SystemErrors',
      statistic: WatchfulMetricStatistic.SUM,
      dimensions: { TableName: tableName, Operation: operation },
      period: this.context.defaultMetricPeriod,
    });
  }

  metricSearchSystemErrorsSum(tableName: string) {
    return new WatchfulMetricSearch({
      namespace: DynamoDbMetricFactory.Namespace,
      searchQuery: 'MetricName="SystemErrors"',
      label: 'Errors',
      statistic: WatchfulMetricStatistic.SUM,
      dimensions: { TableName: tableName, Operation: '' },
      period: this.context.defaultMetricPeriod,
    });
  }

  metricThrottleEventsSum(tableName: string) {
    return {
      all: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ThrottledRequests',
        statistic: WatchfulMetricStatistic.SUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
      read: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ReadThrottleEvents',
        statistic: WatchfulMetricStatistic.SUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
      write: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'WriteThrottleEvents',
        statistic: WatchfulMetricStatistic.SUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
    };
  }

  metricConsumedCapacityUnitsSum(tableName: string) {
    return {
      read: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ConsumedReadCapacityUnits',
        statistic: WatchfulMetricStatistic.SUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
      write: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ConsumedWriteCapacityUnits',
        statistic: WatchfulMetricStatistic.SUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
    };
  }

  metricProvisionedCapacityUnitsMaximum(tableName: string) {
    return {
      read: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ProvisionedReadCapacityUnits',
        statistic: WatchfulMetricStatistic.MAXIMUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
      write: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'ProvisionedWriteCapacityUnits',
        statistic: WatchfulMetricStatistic.MAXIMUM,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
    };
  }

  metricMaxProvisionedTableCapacityUtilizationAverage(tableName: string) {
    return {
      read: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'MaxProvisionedTableReadCapacityUtilization',
        statistic: WatchfulMetricStatistic.AVERAGE,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
      write: new SimpleWatchfulMetric({
        namespace: DynamoDbMetricFactory.Namespace,
        metricName: 'MaxProvisionedTableWriteCapacityUtilization',
        statistic: WatchfulMetricStatistic.AVERAGE,
        dimensions: { TableName: tableName },
        period: this.context.defaultMetricPeriod,
      }),
    };
  }
}
