import { expect as cdk_expect, haveResource } from '@aws-cdk/assert';
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

test('alarmActions can be used to specify a list of custom alarm actions', () => {
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