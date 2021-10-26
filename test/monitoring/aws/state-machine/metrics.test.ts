import { StateMachineMetricFactory } from '../../../../src/monitoring/aws/state-machine/metrics';

const dummyStateMachineArn = 'dummy-state-machine-arn';

test('snapshot test: metricExecutions', () => {
  // GIVEN
  const unitToTest = new StateMachineMetricFactory();

  // WHEN
  const metric = unitToTest.metricExecutions(dummyStateMachineArn);

  // THEN
  expect(metric.failed.metricName).toStrictEqual('ExecutionsFailed');
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.dimensions).toStrictEqual({ StateMachineArn: dummyStateMachineArn });
  });
  expect(metric).toMatchSnapshot();
});