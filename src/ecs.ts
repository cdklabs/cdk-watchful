import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as ecs from '@aws-cdk/aws-ecs';
import { HttpCodeTarget, ApplicationTargetGroup } from '@aws-cdk/aws-elasticloadbalancingv2';
import * as cdk from '@aws-cdk/core';
import { IWatchful } from './api';


export interface WatchEcsServiceOptions {
  /**
     * Threshold for the Cpu Maximum utilization
     *
     * @default 80
     */
  readonly cpuMaximumThresholdPercent?: number;

  /**
   * Threshold for the Memory Maximum utilization.
   *
   * @default 80
   */
  readonly memoryMaximumThresholdPercent?: number;

  /**
   * Threshold for the Target Response Time.
   *
   * @default 1
   */
  readonly targetResponseTimeThreshold?: number;

  /**
   * Threshold for the Number of Requests.
   *
   * @default 1000
   */
  readonly requestsThreshold?: number;

  /**
   * Threshold for the Request Error rate
   *
   * @default 0
   */
  readonly requestsErrorRateThreshold?: number;
}

export interface WatchEcsServiceProps extends WatchEcsServiceOptions {
  readonly title: string;
  readonly watchful: IWatchful;
  readonly fargateService?: ecs.FargateService;
  readonly ec2Service?: ecs.Ec2Service;
  readonly targetGroup: ApplicationTargetGroup;
}

export class WatchEcsService extends cdk.Construct {

  private readonly watchful: IWatchful;
  private readonly ecsService: any;
  private readonly targetGroup: ApplicationTargetGroup;

