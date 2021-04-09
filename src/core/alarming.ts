import { Alarm, AlarmProps, ComparisonOperator, HorizontalAnnotation, IAlarm, IMetric, TreatMissingData } from '@aws-cdk/aws-cloudwatch';
import { Construct } from '@aws-cdk/core';

/**
 * Single alarm customization. If any property is undefined, a default value will be used by the factory.
 */
interface AlarmCustomization {
  /**
   * number of datapoints to alarm on
   * @default factory default
   */
  readonly datapointsToAlarm?: number;
  /**
   * number of periods to evaluate
   * @default factory default
   */
  readonly evaluationPeriods?: number;
  /**
   * whether to enable alarm actions
   * @default factory default
   */
  readonly actionsEnabled?: boolean;
}

/**
 * Single alarm definition with customization.
 */
export interface AlarmDefinition extends AlarmCustomization {
  /**
   * alarm threshold
   */
  readonly threshold: number;
}

/**
 * Properties related to an existing alarm.
 */
export interface CreatedAlarm {
  /**
   * created alarm
   */
  readonly alarm: IAlarm;
  /**
   * annotation of the created alarm
   */
  readonly annotation: HorizontalAnnotation;
  /**
   * the original alarm definition
   */
  readonly definition: AlarmDefinition;
}

/**
 * Factory that creates alarms on metrics.
 */
export interface AlarmFactory {
  /**
   * Creates alarms according to the alarm definitions.
   * @param id alarm identifier (to distinguish alarm from other alarms on the same resource)
   * @param metric metric to alarm on
   * @param op comparison operator
   * @param definitions map of (disambiguator, alarm definition), might be empty or undefined
   */
  createAlarms(id: string, metric: IMetric, op: ComparisonOperator, definitions?: Record<string, AlarmDefinition>): CreatedAlarm[];
}

/**
 * Props to create DefaultAlarmFactory.
 */
export interface DefaultAlarmFactoryProps {
  /**
   * global prefix to be used to all alarms created by this factory
   */
  readonly prefix: string;
  /**
   * default evaluation periods used when there is no custom one
   */
  readonly evaluationPeriodsDefault: number;
  /**
   * default number of datapoints used when there is no custom one
   */
  readonly datapointsToAlarmDefault: number;
  /**
   * default action enabled flag used when there is no custom one
   */
  readonly actionsEnabledDefault: boolean;
}

/**
 * Default implementation of the alarm factory.
 *
 */
export class DefaultAlarmFactory extends Construct implements AlarmFactory {
  protected readonly prefix: string;
  protected readonly evaluationPeriodsDefault: number;
  protected readonly datapointsToAlarmDefault: number;
  protected readonly actionsEnabledDefault: boolean;

  constructor(scope: Construct, id: string, props: DefaultAlarmFactoryProps) {
    super(scope, id);
    this.prefix = props.prefix;
    this.evaluationPeriodsDefault = props.evaluationPeriodsDefault;
    this.datapointsToAlarmDefault = props.datapointsToAlarmDefault;
    this.actionsEnabledDefault = props.actionsEnabledDefault;
  }

  createAlarms(id: string, metric: IMetric, op: ComparisonOperator, definitions?: Record<string, AlarmDefinition>) {
    const createdAlarms: CreatedAlarm[] = [];
    for (let [disambiguator, definition] of Object.entries(definitions ?? {})) {
      createdAlarms.push(this.createAlarm(id, metric, op, disambiguator, definition));
    }
    return createdAlarms;
  }

  protected createAlarm(id: string, metric: IMetric, op: ComparisonOperator, disambiguator: string, props: AlarmDefinition) {
    const alarmId = this.alarmId(id, metric, op, disambiguator, props);
    const alarmName = this.alarmName(id, metric, op, disambiguator, props);
    const alarmDescription = this.alarmDescription(id, metric, op, disambiguator, props);

    const definition: AlarmProps = {
      metric,
      threshold: props.threshold,
      comparisonOperator: op,
      treatMissingData: TreatMissingData.MISSING,
      alarmName,
      alarmDescription,
      evaluationPeriods: props.evaluationPeriods ?? this.evaluationPeriodsDefault,
      datapointsToAlarm: props.datapointsToAlarm ?? this.datapointsToAlarmDefault,
      actionsEnabled: props.actionsEnabled ?? this.actionsEnabledDefault,
    };

    const alarm = new Alarm(this, alarmId, definition);
    const annotation = alarm.toAnnotation();

    return { alarm, definition, annotation };
  }

  protected alarmId(id: string, _metric: IMetric, _op: ComparisonOperator, disambiguator: string, _props?: AlarmDefinition) {
    // TODO: will be improved upon later
    return `${this.prefix}_${id}_${disambiguator}`;
  }

  protected alarmName(_id: string, _metric: IMetric, _op: ComparisonOperator, _disambiguator: string, _props?: AlarmDefinition) {
    // TODO: will be improved upon later
    return undefined;
  }

  protected alarmDescription(_id: string, _metric: IMetric, _op: ComparisonOperator, _disambiguator: string, _props?: AlarmDefinition) {
    // TODO: will be improved upon later
    return undefined;
  }
}
