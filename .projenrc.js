const { JsiiProject, Semver } = require('projen');

const CDK_VERSION = Semver.caret('1.48.0');
const CDK_DEPS = {
  "@aws-cdk/aws-apigateway": CDK_VERSION,
  "@aws-cdk/aws-cloudwatch": CDK_VERSION,
  "@aws-cdk/aws-cloudwatch-actions": CDK_VERSION,
  "@aws-cdk/aws-dynamodb": CDK_VERSION,
  "@aws-cdk/aws-events": CDK_VERSION,
  "@aws-cdk/aws-events-targets": CDK_VERSION,
  "@aws-cdk/aws-lambda": CDK_VERSION,
  "@aws-cdk/aws-sns": CDK_VERSION,
  "@aws-cdk/aws-sns-subscriptions": CDK_VERSION,
  "@aws-cdk/aws-sqs": CDK_VERSION,
  "@aws-cdk/core": CDK_VERSION
};

const project = new JsiiProject({
  name: 'cdk-watchful',
  description: 'Watching your CDK apps since 2019',

  jsiiVersion: Semver.caret('1.7.0'),

  authorName: 'Elad Ben-Israel',
  authorEmail: 'elad.benisrael@gmail.com',
  repository: 'https://github.com/eladb/cdk-watchful.git',
  keywords: [
    "cdk",
    "cloudwatch",
    "monitoring"
  ],

  devDependencies: {
    "@aws-cdk/assert": CDK_VERSION,
    "aws-cdk": CDK_VERSION,
    "aws-sdk": Semver.caret("2.708.0")
  },

  dependencies: CDK_DEPS,
  peerDependencies: CDK_DEPS,
});

project.manifest.awscdkio = {
  twitter: 'emeshbi'
};

project.synth();

/*
  "jsii": {
    "outdir": "dist",
    "targets": {
      "java": {
        "package": "com.github.eladb.watchful",
        "maven": {
          "groupId": "com.github.eladb",
          "artifactId": "cdk-watchful"
        }
      },
      "python": {
        "distName": "cdk-watchful",
        "module": "cdk_watchful"
      }
    }
  }
*/