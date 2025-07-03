import { Duration } from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum Metrics {
  NumberOfMessagesPublished = 'NumberOfMessagesPublished',
  NumberOfNotificationsDelivered = 'NumberOfNotificationsDelivered',
  NumberOfNotificationsFailed = 'NumberOfNotificationsFailed',
  PublishSize = 'PublishSize',
}

const Namespace = 'AWS/SNS';

export class SnsMetricFactory {
  metricNumberOfMessagesPublished(topicName: string) {
    return this.metric(Metrics.NumberOfMessagesPublished, topicName).with({ statistic: Statistic.SUM });
  }

  metricNumberOfMessagesDelivered(topicName: string) {
    return this.metric(Metrics.NumberOfNotificationsDelivered, topicName).with({ statistic: Statistic.SUM });
  }

  metricNumberOfNotificationsFailed(topicName: string) {
    return this.metric(Metrics.NumberOfNotificationsFailed, topicName).with({ statistic: Statistic.SUM });
  }

  metricAverageMessageSizeInBytes(topicName: string) {
    return this.metric(Metrics.PublishSize, topicName).with({ statistic: Statistic.AVERAGE });
  }

  protected metric(metric: Metrics, topicName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      dimensionsMap: {
        TopicName: topicName,
      },
    });
  }
}
