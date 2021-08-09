import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as lambda from '@aws-cdk/aws-lambda';
import { Construct, Duration } from '@aws-cdk/core';
import { IWatchful } from './api';

const DEFAULT_DURATION_THRESHOLD_PERCENT = 80;

export interface WatchLambdaFunctionOptions {
  /**
   * Flag to disable alerting on errors
   *
   * @default false
   */
  readonly errorsDisableAlerts?: boolean;

  /**
   * Number of allowed errors per minute. If there are more errors than that, an alarm will trigger.
   *
   * @default 0
   */
  readonly errorsPerMinuteThreshold?: number;

  /**
   * Flag to enable alerting on invocationsMetric
   *
    @default false
   */
  readonly invocationsEnableAlerts?: boolean;

  /**
   * Threshold for alerting invocations
   */
  readonly invocationsThreshold?: Duration;

  /**
   * Number of allowed throttles per minute.
   *
   * @default 0
   */
  readonly throttlesPerMinuteThreshold?: number;

  /**
   * Threshold for the duration alarm as percentage of the function's timeout
   * value.
   *
   * If this is set to 50%, the alarm will be set when p99 latency of the
   * function exceeds 50% of the function's timeout setting.
   *
   * @default 80
   */
  readonly durationThresholdPercent?: number;

  /**
   * Override duration timeout threshold.
   * Necessary for lambdas that aren't created via the CDK.
   * This value is still adjusted by durationThresholdPercent
   *
   * @default 3
   */
  readonly durationTimeoutSec?: number;
}

export interface WatchLambdaFunctionProps extends WatchLambdaFunctionOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly fn: lambda.IFunction;
}

export class WatchLambdaFunction extends Construct {

  private readonly watchful: IWatchful;
  private readonly fn: lambda.IFunction;
  private invocationsMetric!: cloudwatch.Metric;
  private invocationsAlarm: cloudwatch.Alarm | undefined;
  private errorsMetric!: cloudwatch.Metric;
  private errorsAlarm: cloudwatch.Alarm | undefined;
  private throttlesMetric!: cloudwatch.Metric;
  private throttlesAlarm!: cloudwatch.Alarm;
  private durationMetric!: cloudwatch.Metric;
  private durationAlarm!: cloudwatch.Alarm;

