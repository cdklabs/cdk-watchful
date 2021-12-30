import { Duration } from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum Metrics {
  ApproximateNumberOfMessagesVisible = 'ApproximateNumberOfMessagesVisible',
  NumberOfMessagesSent = 'NumberOfMessagesSent',
  ApproximateAgeOfOldestMessage = 'ApproximateAgeOfOldestMessage',
  SentMessageSize = 'SentMessageSize'
}

const Namespace = 'AWS/SQS';

export class SqsMetricFactory {
  metricApproximateVisibleMessages(queueName: string) {
    return this.metric(Metrics.ApproximateNumberOfMessagesVisible, queueName).with({ statistic: Statistic.MAXIMUM });
  }

  metricIncomingMessages(queueName: string) {
    return this.metric(Metrics.NumberOfMessagesSent, queueName).with({ statistic: Statistic.SUM });
  }

  metricAgeOfOldestMessageInSeconds(queueName: string) {
    return this.metric(Metrics.ApproximateAgeOfOldestMessage, queueName).with({ statistic: Statistic.MAXIMUM });
  }

  metricAverageMessageSizeInBytes(queueName: string) {
    return this.metric(Metrics.SentMessageSize, queueName).with({ statistic: Statistic.AVERAGE });
  }

  protected metric(metric: Metrics, queueName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      dimensionsMap: {
        QueueName: queueName,
      },
    });
  }
}
