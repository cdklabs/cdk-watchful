import { Duration } from 'aws-cdk-lib';
import { Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';


const enum Metrics {
  DatabaseConnections = 'DatabaseConnections',
  PercentageDiskSpaceUsed = 'PercentageDiskSpaceUsed',
  CPUUtilization = 'CPUUtilization',
  MaintenanceMode = 'MaintenanceMode',
  ReadLatency = 'ReadLatency',
  WriteLatency = 'WriteLatency',
  QueryDuration = 'QueryDuration',
}

const Namespace = 'AWS/Redshift';

export class RedshiftMetricFactory {
  metricAverageConnectionCount(clusterIdentifier: string) {
    return this.metric(Metrics.DatabaseConnections, clusterIdentifier).with({
      statistic: Statistic.AVERAGE,
    });
  }

  metricAverageDiskSpaceUsageInPercent(clusterIdentifier: string) {
    return this.metric(
      Metrics.PercentageDiskSpaceUsed,
      clusterIdentifier,
    ).with({ statistic: Statistic.AVERAGE });
  }

  metricAverageCpuUsageInPercent(clusterIdentifier: string) {
    return this.metric(Metrics.CPUUtilization, clusterIdentifier).with({
      statistic: Statistic.AVERAGE,
    });
  }

  metricAverageQueryDurationInMicros(clusterIdentifier: string) {
    return {
      shortQueries: this.metricQueryDuration('short', clusterIdentifier).with({
        statistic: Statistic.AVERAGE,
      }),
      mediumQueries: this.metricQueryDuration(
        'medium',
        clusterIdentifier,
      ).with({ statistic: Statistic.AVERAGE }),
      longQueries: this.metricQueryDuration('long', clusterIdentifier).with({
        statistic: Statistic.AVERAGE,
      }),
    };
  }

  metricAverageLatencyInSeconds(clusterIdentifier: string) {
    return {
      read: this.metric(Metrics.ReadLatency, clusterIdentifier).with({
        statistic: Statistic.AVERAGE,
      }),
      write: this.metric(Metrics.WriteLatency, clusterIdentifier).with({
        statistic: Statistic.AVERAGE,
      }),
    };
  }

  metricMaintenanceModeEnabled(clusterIdentifier: string) {
    return this.metric(Metrics.MaintenanceMode, clusterIdentifier).with({
      statistic: Statistic.MAXIMUM,
    });
  }

  private metricQueryDuration(latency: string, clusterIdentifier: string) {
    return new Metric({
      metricName: Metrics.QueryDuration,
      namespace: Namespace,
      period: Duration.minutes(5),
      dimensionsMap: {
        DBClusterIdentifier: clusterIdentifier,
        latency,
      },
    });
  }

  private metric(metric: Metrics, clusterIdentifier: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      dimensionsMap: {
        DBClusterIdentifier: clusterIdentifier,
      },
    });
  }
}
