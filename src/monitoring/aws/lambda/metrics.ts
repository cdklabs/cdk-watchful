import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

const enum Metrics {
  Invocations = 'Invocations',
  Duration = 'Duration',
  Errors = 'Errors',
  Throttles = 'Throttles'
}

const Namespace = 'AWS/Lambda';

export class LambdaMetricFactory {
  metricInvocations(functionName: string) {
    return new Metric({
      metricName: Metrics.Invocations,
      namespace: Namespace,
      period: cdk.Duration.minutes(5),
      statistic: Statistic.SUM,
      dimensions: {
        FunctionName: functionName,
      },
    });
  }

  metricDuration(functionName: string) {
    function metric(statistic: string) {
      return new Metric({
        metricName: Metrics.Duration,
        label: statistic,
        namespace: Namespace,
        period: cdk.Duration.minutes(5),
        statistic,
        dimensions: {
          FunctionName: functionName,
        },
      });
    }

    return {
      min: metric(Statistic.MINIMUM),
      avg: metric(Statistic.AVERAGE),
      p50: metric('p50'),
      p90: metric('p90'),
      p99: metric('p99'),
      max: metric(Statistic.MAXIMUM),
    };
  }

  metricErrors(functionName: string) {
    return new Metric({
      metricName: Metrics.Errors,
      namespace: Namespace,
      period: cdk.Duration.minutes(5),
      statistic: Statistic.SUM,
      dimensions: {
        FunctionName: functionName,
      },
    });
  }

  metricThrottles(functionName: string) {
    return new Metric({
      metricName: Metrics.Throttles,
      namespace: Namespace,
      period: cdk.Duration.minutes(5),
      statistic: Statistic.SUM,
      dimensions: {
        FunctionName: functionName,
      },
    });
  }
}
