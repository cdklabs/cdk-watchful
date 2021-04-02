import { ApiGatewayMetricFactory } from '../../../../src/monitoring/aws/api-gateway/metrics';

const DummyApiName = 'DummyApiName';
const DummyStage = 'DummyStage';

test('snapshot test: metricErrors', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricErrors(DummyApiName, DummyStage);

  // THEN
  expect(metric.count4XX.metricName).toStrictEqual('4XXError');
  expect(metric.count4XX.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  expect(metric.count5XX.metricName).toStrictEqual('5XXError');
  expect(metric.count5XX.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricIntegrationLatency', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricIntegrationLatency(DummyApiName, DummyStage);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual('IntegrationLatency');
    expect(eachMetric.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricLatency', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricLatency(DummyApiName, DummyStage);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual('Latency');
    expect(eachMetric.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCalls', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricCalls(DummyApiName, DummyStage);

  // THEN
  expect(metric.metricName).toStrictEqual('Count');
  expect(metric.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCache', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricCache(DummyApiName, DummyStage);

  // THEN
  expect(metric.hits.metricName).toStrictEqual('CacheHitCount');
  expect(metric.hits.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  expect(metric.misses.metricName).toStrictEqual('CacheMissCount');
  expect(metric.misses.dimensions).toStrictEqual({ ApiName: DummyApiName, Stage: DummyStage });
  expect(metric).toMatchSnapshot();
});
