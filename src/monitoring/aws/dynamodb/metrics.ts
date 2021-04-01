import { Metric } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

export class DynamoDbMetricFactory {
  static readonly Namespace = 'AWS/DynamoDB';

  metricConsumedCapacityUnits(tableName: string) {
    function metric(metricName: string, label: string) {
      return new Metric({
        metricName,
        label,
        namespace: DynamoDbMetricFactory.Namespace,
        period: Duration.minutes(1),
        statistic: 'Sum',
        dimensions: {
          TableName: tableName,
        },
      });
    }

    return {
      read: metric('ConsumedReadCapacityUnits', 'Consumed (Read)'),
      write: metric('ConsumedWriteCapacityUnits', 'Consumed (Write)'),
    };
  }
}
