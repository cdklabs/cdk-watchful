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
    function metric(statistic: string) {
      return new Metric({
        metricName: 'Duration',
        label: statistic,
        namespace: LambdaMetricFactory.Namespace,
        period: cdk.Duration.minutes(5),
        statistic,
        dimensions: {
          FunctionName: functionName,
        },
      });
    }

    return {
      min: metric('Minimum'),
      avg: metric('Average'),
      p50: metric('p50'),
      p90: metric('p90'),
      p99: metric('p99'),
      max: metric('Maximum'),
    };
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
