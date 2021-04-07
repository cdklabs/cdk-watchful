import { YAxisProps } from '@aws-cdk/aws-cloudwatch';

/**
 * Y-Axis showing percentage (0-100%, inclusive).
 */
export const PercentageAxis: YAxisProps = {
  min: 0,
  max: 100,
  label: '%',
  showUnits: false,
};

/**
 * Y-Axis showing time in milliseconds.
 */
export const TimeMillisAxis: YAxisProps = {
  min: 0,
  label: 'ms',
  showUnits: false,
};

/**
 * Y-Axis showing time in seconds.
 */
export const TimeSecondsAxis: YAxisProps = {
  min: 0,
  label: 'sec',
  showUnits: false,
};

/**
 * Y-Axis showing count (no units).
 */
export const CountAxis: YAxisProps = {
  min: 0,
  showUnits: false,
};

/**
 * Y-Axis showing rate (0.5 = 50%, 1 = 100%, etc).
 */
export const RateAxis: YAxisProps = {
  min: 0,
  label: 'rate',
  showUnits: false,
};

/**
 * Y-Axis showing size in bytes.
 */
export const SizeBytesAxis: YAxisProps = {
  min: 0,
  label: 'bytes',
  showUnits: false,
};
