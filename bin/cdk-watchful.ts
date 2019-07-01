#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkWatchfulStack } from '../lib/cdk-watchful-stack';

const app = new cdk.App();
new CdkWatchfulStack(app, 'CdkWatchfulStack');
