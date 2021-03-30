import { Metric } from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

export class LambdaMetricFactory {
  static readonly Namespace = 'AWS/Lambda';

  metricInvocations(functionName: string) {
    return new Metric({
      metricName: 'Invocations',
      namespace: LambdaMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        FunctionName: functionName,
      },
    });
  }

  metricDuration(functionName: string) {
    const avg = new Metric({
      metricName: 'Duration',
      namespace: LambdaMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Average',
      dimensions: {
        FunctionName: functionName,
      },
    });
    const p50 = avg.with({ statistic: 'p50' });
    const p90 = avg.with({ statistic: 'p90' });
    const p99 = avg.with({ statistic: 'p99' });
    return { avg, p50, p90, p99 };
  }

  metricErrors(functionName: string) {
    return new Metric({
      metricName: 'Errors',
      namespace: LambdaMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        FunctionName: functionName,
      },
    });
  }

  metricThrottles(functionName: string) {
    return new Metric({
      metricName: 'Throttles',
      namespace: LambdaMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        FunctionName: functionName,
      },
    });
  }
}
