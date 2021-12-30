import { Duration } from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';
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
const StatisticP90 = 'p90';
const StatisticP95 = 'p95';
const StatisticP99 = 'p99';

export class ApiGatewayMetricFactory {
  metricErrors(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      count4XX: this.metric(Metrics.FourHundredError, apiName, stage, op).with({ label: '4XX Errors', statistic: Statistic.SUM, color: '#ff7f0e' }),
      count5XX: this.metric(Metrics.FiveHundredError, apiName, stage, op).with({ label: '5XX Errors', statistic: Statistic.SUM, color: '#d62728' }),
    };
  }

  metricCache(apiName: string, stage: string, op?: WatchedOperation) {
    return {
      hits: this.metric(Metrics.CacheHitCount, apiName, stage, op).with({ label: 'Cache Hit', statistic: Statistic.SUM, color: '#2ca02c' }),
      misses: this.metric(Metrics.CacheMissCount, apiName, stage, op).with({ label: 'Cache Miss', statistic: Statistic.SUM, color: '#d62728' }),
    };
  }

  metricCalls(apiName: string, stage: string, op?: WatchedOperation) {
    return this.metric(Metrics.Count, apiName, stage, op).with({ label: 'Calls', color: '#1f77b4', statistic: Statistic.SUM });
  }

  metricIntegrationLatency(apiName: string, stage: string, op?: WatchedOperation) {
    const baseMetric = this.metric(Metrics.IntegrationLatency, apiName, stage, op);

    return {
      min: baseMetric.with({ label: 'min', statistic: Statistic.MINIMUM }),
      avg: baseMetric.with({ label: 'avg', statistic: Statistic.AVERAGE }),
      p90: baseMetric.with({ label: 'p90', statistic: StatisticP90 }),
      p95: baseMetric.with({ label: 'p95', statistic: StatisticP95 }),
      p99: baseMetric.with({ label: 'p99', statistic: StatisticP99 }),
      max: baseMetric.with({ label: 'max', statistic: Statistic.MAXIMUM }),
    };
  }

  metricLatency(apiName: string, stage: string, op?: WatchedOperation) {
    const baseMetric = this.metric(Metrics.Latency, apiName, stage, op);

    return {
      min: baseMetric.with({ label: 'min', statistic: Statistic.MINIMUM }),
      avg: baseMetric.with({ label: 'avg', statistic: Statistic.AVERAGE }),
      p90: baseMetric.with({ label: 'p90', statistic: StatisticP90 }),
      p95: baseMetric.with({ label: 'p95', statistic: StatisticP95 }),
      p99: baseMetric.with({ label: 'p99', statistic: StatisticP99 }),
      max: baseMetric.with({ label: 'max', statistic: Statistic.MAXIMUM }),
    };
  }

  protected metric(metricName: Metrics, apiName: string, stage: string, op?: WatchedOperation) {
    return new Metric({
      metricName,
      namespace: Namespace,
      period: Duration.minutes(1),
      dimensionsMap: {
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