  constructor(scope: cdk.Construct, id: string, props: WatchEcsServiceProps) {
    super(scope, id);

    this.watchful = props.watchful;
    if (props.ec2Service) {
      this.ecsService = props.ec2Service;
    }
    if (props.fargateService) {
      this.ecsService = props.fargateService;
    }

    this.targetGroup = props.targetGroup;

    this.watchful.addSection(props.title, {
      links: [
        { title: 'ECS Service', url: linkForEcsService(this.ecsService) },
      ],
    });

    const { cpuUtilizationMetric, cpuUtilizationAlarm } = this.createCpuUtilizationMonitor(props.cpuMaximumThresholdPercent);
    const { memoryUtilizationMetric, memoryUtilizationAlarm } = this.createMemoryUtilizationMonitor(props.memoryMaximumThresholdPercent);

    const { targetResponseTimeMetric, targetResponseTimeAlarm } = this.createTargetResponseTimeMonitor(props.targetResponseTimeThreshold);
    const { healthyHostsMetric, unhealthyHostsMetric } = this.createHostCountMetrics();

    const { requestsMetric, requestsAlarm } = this.createRequestsMonitor(props.requestsThreshold);
    const { http2xxMetric, http3xxMetric, http4xxMetric, http5xxMetric } = this.createHttpRequestsMetrics();
    const { requestsErrorRateMetric, requestsErrorRateAlarm } = this.requestsErrorRate(http4xxMetric, http5xxMetric, requestsMetric);


    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: `CPUUtilization/${cpuUtilizationMetric.period.toMinutes()}min`,
        width: 12,
        left: [cpuUtilizationMetric],
        leftAnnotations: [cpuUtilizationAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `MemoryUtilization/${memoryUtilizationMetric.period.toMinutes()}min`,
        width: 12,
        left: [memoryUtilizationMetric],
        leftAnnotations: [memoryUtilizationAlarm.toAnnotation()],
      }),
    );
    this.watchful.addWidgets(
      new cloudwatch.SingleValueWidget({
        title: 'Healthy Hosts',
        height: 6,
        width: 6,
        metrics: [healthyHostsMetric],
      }),
      new cloudwatch.SingleValueWidget({
        title: 'UnHealthy Hosts',
        height: 6,
        width: 6,
        metrics: [unhealthyHostsMetric],
      }),
      new cloudwatch.GraphWidget({
        title: `TargetResponseTime/${targetResponseTimeMetric.period.toMinutes()}min`,
        width: 6,
        left: [targetResponseTimeMetric],
        leftAnnotations: [targetResponseTimeAlarm.toAnnotation()],
      }),
      new cloudwatch.GraphWidget({
        title: `Requests/${requestsMetric.period.toMinutes()}min`,
        width: 6,
        left: [requestsMetric],
        leftAnnotations: [requestsAlarm.toAnnotation()],
      }),
    );
    this.watchful.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'HTTP Requests Overview',
        width: 12,
        left: [http2xxMetric, http3xxMetric, http4xxMetric, http5xxMetric],
      }),
      new cloudwatch.GraphWidget({
        title: `HTTP Requests Error rate/${requestsErrorRateMetric.period.toMinutes()}min`,
        width: 12,
        left: [requestsErrorRateMetric],
        leftAnnotations: [requestsErrorRateAlarm.toAnnotation()],
      }),
    );
  }

  private createCpuUtilizationMonitor(cpuMaximumThresholdPercent = 80) {
    const ecsService = this.ecsService;
    const cpuUtilizationMetric = ecsService.metricCpuUtilization();
    const cpuUtilizationAlarm = cpuUtilizationMetric.createAlarm(this, 'cpuUtilizationAlarm', {
      alarmDescription: 'cpuUtilizationAlarm',
      threshold: cpuMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(cpuUtilizationAlarm);
    return { cpuUtilizationMetric, cpuUtilizationAlarm };
  }

  private createMemoryUtilizationMonitor(memoryMaximumThresholdPercent = 80) {
    const ecsService = this.ecsService;
    const memoryUtilizationMetric = ecsService.metricMemoryUtilization();
    const memoryUtilizationAlarm = memoryUtilizationMetric.createAlarm(this, 'memoryUtilizationAlarm', {
      alarmDescription: 'memoryUtilizationAlarm',
      threshold: memoryMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(memoryUtilizationAlarm);
    return { memoryUtilizationMetric, memoryUtilizationAlarm };
  }

  private createTargetResponseTimeMonitor(targetResponseTimeThreshold = 1) {
    const targetGroup = this.targetGroup;
    const targetResponseTimeMetric = targetGroup.metricTargetResponseTime();
    const targetResponseTimeAlarm = targetResponseTimeMetric.createAlarm(this, 'targetResponseTimeAlarm', {
      alarmDescription: 'targetResponseTimeAlarm',
      threshold: targetResponseTimeThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(targetResponseTimeAlarm);
    return { targetResponseTimeMetric, targetResponseTimeAlarm };
  }

  private createRequestsMonitor(requestsThreshold = 1000) {
    const targetGroup = this.targetGroup;
    const requestsMetric = targetGroup.metricRequestCount();
    const requestsAlarm = requestsMetric.createAlarm(this, 'requestsAlarm', {
      alarmDescription: 'requestsAlarm',
      threshold: requestsThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(requestsAlarm);
    return { requestsMetric, requestsAlarm };
  }

  private createHttpRequestsMetrics() {
    const targetGroup = this.targetGroup;
    const http2xxMetric = targetGroup.metricHttpCodeTarget(HttpCodeTarget.TARGET_2XX_COUNT);
    const http3xxMetric = targetGroup.metricHttpCodeTarget(HttpCodeTarget.TARGET_3XX_COUNT);
    const http4xxMetric = targetGroup.metricHttpCodeTarget(HttpCodeTarget.TARGET_4XX_COUNT);
    const http5xxMetric = targetGroup.metricHttpCodeTarget(HttpCodeTarget.TARGET_5XX_COUNT);
    return { http2xxMetric, http3xxMetric, http4xxMetric, http5xxMetric };
  }

  private createHostCountMetrics() {
    const targetGroup = this.targetGroup;
    const healthyHostsMetric = targetGroup.metricHealthyHostCount();
    const unhealthyHostsMetric = targetGroup.metricUnhealthyHostCount();

    return { healthyHostsMetric, unhealthyHostsMetric };
  }

  private requestsErrorRate(http4xxMetric: cloudwatch.IMetric,
    http5xxMetric: cloudwatch.IMetric,
    requestsMetric: cloudwatch.IMetric,
    requestsErrorRateThreshold = 0) {
    const requestsErrorRateMetric = new cloudwatch.MathExpression({
      expression: 'http4xx + http5xx / requests',
      usingMetrics: {
        http4xx: http4xxMetric,
        http5xx: http5xxMetric,
        requests: requestsMetric,
      },
    });
    const requestsErrorRateAlarm = requestsErrorRateMetric.createAlarm(this, 'requestsErrorRateAlarm', {
      alarmDescription: 'requestsErrorRateAlarm',
      threshold: requestsErrorRateThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(requestsErrorRateAlarm);
    return { requestsErrorRateMetric, requestsErrorRateAlarm };
  }
}

function linkForEcsService(ecsService: any) {
  return `https://console.aws.amazon.com/ecs/home?region=${ecsService.stack.region}#/clusters/${ecsService.cluster.clusterName}/services/${ecsService.serviceName}/details`;
}


