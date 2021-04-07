import { SqsMetricFactory } from '../../../../src/monitoring/aws/sqs/metrics';

const DummyQueueName = 'DummyQueueName';

test('snapshot test: metricAverageMessageSizeInBytes', () => {
  // GIVEN
  const unitToTest = new SqsMetricFactory();

  // WHEN
  const metric = unitToTest.metricAverageMessageSizeInBytes(DummyQueueName);

  // THEN
  expect(metric.metricName).toStrictEqual('SentMessageSize');
  expect(metric.dimensions).toStrictEqual({ QueueName: DummyQueueName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricAgeOfOldestMessageInSeconds', () => {
  // GIVEN
  const unitToTest = new SqsMetricFactory();

  // WHEN
  const metric = unitToTest.metricAgeOfOldestMessageInSeconds(DummyQueueName);

  // THEN
  expect(metric.metricName).toStrictEqual('ApproximateAgeOfOldestMessage');
  expect(metric.dimensions).toStrictEqual({ QueueName: DummyQueueName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricIncomingMessages', () => {
  // GIVEN
  const unitToTest = new SqsMetricFactory();

  // WHEN
  const metric = unitToTest.metricIncomingMessages(DummyQueueName);

  // THEN
  expect(metric.metricName).toStrictEqual('NumberOfMessagesSent');
  expect(metric.dimensions).toStrictEqual({ QueueName: DummyQueueName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricApproximateVisibleMessages', () => {
  // GIVEN
  const unitToTest = new SqsMetricFactory();

  // WHEN
  const metric = unitToTest.metricApproximateVisibleMessages(DummyQueueName);

  // THEN
  expect(metric.metricName).toStrictEqual('ApproximateNumberOfMessagesVisible');
  expect(metric.dimensions).toStrictEqual({ QueueName: DummyQueueName });
  expect(metric).toMatchSnapshot();
});
