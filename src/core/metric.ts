import { DimensionHash, IMetric, MathExpression, Metric } from '@aws-cdk/aws-cloudwatch';
import { Duration } from '@aws-cdk/core';

/**
 * Similar as CloudWatch Statistic, but also with missing percentiles.
 */
export enum WatchfulMetricStatistic {
  SAMPLE_COUNT = 'SampleCount',
  AVERAGE = 'Average',
  SUM = 'Sum',
  MINIMUM = 'Minimum',
  MAXIMUM = 'Maximum',
  P50 = 'p50',
  P90 = 'p90',
  P99 = 'p99',
}

/**
 * Abstract base class for all Watchful metrics.
 */
export abstract class WatchfulMetric {
  /**
   * Converts the object into the standard CloudWatch metric object.
   */
  abstract unwrap(): IMetric;
}

/**
 * Abstract base class for all metrics that support alarming on them.
 */
export abstract class WatchfulMetricWithAlarmSupport extends WatchfulMetric {
  // empty
}

/**
 * Props to create SimpleWatchfulMetric.
 */
export interface SimpleWatchfulMetricProps {
  readonly namespace: string;
  readonly metricName: string;
  readonly statistic: WatchfulMetricStatistic;
  readonly dimensions?: DimensionHash;
  readonly period: Duration;
  readonly label?: string;
  readonly color?: string;
}

/**
 * Simple metric, corresponding with the emitted datapoints.
 */
export class SimpleWatchfulMetric extends WatchfulMetricWithAlarmSupport {
  protected readonly props: SimpleWatchfulMetricProps;

  constructor(props: SimpleWatchfulMetricProps) {
    super();
    this.props = props;
  }

  unwrap(): IMetric {
    return new Metric({
      namespace: this.props.namespace,
      metricName: this.props.metricName,
      dimensions: this.props.dimensions,
      period: this.props.period,
      statistic: this.props.statistic,
      label: this.props.label,
      color: this.props.color,
    });
  }
}

/**
 * Props to create WatchfulMetricMath.
 */
export interface WatchfulMetricMathProps {
  readonly expression: string;
  readonly usingMetrics: Record<string, WatchfulMetric>;
  readonly period: Duration;
  readonly label?: string;
  readonly color?: string;
}

/**
 * Math expression, that transforms different metrics using an expression.
 * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html#metric-math-syntax
 */
export class WatchfulMetricMath extends WatchfulMetricWithAlarmSupport {
  protected props: WatchfulMetricMathProps;

  constructor(props: WatchfulMetricMathProps) {
    super();
    this.props = props;
  }

  unwrap(): IMetric {
    const usingMetrics: Record<string, IMetric> = {};

    for (const [key, value] of Object.entries(this.props.usingMetrics)) {
      usingMetrics[key] = value.unwrap();
    }

    return new MathExpression({
      expression: this.props.expression,
      label: this.props.label,
      color: this.props.color,
      period: this.props.period,
      usingMetrics,
    });
  }
}

/**
 * Props to create WatchfulMetricSearch.
 */
export interface WatchfulMetricSearchProps {
  readonly namespace: string;
  readonly dimensions: Record<string, string>;
  readonly searchQuery?: string;
  readonly statistic: WatchfulMetricStatistic;
  readonly period: Duration;
  readonly label: string;
}

/**
 * Search metric results. Does not support creating any kind of alarms.
 * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/search-expression-syntax.html
 */
export class WatchfulMetricSearch extends WatchfulMetric {
  protected props: WatchfulMetricSearchProps;

  constructor(props: WatchfulMetricSearchProps) {
    super();
    this.props = props;
  }

  unwrap(): IMetric {
    const period = this.props.period;
    const dimensionKeys = Object.keys(this.props.dimensions).join(',');
    const schema = `{${this.props.namespace},${dimensionKeys}}`;

    function mapper(keyAndValue: string[]) {
      const [key, value] = keyAndValue;
      if (value === '') {
        return key;
      } else {
        return `${key}="${value}"`;
      }
    }

    const dimensionKeysAndValues = Object
      .entries(this.props.dimensions)
      .map(mapper)
      .join(' ');

    const expression = `SEARCH('${schema} ${dimensionKeysAndValues} ${this.props.searchQuery ?? ''}', '${this.props.statistic}', ${period.toSeconds()})`;

    return new MathExpression({
      expression,
      usingMetrics: {},
      label: ' ',
      period,
    });
  }
}
