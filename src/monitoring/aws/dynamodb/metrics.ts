import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

const enum Metrics {
  ConsumedReadCapacityUnits = 'ConsumedReadCapacityUnits',
  ConsumedWriteCapacityUnits = 'ConsumedWriteCapacityUnits',
}

const Namespace = 'AWS/DynamoDB';

export class DynamoDbMetricFactory {
  metricConsumedCapacityUnits(tableName: string) {
    return {
      read: this.metric(Metrics.ConsumedReadCapacityUnits, tableName).with({ label: 'Consumed (Read)' }),
      write: this.metric(Metrics.ConsumedWriteCapacityUnits, tableName).with({ label: 'Consumed (Write)' }),
    };
  }

  protected metric(metric: Metrics, tableName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(1),
      statistic: Statistic.SUM,
      dimensions: {
        TableName: tableName,
      },
    });
  }
}
