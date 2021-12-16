# cdk-watchful

> Watching your CDK back since 2019

Watchful is an [AWS CDK](https://github.com/awslabs/aws-cdk) construct library that makes it easy
to monitor CDK apps. It automatically synthesizes alarms and dashboards for supported AWS resources.

```ts
import { Watchful } from "cdk-watchful";

const wf = new Watchful(this, "watchful");
wf.watchDynamoTable("My Cute Little Table", myTable);
wf.watchLambdaFunction("My Function", myFunction);
wf.watchApiGateway("My REST API", myRestApi);
```

And...

![](https://raw.githubusercontent.com/eladb/cdk-watchful/master/example/sample.png)

## Initialize

To get started, just define a `Watchful` construct in your CDK app.
You can initialize using an email address, SQS ARN or both:

```ts
import { Watchful } from "cdk-watchful";
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";

const alarmSqs = sqs.Queue.fromQueueArn(
  this,
  "AlarmQueue",
  "arn:aws:sqs:us-east-1:444455556666:alarm-queue"
);
const alarmSns = sns.Topic.fromTopicArn(
  this,
  "AlarmTopic",
  "arn:aws:sns:us-east-2:444455556666:MyTopic"
);

const wf = new Watchful(this, "watchful", {
  alarmEmail: "your@email.com",
  alarmSqs,
  alarmSns,
  alarmActionArns: ["arn:aws:sqs:us-east-1:444455556666:alarm-queue"],
});
```

## Add Resources

Watchful manages a central dashboard and configures default alarming for:

- Amazon DynamoDB: `watchful.watchDynamoTable`
- AWS Lambda: `watchful.watchLambdaFunction`
- Amazon API Gateway: `watchful.watchApiGateway`
- [Request yours](https://github.com/eladb/cdk-watchful/issues/new)

## Watching Scopes

Watchful can also watch complete CDK construct scopes. It will automatically
discover all watchable resources within that scope (recursively), add them
to your dashboard and configure alarms for them.

```ts
wf.watchScope(storageLayer);
```

## Example

See a more complete [example](https://github.com/eladb/cdk-watchful/blob/master/example/index.ts).

## Contributing

Contributions of all kinds are welcome and celebrated. Raise an issue, submit a PR, do the right thing.

To set up a dev environment:

1. Clone this repo
2. `yarn`

Development workflow (change code and run tests automatically):

```shell
yarn test:watch
```

Build (like CI):

```shell
yarn build
```

And then publish as a PR.

## License

[Apache 2.0](https://github.com/eladb/cdk-watchful/blob/master/LICENSE)
