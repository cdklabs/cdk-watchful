import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';

/**
 * Metrics for RDS Aurora.
 */
export class RdsAuroraMetricFactory {
  static readonly Namespace = 'AWS/RDS';

  metricDmlThroughput(clusterIdentifier: string) {
    const dbInsertThroughputMetric = new cloudwatch.Metric({
      metricName: 'InsertThroughput',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
    const dbUpdateThroughputMetric = new cloudwatch.Metric({
      metricName: 'UpdateThroughput',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
    const dbSelectThroughputMetric = new cloudwatch.Metric({
      metricName: 'SelectThroughput',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
    const dbDeleteThroughputMetric = new cloudwatch.Metric({
      metricName: 'DeleteThroughput',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Sum',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
    return {
      dbInsertThroughputMetric,
      dbUpdateThroughputMetric,
      dbSelectThroughputMetric,
      dbDeleteThroughputMetric,
    };
  }

  metricBufferCacheHitRatio(clusterIdentifier: string) {
    return new cloudwatch.Metric({
      metricName: 'BufferCacheHitRatio',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Average',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }

  metricDbConnections(clusterIdentifier: string) {
    return new cloudwatch.Metric({
      metricName: 'DatabaseConnections',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Average',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }

  metricReplicaLag(clusterIdentifier: string) {
    return new cloudwatch.Metric({
      metricName: 'AuroraReplicaLag',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Average',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }

  metricCpuUtilization(clusterIdentifier: string) {
    return new cloudwatch.Metric({
      metricName: 'CPUUtilization',
      namespace: RdsAuroraMetricFactory.Namespace,
      period: cdk.Duration.minutes(5),
      statistic: 'Average',
      dimensions: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }
}
