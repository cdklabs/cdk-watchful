import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { Duration, Stack } from '@aws-cdk/core';
import { WatchfulContext } from '../../../../src/core/context';
import { DefaultDynamoDbTableMonitoring } from '../../../../src/monitoring/aws/dynamodb/monitoring';

const DummyContext: WatchfulContext = { awsAccountRegion: 'eu-west-1', defaultMetricPeriod: Duration.minutes(1) };

test('snapshot: provisioned table', () => {
  // GIVEN

  const stack = new Stack();

  const table = new Table(stack, 'DummyTable', {
    partitionKey: {
      name: 'pk',
      type: AttributeType.STRING,
    },
    billingMode: BillingMode.PROVISIONED,
    readCapacity: 100,
    writeCapacity: 200,
  });

  // WHEN

  const monitoring = new DefaultDynamoDbTableMonitoring(DummyContext, { table });

  // THEN

  expect(monitoring.widgets()).toMatchSnapshot();
});

test('snapshot: on-demand table', () => {
  // GIVEN

  const stack = new Stack();

  const table = new Table(stack, 'DummyTable', {
    partitionKey: {
      name: 'pk',
      type: AttributeType.STRING,
    },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });

  // WHEN

  const monitoring = new DefaultDynamoDbTableMonitoring(DummyContext, { table });

  // THEN

  expect(monitoring.widgets()).toMatchSnapshot();
});
