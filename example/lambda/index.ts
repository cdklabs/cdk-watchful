// eslint-disable-next-line import/no-extraneous-dependencies
import * as SDK from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME;
if (!TABLE_NAME) {
  throw new Error('Missing TABLE_NAME environment variable');
}

const READ = process.env.READ;
const WRITE = process.env.WRITE;

exports.handler = async (event: any) => {
  console.error(event);

  const dynamo = new SDK.DynamoDB();

  if (WRITE) {
    const key = new Date().toISOString() + '.' + Math.floor(Math.random() * 99999);
    const req: SDK.DynamoDB.PutItemInput = {
      TableName: TABLE_NAME,
      Item: { ID: { S: key } },
    };

    await dynamo.putItem(req).promise();
  }

  if (READ) {
    const req: SDK.DynamoDB.ScanInput = {
      TableName: TABLE_NAME,
      Limit: 1,
    };
    await dynamo.scan(req).promise();
  }
};