import { RdsAuroraMetricFactory } from '../../../../src/monitoring/aws/rds/metrics';

const DummyClusterId = 'DummyClusterId';

test('snapshot test: metricDbConnections', () => {
  // GIVEN
  const unitToTest = new RdsAuroraMetricFactory();

  // WHEN
  const metric = unitToTest.metricDbConnections(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('DatabaseConnections');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricReplicaLag', () => {
  // GIVEN
  const unitToTest = new RdsAuroraMetricFactory();

  // WHEN
  const metric = unitToTest.metricReplicaLag(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('AuroraReplicaLag');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricBufferCacheHitRatio', () => {
  // GIVEN
  const unitToTest = new RdsAuroraMetricFactory();

  // WHEN
  const metric = unitToTest.metricBufferCacheHitRatio(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('BufferCacheHitRatio');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCpuUtilization', () => {
  // GIVEN
  const unitToTest = new RdsAuroraMetricFactory();

  // WHEN
  const metric = unitToTest.metricCpuUtilization(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('CPUUtilization');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricDmlThroughput', () => {
  // GIVEN
  const unitToTest = new RdsAuroraMetricFactory();

  // WHEN
  const metric = unitToTest.metricDmlThroughput(DummyClusterId);

  // THEN
  expect(metric.dbSelectThroughputMetric.metricName).toStrictEqual('SelectThroughput');
  expect(metric.dbSelectThroughputMetric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric.dbInsertThroughputMetric.metricName).toStrictEqual('InsertThroughput');
  expect(metric.dbInsertThroughputMetric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric.dbUpdateThroughputMetric.metricName).toStrictEqual('UpdateThroughput');
  expect(metric.dbUpdateThroughputMetric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric.dbDeleteThroughputMetric.metricName).toStrictEqual('DeleteThroughput');
  expect(metric.dbDeleteThroughputMetric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});
