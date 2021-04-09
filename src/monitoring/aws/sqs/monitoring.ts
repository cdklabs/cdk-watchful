import { ComparisonOperator, GraphWidget, IWidget, Metric } from '@aws-cdk/aws-cloudwatch';
import { IQueue } from '@aws-cdk/aws-sqs';
import { Stack } from '@aws-cdk/core';
import { AlarmDefinition, CreatedAlarm } from '../../../core/alarming';
import { MonitoringWithAlarms, MonitoringWithAlarmsProps } from '../../../core/monitoring';
import { CountAxis, SizeBytesAxis, TimeSecondsAxis } from '../../../widget/axis';
import { CommonWidgetDimensions } from '../../../widget/constant';
import { SectionWidget, SectionWidgetProps } from '../../../widget/section';
import { SqsMetricFactory } from './metrics';

/**
 * Alarm configuration for an SQS Queue.
 */
export interface SqsMonitoringAlarms {
  /**
   * alarm when queue size drops below threshold
   * @default no alarms
   */
  readonly alarmOnQueueSizeLow?: Record<string, AlarmDefinition>;
  /**
   * alarm when queue size raises above threshold
   * @default no alarms
   */
  readonly alarmOnQueueSizeHigh?: Record<string, AlarmDefinition>;
  /**
   * alarm when max message age in the queue raises above threshold
   * @default no alarms
   */
  readonly alarmOnQueueOldestMessageAgeHigh?: Record<string, AlarmDefinition>;
}

/**
 * Properties to create SqsMonitoring.
 */
export interface SqsMonitoringProps extends MonitoringWithAlarmsProps {
  /**
   * queue to be monitored
   */
  readonly queue: IQueue;
  /**
   * alarm configuration
   * @default no alarms
   */
  readonly alarms?: SqsMonitoringAlarms;
}

/**
 * Monitoring of SQS Queue.
 */
export class SqsMonitoring extends MonitoringWithAlarms {
  protected readonly section: SectionWidgetProps;
  protected readonly metrics: SqsMetricFactory;

  protected readonly visibleMessagesMetric: Metric;
  protected readonly incomingMessagesMetric: Metric;
  protected readonly oldestMessageAgeMetric: Metric;
  protected readonly messageSizeMetric: Metric;

  protected readonly lowCountAlarms: CreatedAlarm[];
  protected readonly highCountAlarms: CreatedAlarm[];
  protected readonly ageAlarms: CreatedAlarm[];

  constructor(props: SqsMonitoringProps) {
    super(props);

    this.section = this.headerProps(props);
    this.metrics = new SqsMetricFactory();

    this.visibleMessagesMetric = this.metrics.metricApproximateVisibleMessages(props.queue.queueName);
    this.incomingMessagesMetric = this.metrics.metricIncomingMessages(props.queue.queueName);
    this.oldestMessageAgeMetric = this.metrics.metricAgeOfOldestMessageInSeconds(props.queue.queueName);
    this.messageSizeMetric = this.metrics.metricAverageMessageSizeInBytes(props.queue.queueName);

    this.lowCountAlarms = this.alarmFactory.createAlarms(
      'QueueSizeLow',
      this.visibleMessagesMetric,
      ComparisonOperator.LESS_THAN_THRESHOLD,
      props.alarms?.alarmOnQueueSizeLow,
    );
    this.highCountAlarms = this.alarmFactory.createAlarms(
      'QueueSizeHigh',
      this.visibleMessagesMetric,
      ComparisonOperator.GREATER_THAN_THRESHOLD,
      props.alarms?.alarmOnQueueSizeHigh,
    );
    this.ageAlarms = this.alarmFactory.createAlarms(
      'QueueOldestMessageAgeHigh',
      this.oldestMessageAgeMetric,
      ComparisonOperator.GREATER_THAN_THRESHOLD,
      props.alarms?.alarmOnQueueOldestMessageAgeHigh,
    );
  }

  getWidgets(): IWidget[] {
    return [
      this.headerWidget(),
      this.messageCountWidget(CommonWidgetDimensions.ThirdWidth, CommonWidgetDimensions.DefaultHeight),
      this.messageAgeWidget(CommonWidgetDimensions.ThirdWidth, CommonWidgetDimensions.DefaultHeight),
      this.messageSizeWidget(CommonWidgetDimensions.ThirdWidth, CommonWidgetDimensions.DefaultHeight),
    ];
  }

  protected headerWidget() {
    return new SectionWidget(this.section);
  }

  protected messageCountWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Message Count',
      left: [this.visibleMessagesMetric, this.incomingMessagesMetric],
      leftYAxis: CountAxis,
      leftAnnotations: [...this.lowCountAlarms.map(a => a.annotation), ...this.highCountAlarms.map(a => a.annotation)],
    });
  }

  protected messageAgeWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Oldest Message Age',
      left: [this.oldestMessageAgeMetric],
      leftYAxis: TimeSecondsAxis,
      leftAnnotations: [...this.ageAlarms.map(a => a.annotation)],
    });
  }

  protected messageSizeWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Message Size',
      left: [this.messageSizeMetric],
      leftYAxis: SizeBytesAxis,
    });
  }

  protected headerProps(props: SqsMonitoringProps) {
    return {
      titleMarkdown: `SQS Queue **${props.queue.queueName}**`,
      quicklinks: this.headerQuickLinks(props),
    };
  }

  protected headerQuickLinks(props: SqsMonitoringProps) {
    return [
      { title: 'Overview', url: this.urlForQueueOverview(props) },
    ];
  }

  protected urlForQueueOverview(props: SqsMonitoringProps) {
    const region = Stack.of(props.queue).region;
    const queueUrl = props.queue.queueUrl;
    return `https://${region}.console.aws.amazon.com/sqs/v2/home?region=${region}#/queues/${queueUrl}`;
  }
}
