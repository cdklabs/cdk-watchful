import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

const enum Metrics {
  ExecutionsStarted = 'ExecutionsStarted',
  ExecutionsSucceeded = 'ExecutionsSucceeded',
  ExecutionsFailed = 'ExecutionsFailed',
  ExecutionsAborted = 'ExecutionsAborted',
  ExecutionThrottled ='ExecutionThrottled',
  ExecutionsTimedOut = 'ExecutionsTimedOut'
}

const Namespace = 'AWS/States';

export class StateMachineMetricFactory {
  metricExecutions(stateMachineArn: string) {
    return {
      total: this.metric(Metrics.ExecutionsStarted, stateMachineArn).with({ label: 'Total', statistic: Statistic.SUM }),
      succeeded: this.metric(Metrics.ExecutionsSucceeded, stateMachineArn).with({ label: 'Failed Succeeded', statistic: Statistic.SUM }),
      failed: this.metric(Metrics.ExecutionsFailed, stateMachineArn).with({ label: 'Failed Executions', statistic: Statistic.SUM }),
      aborted: this.metric(Metrics.ExecutionsAborted, stateMachineArn).with({ label: 'Aborted Executions', statistic: Statistic.SUM }),
      throttled: this.metric(Metrics.ExecutionThrottled, stateMachineArn).with({ label: 'Executions Throttled', statistic: Statistic.SUM }),
      timedOut: this.metric(Metrics.ExecutionsTimedOut, stateMachineArn).with({ label: 'Executions TimedOut', statistic: Statistic.SUM }),
    };
  }

  protected metric(metric: Metrics, stateMachineArn: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(1),
      dimensions: {
        StateMachineArn: stateMachineArn,
      },
    });
  }
}