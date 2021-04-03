import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

const enum Metrics {
  ConsumedReadCapacityUnits = 'ConsumedReadCapacityUnits',
  ConsumedWriteCapacityUnits = 'ConsumedWriteCapacityUnits',
}

const Namespace = 'AWS/DynamoDB';

export class DynamoDbMetricFactory {
  metricConsumedCapacityUnits(tableName: string) {
    function metric(metricName: Metrics, label: string) {
      return new Metric({
        metricName,
        label,
        namespace: Namespace,
        period: Duration.minutes(1),
        statistic: Statistic.SUM,
        dimensions: {
          TableName: tableName,
        },
      });
    }

    return {
      read: metric(Metrics.ConsumedReadCapacityUnits, 'Consumed (Read)'),
      write: metric(Metrics.ConsumedWriteCapacityUnits, 'Consumed (Write)'),
    };
  }
}
