# cdk-watchful

[![CircleCI](https://circleci.com/gh/eladb/cdk-watchful.svg?style=svg)](https://circleci.com/gh/eladb/cdk-watchful)
![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)
![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)
![javascript](https://img.shields.io/badge/jsii-javascript-blueviolet.svg)

> Watching your CDK back since 2019

Watchful is an [AWS CDK](https://github.com/awslabs/aws-cdk) construct library that makes it easy
to monitor CDK apps.

Watchful is released through [jsii](https://github.com/awslabs/jsii) to:

- npm (JavaScript/TypeScript)
- PyPI (Pyton)

Watchful can manage a nice central dashboard and automatically configure alarms for the following AWS resources:

- Amazon DynamoDB
- AWS Lambda
- ...more to come!

To get started, just define a `Watchful` construct in your CDK app (code is in
TypeScript, but python will work too):

```ts
const wf = new Watchful(this, 'watchful', {
  alarmEmail: 'your@email.com'
});
```

And then, add your resources to it:

```ts
// `table` is a dynamodb.Table construct
wf.watchDynamoTable('My Happy Little Table', table);

// `fn` is a lambda.Function construct
wf.watchLambdaFunction('The Function', fn);
```

Constructs that implement `IWatchable` can be added with:

```ts
wf.watch(watchable);
```

And they will get a chance to add themselves to the watchful dashboard.

## Example

See a more complete [example](./example/index.ts).

## License

[Apache 2.0](./LICENSE)
