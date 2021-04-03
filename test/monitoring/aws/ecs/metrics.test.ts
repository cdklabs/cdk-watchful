import { EcsMetricFactory } from '../../../../src/monitoring/aws/ecs/metrics';

const DummyTargetGroup = 'DummyTargetGroup';
const DummyLoadBalancer = 'DummyLoadBalancer';
const DummyClusterName = 'DummyClusterName';
const DummyServiceName = 'DummyServiceName';

test('snapshot test: metricRequestCount', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricRequestCount(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  expect(metric.metricName).toStrictEqual('RequestCount');
  expect(metric.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricTargetResponseTime', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricTargetResponseTime(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  Object.values(metric).forEach(eachMetric => {
    expect(eachMetric.metricName).toStrictEqual('TargetResponseTime');
    expect(eachMetric.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  });
  expect(metric).toMatchSnapshot();
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricCpuUtilizationAverage', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricCpuUtilizationAverage(DummyClusterName, DummyServiceName);

  // THEN
  expect(metric.metricName).toStrictEqual('CPUUtilization');
  expect(metric.dimensions).toStrictEqual({ ClusterName: DummyClusterName, ServiceName: DummyServiceName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMemoryUtilizationAverage', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricMemoryUtilizationAverage(DummyClusterName, DummyServiceName);

  // THEN
  expect(metric.metricName).toStrictEqual('MemoryUtilization');
  expect(metric.dimensions).toStrictEqual({ ClusterName: DummyClusterName, ServiceName: DummyServiceName });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMinHealthyHostCount', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricMinHealthyHostCount(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  expect(metric.metricName).toStrictEqual('HealthyHostCount');
  expect(metric.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricMaxUnhealthyHostCount', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricMaxUnhealthyHostCount(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  expect(metric.metricName).toStrictEqual('UnHealthyHostCount');
  expect(metric.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricHttpErrorStatusCodeRate', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricHttpErrorStatusCodeRate(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  expect(metric).toMatchSnapshot();
});

test('snapshot test: metricHttpStatusCodeCount', () => {
  // GIVEN
  const unitToTest = new EcsMetricFactory();

  // WHEN
  const metric = unitToTest.metricHttpStatusCodeCount(DummyTargetGroup, DummyLoadBalancer);

  // THEN
  expect(metric.count2XX.metricName).toStrictEqual('HTTPCode_Target_2XX_Count');
  expect(metric.count2XX.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric.count3XX.metricName).toStrictEqual('HTTPCode_Target_3XX_Count');
  expect(metric.count3XX.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric.count4XX.metricName).toStrictEqual('HTTPCode_Target_4XX_Count');
  expect(metric.count4XX.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric.count5XX.metricName).toStrictEqual('HTTPCode_Target_5XX_Count');
  expect(metric.count5XX.dimensions).toStrictEqual({ TargetGroup: DummyTargetGroup, LoadBalancer: DummyLoadBalancer });
  expect(metric).toMatchSnapshot();
});