  constructor(scope: Construct, id: string, props: WatchLambdaFunctionProps) {
    super(scope, id);

    const cfnFunction = props.fn.node.defaultChild as lambda.CfnFunction;
    // Use the parameter if it was passed, then the lambdas timeout if it exists, lastly use the default of 3 seconds
    const timeoutSec = props.durationTimeoutSec || cfnFunction?.timeout || 3;

    this.watchful = props.watchful;
    this.fn = props.fn;

    this.watchful.addSection(props.title, {
      links: [
        { title: 'AWS Lambda Console', url: linkForLambdaFunction(this.fn) },
        { title: 'CloudWatch Logs', url: linkForLambdaLogs(this.fn) },
      ],
    });

    this.createInvocationsMonitor(props.invocationsEnableAlerts, props.invocationsThreshold);
    this.createErrorsMonitor(props.errorsDisableAlerts, props.errorsPerMinuteThreshold);
    this.createThrottlesMonitor(props.throttlesPerMinuteThreshold);
    this.createDurationMonitor(timeoutSec!, props.durationThresholdPercent);

    let invocationWidget: cloudwatch.IWidget;
    if (!props.invocationsEnableAlerts) {
      invocationWidget = new cloudwatch.GraphWidget({
        title: `Invocations/${this.invocationsMetric.period.toMinutes()}min`,
        width: 6,
        left: [this.invocationsMetric],
      });
    } else {
      invocationWidget = new cloudwatch.AlarmWidget({
        title: `Invocations/${this.invocationsMetric.period.toMinutes()}min`,
        alarm: this.invocationsAlarm!,
        width: 6,
      });
    }

    let errorWidget: cloudwatch.IWidget;
    if (props.errorsDisableAlerts) {
      errorWidget = new cloudwatch.GraphWidget({
        title: `Errors/${this.errorsMetric.period.toMinutes()}min`,
        width: 6,
        left: [this.errorsMetric],
      });
    } else {
      errorWidget = new cloudwatch.AlarmWidget({
        title: `Errors/${this.errorsMetric.period.toMinutes()}min`,
        alarm: this.errorsAlarm!,
        width: 6,
      });
    }

    this.watchful.addWidgets(
      invocationWidget,
      errorWidget,
      new cloudwatch.GraphWidget({
        title: `Throttles/${this.throttlesMetric.period.toMinutes()}min`,
        width: 6,
        left: [this.throttlesMetric],
        leftAnnotations: [this.throttlesAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `Duration/${this.durationMetric.period.toMinutes()}min`,
        width: 6,
        left: [this.durationMetric],
        leftAnnotations: [this.durationAlarm.toAnnotation()],
      }),
    );
  }

  createInvocationsMonitor(invocationsEnableAlerts = false, invocationsThreshold = Duration.hours(1)) {
    const fn = this.fn;
    this.invocationsMetric = fn.metricInvocations();
    if (invocationsEnableAlerts) {
      this.invocationsAlarm = this.invocationsMetric.createAlarm(this, 'InvocationAlarm', {
        alarmDescription: `Expecting invocations to occur every ${invocationsThreshold.toHours()}hours`,
        threshold: 1,
        period: invocationsThreshold, // deprecated but functional
        comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
        evaluationPeriods: 1,
        treatMissingData: cloudwatch.TreatMissingData.BREACHING,
      });
      // this isn't working as promised, so keep using the deprecated method for now
      // this.invocationsMetric.with({ period: invocationsThreshold } );
      this.watchful.addAlarm(this.invocationsAlarm);
    }
  }

  private createErrorsMonitor(errorsDisableAlerts = false, errorsPerMinuteThreshold = 0) {
    const fn = this.fn;
    this.errorsMetric = fn.metricErrors();
    if (!errorsDisableAlerts) {
      this.errorsAlarm = this.errorsMetric.createAlarm(this, 'ErrorsAlarm', {
        alarmDescription: `Over ${errorsPerMinuteThreshold} errors per minute`,
        threshold: errorsPerMinuteThreshold,
        comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
        evaluationPeriods: 3,
      });
      this.watchful.addAlarm(this.errorsAlarm);
    }
  }

  private createThrottlesMonitor(throttlesPerMinuteThreshold = 0) {
    const fn = this.fn;
    this.throttlesMetric = fn.metricThrottles();
    this.throttlesAlarm = this.throttlesMetric.createAlarm(this, 'ThrottlesAlarm', {
      alarmDescription: `Over ${throttlesPerMinuteThreshold} throttles per minute`,
      threshold: throttlesPerMinuteThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(this.throttlesAlarm);
  }

  private createDurationMonitor(timeoutSec: number, durationPercentThreshold: number = DEFAULT_DURATION_THRESHOLD_PERCENT) {
    const fn = this.fn;
    this.durationMetric = fn.metricDuration();
    const durationThresholdSec = Math.floor(durationPercentThreshold / 100 * timeoutSec);
    this.durationAlarm = this.durationMetric.createAlarm(this, 'DurationAlarm', {
      alarmDescription: `p99 latency >= ${durationThresholdSec}s (${durationPercentThreshold}%)`,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      threshold: durationThresholdSec * 1000, // milliseconds
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(this.durationAlarm);
  }
}

function linkForLambdaFunction(fn: lambda.IFunction, tab = 'graph') {
  return `https://console.aws.amazon.com/lambda/home?region=${fn.stack.region}#/functions/${fn.functionName}?tab=${tab}`;
}

function linkForLambdaLogs(fn: lambda.IFunction) {
  return `https://console.aws.amazon.com/cloudwatch/home?region=${fn.stack.region}#logEventViewer:group=/aws/lambda/${fn.functionName}`;
}