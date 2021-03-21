import { Operation } from '@aws-cdk/aws-dynamodb';
import { Duration } from '@aws-cdk/core';
import { WatchfulContext } from '../../../../src/core/context';
import { DynamoDbMetricFactory } from '../../../../src/monitoring/aws/dynamodb/metrics';

const DummyTableName = 'DummyTable';
const DummyOperation = Operation.GET_ITEM;
const DummyContext: WatchfulContext = { awsAccountRegion: 'eu-west-1', defaultMetricPeriod: Duration.minutes(1) };

test('metricSuccessfulRequestLatencyAverage', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricSuccessfulRequestLatencyAverage(DummyTableName, DummyOperation);
  // THEN
  expect(metrics.unwrap()).toMatchSnapshot();
});

test('metricSearchSuccessfulRequestLatencyAverage', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricSearchSuccessfulRequestLatencyAverage(DummyTableName);
  // THEN
  expect(metrics.unwrap()).toMatchSnapshot();
});

test('metricSystemErrorsSum', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricSystemErrorsSum(DummyTableName, DummyOperation);
  // THEN
  expect(metrics.unwrap()).toMatchSnapshot();
});

test('metricSearchSystemErrorsSum', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricSearchSystemErrorsSum(DummyTableName);
  // THEN
  expect(metrics.unwrap()).toMatchSnapshot();
});

test('metricThrottleEventsSum', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricThrottleEventsSum(DummyTableName);
  // THEN
  expect(metrics.all.unwrap()).toMatchSnapshot();
  expect(metrics.read.unwrap()).toMatchSnapshot();
  expect(metrics.write.unwrap()).toMatchSnapshot();
});

test('metricConsumedCapacityUnitsSum', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricConsumedCapacityUnitsSum(DummyTableName);
  // THEN
  expect(metrics.read.unwrap()).toMatchSnapshot();
  expect(metrics.write.unwrap()).toMatchSnapshot();
});

test('metricProvisionedCapacityUnitsMaximum', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricProvisionedCapacityUnitsMaximum(DummyTableName);
  // THEN
  expect(metrics.read.unwrap()).toMatchSnapshot();
  expect(metrics.write.unwrap()).toMatchSnapshot();
});

test('metricMaxProvisionedTableCapacityUtilizationAverage', () => {
  // GIVEN
  const factory = new DynamoDbMetricFactory(DummyContext);
  // WHEN
  const metrics = factory.metricMaxProvisionedTableCapacityUtilizationAverage(DummyTableName);
  // THEN
  expect(metrics.read.unwrap()).toMatchSnapshot();
  expect(metrics.write.unwrap()).toMatchSnapshot();
});
