import { ApiGatewayMetricFactory } from '../../../../src/monitoring/aws/api-gateway/metrics';

const DummyApiName = 'DummyApiName';
const DummyStage = 'DummyStage';

test('snapshot test: metricError', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricErrors(DummyApiName, DummyStage);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricIntegrationLatency', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricIntegrationLatency(DummyApiName, DummyStage);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricLatency', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricLatency(DummyApiName, DummyStage);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCalls', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricCalls(DummyApiName, DummyStage);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCache', () => {
  // GIVEN
  const unitToTest = new ApiGatewayMetricFactory();

  // WHEN
  const metric = unitToTest.metricCache(DummyApiName, DummyStage);

  // THEN
  expect(metric).toMatchSnapshot();
});
