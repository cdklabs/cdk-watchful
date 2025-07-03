import { Duration } from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum Metrics {
  SelectThroughput = 'SelectThroughput',
  InsertThroughput = 'InsertThroughput',
  UpdateThroughput = 'UpdateThroughput',
  DeleteThroughput = 'DeleteThroughput',
  BufferCacheHitRatio = 'BufferCacheHitRatio',
  DatabaseConnections = 'DatabaseConnections',
  AuroraReplicaLag = 'AuroraReplicaLag',
  CPUUtilization = 'CPUUtilization',
}

const Namespace = 'AWS/RDS';

/**
 * Metrics for RDS Aurora.
 */
export class RdsAuroraMetricFactory {
  metricDmlThroughput(clusterIdentifier: string) {
    return {
      dbInsertThroughputMetric: this.metric(Metrics.InsertThroughput, clusterIdentifier).with({ statistic: Statistic.SUM }),
      dbUpdateThroughputMetric: this.metric(Metrics.UpdateThroughput, clusterIdentifier).with({ statistic: Statistic.SUM }),
      dbSelectThroughputMetric: this.metric(Metrics.SelectThroughput, clusterIdentifier).with({ statistic: Statistic.SUM }),
      dbDeleteThroughputMetric: this.metric(Metrics.DeleteThroughput, clusterIdentifier).with({ statistic: Statistic.SUM }),
    };
  }

  metricBufferCacheHitRatio(clusterIdentifier: string) {
    return this.metric(Metrics.BufferCacheHitRatio, clusterIdentifier).with({ statistic: Statistic.AVERAGE });
  }

  metricDbConnections(clusterIdentifier: string) {
    return this.metric(Metrics.DatabaseConnections, clusterIdentifier).with({ statistic: Statistic.AVERAGE });
  }

  metricReplicaLag(clusterIdentifier: string) {
    return this.metric(Metrics.AuroraReplicaLag, clusterIdentifier).with({ statistic: Statistic.AVERAGE });
  }

  metricCpuUtilization(clusterIdentifier: string) {
    return this.metric(Metrics.CPUUtilization, clusterIdentifier).with({ statistic: Statistic.AVERAGE });
  }

  protected metric(metric: Metrics, clusterIdentifier: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      statistic: Statistic.SUM,
      dimensionsMap: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }
}
