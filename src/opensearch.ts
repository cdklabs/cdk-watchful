import { Duration } from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import { Construct } from 'constructs';
import EBSOptionsProperty = opensearch.CfnDomain.EBSOptionsProperty;
import ClusterConfigProperty = opensearch.CfnDomain.ClusterConfigProperty;
import { IWatchful } from './api';
import { OpenSearchMetricFactory } from './monitoring/aws/opensearch/metrics';

export interface WatchOpenSearchOptions {
  /**
   * Threshold for ClusterStatus.yellow metric
   *
   * @default 1
   */
  readonly clusterStatusYellowThresholdMax?: number;

  /**
   * Threshold for ClusterStatus.red metric
   *
   * @default 1
   */
  readonly clusterStatusRedThresholdMax?: number;

  /**
   * Threshold for FreeStorageSpace metric.
   *
   * @default 25% of storage
   */
  readonly freeStorageSpaceThresholdPercent?: number;

  /**
   * Threshold for ClusterIndexWritesBlocked metric
   *
   * @default 1
   */
  readonly clusterIndexWritesBlockedThresholdMax?: number;

  /**
   * Threshold for Nodes metric
   *
   * @default instanceCount
   */
  readonly nodesThresholdMin?: number;

  /**
   * Threshold for AutomatedSnapshotFailure metric
   *
   * @default 1
   */
  readonly automatedSnapshotFailureThresholdMax?: number;

  /**
     * Threshold for the Cpu Maximum utilization
     *
     * @default 80
     */
  readonly cpuMaximumThresholdPercent?: number;

  /**
   * Threshold for the JVMMMemoryPressure metric
   *
   * @default 80
   */
  readonly jvmMemoryPressureThresholdMax?: number;

  /**
     * Threshold for KMSKeyError
     *
     * @default - 1
     */
  readonly kmsKeyErrorThresholdMax?: number;

  /**
   * Threshold for KMSKeyInaccessible
   *
   * @default - 1
   */
  readonly kmsKeyInaccessibleThresholdMax?: number;

  /**
   * Threshold for ShardsActive metric
   *
   * @default - 30000
   */
  readonly shardsActiveThresholdSum?: number;

  /**
   * Threshold for 5XX Errors metric. Percent of requests compared to OpenSearchRequests that are returned as HTTP5XX
   *
   * @default - 10
   */
  readonly http5XXResponsesThresholdPercent?: number;

  /**
   * Threshold for MasterReachableFromNode metric.
   *
   * @default - 1
   */
  readonly masterReachableFromNodeThresholdMin?: number;

  /**
   * Threshold for ThreadpoolWriteQueue metric.
   *
   * @default - 100
   */
  readonly threadpoolWriteQueueThresholdAvg?: number;

  /**
   * Threshold for ThreadpoolSearchQueue metric.
   *
   * @default - 500
   */
  readonly threadpoolSearchQueueThresholdAvg?: number;


  /**
   * Threshold for the Master Cpu Maximum utilization
   *
   * @default 50
   */
  readonly masterCpuMaximumThresholdPercent?: number;

  /**
   * Threshold for the MasterJVMMMemoryPressure metric
   *
   * @default 80
   */
  readonly masterJVMMemoryPressureThresholdMax?: number;

}

export interface WatchOpenSearchProps extends WatchOpenSearchOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly domain: opensearch.Domain | opensearch.CfnDomain;
}

