import { RedshiftMetricFactory } from '../../../../src/monitoring/aws/redshift/metrics';

const DummyClusterId = 'DummyClusterId';

test('snapshot test: metricAverageConnectionCount', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageConnectionCount(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('DatabaseConnections');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAverageCpuUsageInPercent', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageCpuUsageInPercent(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('CPUUtilization');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAverageDiskSpaceUsageInPercent', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageDiskSpaceUsageInPercent(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('PercentageDiskSpaceUsed');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAverageLatencyInSeconds', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageLatencyInSeconds(DummyClusterId);

  // THEN
  expect(metric.read.metricName).toStrictEqual('ReadLatency');
  expect(metric.read.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric.write.metricName).toStrictEqual('WriteLatency');
  expect(metric.write.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAverageQueryDurationInMicros', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageQueryDurationInMicros(DummyClusterId);

  // THEN
  expect(metric.shortQueries.metricName).toStrictEqual('QueryDuration');
  expect(metric.shortQueries.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId, latency: 'short' });
  expect(metric.mediumQueries.metricName).toStrictEqual('QueryDuration');
  expect(metric.mediumQueries.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId, latency: 'medium' });
  expect(metric.longQueries.metricName).toStrictEqual('QueryDuration');
  expect(metric.longQueries.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId, latency: 'long' });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMaintenanceModeEnabled', () => {
  // GIVEN
  const unitToTest = new RedshiftMetricFactory();

  // WHEN
  const metric = unitToTest.metricMaintenanceModeEnabled(DummyClusterId);

  // THEN
  expect(metric.metricName).toStrictEqual('MaintenanceMode');
  expect(metric.dimensions).toStrictEqual({ DBClusterIdentifier: DummyClusterId });
  expect(metric).toMatchSnapshot();
});
