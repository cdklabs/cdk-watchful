import { IWidget } from '@aws-cdk/aws-cloudwatch';
import { AlarmFactory } from './alarming';

/**
 * Collection of metrics and alarms, represented by widgets.
 * Monitoring is not a construct, since we want it to be lightweight.
 */
export abstract class Monitoring {
  /**
   * Returns the widgets representing this monitoring object.
   * This should always start with a header widget.
   */
  abstract getWidgets(): IWidget[];
}

/**
 * Props to create MonitoringWithAlarms.
 */
export interface MonitoringWithAlarmsProps {
  /**
   * Factory to be used to create alarms.
   */
  readonly alarmFactory: AlarmFactory;
}

/**
 * Monitoring with alarm creation support.
 */
export abstract class MonitoringWithAlarms extends Monitoring {
  protected readonly alarmFactory: AlarmFactory;

  protected constructor(props: MonitoringWithAlarmsProps) {
    super();
    this.alarmFactory = props.alarmFactory;
  }
}
