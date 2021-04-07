import { Queue } from '@aws-cdk/aws-sqs';
import { Stack } from '@aws-cdk/core';
import { SqsMonitoring } from '../../../../src/monitoring/aws/sqs/monitoring';

test('snapshot test', () => {
  // GIVEN
  const resources = createTestResources();
  const unitToTest = new SqsMonitoring({ queue: resources.queue });

  // WHEN
  const widgets = unitToTest.getWidgets();
  const resolvedWidgets = resources.stack.resolve(widgets);

  // THEN
  expect(resolvedWidgets).toMatchSnapshot();
});

function createTestResources() {
  const stack = new Stack();
  const queue = new Queue(stack, 'Queue', { queueName: 'DummyQueueName' });
  return { stack, queue };
}
