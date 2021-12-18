const { awscdk } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-watchful',
  description: 'Watching your CDK apps since 2019',
  defaultReleaseBranch: 'main',
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

  authorName: 'Elad Ben-Israel',
  authorEmail: 'elad.benisrael@gmail.com',
  repository: 'https://github.com/eladb/cdk-watchful.git',
  keywords: [
    'cloudwatch',
    'monitoring',
  ],

  catalog: {
    twitter: 'emeshbi',
  },

  cdkVersion: '2.0.0',
  peerDependencies: [
    'aws-cdk-lib',
  ],

  devDeps: [
    'aws-sdk',
  ],

  // jsii publishing

  publishToMaven: {
    javaPackage: 'io.github.cdklabs.watchful',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'cdk-watchful',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },

  publishToPypi: {
    distName: 'cdk-watchful',
    module: 'cdk_watchful',
  },

  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkWatchful',
    packageId: 'Cdklabs.CdkWatchful',
  },

  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },

  autoApproveUpgrades: true,
});

project.gitignore.exclude('.env', '.idea');
project.gitignore.exclude('example/*.js', 'example/*.d.ts');

project.synth();
