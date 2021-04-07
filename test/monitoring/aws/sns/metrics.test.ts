import { SnsMetricFactory } from '../../../../src/monitoring/aws/sns/metrics';

const DummyTopicName = 'DummyTopicName';

test('snapshot test: metricAverageMessageSizeInBytes', () => {
  // GIVEN
  const unitToTest = new SnsMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageMessageSizeInBytes(DummyTopicName);

  // THEN
  expect(metric.metricName).toStrictEqual('PublishSize');
  expect(metric.dimensions).toStrictEqual({ TopicName: DummyTopicName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricNumberOfMessagesDelivered', () => {
  // GIVEN
  const unitToTest = new SnsMetricFactory();

  // WHEN
  const metric = unitToTest.metricNumberOfMessagesDelivered(DummyTopicName);

  // THEN
  expect(metric.metricName).toStrictEqual('NumberOfNotificationsDelivered');
  expect(metric.dimensions).toStrictEqual({ TopicName: DummyTopicName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricNumberOfMessagesPublished', () => {
  // GIVEN
  const unitToTest = new SnsMetricFactory();

  // WHEN
  const metric = unitToTest.metricNumberOfMessagesPublished(DummyTopicName);

  // THEN
  expect(metric.metricName).toStrictEqual('NumberOfMessagesPublished');
  expect(metric.dimensions).toStrictEqual({ TopicName: DummyTopicName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAverageMessageSizeInBytes', () => {
  // GIVEN
  const unitToTest = new SnsMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageMessageSizeInBytes(DummyTopicName);

  // THEN
  expect(metric.metricName).toStrictEqual('PublishSize');
  expect(metric.dimensions).toStrictEqual({ TopicName: DummyTopicName });
  expect(metric).toMatchSnapshot();
});
