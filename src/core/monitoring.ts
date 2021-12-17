import { IWidget } from 'aws-cdk-lib/aws-cloudwatch';

/**
 * Base class for monitoring props.
 */
export interface MonitoringProps {
  /**
   * monitoring section title (might be markdown)
   * @default auto-generated title
   */
  readonly titleMarkdown?: string;
  /**
   * monitoring section description (might be markdown)
   * @default empty
   */
  readonly descriptionMarkdown?: string;
}

/**
 * Collection of metrics and alarms, represented by widgets.
 */
export abstract class Monitoring {
  /**
   * Returns the widgets representing this monitoring object.
   */
  abstract getWidgets(): IWidget[];
}
