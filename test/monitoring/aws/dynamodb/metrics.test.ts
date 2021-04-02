import { DynamoDbMetricFactory } from '../../../../src/monitoring/aws/dynamodb/metrics';

const DummyTableName = 'DummyTableName';

test('snapshot test: metricConsumedCapacityUnits', () => {
  // GIVEN
  const unitToTest = new DynamoDbMetricFactory();

  // WHEN
  const metric = unitToTest.metricConsumedCapacityUnits(DummyTableName);

  // THEN
  expect(metric.read.metricName).toStrictEqual('ConsumedReadCapacityUnits');
  expect(metric.read.dimensions).toStrictEqual({ TableName: DummyTableName });
  expect(metric.write.metricName).toStrictEqual('ConsumedWriteCapacityUnits');
  expect(metric.write.dimensions).toStrictEqual({ TableName: DummyTableName });
  expect(metric).toMatchSnapshot();
});
