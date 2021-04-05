import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

const enum Metrics {
  ApproximateNumberOfMessagesVisible = 'ApproximateNumberOfMessagesVisible',
  NumberOfMessagesSent = 'NumberOfMessagesSent',
  ApproximateAgeOfOldestMessage = 'ApproximateAgeOfOldestMessage',
  SentMessageSize = 'SentMessageSize'
}

const Namespace = 'AWS/SQS';

export class SqsMetricFactory {
  metricApproximateVisibleMessages(topicName: string) {
    return this.metric(Metrics.ApproximateNumberOfMessagesVisible, topicName).with({ statistic: Statistic.MAXIMUM });
  }

  metricIncomingMessages(topicName: string) {
    return this.metric(Metrics.NumberOfMessagesSent, topicName).with({ statistic: Statistic.SUM });
  }

  metricAgeOfOldestMessageInSeconds(topicName: string) {
    return this.metric(Metrics.ApproximateAgeOfOldestMessage, topicName).with({ statistic: Statistic.MAXIMUM });
  }

  metricAverageMessageSizeInBytes(topicName: string) {
    return this.metric(Metrics.SentMessageSize, topicName).with({ statistic: Statistic.AVERAGE });
  }

  protected metric(metric: Metrics, topicName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      dimensions: {
        TopicName: topicName,
      },
    });
  }
}
