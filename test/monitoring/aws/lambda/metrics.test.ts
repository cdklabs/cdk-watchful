import { LambdaMetricFactory } from '../../../../src/monitoring/aws/lambda/metrics';

const DummyFunctionName = 'DummyFunctionName';

test('snapshot test: metricInvocations', () => {
  // GIVEN
  const unitToTest = new LambdaMetricFactory();

  // WHEN
  const metric = unitToTest.metricInvocations(DummyFunctionName);

  // THEN
  expect(metric.metricName).toStrictEqual('Invocations');
  expect(metric.dimensions).toStrictEqual({ FunctionName: DummyFunctionName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricDuration', () => {
  // GIVEN
  const unitToTest = new LambdaMetricFactory();

  // WHEN
  const metric = unitToTest.metricDuration(DummyFunctionName);

  // THEN
  Object.values(metric).forEach((eachMetric) => {
    expect(eachMetric.metricName).toStrictEqual('Duration');
    expect(eachMetric.dimensions).toStrictEqual({
      FunctionName: DummyFunctionName,
    });
  });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricErrors', () => {
  // GIVEN
  const unitToTest = new LambdaMetricFactory();

  // WHEN
  const metric = unitToTest.metricErrors(DummyFunctionName);

  // THEN
  expect(metric.metricName).toStrictEqual('Errors');
  expect(metric.dimensions).toStrictEqual({ FunctionName: DummyFunctionName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricThrottles', () => {
  // GIVEN
  const unitToTest = new LambdaMetricFactory();

  // WHEN
  const metric = unitToTest.metricThrottles(DummyFunctionName);

  // THEN
  expect(metric.metricName).toStrictEqual('Throttles');
  expect(metric.dimensions).toStrictEqual({ FunctionName: DummyFunctionName });
  expect(metric).toMatchSnapshot();
});
