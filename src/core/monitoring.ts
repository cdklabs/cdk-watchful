import { IWidget } from '@aws-cdk/aws-cloudwatch/lib/widget';

/**
 * Represents a monitoring of a single resource or group of related resources.
 * Provides metrics and alarms, and can be subclassed to customize look and feel.
 */
export interface WatchfulMonitoring {
  /**
   * Returns the monitoring widgets.
   * @return widgets
   */
  widgets(): IWidget[];
}