export class WatchOpenSearchDomain extends Construct {
  private readonly watchful: IWatchful;
  private readonly domain: opensearch.Domain | opensearch.CfnDomain;
  private readonly metrics: OpenSearchMetricFactory;
  private readonly domainName: string;
  private readonly cfnDomain: opensearch.CfnDomain;
  private readonly dataNodesCount: number;
  private readonly masterNodesCount: number;
  private readonly warmNodesCount: number;
  private readonly totalNodeCount: number;
  constructor(scope: Construct, id: string, props: WatchOpenSearchProps) {
    super(scope, id);

    this.watchful = props.watchful;
    this.domain = props.domain;
    this.metrics = new OpenSearchMetricFactory();

    this.domainName = this.domain.domainName ?? '';
    this.cfnDomain = (this.domain instanceof opensearch.Domain ? this.domain.node.defaultChild as opensearch.CfnDomain : this.domain);
    this.dataNodesCount = (this.cfnDomain.clusterConfig as ClusterConfigProperty).instanceCount as number;
    this.masterNodesCount = (this.cfnDomain.clusterConfig as ClusterConfigProperty).dedicatedMasterCount as number ?? 0;
    this.warmNodesCount = (this.cfnDomain.clusterConfig as ClusterConfigProperty).warmCount as number ?? 0;
    this.totalNodeCount = (this.dataNodesCount + this.masterNodesCount + this.warmNodesCount);


    this.watchful.addSection(props.title, {
      links: [
        { title: 'AWS OpenSearch Domain', url: linkForOpenSearch(this.domain) },
      ],
    });
    /* eslint-disable max-len */
    const { clusterStatusRedMetric, clusterStatusRedAlarm } = this.createClusterStatusRedMonitor(props.clusterStatusRedThresholdMax);
    const { clusterStatusYellowMetric, clusterStatusYellowAlarm } = this.createClusterStatusYellowMonitor(props.clusterStatusYellowThresholdMax);
    const { freeStorageSpaceMetric, freeStorageSpaceAlarm } = this.createFreeStorageSpaceMonitor(props.freeStorageSpaceThresholdPercent);
    const { clusterIndexWritesBlockedMetric, clusterIndexWritesBlockedAlarm } = this.createClusterIndexWritesBlockedMonitor(props.clusterIndexWritesBlockedThresholdMax);
    const { nodesMetric, nodesAlarm } = this.createNodesMonitor(props.nodesThresholdMin);
    const { cpuUtilizationMetric, cpuUtilizationAlarm } = this.createCpuUtilizationMonitor(props.cpuMaximumThresholdPercent);
    const { JVMMemoryPressureMetric, JVMMemoryPressureAlarm } = this.createJVMMemoryPressureMonitor(props.jvmMemoryPressureThresholdMax);
    const { automatedSnapshotFailureMetric, automatedSnapshotFailureAlarm } = this.createAutomatedSnapshotMonitor(props.automatedSnapshotFailureThresholdMax);
    const { kmsKeyErrorMetric, kmsKeyErrorAlarm } = this.createKmsKeyErrorMonitor(props.kmsKeyErrorThresholdMax);
    const { kmsKeyInaccessibleMetric, kmsKeyInaccessibleAlarm } = this.createKmsKeyInaccessibleMonitor(props.kmsKeyInaccessibleThresholdMax);
    const { shardsActiveMetric, shardsActiveAlarm } = this.createShardsActiveMonitor(props.shardsActiveThresholdSum);
    const { http5XXPercentageMetric, http5XXPercentageAlarm } = this.createHttp5XXMonitor(props.http5XXResponsesThresholdPercent);
    const { threadpoolWriteQueueMetric, threadpoolWriteQueueAlarm } = this.createThreadpoolWriteQueueMonitor(props.threadpoolWriteQueueThresholdAvg);
    const { threadpoolSearchQueueMetric, threadpoolSearchQueueAlarm } = this.createThreadpoolSearchQueueMonitor(props.threadpoolSearchQueueThresholdAvg);
    /* eslint-enable max-len */

    this.watchful.addWidgets(
      new cloudwatch.AlarmStatusWidget({
        title: 'Alarm List',
        width: 12,
        height: 5,
        alarms: this.node.children.filter((child) => child.constructor.name === 'Alarm') as cloudwatch.IAlarm[],
      }),
      new cloudwatch.SingleValueWidget({
        title: 'Nodes',
        height: 4,
        width: 2,
        metrics: [this.metrics.metricNodes(this.domainName).with({ period: Duration.minutes(1) })],
      }),
      new cloudwatch.SingleValueWidget({
        title: 'Cluster status',
        height: 4,
        width: 7,
        metrics: [
          clusterStatusYellowMetric.with({ color: cloudwatch.Color.ORANGE }),
          clusterStatusRedMetric.with({ color: cloudwatch.Color.RED }),
          this.metrics.metricClusterStatus(this.domainName).clusterStatusGreenMetric.with({ color: cloudwatch.Color.GREEN }),
        ],
      }),
    );

    this.watchful.addSection('Cluster metrics');
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: `CPUUtilization/${cpuUtilizationMetric.period.toMinutes()}min`,
        width: 8,
        left: [cpuUtilizationMetric.with({ period: Duration.minutes(1) })],
        leftAnnotations: [cpuUtilizationAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `ClusterStatus/${clusterStatusYellowMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          this.metrics.metricClusterStatus(this.domainName).clusterStatusGreenMetric,
          clusterStatusYellowMetric,
          clusterStatusRedMetric,
        ],
        leftAnnotations: [clusterStatusYellowAlarm.toAnnotation(), clusterStatusRedAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `StorageSpace/${freeStorageSpaceMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          freeStorageSpaceMetric,
          this.metrics.metricStorage(this.domainName).clusterUsedSpaceMetric,
        ],
        leftAnnotations: [freeStorageSpaceAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `IndexWritesBlocked/${clusterIndexWritesBlockedMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          clusterIndexWritesBlockedMetric,
        ],
        leftAnnotations: [clusterIndexWritesBlockedAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `Nodes/${nodesMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          nodesMetric.with({ period: Duration.minutes(1) }),
        ],
        leftAnnotations: [nodesAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `JVMMemoryPressure/${JVMMemoryPressureMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          JVMMemoryPressureMetric,
        ],
        leftAnnotations: [JVMMemoryPressureAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `Shards/${shardsActiveMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          shardsActiveMetric,
          this.metrics.metricShards(this.domainName).shardsUnassigned,
          this.metrics.metricShards(this.domainName).shardsDelayedUnassigned,
          this.metrics.metricShards(this.domainName).shardsActivePrimary,
          this.metrics.metricShards(this.domainName).shardsInitializing,
          this.metrics.metricShards(this.domainName).shardsRelocating,
        ],
        leftAnnotations: [shardsActiveAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `HTTP 5XX Errors/${http5XXPercentageMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          http5XXPercentageMetric,
        ],
        leftAnnotations: [http5XXPercentageAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: 'HTTP Requests',
        width: 8,
        left: [
          this.metrics.metricRequests(this.domainName).openSearchRequests,
          this.metrics.metricRequests(this.domainName).invalidHostHeaderRequests,
          this.metrics.metricResponseCodes(this.domainName)['2xxMetric'],
          this.metrics.metricResponseCodes(this.domainName)['3xxMetric'],
          this.metrics.metricResponseCodes(this.domainName)['4xxMetric'],
          this.metrics.metricResponseCodes(this.domainName)['5xxMetric'],
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `AutomatedSnapshotFailure/${automatedSnapshotFailureMetric.period.toMinutes()}min`,
        width: 8,
        left: [automatedSnapshotFailureMetric],
        leftAnnotations: [automatedSnapshotFailureAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `KmsKeyError/${kmsKeyErrorMetric.period.toMinutes()}min`,
        width: 8,
        left: [kmsKeyErrorMetric],
        leftAnnotations: [kmsKeyErrorAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `KmsKeyInaccessible/${kmsKeyInaccessibleMetric.period.toMinutes()}min`,
        width: 8,
        left: [kmsKeyInaccessibleMetric],
        leftAnnotations: [kmsKeyInaccessibleAlarm.toAnnotation()],
      }),
    );
    this.watchful.addSection('EBS metrics');
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: `EBS IOPS/${this.metrics.metricClusterEbsIOPS(this.domainName).writeIOPSMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          this.metrics.metricClusterEbsIOPS(this.domainName).writeIOPSMetric,
          this.metrics.metricClusterEbsIOPS(this.domainName).readIOPSMetric,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `EBS Latency/${this.metrics.metricClusterEbsLatency(this.domainName).writeLatencyMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          this.metrics.metricClusterEbsLatency(this.domainName).writeLatencyMetric,
          this.metrics.metricClusterEbsLatency(this.domainName).readLatencyMetric,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `EBS Throughput/${this.metrics.metricClusterEbsThroughput(this.domainName).writeThroughputMetric.period.toMinutes()}min`,
        width: 8,
        left: [
          this.metrics.metricClusterEbsThroughput(this.domainName).writeThroughputMetric,
          this.metrics.metricClusterEbsThroughput(this.domainName).readThroughputMetric,
        ],
      }),
    );
    this.watchful.addSection('Instance metrics');
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: `Search/IndexingLatency/${this.metrics.metricLatency(this.domainName).searchLatencyMetric.period.toMinutes()}min`,
        width: 12,
        left: [
          this.metrics.metricLatency(this.domainName).searchLatencyMetric,
          this.metrics.metricLatency(this.domainName).indexingLatencyMetric,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `Search/IndexingRate/${this.metrics.metricRate(this.domainName).searchRateMetric.period.toMinutes()}min`,
        width: 12,
        left: [
          this.metrics.metricRate(this.domainName).searchRateMetric,
          this.metrics.metricRate(this.domainName).indexingRateMetric,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `ThreadpoolQueues/${threadpoolWriteQueueMetric.period.toMinutes()}min`,
        width: 6,
        left: [
          threadpoolWriteQueueMetric,
          threadpoolSearchQueueMetric,
          this.metrics.metricThreadpoolQueues(this.domainName).threadpoolBulkQueue,
          this.metrics.metricThreadpoolQueues(this.domainName).threadpoolIndexQueue,
          this.metrics.metricThreadpoolQueues(this.domainName).threadpoolForceMergeQueue,
        ],
        leftAnnotations: [threadpoolWriteQueueAlarm.toAnnotation(), threadpoolSearchQueueAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `ThreadpoolThreads/${this.metrics.metricThreadpoolThreads(this.domainName).threadpoolWriteThreads.period.toMinutes()}min`,
        width: 6,
        left: [
          this.metrics.metricThreadpoolThreads(this.domainName).threadpoolWriteThreads,
          this.metrics.metricThreadpoolThreads(this.domainName).threadpoolSearchThreads,
          this.metrics.metricThreadpoolThreads(this.domainName).threadpoolBulkThreads,
          this.metrics.metricThreadpoolThreads(this.domainName).threadpoolIndexThreads,
          this.metrics.metricThreadpoolThreads(this.domainName).threadpoolForceMergeThreads,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `ThreadpoolRejected/${this.metrics.metricThreadpoolRejected(this.domainName).threadpoolWriteRejected.period.toMinutes()}min`,
        width: 6,
        left: [
          this.metrics.metricThreadpoolRejected(this.domainName).threadpoolWriteRejected,
          this.metrics.metricThreadpoolRejected(this.domainName).threadpoolSearchRejected,
          this.metrics.metricThreadpoolRejected(this.domainName).threadpoolBulkRejected,
          this.metrics.metricThreadpoolRejected(this.domainName).threadpoolIndexRejected,
          this.metrics.metricThreadpoolRejected(this.domainName).threadpoolForceMergeRejected,
        ],
      }),
      new cloudwatch.GraphWidget({
        title: `WriteRejections/${this.metrics.metricWriteRejections(this.domainName).PrimaryWriteRejected.period.toMinutes()}min`,
        width: 6,
        left: [
          this.metrics.metricWriteRejections(this.domainName).PrimaryWriteRejected,
          this.metrics.metricWriteRejections(this.domainName).ReplicaWriteRejected,
          this.metrics.metricWriteRejections(this.domainName).CoordinatingWriteRejected,
        ],
      }),
    );

    // Add relevant metrics if DedicatedMasterEnabled
    if ((this.cfnDomain.clusterConfig as ClusterConfigProperty).dedicatedMasterEnabled) {
      /* eslint-disable max-len */
      const { masterCpuUtilizationMetric, masterCpuUtilizationAlarm } = this.createMasterCpuUtilizationMonitor(props.masterCpuMaximumThresholdPercent);
      const { masterJVMMemoryPressureMetric, masterJVMMemoryPressureAlarm } = this.createMasterJVMMemoryPressureMonitor(props.masterJVMMemoryPressureThresholdMax);
      const { masterReachableFromNodeMetric, masterReachableFromNodeAlarm } = this.createMasterReachableFromNodeMonitor(props.masterReachableFromNodeThresholdMin);
      /* eslint-enable max-len */

      this.watchful.addSection('Master metrics');
      this.watchful.addWidgets(
        new cloudwatch.GraphWidget({
          title: `MasterCPUUtilization/${masterCpuUtilizationMetric.period.toMinutes()}min`,
          width: 6,
          left: [
            masterCpuUtilizationMetric,
          ],
          leftAnnotations: [masterCpuUtilizationAlarm.toAnnotation()],
        }),
        new cloudwatch.GraphWidget({
          title: `MasterJVMMemoryPressure/${masterJVMMemoryPressureMetric.period.toMinutes()}min`,
          width: 6,
          left: [
            masterJVMMemoryPressureMetric,
          ],
          leftAnnotations: [masterJVMMemoryPressureAlarm.toAnnotation()],
        }),
        new cloudwatch.GraphWidget({
          title: `MasterReachableFromNode/${masterReachableFromNodeMetric.period.toMinutes()}min`,
          width: 6,
          left: [
            masterReachableFromNodeMetric,
          ],
          leftAnnotations: [masterReachableFromNodeAlarm.toAnnotation()],
        }),
        new cloudwatch.GraphWidget({
          title: `MasterSysMemoryUtilization/${this.metrics.metricMasterSysMemoryUtilization(this.domainName).period.toMinutes()}min`,
          width: 6,
          left: [
            this.metrics.metricMasterSysMemoryUtilization(this.domainName),
          ],
        }),
      );
    }
  }

  private createClusterStatusRedMonitor(clusterStatusRedMaximumThreshold = 1) {
    const clusterStatusRedMetric = this.metrics.metricClusterStatus(this.domainName).clusterStatusRedMetric;
    const clusterStatusRedAlarm = clusterStatusRedMetric.createAlarm(this, 'ClusterStatusRedAlarm', {
      alarmDescription: 'clusterStatusRedAlarm',
      threshold: clusterStatusRedMaximumThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(clusterStatusRedAlarm);
    return { clusterStatusRedMetric, clusterStatusRedAlarm };
  }

  private createClusterStatusYellowMonitor(clusterStatusYellowMaximumThreshold = 1) {
    const clusterStatusYellowMetric = this.metrics.metricClusterStatus(this.domainName).clusterStatusYellowMetric;
    const clusterStatusYellowAlarm = clusterStatusYellowMetric.createAlarm(this, 'ClusterStatusYellowAlarm', {
      alarmDescription: 'clusterStatusYellowAlarm',
      threshold: clusterStatusYellowMaximumThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(clusterStatusYellowAlarm);
    return { clusterStatusYellowMetric, clusterStatusYellowAlarm };
  }

  private createFreeStorageSpaceMonitor(freeStorageSpaceThresholdPercent = 25) {
    const volumeSize = (this.cfnDomain.ebsOptions as EBSOptionsProperty).volumeSize as number ?? 10;

    const freeStorageSpaceMetric = this.metrics.metricFreeStorageSpace(this.domainName);
    const freeStorageSpaceAlarm = freeStorageSpaceMetric.createAlarm(this, 'FreeStorageSpaceAlarm', {
      alarmDescription: 'freeStorageSpaceAlarm',
      threshold: freeStorageSpaceThresholdPercent/100*volumeSize*this.dataNodesCount*1024, // Percentage of volumeSize to MiB
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(freeStorageSpaceAlarm);
    return { freeStorageSpaceMetric, freeStorageSpaceAlarm };
  }

  private createClusterIndexWritesBlockedMonitor(clusterIndexWritesBlockedThresholdMax = 1) {
    const clusterIndexWritesBlockedMetric = this.metrics.metricClusterIndexWritesBlocked(this.domainName);
    const clusterIndexWritesBlockedAlarm = clusterIndexWritesBlockedMetric.createAlarm(this, 'ClusterIndexWritesBlockedAlarm', {
      alarmDescription: 'clusterIndexWritesBlockedAlarm',
      threshold: clusterIndexWritesBlockedThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(clusterIndexWritesBlockedAlarm);
    return { clusterIndexWritesBlockedMetric, clusterIndexWritesBlockedAlarm };
  }

  private createNodesMonitor(nodesThresholdMin?: number) {

    const nodesMetric = this.metrics.metricNodes(this.domainName);
    const nodesAlarm = nodesMetric.createAlarm(this, 'NodesAlarm', {
      alarmDescription: 'availableNodesAlarm',
      threshold: nodesThresholdMin ?? this.totalNodeCount,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(nodesAlarm);
    return { nodesMetric, nodesAlarm };
  }

  private createAutomatedSnapshotMonitor(automatedSnapshotFailureThresholdMax = 1) {
    const automatedSnapshotFailureMetric = this.metrics.metricAutomatedSnapshotFailure(this.domainName);
    const automatedSnapshotFailureAlarm = automatedSnapshotFailureMetric.createAlarm(this, 'AutomatedSnapshotFailureAlarm', {
      alarmDescription: 'automatedSnapshotFailureAlarm',
      threshold: automatedSnapshotFailureThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(automatedSnapshotFailureAlarm);
    return { automatedSnapshotFailureMetric, automatedSnapshotFailureAlarm };
  }

  private createCpuUtilizationMonitor(cpuMaximumThresholdPercent = 80) {
    const cpuUtilizationMetric = this.metrics.metricCpuUtilization(this.domainName);
    const cpuUtilizationAlarm = cpuUtilizationMetric.createAlarm(this, 'CpuUtilizationAlarm', {
      alarmDescription: 'cpuUtilizationAlarm',
      threshold: cpuMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(cpuUtilizationAlarm);
    return { cpuUtilizationMetric, cpuUtilizationAlarm };
  }

  private createJVMMemoryPressureMonitor(jvmMemoryPressureThresholdMax = 80) {
    const JVMMemoryPressureMetric = this.metrics.metricJVMMemoryPressure(this.domainName);
    const JVMMemoryPressureAlarm = JVMMemoryPressureMetric.createAlarm(this, 'JVMMemoryPressureAlarm', {
      alarmDescription: 'JVMMemoryPressureAlarm',
      threshold: jvmMemoryPressureThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(JVMMemoryPressureAlarm);
    return { JVMMemoryPressureMetric, JVMMemoryPressureAlarm };
  }

  private createKmsKeyErrorMonitor(kmsKeyErrorThresholdMax = 1) {
    const kmsKeyErrorMetric = this.metrics.metricKms(this.domainName).kmsKeyErrorMetric;
    const kmsKeyErrorAlarm = kmsKeyErrorMetric.createAlarm(this, 'KmsKeyErrorAlarm', {
      alarmDescription: 'kmsKeyErrorAlarm',
      threshold: kmsKeyErrorThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    this.watchful.addAlarm(kmsKeyErrorAlarm);
    return { kmsKeyErrorMetric, kmsKeyErrorAlarm };
  }

  private createKmsKeyInaccessibleMonitor(kmsKeyInaccessibleThresholdMax = 1) {
    const kmsKeyInaccessibleMetric = this.metrics.metricKms(this.domainName).kmsKeyInaccessibleMetric;
    const kmsKeyInaccessibleAlarm = kmsKeyInaccessibleMetric.createAlarm(this, 'KmsKeyInaccessibleAlarm', {
      alarmDescription: 'kmsKeyInaccessibleAlarm',
      threshold: kmsKeyInaccessibleThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    this.watchful.addAlarm(kmsKeyInaccessibleAlarm);
    return { kmsKeyInaccessibleMetric, kmsKeyInaccessibleAlarm };
  }

  private createShardsActiveMonitor(shardsActiveThresholdSum = 30000) {
    const shardsActiveMetric = this.metrics.metricShards(this.domainName).shardsActive;
    const shardsActiveAlarm = shardsActiveMetric.createAlarm(this, 'ShardsActiveAlarm', {
      alarmDescription: 'shardsActiveAlarm',
      threshold: shardsActiveThresholdSum,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(shardsActiveAlarm);
    return { shardsActiveMetric, shardsActiveAlarm };
  }

  private createHttp5XXMonitor(http5XXResponsesThresholdPercent = 10) {
    const http5XXPercentageMetric = this.metrics.metricHttp5xxPercentage(this.domainName);
    const http5XXPercentageAlarm = http5XXPercentageMetric.createAlarm(this, 'HTTP5XXPercentageAlarm', {
      alarmDescription: 'HTTP5XXPercentageAlarm',
      threshold: http5XXResponsesThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    this.watchful.addAlarm(http5XXPercentageAlarm);
    return { http5XXPercentageMetric, http5XXPercentageAlarm };
  }

  private createThreadpoolWriteQueueMonitor(threadpoolWriteQueueThresholdAvg = 100) {
    const threadpoolWriteQueueMetric = this.metrics.metricThreadpoolQueues(this.domainName).threadpoolWriteQueue;
    const threadpoolWriteQueueAlarm = threadpoolWriteQueueMetric.createAlarm(this, 'ThreadpoolWriteQueueAlarm', {
      alarmDescription: 'threadpoolWriteQueueAlarm',
      threshold: threadpoolWriteQueueThresholdAvg,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(threadpoolWriteQueueAlarm);
    return { threadpoolWriteQueueMetric, threadpoolWriteQueueAlarm };
  }

  private createThreadpoolSearchQueueMonitor(threadpoolSearchQueueThresholdAvg = 500) {
    const threadpoolSearchQueueMetric = this.metrics.metricThreadpoolQueues(this.domainName).threadpoolSearchQueue;
    const threadpoolSearchQueueAlarm = threadpoolSearchQueueMetric.createAlarm(this, 'ThreadpoolSearchQueueAlarm', {
      alarmDescription: 'threadpoolSearchQueueAlarm',
      threshold: threadpoolSearchQueueThresholdAvg,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(threadpoolSearchQueueAlarm);
    return { threadpoolSearchQueueMetric, threadpoolSearchQueueAlarm };
  }

  private createMasterCpuUtilizationMonitor(masterCpuMaximumThresholdPercent = 50) {
    const masterCpuUtilizationMetric = this.metrics.metricMasterCpuUtilization(this.domainName);
    const masterCpuUtilizationAlarm = masterCpuUtilizationMetric.createAlarm(this, 'MasterCpuUtilizationAlarm', {
      alarmDescription: 'masterCpuUtilizationAlarm',
      threshold: masterCpuMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(masterCpuUtilizationAlarm);
    return { masterCpuUtilizationMetric, masterCpuUtilizationAlarm };
  }

  private createMasterJVMMemoryPressureMonitor(masterJVMMemoryPressureThresholdMax = 80) {
    const masterJVMMemoryPressureMetric = this.metrics.metricMasterJVMMemoryPressure(this.domainName);
    const masterJVMMemoryPressureAlarm = masterJVMMemoryPressureMetric.createAlarm(this, 'MasterJVMMemoryPressureAlarm', {
      alarmDescription: 'masterJVMMemoryPressureAlarm',
      threshold: masterJVMMemoryPressureThresholdMax,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(masterJVMMemoryPressureAlarm);
    return { masterJVMMemoryPressureMetric, masterJVMMemoryPressureAlarm };
  }

  private createMasterReachableFromNodeMonitor(masterReachableFromNodeThresholdMin = 1) {
    const masterReachableFromNodeMetric = this.metrics.metricMasterReachableFromNode(this.domainName);
    const masterReachableFromNodeAlarm = masterReachableFromNodeMetric.createAlarm(this, 'MasterReachableFromNodeAlarm', {
      alarmDescription: 'masterReachableFromNodeAlarm',
      threshold: masterReachableFromNodeThresholdMin,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
    });
    this.watchful.addAlarm(masterReachableFromNodeAlarm);
    return { masterReachableFromNodeMetric, masterReachableFromNodeAlarm };
  }

}

function linkForOpenSearch(domain: opensearch.Domain | opensearch.CfnDomain) {
  return `https://console.aws.amazon.com/esv3/home?region=${domain.stack.region}#opensearch/domains/${domain.domainName}`;
}


