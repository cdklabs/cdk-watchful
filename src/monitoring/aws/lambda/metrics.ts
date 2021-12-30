import * as cdk from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum Metrics {
  Invocations = 'Invocations',
  Duration = 'Duration',
  Errors = 'Errors',
  Throttles = 'Throttles'
}

const Namespace = 'AWS/Lambda';

export class LambdaMetricFactory {
  metricInvocations(functionName: string) {
    return this.metric(Metrics.Invocations, functionName).with({ statistic: Statistic.SUM });
  }

  metricDuration(functionName: string) {
    const baseMetric = this.metric(Metrics.Duration, functionName);

    return {
      min: baseMetric.with({ statistic: Statistic.MINIMUM, label: Statistic.MINIMUM }),
      avg: baseMetric.with({ statistic: Statistic.AVERAGE, label: Statistic.AVERAGE }),
      p50: baseMetric.with({ statistic: 'p50', label: 'p50' }),
      p90: baseMetric.with({ statistic: 'p90', label: 'p90' }),
      p99: baseMetric.with({ statistic: 'p99', label: 'p99' }),
      max: baseMetric.with({ statistic: Statistic.MAXIMUM, label: Statistic.MAXIMUM }),
    };
  }

  metricErrors(functionName: string) {
    return this.metric(Metrics.Errors, functionName).with({ statistic: Statistic.SUM });
  }

  metricThrottles(functionName: string) {
    return this.metric(Metrics.Throttles, functionName).with({ statistic: Statistic.SUM });
  }

  protected metric(metric: Metrics, functionName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: cdk.Duration.minutes(5),
      dimensionsMap: {
        FunctionName: functionName,
      },
    });
  }
}
