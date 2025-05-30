import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { DependencyType } from 'projen';

const project = new CdklabsConstructLibrary({
  name: 'cdk-watchful',
  projenrcTs: true,
  private: false,
  enablePRAutoMerge: true,
  description: 'Watching your CDK apps since 2019',
  defaultReleaseBranch: 'main',

  author: 'Elad Ben-Israel',
  authorAddress: 'elad.benisrael@gmail.com',
  repositoryUrl: 'https://github.com/eladb/cdk-watchful.git',
  keywords: [
    'cloudwatch',
    'monitoring',
  ],

  catalog: {
    twitter: 'emeshbi',
  },

  cdkVersion: '2.0.0',
  peerDeps: [
    'aws-cdk-lib',
  ],

  devDeps: [
    'aws-sdk',
    'cdklabs-projen-project-types',
  ],

  // jsii publishing

  publishToMaven: {
    javaPackage: 'io.github.cdklabs.watchful',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'cdk-watchful',
    mavenServerId: 'central-ossrh',
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

project.deps.addDependency('jsii-docgen@^1.8.110', DependencyType.BUILD);

project.gitignore.exclude('.env', '.idea');
project.gitignore.exclude('example/*.js', 'example/*.d.ts');

project.synth();
