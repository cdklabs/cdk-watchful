import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { IWatchful } from './api';

export interface WatchSqsOptions {
}

export interface WatchSqsServiceProps extends WatchSqsOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly sqs: sqs.IQueue;
}

export class WatchSqsService extends cdk.Construct {
  private readonly watchful: IWatchful;
  private readonly sqs: sqs.IQueue;

  private messageMetric!: cloudwatch.Metric;
  private messageAlarm!: cloudwatch.Alarm;

  constructor(scope: cdk.Construct, id: string, props: WatchSqsServiceProps) {
    super(scope, id);

    this.watchful = props.watchful;
    this.sqs = props.sqs;

    this.watchful.addSection(props.title, {
      links: [{ title: 'SQS Console', url: linkForSqsService(this.sqs) }],
    });

    this.createSqsMessageMonitor();

    // create widgets
    const messageAlarmWidget = new cloudwatch.AlarmWidget({
      title: 'Messages',
      alarm: this.messageAlarm!,
      width: 12, // half width
    });

    this.watchful.addWidgets(messageAlarmWidget);

  } // constructor
  // helper functions for creating metrics
  private createSqsMessageMonitor() {
    this.messageMetric = new cloudwatch.Metric({
      metricName: SqsMetric.ApproximateNumberOfMessagesVisible,
      namespace: 'AWS/SQS',
      statistic: 'Maximum',
      dimensions: {
        QueueName: this.sqs.queueName,
      },
    });
    this.messageAlarm = new cloudwatch.Alarm(this, 'deliveryToRedshiftAlarm', {
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      metric: this.messageMetric,
      threshold: 0, // TODO pass parameter.  Used for DLQs only right now
      period: cdk.Duration.minutes(2),
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.MISSING,
    });
    this.watchful.addAlarm(this.messageAlarm, false);
  }
}

// TODO extend to monitor other SQS metrics
const enum SqsMetric {
  NumberOfMessagesReceived = 'NumberOfMessagesReceived',
  ApproximateNumberOfMessagesVisible = 'ApproximateNumberOfMessagesVisible',
}

// eslint-disable-next-line @typescript-eslint/no-shadow
function linkForSqsService(sqs: sqs.IQueue) {
  return `https://console.aws.amazon.com/sqs/v2/home?region=${sqs.stack.region}#/queues/https%3A%2F%2Fsqs.${sqs.stack.region}.amazonaws.com%2F${sqs.stack.account}%2F${sqs.queueName}`;
}
