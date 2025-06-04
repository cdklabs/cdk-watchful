import { MathExpression, Metric, Statistic } from 'aws-cdk-lib/aws-cloudwatch';

const enum ApplicationELBMetrics {
  HealthyHostCount = 'HealthyHostCount',
  UnHealthyHostCount = 'UnHealthyHostCount',
  TARGET_2XX_COUNT = 'HTTPCode_Target_2XX_Count',
  TARGET_3XX_COUNT = 'HTTPCode_Target_3XX_Count',
  TARGET_4XX_COUNT = 'HTTPCode_Target_4XX_Count',
  TARGET_5XX_COUNT = 'HTTPCode_Target_5XX_Count',
  TargetResponseTime = 'TargetResponseTime',
  RequestCount = 'RequestCount',
}

const enum EcsMetrics {
  MemoryUtilization = 'MemoryUtilization',
  CPUUtilization = 'CPUUtilization',
}

const EcsNamespace = 'AWS/ECS';
const ApplicationELBNamespace = 'AWS/ApplicationELB';

export class EcsMetricFactory {
  metricCpuUtilizationAverage(clusterName: string, serviceName: string) {
    return this
      .ecsMetric(EcsMetrics.CPUUtilization, clusterName, serviceName)
      .with({ statistic: Statistic.AVERAGE });
  }

  metricMemoryUtilizationAverage(clusterName: string, serviceName: string) {
    return this
      .ecsMetric(EcsMetrics.MemoryUtilization, clusterName, serviceName)
      .with({ statistic: Statistic.AVERAGE });
  }

  protected ecsMetric(metric: EcsMetrics, clusterName: string, serviceName: string) {
    return new Metric({
      namespace: EcsNamespace,
      metricName: metric,
      dimensionsMap: {
        ClusterName: clusterName,
        ServiceName: serviceName,
      },
    });
  }

  metricMinHealthyHostCount(targetGroup: string, loadBalancer: string) {
    return this
      .albMetric(ApplicationELBMetrics.HealthyHostCount, targetGroup, loadBalancer)
      .with({ statistic: Statistic.MINIMUM });
  }

  metricMaxUnhealthyHostCount(targetGroup: string, loadBalancer: string) {
    return this
      .albMetric(ApplicationELBMetrics.UnHealthyHostCount, targetGroup, loadBalancer)
      .with({ statistic: Statistic.MAXIMUM });
  }

  metricTargetResponseTime(targetGroup: string, loadBalancer: string) {
    const baseMetric = this.albMetric(ApplicationELBMetrics.TargetResponseTime, targetGroup, loadBalancer);

    return {
      min: baseMetric.with({ statistic: Statistic.MINIMUM }),
      max: baseMetric.with({ statistic: Statistic.MAXIMUM }),
      avg: baseMetric.with({ statistic: Statistic.AVERAGE }),
    };
  }

  metricRequestCount(targetGroup: string, loadBalancer: string) {
    return this
      .albMetric(ApplicationELBMetrics.RequestCount, targetGroup, loadBalancer)
      .with({ statistic: Statistic.SUM });
  }

  metricHttpErrorStatusCodeRate(targetGroup: string, loadBalancer: string) {
    const requests = this.metricRequestCount(targetGroup, loadBalancer);
    const errors = this.metricHttpStatusCodeCount(targetGroup, loadBalancer);
    return new MathExpression({
      expression: 'http4xx + http5xx / requests',
      usingMetrics: {
        http4xx: errors.count4XX,
        http5xx: errors.count5XX,
        requests,
      },
    });
  }

  metricHttpStatusCodeCount(targetGroup: string, loadBalancer: string) {
    return {
      count2XX: this.albMetric(ApplicationELBMetrics.TARGET_2XX_COUNT, targetGroup, loadBalancer).with({ statistic: Statistic.SUM }),
      count3XX: this.albMetric(ApplicationELBMetrics.TARGET_3XX_COUNT, targetGroup, loadBalancer).with({ statistic: Statistic.SUM }),
      count4XX: this.albMetric(ApplicationELBMetrics.TARGET_4XX_COUNT, targetGroup, loadBalancer).with({ statistic: Statistic.SUM }),
      count5XX: this.albMetric(ApplicationELBMetrics.TARGET_5XX_COUNT, targetGroup, loadBalancer).with({ statistic: Statistic.SUM }),
    };
  }

  protected albMetric(metric: ApplicationELBMetrics, targetGroup: string, loadBalancer: string) {
    return new Metric({
      namespace: ApplicationELBNamespace,
      metricName: metric,
      dimensionsMap: {
        TargetGroup: targetGroup,
        LoadBalancer: loadBalancer,
      },
    });
  }
}
