import { Duration } from '@aws-cdk/core';
import { SimpleWatchfulMetric, WatchfulMetricMath, WatchfulMetricSearch, WatchfulMetricStatistic } from '../../src/core/metric';

test('simple metric unwrapped', () => {
  // GIVEN

  const metrics = new SimpleWatchfulMetric({
    label: 'DummyLabel',
    statistic: WatchfulMetricStatistic.P99,
    period: Duration.minutes(3),
    dimensions: { A: 'a', B: 'b' },
    metricName: 'DummyMetricName',
    namespace: 'DummyNamespace',
    color: 'DummyColor',
  });

  // WHEN

  const unwrapped = metrics.unwrap();

  // THEN

  expect(unwrapped).toMatchSnapshot();
});

test('metric math unwrapped', () => {
  // GIVEN

  const metric1 = new SimpleWatchfulMetric({
    namespace: 'DummyNamespace',
    metricName: 'DummyMetric1',
    statistic: WatchfulMetricStatistic.AVERAGE,
    period: Duration.hours(1),
  });

  const metric2 = new SimpleWatchfulMetric({
    namespace: 'DummyNamespace',
    metricName: 'DummyMetric2',
    statistic: WatchfulMetricStatistic.AVERAGE,
    period: Duration.hours(1),
  });

  const metrics = new WatchfulMetricMath({
    label: 'DummyLabel',
    period: Duration.minutes(3),
    color: 'DummyColor',
    expression: 'metric1 / metric2',
    usingMetrics: { metric1, metric2 },
  });

  // WHEN

  const unwrapped = metrics.unwrap();

  // THEN

  expect(unwrapped).toMatchSnapshot();
});

test('search metric unwrapped', () => {
  // GIVEN

  const metrics = new WatchfulMetricSearch({
    label: 'DummyLabel',
    statistic: WatchfulMetricStatistic.P99,
    period: Duration.minutes(3),
    dimensions: { A: 'a', B: 'b' },
    namespace: 'DummyNamespace',
    searchQuery: 'DummyQuery',
  });

  // WHEN

  const unwrapped = metrics.unwrap();

  // THEN

  expect(unwrapped).toMatchSnapshot();
});
