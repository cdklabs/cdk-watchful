import { Metric, Statistic } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';
import { WatchedOperation } from '../../../api-gateway';

const enum Metrics {
  FourHundredError = '4XXError',
  FiveHundredError = '5XXError',
  CacheHitCount = 'CacheHitCount',
  CacheMissCount = 'CacheMissCount',
  Count = 'Count',
  IntegrationLatency = 'IntegrationLatency',
  Latency = 'Latency',
}

const Namespace = 'AWS/ApiGateway';

export class ApiGatewayMetricFactory {
  metricErrors(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      errors4XX: this.metric(Metrics.FourHundredError, apiName, stage, op).with({ label: '4XX Errors', statistic: Statistic.SUM }),
      errors5XX: this.metric(Metrics.FiveHundredError, apiName, stage, op).with({ label: '5XX Errors', statistic: Statistic.SUM }),
    };
  }

  metricCache(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      hits: this.metric(Metrics.CacheHitCount, apiName, stage, op).with({ label: 'Cache Hit', statistic: Statistic.SUM }),
      misses: this.metric(Metrics.CacheMissCount, apiName, stage, op).with({ label: 'Cache Miss', statistic: Statistic.SUM }),
    };
  }

  metricCalls(apiName: string, stage: string, op?: WatchedOperation) {
    return this.metric(Metrics.Count, apiName, stage, op).with({ label: 'Calls', statistic: Statistic.SUM });
  }

  metricIntegrationLatency(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      min: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'min', statistic: Statistic.MINIMUM }),
      avg: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'avg', statistic: Statistic.AVERAGE }),
      p90: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'p90', statistic: 'p90' }),
      p95: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'p95', statistic: 'p95' }),
      p99: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'p99', statistic: 'p99' }),
      max: this.metric(Metrics.IntegrationLatency, apiName, stage, op).with({ label: 'max', statistic: Statistic.MAXIMUM }),
    };
  }

  metricLatency(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      min: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'min', statistic: Statistic.MINIMUM }),
      avg: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'avg', statistic: Statistic.AVERAGE }),
      p90: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'p90', statistic: 'p90' }),
      p95: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'p95', statistic: 'p95' }),
      p99: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'p99', statistic: 'p99' }),
      max: this.metric(Metrics.Latency, apiName, stage, op).with({ label: 'max', statistic: Statistic.MAXIMUM }),
    };
  }

  protected metric(metricName: Metrics, apiName: string, stage: string, op?: WatchedOperation) {
    return new Metric({
      metricName,
      namespace: Namespace,
      period: Duration.minutes(1),
      dimensions: {
        ApiName: apiName,
        Stage: stage,
        ...op && {
          Method: op.httpMethod,
          Resource: op.resourcePath,
        },
      },
    });
  }
}

