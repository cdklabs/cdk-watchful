import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as firehose from '@aws-cdk/aws-kinesisfirehose';
import * as cdk from '@aws-cdk/core';
import { IWatchful } from './api';

export interface WatchFirehoseServiceOptions {
}

export interface WatchFirehoseServiceProps extends WatchFirehoseServiceOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly fh: firehose.CfnDeliveryStream;
}

export class WatchFirehoseService extends cdk.Construct {
  private readonly watchful: IWatchful;
  private readonly fh: firehose.CfnDeliveryStream;

  constructor(scope: cdk.Construct, id: string, props: WatchFirehoseServiceProps) {
    super(scope, id);

    this.watchful = props.watchful;
    this.fh = props.fh;

    this.watchful.addSection(props.title, {
      links: [{ title: 'Firehose Console', url: linkForFirehoseService(this.fh) }],
    });

    const {
      deliveryToRedshiftSuccessMetric, deliveryToRedshiftSuccessAlarm,
    } = this.createDeliveryToRedshiftSuccessMonitor();
    const {
      deliveryToRedshiftRecordsMetric,
    } = this.createDeliveryToRedshiftRecordsMonitor();

    // add all the widgets
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Delivery to Redshift success',
        width: 12,
        left: [deliveryToRedshiftSuccessMetric],
        leftAnnotations: [deliveryToRedshiftSuccessAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: 'Records delivered to Redshift (Sum)',
        width: 12,
        left: [deliveryToRedshiftRecordsMetric],
      }),
    );
  } // constructor

  // helper functions for creating metrics
  private createDeliveryToRedshiftSuccessMonitor() {
    const deliveryToRedshiftSuccessMetric = new cloudwatch.Metric({
      metricName: FirehoseGatewayMetric.DeliveryToRedshiftSuccess,
      namespace: 'AWS/Firehose',
      period: cdk.Duration.minutes(1),
      statistic: 'sum',
      dimensions: {
        DeliveryStreamName: this.fh.deliveryStreamName,
      },
    });
    const deliveryToRedshiftSuccessAlarm = new cloudwatch.Alarm(this, 'deliveryToRedshiftAlarm', {
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      metric: deliveryToRedshiftSuccessMetric,
      threshold: 1,
      period: cdk.Duration.minutes(1),
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    this.watchful.addAlarm(deliveryToRedshiftSuccessAlarm, false);
    return { deliveryToRedshiftSuccessMetric, deliveryToRedshiftSuccessAlarm };
  }
  private createDeliveryToRedshiftRecordsMonitor() {
    const deliveryToRedshiftRecordsMetric = new cloudwatch.Metric({
      metricName: FirehoseGatewayMetric.DeliveryToRedshiftRecords,
      namespace: 'AWS/Firehose',
      period: cdk.Duration.minutes(1),
      statistic: 'sum',
      dimensions: {
        DeliveryStreamName: this.fh.deliveryStreamName,
      },
    });
    return { deliveryToRedshiftRecordsMetric };
  }
}

// TODO extend to monitor all the things
const enum FirehoseGatewayMetric {
  DeliveryToRedshiftSuccess = 'DeliveryToRedshift.Success',
  DeliveryToRedshiftRecords = 'DeliveryToRedshift.Records',
}

function linkForFirehoseService(fh: firehose.CfnDeliveryStream) {
  return `https://console.aws.amazon.com/firehose/home?region=${fh.stack.region}#/details/${fh.deliveryStreamName}`;
}
