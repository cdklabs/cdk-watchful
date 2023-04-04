import { Aws, Duration } from 'aws-cdk-lib';
import { MathExpression, Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum ClusterMetrics {
  ClusterStatusGreen = 'ClusterStatus.green',
  ClusterStatusYellow = 'ClusterStatus.yellow',
  ClusterStatusRed = 'ClusterStatus.red',
  ShardsActive = 'Shards.active',
  ShardsUnassigned = 'Shards.unassigned',
  ShardsDelayedUnassigned = 'Shards.delayedUnassigned',
  ShardsActivePrimary = 'Shards.activePrimary',
  ShardsInitializing = 'Shards.initializing',
  ShardsRelocating = 'Shards.relocating',
  Nodes = 'Nodes',
  SearchableDocuments = 'SearchableDocuments',
  DeletedDocuments = 'DeletedDocuments',
  CPUUtilization = 'CPUUtilization',
  FreeStorageSpace = 'FreeStorageSpace',
  ClusterUsedSpace = 'ClusterUsedSpace',
  ClusterIndexWritesBlocked = 'ClusterIndexWritesBlocked',
  JVMMemoryPressure = 'JVMMemoryPressure',
  AutomatedSnapshotFailure = 'AutomatedSnapshotFailure',
  KMSKeyError = 'KMSKeyError',
  KMSKeyInaccessible = 'KMSKeyInaccessible',
  InvalidHostHeaderRequests = 'InvalidHostHeaderRequests',
  OpenSearchRequests = 'OpenSearchRequests',
  HTTP2XX = '2xx',
  HTTP3XX = '3xx',
  HTTP4XX = '4xx',
  HTTP5XX = '5xx',
}
const enum MasterMetrics {
  MasterCPUUtilization = 'MasterCPUUtilization',
  MasterJVMMemoryPressure = 'MasterJVMMemoryPressure',
  MasterReachableFromNode = 'MasterReachableFromNode',
  MasterSysMemoryUtilization = 'MasterSysMemoryUtilization',
}

const enum InstanceMetrics {
  SearchLatency = 'SearchLatency',
  IndexingLatency = 'IndexingLatency',
  SearchRate = 'SearchRate',
  IndexingRate = 'IndexingRate',
  ThreadpoolBulkQueue = 'ThreadpoolBulkQueue',
  ThreadpoolWriteQueue = 'ThreadpoolWriteQueue',
  ThreadpoolSearchQueue = 'ThreadpoolSearchQueue',
  ThreadpoolIndexQueue = 'ThreadpoolIndexQueue',
  ThreadpoolForceMergeQueue = 'ThreadpoolForce_mergeQueue',
  ThreadpoolBulkThreads = 'ThreadpoolBulkThreads',
  ThreadpoolWriteThreads = 'ThreadpoolWriteThreads',
  ThreadpoolSearchThreads = 'ThreadpoolSearchThreads',
  ThreadpoolIndexThreads = 'ThreadpoolIndexThreads',
  ThreadpoolForceMergeThreads = 'ThreadpoolForce_mergeThreads',
  ThreadpoolBulkRejected = 'ThreadpoolBulkRejected',
  ThreadpoolWriteRejected = 'ThreadpoolWriteRejected',
  ThreadpoolSearchRejected = 'ThreadpoolSearchRejected',
  ThreadpoolIndexRejected = 'ThreadpoolIndexRejected',
  ThreadpoolForceMergeRejected = 'ThreadpoolForce_mergeRejected',
  CoordinatingWriteRejected = 'CoordinatingWriteRejected',
  PrimaryWriteRejected = 'PrimaryWriteRejected',
  ReplicaWriteRejected = 'ReplicaWriteRejected',
}

const enum EbsMetrics {
  ReadLatency = 'ReadLatency',
  WriteLatency = 'WriteLatency',
  ReadThroughput = 'ReadThroughput',
  WriteThroughput = 'WriteThroughput',
  ReadIOPS = 'ReadIOPS',
  WriteIOPS = 'WriteIOPS'
}

const Namespace = 'AWS/ES';

/**
 * Metrics for OpenSearch
 */
export class OpenSearchMetricFactory {

  metricClusterStatus(domainName: string) {
    return {
      clusterStatusGreenMetric: this.metric(ClusterMetrics.ClusterStatusGreen, domainName).with({
        statistic: Statistic.MAXIMUM,
        period: Duration.minutes(1),
      }),
      clusterStatusRedMetric: this.metric(ClusterMetrics.ClusterStatusRed, domainName).with({
        statistic: Statistic.MAXIMUM,
        period: Duration.minutes(1),
      }),
      clusterStatusYellowMetric: this.metric(ClusterMetrics.ClusterStatusYellow, domainName).with({
        statistic: Statistic.MAXIMUM,
        period: Duration.minutes(1),
      }),
    };
  }

  metricFreeStorageSpace(domainName: string) {
    return this.metric(ClusterMetrics.FreeStorageSpace, domainName).with({ period: Duration.minutes(1) });
  }

  metricClusterIndexWritesBlocked(domainName: string) {
    return this.metric(ClusterMetrics.ClusterIndexWritesBlocked, domainName).with({ statistic: Statistic.MAXIMUM });
  }

  metricNodes(domainName: string) {
    return this.metric(ClusterMetrics.Nodes, domainName).with({ statistic: Statistic.MAXIMUM, period: Duration.hours(1) });
  }

  metricAutomatedSnapshotFailure(domainName: string) {
    return this.metric(ClusterMetrics.AutomatedSnapshotFailure, domainName).with({ statistic: Statistic.MAXIMUM, period: Duration.minutes(1) });
  }

  metricCpuUtilization(domainName: string) {
    return this.metric(ClusterMetrics.CPUUtilization, domainName).with({ statistic: Statistic.AVERAGE, period: Duration.minutes(15) });
  }

  metricJVMMemoryPressure(domainName: string) {
    return this.metric(ClusterMetrics.JVMMemoryPressure, domainName).with({ statistic: Statistic.MAXIMUM });
  }

  metricKms(domainName: string) {
    return {
      kmsKeyErrorMetric: this.metric(ClusterMetrics.KMSKeyError, domainName).with(
        {
          statistic: Statistic.MAXIMUM,
          period: Duration.minutes(1),
        }),
      kmsKeyInaccessibleMetric: this.metric(ClusterMetrics.KMSKeyInaccessible, domainName).with(
        {
          statistic: Statistic.MAXIMUM,
          period: Duration.minutes(1),
        }),
    };
  }

  metricShards(domainName: string) {
    return {
      shardsActive: this.metric(ClusterMetrics.ShardsActive, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
      shardsUnassigned: this.metric(ClusterMetrics.ShardsUnassigned, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
      shardsDelayedUnassigned: this.metric(ClusterMetrics.ShardsDelayedUnassigned, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
      shardsActivePrimary: this.metric(ClusterMetrics.ShardsActivePrimary, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
      shardsInitializing: this.metric(ClusterMetrics.ShardsInitializing, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
      shardsRelocating: this.metric(ClusterMetrics.ShardsRelocating, domainName).with({
        statistic: Statistic.SUM,
        period: Duration.minutes(1),
      }),
    };
  }

  metricHttp5xxPercentage(domainName: string) {
    const http5XXMetric = this.metricResponseCodes(domainName)['5xxMetric'];
    const openSearchRequestsMetric = this.metricRequests(domainName).openSearchRequests;

    return new MathExpression({
      expression: '100*(http5XXMetric/openSearchRequestsMetric)',
      period: Duration.minutes(1),
      usingMetrics: { http5XXMetric, openSearchRequestsMetric },
      label: 'HTTP5XXPercentage',
    });
  }

  metricThreadpoolQueues(domainName: string) {
    return {
      threadpoolBulkQueue: this.metric(InstanceMetrics.ThreadpoolBulkQueue, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolWriteQueue: this.metric(InstanceMetrics.ThreadpoolWriteQueue, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolSearchQueue: this.metric(InstanceMetrics.ThreadpoolSearchQueue, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolIndexQueue: this.metric(InstanceMetrics.ThreadpoolIndexQueue, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolForceMergeQueue: this.metric(InstanceMetrics.ThreadpoolForceMergeQueue, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
    };
  }

  metricThreadpoolThreads(domainName: string) {
    return {
      threadpoolBulkThreads: this.metric(InstanceMetrics.ThreadpoolBulkThreads, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolWriteThreads: this.metric(InstanceMetrics.ThreadpoolWriteThreads, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolSearchThreads: this.metric(InstanceMetrics.ThreadpoolSearchThreads, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolIndexThreads: this.metric(InstanceMetrics.ThreadpoolIndexThreads, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
      threadpoolForceMergeThreads: this.metric(InstanceMetrics.ThreadpoolForceMergeThreads, domainName).with( {
        statistic: Statistic.AVERAGE,
        period: Duration.minutes(1),
      }),
    };
  }

  metricThreadpoolRejected(domainName: string) {
    return {
      threadpoolBulkRejected: this.metric(InstanceMetrics.ThreadpoolBulkRejected, domainName).with( {
        period: Duration.minutes(1),
      }),
      threadpoolWriteRejected: this.metric(InstanceMetrics.ThreadpoolWriteRejected, domainName).with( {
        period: Duration.minutes(1),
      }),
      threadpoolSearchRejected: this.metric(InstanceMetrics.ThreadpoolSearchRejected, domainName).with( {
        period: Duration.minutes(1),
      }),
      threadpoolIndexRejected: this.metric(InstanceMetrics.ThreadpoolIndexRejected, domainName).with( {
        period: Duration.minutes(1),
      }),
      threadpoolForceMergeRejected: this.metric(InstanceMetrics.ThreadpoolForceMergeRejected, domainName).with( {
        period: Duration.minutes(1),
      }),
    };
  }

  metricWriteRejections(domainName: string) {
    return {
      CoordinatingWriteRejected: this.metric(InstanceMetrics.CoordinatingWriteRejected, domainName),
      PrimaryWriteRejected: this.metric(InstanceMetrics.PrimaryWriteRejected, domainName),
      ReplicaWriteRejected: this.metric(InstanceMetrics.ReplicaWriteRejected, domainName),
    };
  }

  metricRequests(domainName: string) {
    return {
      invalidHostHeaderRequests: this.metric(ClusterMetrics.InvalidHostHeaderRequests, domainName).with({
        period: Duration.minutes(1),
      }),
      openSearchRequests: this.metric(ClusterMetrics.OpenSearchRequests, domainName).with({
        period: Duration.minutes(1),
      }),

    };
  }

  metricStorage(domainName: string) {
    return {
      freeStorageSpaceMetric: this.metric(ClusterMetrics.FreeStorageSpace, domainName).with({
        statistic: Statistic.MINIMUM,
        period: Duration.minutes(1),
      }),
      clusterUsedSpaceMetric: this.metric(ClusterMetrics.ClusterUsedSpace, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricDocuments(domainName: string) {
    return {
      searchableDocumentsMetric: this.metric(ClusterMetrics.SearchableDocuments, domainName).with({ statistic: Statistic.AVERAGE }),
      deletedDocumentsMetric: this.metric(ClusterMetrics.DeletedDocuments, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricLatency(domainName: string) {
    return {
      indexingLatencyMetric: this.metric(InstanceMetrics.IndexingLatency, domainName).with({ statistic: Statistic.AVERAGE }),
      searchLatencyMetric: this.metric(InstanceMetrics.SearchLatency, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricRate(domainName: string) {
    return {
      indexingRateMetric: this.metric(InstanceMetrics.IndexingRate, domainName).with({ statistic: Statistic.AVERAGE }),
      searchRateMetric: this.metric(InstanceMetrics.SearchRate, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricClusterEbsLatency(domainName: string) {
    return {
      readLatencyMetric: this.metric(EbsMetrics.ReadLatency, domainName).with({ statistic: Statistic.AVERAGE }),
      writeLatencyMetric: this.metric(EbsMetrics.WriteLatency, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }
  metricClusterEbsThroughput(domainName: string) {
    return {
      readThroughputMetric: this.metric(EbsMetrics.ReadThroughput, domainName).with({ statistic: Statistic.AVERAGE }),
      writeThroughputMetric: this.metric(EbsMetrics.WriteThroughput, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }
  metricClusterEbsIOPS(domainName: string) {
    return {
      readIOPSMetric: this.metric(EbsMetrics.ReadIOPS, domainName).with({ statistic: Statistic.AVERAGE }),
      writeIOPSMetric: this.metric(EbsMetrics.WriteIOPS, domainName).with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricResponseCodes(domainName: string) {
    return {
      '2xxMetric': this.metric(ClusterMetrics.HTTP2XX, domainName).with({ period: Duration.minutes(1) }),
      '3xxMetric': this.metric(ClusterMetrics.HTTP3XX, domainName).with({ period: Duration.minutes(1) }),
      '4xxMetric': this.metric(ClusterMetrics.HTTP4XX, domainName).with({ period: Duration.minutes(1) }),
      '5xxMetric': this.metric(ClusterMetrics.HTTP5XX, domainName).with({ period: Duration.minutes(1) }),
    };
  }

  metricMasterCpuUtilization(domainName: string) {
    return this.metric(MasterMetrics.MasterCPUUtilization, domainName).with({ statistic: Statistic.MAXIMUM, period: Duration.minutes(1) });
  }

  metricMasterJVMMemoryPressure(domainName: string) {
    return this.metric(MasterMetrics.MasterJVMMemoryPressure, domainName).with({ statistic: Statistic.MAXIMUM, period: Duration.minutes(1) });
  }

  metricMasterSysMemoryUtilization(domainName: string) {
    return this.metric(MasterMetrics.MasterSysMemoryUtilization, domainName).with({ statistic: Statistic.MAXIMUM, period: Duration.minutes(1) });
  }

  metricMasterReachableFromNode(domainName: string) {
    return this.metric(MasterMetrics.MasterReachableFromNode, domainName).with({ statistic: Statistic.MINIMUM, period: Duration.hours(1) });
  }

  protected metric(metric: ClusterMetrics | MasterMetrics | InstanceMetrics | EbsMetrics, domainName: string) {
    return new Metric({
      metricName: metric,
      namespace: Namespace,
      period: Duration.minutes(5),
      statistic: Statistic.SUM,
      dimensionsMap: {
        DomainName: domainName,
        ClientId: Aws.ACCOUNT_ID,
      },
    });
  }
}
