import { Aws } from 'aws-cdk-lib';
import { OpenSearchMetricFactory } from '../../../../src/monitoring/aws/opensearch/metrics';
const DummyDomainName = 'DummyDomainName';
const DummyAccountId = '012345679012';

Object.defineProperty(Aws, 'ACCOUNT_ID', {
  get: jest.fn(),
});
jest.spyOn(Aws, 'ACCOUNT_ID', 'get').mockReturnValue(DummyAccountId);


test('snapshot test: metricClusterStatus', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricClusterStatus(DummyDomainName);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });
  expect(metric).toMatchSnapshot();

});

test('snapshot test: metricFreeStorageSpace', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricFreeStorageSpace(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('FreeStorageSpace');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();

});

test('snapshot test: metricClusterIndexWritesBlocked', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricClusterIndexWritesBlocked(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('ClusterIndexWritesBlocked');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();

});

test('snapshot test: metricNodes', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricNodes(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('Nodes');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();

});

test('snapshot test: metricAutomatedSnapshotFailure', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricAutomatedSnapshotFailure(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('AutomatedSnapshotFailure');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCpuUtilization', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricCpuUtilization(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('CPUUtilization');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricJVMMemoryPressure', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricJVMMemoryPressure(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('JVMMemoryPressure');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricKms', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricKms(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricShards', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricShards(DummyDomainName);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();

});

test('snapshot test: metricHttp5xxPercentage', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricHttp5xxPercentage(DummyDomainName);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricThreadpoolQueues', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricThreadpoolQueues(DummyDomainName);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricThreadpoolThreads', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricThreadpoolThreads(DummyDomainName);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricThreadpoolRejected', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricThreadpoolRejected(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricWriteRejections', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricWriteRejections(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricRequests', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricRequests(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricStorage', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricStorage(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricDocuments', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricDocuments(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricLatency', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricLatency(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricRate', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricRate(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricClusterEbsLatency', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricClusterEbsLatency(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricClusterEbsThroughput', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricClusterEbsThroughput(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricClusterEbsIOPS', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricClusterEbsIOPS(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricResponseCodes', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricResponseCodes(DummyDomainName);

  // THEN

  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual(eachMetric.metricName);
    expect(eachMetric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  });

  expect(metric).toMatchSnapshot();
});


test('snapshot test: metricMasterCpuUtilization', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricMasterCpuUtilization(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('MasterCPUUtilization');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMasterJVMMemoryPressure', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricMasterJVMMemoryPressure(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('MasterJVMMemoryPressure');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMasterSysMemoryUtilization', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricMasterSysMemoryUtilization(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('MasterSysMemoryUtilization');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMasterReachableFromNode', () => {
  // GIVEN
  const unitToTest = new OpenSearchMetricFactory();

  // WHEN
  const metric = unitToTest.metricMasterReachableFromNode(DummyDomainName);

  // THEN
  expect(metric.metricName).toStrictEqual('MasterReachableFromNode');
  expect(metric.dimensions).toStrictEqual({ DomainName: DummyDomainName, ClientId: DummyAccountId });
  expect(metric).toMatchSnapshot();
});