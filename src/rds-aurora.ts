import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { IWatchful } from './api';
import { RdsAuroraMetricFactory } from './monitoring/aws/rds/metrics';

export interface WatchRdsAuroraOptions {
  /**
     * Threshold for the Cpu Maximum utilization
     *
     * @default 80
     */
  readonly cpuMaximumThresholdPercent?: number;

  /**
   * Threshold for the Maximum Db Connections.
   *
   * @default - 0.
   */
  readonly dbConnectionsMaximumThreshold?: number;

  /**
   * Threshold for the Maximum Db ReplicaLag.
   *
   * @default - 0.
   */
  readonly dbReplicaLagMaximumThreshold?: number;

  /**
   * Threshold for the Maximum Db Throughput.
   *
   * @default - 0.
   */
  readonly dbThroughputMaximumThreshold?: number;

  /**
   * Threshold for the Minimum Db Buffer Cache.
   *
   * @default - 0.
   */
  readonly dbBufferCacheMinimumThreshold?: number;

}

export interface WatchRdsAuroraProps extends WatchRdsAuroraOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly cluster: rds.DatabaseCluster;
}

export class WatchRdsAurora extends Construct {

  private readonly watchful: IWatchful;
  private readonly cluster: rds.DatabaseCluster;
  private readonly metrics: RdsAuroraMetricFactory;

  constructor(scope: Construct, id: string, props: WatchRdsAuroraProps) {
    super(scope, id);

    this.watchful = props.watchful;
    this.cluster = props.cluster;
    this.metrics = new RdsAuroraMetricFactory();

    this.watchful.addSection(props.title, {
      links: [
        { title: 'AWS RDS Cluster', url: linkForRDS(this.cluster) },
      ],
    });

    const { cpuUtilizationMetric, cpuUtilizationAlarm } = this.createCpuUtilizationMonitor(props.cpuMaximumThresholdPercent);
    const { dbConnectionsMetric, dbConnectionsAlarm } = this.createDbConnectionsMonitor(props.dbConnectionsMaximumThreshold);
    const { dbReplicaLagMetric, dbReplicaLagAlarm } = this.createDbReplicaLagMonitor(props.dbReplicaLagMaximumThreshold);
    const { dbBufferCacheHitRatioMetric, dbBufferCacheHitRatioAlarm } = this.createDbBufferCacheMonitor(props.dbBufferCacheMinimumThreshold);

    const { dbInsertThroughputMetric, dbUpdateThroughputMetric, dbSelectThroughputMetric, dbDeleteThroughputMetric } =
        this.createDbDmlThroughputMonitor(props.dbThroughputMaximumThreshold);

    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: `CPUUtilization/${cpuUtilizationMetric.period.toMinutes()}min`,
        width: 6,
        left: [cpuUtilizationMetric],
        leftAnnotations: [cpuUtilizationAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `DB Connections/${dbConnectionsMetric.period.toMinutes()}min`,
        width: 6,
        left: [dbConnectionsMetric],
        leftAnnotations: [dbConnectionsAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `DB Replica Lag/${dbReplicaLagMetric.period.toMinutes()}min`,
        width: 6,
        left: [dbReplicaLagMetric],
        leftAnnotations: [dbReplicaLagAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `DB BufferCache Hit Ratio/${dbBufferCacheHitRatioMetric.period.toMinutes()}min`,
        width: 6,
        left: [dbBufferCacheHitRatioMetric],
        leftAnnotations: [dbBufferCacheHitRatioAlarm.toAnnotation()],
      }),
    );
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'RDS DML Overview',
        width: 24,
        left: [dbInsertThroughputMetric, dbUpdateThroughputMetric, dbSelectThroughputMetric, dbDeleteThroughputMetric],
      }),
    );
  }

  private createCpuUtilizationMonitor(cpuMaximumThresholdPercent = 80) {
    const cpuUtilizationMetric = this.metrics.metricCpuUtilization(this.cluster.clusterIdentifier);
    const cpuUtilizationAlarm = cpuUtilizationMetric.createAlarm(this, 'CpuUtilizationAlarm', {
      alarmDescription: 'cpuUtilizationAlarm',
      threshold: cpuMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    return { cpuUtilizationMetric, cpuUtilizationAlarm };
  }

  private createDbConnectionsMonitor(dbConnectionsMaximumThreshold = 0) {
    const dbConnectionsMetric = this.metrics.metricDbConnections(this.cluster.clusterIdentifier);
    const dbConnectionsAlarm = dbConnectionsMetric.createAlarm(this, 'DbConnectionsAlarm', {
      alarmDescription: 'dbConnectionsAlarm',
      threshold: dbConnectionsMaximumThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    return { dbConnectionsMetric, dbConnectionsAlarm };
  }

  private createDbReplicaLagMonitor(dbReplicaLagMaximumThreshold = 0) {
    const dbReplicaLagMetric = this.metrics.metricReplicaLag(this.cluster.clusterIdentifier);
    const dbReplicaLagAlarm = dbReplicaLagMetric.createAlarm(this, 'DbReplicaLagAlarm', {
      alarmDescription: 'dbConnectionsAlarm',
      threshold: dbReplicaLagMaximumThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    return { dbReplicaLagMetric, dbReplicaLagAlarm };
  }

  private createDbBufferCacheMonitor(dbBufferCacheMinimumThreshold = 0) {
    const dbBufferCacheHitRatioMetric = this.metrics.metricBufferCacheHitRatio(this.cluster.clusterIdentifier);
    const dbBufferCacheHitRatioAlarm = dbBufferCacheHitRatioMetric.createAlarm(this, 'DbBufferCacheHitRatioAlarm', {
      alarmDescription: 'dbConnectionsAlarm',
      threshold: dbBufferCacheMinimumThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    return { dbBufferCacheHitRatioMetric, dbBufferCacheHitRatioAlarm };
  }
  private createDbDmlThroughputMonitor(dbThroughputMaximumThreshold = 0) {
    // @ts-ignore
    const AlarmThreshold = dbThroughputMaximumThreshold;
    return this.metrics.metricDmlThroughput(this.cluster.clusterIdentifier);
  }
}

function linkForRDS(cluster: rds.DatabaseCluster) {
  return `https://console.aws.amazon.com/rds/home?region=${cluster.stack.region}#database:id=${cluster.clusterIdentifier};is-cluster=true`;
}


