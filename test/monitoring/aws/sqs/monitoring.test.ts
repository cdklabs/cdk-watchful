import { SynthUtils } from '@aws-cdk/assert';
import { Queue } from '@aws-cdk/aws-sqs';
import { Stack } from '@aws-cdk/core';
import { DefaultAlarmFactory } from '../../../../src/core/alarming';
import { SqsMonitoring, SqsMonitoringAlarms } from '../../../../src/monitoring/aws/sqs/monitoring';

test('snapshot test: widgets and resources, no alarms', () => {
  // GIVEN

  const resources = createTestResources();
  const unitToTest = new SqsMonitoring({ queue: resources.queue, alarmFactory: resources.alarms });

  // WHEN

  const widgets = unitToTest.getWidgets();
  const resolvedWidgets = resources.stack.resolve(widgets);

  // THEN

  expect(resolvedWidgets).toMatchSnapshot();
  expect(SynthUtils.toCloudFormation(resources.stack)).toMatchSnapshot();
});

test('snapshot test: widgets and resources, all alarms', () => {
  // GIVEN

  const alarms: SqsMonitoringAlarms = {
    alarmOnQueueOldestMessageAgeHigh: {
      Dummy: { threshold: 10 },
    },
    alarmOnQueueSizeLow: {
      Dummy: { threshold: 20 },
    },
    alarmOnQueueSizeHigh: {
      Dummy: { threshold: 30 },
    },
  };

  const resources = createTestResources();
  const unitToTest = new SqsMonitoring({ queue: resources.queue, alarmFactory: resources.alarms, alarms });

  // WHEN
  const widgets = unitToTest.getWidgets();
  const resolvedWidgets = resources.stack.resolve(widgets);

  // THEN
  expect(resolvedWidgets).toMatchSnapshot();
  expect(SynthUtils.toCloudFormation(resources.stack)).toMatchSnapshot();
});

function createTestResources() {
  const stack = new Stack();
  const queue = new Queue(stack, 'Queue', { queueName: 'DummyQueueName' });
  const alarms = new DefaultAlarmFactory(stack, 'Alarms', {
    prefix: 'Test',
    evaluationPeriodsDefault: 1,
    datapointsToAlarmDefault: 1,
    actionsEnabledDefault: true,
  });
  return { stack, queue, alarms };
}
