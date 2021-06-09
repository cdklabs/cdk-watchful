const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: '@myhelix/cdk-watchful',
  description: 'Watching your CDK apps since 2019',
  defaultReleaseBranch: 'main',


  authorName: 'Elad Ben-Israel (maintained by myhelix)',
  authorEmail: 'ops@helix.com',
  repository: 'https://github.com/myhelix/cdk-watchful.git',
  keywords: [
    'cloudwatch',
    'monitoring',
  ],

  // creates PRs for projen upgrades
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

  cdkVersion: '1.108.0',
  cdkVersionPinning: true,
  cdkDependencies: [
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
    '@aws-cdk/aws-elasticloadbalancingv2',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-rds',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-sqs',
    '@aws-cdk/core',
  ],

  devDeps: [
    'aws-sdk',
  ],

});

project.gitignore.exclude('.env', '.idea');
project.gitignore.exclude('example/*.js', 'example/*.d.ts');

project.synth();
