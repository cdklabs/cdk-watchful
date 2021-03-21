/**
 * Provides access to global settings and parameters.
 * TODO: currently just a draft
 */
import { Duration } from '@aws-cdk/core';

export class WatchfulContext {
  readonly awsAccountRegion: string;
  readonly defaultMetricPeriod: Duration;

  constructor() {
    // TODO
    this.awsAccountRegion = 'us-east-1';
    this.defaultMetricPeriod = Duration.minutes(5);
  }
}
