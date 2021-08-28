import { expect as cdk_expect, haveResource } from '@aws-cdk/assert';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as ddb from '@aws-cdk/aws-dynamodb';
import { Stack } from '@aws-cdk/core';
import { Watchful } from '../src';

test('creates an empty dashboard', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new Watchful(stack, 'watchful');

  // THEN
  cdk_expect(stack).to(haveResource('AWS::CloudWatch::Dashboard'));
});

test('alarmActionArns can be used to specify a list of custom alarm actions', () => {
  // GIVEN
  const stack = new Stack();
  const table = new ddb.Table(stack, 'Table', {
    partitionKey: { name: 'ID', type: ddb.AttributeType.STRING },
  });

  // WHEN
  const wf = new Watchful(stack, 'watchful', {
    alarmActionArns: [
      'arn:of:custom:alarm:action',
      'arn:2',
    ],
  });

  wf.watchDynamoTable('MyTable', table);

  // THEN
  cdk_expect(stack).to(haveResource('AWS::CloudWatch::Alarm', {
    AlarmActions: [
      'arn:of:custom:alarm:action',
      'arn:2',
    ],
  }));
});

test('alarmActions can be used to specify a list of custom alarm actions', () => {
  // GIVEN
  const stack = new Stack();
  const table = new ddb.Table(stack, 'Table', {
    partitionKey: { name: 'ID', type: ddb.AttributeType.STRING },
  });

  // WHEN
  const wf = new Watchful(stack, 'watchful', {
    alarmActions: [
      { bind: (scope, alarm) => ({ alarmActionArn: `arn:phony:${scope.node.path}:${alarm.node.path}` }) },
    ],
  });

  wf.watchDynamoTable('MyTable', table);

  // THEN
  cdk_expect(stack).to(haveResource('AWS::CloudWatch::Alarm', {
    AlarmActions: [
      'arn:phony:Default/watchful/Table/CapacityAlarm:write:Default/watchful/Table/CapacityAlarm:write',
    ],
  }));
});

test('alarmActions AND alarmActionArns can be used to specify a list of custom alarm actions', () => {
  // GIVEN
  const stack = new Stack();
  const table = new ddb.Table(stack, 'Table', {
    partitionKey: { name: 'ID', type: ddb.AttributeType.STRING },
  });

  // WHEN
  const wf = new Watchful(stack, 'watchful', {
    alarmActionArns: [
      'arn:of:custom:alarm:action',
      'arn:2',
    ],
    alarmActions: [
      { bind: (scope, alarm) => ({ alarmActionArn: `arn:phony:${scope.node.path}:${alarm.node.path}` }) },
    ],
  });

  wf.watchDynamoTable('MyTable', table);

  // THEN
  cdk_expect(stack).to(haveResource('AWS::CloudWatch::Alarm', {
    AlarmActions: [
      'arn:of:custom:alarm:action',
      'arn:2',
      'arn:phony:Default/watchful/Table/CapacityAlarm:write:Default/watchful/Table/CapacityAlarm:write',
    ],
  }));
});

test('composite alarms can be created from other alarms', ()=> {
  // GIVEN
  const stack = new Stack();
  const table = new ddb.Table(stack, 'Table', {
    partitionKey: { name: 'ID', type: ddb.AttributeType.STRING },
  });

  // WHEN
  const wf = new Watchful(stack, 'watchful', {
    alarmActionArns: [
      'arn:of:custom:alarm:action',
      'arn:2',
    ],
  });

  const alarm1 = new cloudwatch.Alarm(stack, 'Alarm1', {
    evaluationPeriods: 1,
    metric: table.metricConsumedReadCapacityUnits(),
    threshold: 100,
  });

  const alarm2 = new cloudwatch.Alarm(stack, 'Alarm2', {
    evaluationPeriods: 1,
    metric: table.metricConsumedWriteCapacityUnits(),
    threshold: 100,
  });

  const compositeAlarm = new cloudwatch.CompositeAlarm(stack, 'CompositeAlarm', {
    alarmRule: cloudwatch.AlarmRule.allOf(alarm1, alarm2),
  });

  wf.addAlarm(compositeAlarm);

  // THEN
  cdk_expect(stack).to(haveResource('AWS::CloudWatch::CompositeAlarm', {
    AlarmActions: [
      'arn:of:custom:alarm:action',
      'arn:2',
    ],
  }));
});
