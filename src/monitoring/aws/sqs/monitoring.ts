import { Stack } from 'aws-cdk-lib';
import {
  GraphWidget,
  HorizontalAnnotation,
  IWidget,
  Metric,
} from 'aws-cdk-lib/aws-cloudwatch';
import { IQueue } from 'aws-cdk-lib/aws-sqs';
import { Monitoring, MonitoringProps } from '../../../core/monitoring';
import {
  CountAxis,
  SizeBytesAxis,
  TimeSecondsAxis,
} from '../../../widget/axis';
import { CommonWidgetDimensions } from '../../../widget/constant';
import { SectionWidget, SectionWidgetProps } from '../../../widget/section';

import { SqsMetricFactory } from './metrics';

/**
 * Properties to create SqsMonitoring.
 */
export interface SqsMonitoringProps extends MonitoringProps {
  queue: IQueue;
}

/**
 * Monitoring of SQS Queue.
 */
export class SqsMonitoring extends Monitoring {
  protected readonly section: SectionWidgetProps;
  protected readonly metrics: SqsMetricFactory;

  protected readonly visibleMessagesMetric: Metric;
  protected readonly incomingMessagesMetric: Metric;
  protected readonly oldestMessageAgeMetric: Metric;
  protected readonly messageSizeMetric: Metric;

  protected readonly countAnnotations: HorizontalAnnotation[];
  protected readonly ageAnnotations: HorizontalAnnotation[];

  constructor(props: SqsMonitoringProps) {
    super();

    this.section = this.headerProps(props);
    this.metrics = new SqsMetricFactory();

    this.visibleMessagesMetric = this.metrics.metricApproximateVisibleMessages(
      props.queue.queueName,
    );
    this.incomingMessagesMetric = this.metrics.metricIncomingMessages(
      props.queue.queueName,
    );
    this.oldestMessageAgeMetric = this.metrics.metricAgeOfOldestMessageInSeconds(
      props.queue.queueName,
    );
    this.messageSizeMetric = this.metrics.metricAverageMessageSizeInBytes(
      props.queue.queueName,
    );

    this.countAnnotations = [];
    this.ageAnnotations = [];
  }

  getWidgets(): IWidget[] {
    return [
      this.headerWidget(),
      this.messageCountWidget(
        CommonWidgetDimensions.ThirdWidth,
        CommonWidgetDimensions.DefaultHeight,
      ),
      this.messageAgeWidget(
        CommonWidgetDimensions.ThirdWidth,
        CommonWidgetDimensions.DefaultHeight,
      ),
      this.messageSizeWidget(
        CommonWidgetDimensions.ThirdWidth,
        CommonWidgetDimensions.DefaultHeight,
      ),
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
      leftAnnotations: this.countAnnotations,
    });
  }

  protected messageAgeWidget(width: number, height: number) {
    return new GraphWidget({
      width,
      height,
      title: 'Oldest Message Age',
      left: [this.oldestMessageAgeMetric],
      leftYAxis: TimeSecondsAxis,
      leftAnnotations: this.ageAnnotations,
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
      ...props,
    };
  }

  protected headerQuickLinks(props: SqsMonitoringProps) {
    return [{ title: 'Overview', url: this.urlForQueueOverview(props) }];
  }

  protected urlForQueueOverview(props: SqsMonitoringProps) {
    const region = Stack.of(props.queue).region;
    const queueUrl = props.queue.queueUrl;
    return `https://${region}.console.aws.amazon.com/sqs/v2/home?region=${region}#/queues/${queueUrl}`;
  }
}
