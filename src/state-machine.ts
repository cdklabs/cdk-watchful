import { ComparisonOperator, GraphWidget } from '@aws-cdk/aws-cloudwatch';
import { StateMachine } from '@aws-cdk/aws-stepfunctions';
import { Construct, Duration } from '@aws-cdk/core';
import { IWatchful } from './api';
import { StateMachineMetricFactory } from './monitoring/aws/state-machine/metrics';

export interface WatchStateMachineOptions {
  /**
   * Alarm when execution failures reach this threshold over 1 minute.
   *
   * @default 1 any execution failure will trigger the alarm
   */
  readonly metricFailedThreshold?: number;
}

export interface WatchStateMachineProps extends WatchStateMachineOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly stateMachine: StateMachine;
}

export class WatchStateMachine extends Construct {
  private readonly title: string;
  private readonly watchful: IWatchful;
  private readonly stateMachine: StateMachine;
  private readonly metricFailedThreshold: number;

  private readonly metrics: StateMachineMetricFactory;

  constructor(scope: Construct, id: string, props: WatchStateMachineProps) {
    super(scope, id);

    this.title = props.title;
    this.watchful = props.watchful;
    this.stateMachine = props.stateMachine;

    this.metricFailedThreshold = props.metricFailedThreshold ?? 1;

    this.metrics = new StateMachineMetricFactory();

    this.createLinks();
    this.createExecutionMetrics();
  }

  private createExecutionMetrics() {
    const execMetrics = this.metrics.metricExecutions(this.stateMachine.stateMachineArn);
    const { failed } = execMetrics;
    const failureAlarm = failed.createAlarm(this, 'ExecutionFailures', {
      alarmDescription: `at ${this.metricFailedThreshold}`,
      threshold: this.metricFailedThreshold,
      period: Duration.minutes(5),
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      statistic: 'sum',
    });

    this.watchful.addAlarm(failureAlarm);

    this.watchful.addWidgets(new GraphWidget({
      title: 'Overall Execution/min',
      width: 12,
      stacked: false,
      left: Object.values(execMetrics),
      leftAnnotations: [{ value: this.metricFailedThreshold, color: '#ff0000', label: 'Execution Failure Alarm' }],
    }));
  }

  private createLinks() {
    this.watchful.addSection(this.title, {
      links: [{
        title: 'Amazon State Machine',
        url: `https://console.aws.amazon.com/states/home?region=${this.stateMachine.stack.region}#/statemachines/view/${this.stateMachine.stateMachineArn}`,
      }],
    });
  }
}