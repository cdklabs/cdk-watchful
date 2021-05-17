import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as ecs from '@aws-cdk/aws-ecs';
import { ApplicationTargetGroup } from '@aws-cdk/aws-elasticloadbalancingv2';
import * as cdk from '@aws-cdk/core';
import { IWatchful } from './api';
import { EcsMetricFactory } from './monitoring/aws/ecs/metrics';


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
   * @default - 0.
   */
  readonly memoryMaximumThresholdPercent?: number;

  /**
   * Threshold for the Target Response Time.
   *
   * @default - 0.
   */
  readonly targetResponseTimeThreshold?: number;

  /**
   * Threshold for the Number of Requests.
   *
   * @default - 0.
   */
  readonly requestsThreshold?: number;

  /**
   * Threshold for the Number of Request Errors.
   * 
   * @default - 0.
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
  private readonly serviceName: string;
  private readonly clusterName: string;
  private readonly targetGroupName: string;
  private readonly loadBalancerName: string;
  private readonly metrics: EcsMetricFactory;

  constructor(scope: cdk.Construct, id: string, props: WatchEcsServiceProps) {
    super(scope, id);

    this.watchful = props.watchful;
    if (props.ec2Service) {
      this.ecsService = props.ec2Service;
      this.serviceName = props.ec2Service.serviceName;
      this.clusterName = props.ec2Service.cluster.clusterName;
    } else if (props.fargateService) {
      this.ecsService = props.fargateService;
      this.serviceName = props.fargateService.serviceName;
      this.clusterName = props.fargateService.cluster.clusterName;
    } else {
      throw new Error('No service provided to monitor.');
    }

    this.targetGroup = props.targetGroup;
    this.targetGroupName = this.targetGroup.targetGroupFullName;
    this.loadBalancerName = this.targetGroup.firstLoadBalancerFullName;
    this.metrics = new EcsMetricFactory();

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
    const { requestsErrorRateMetric, requestsErrorRateAlarm } = this.requestsErrorRate(props.requestsErrorRateThreshold);


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

  private createCpuUtilizationMonitor(cpuMaximumThresholdPercent = 0) {
    const cpuUtilizationMetric = this.metrics.metricCpuUtilizationAverage(this.clusterName, this.serviceName);
    const cpuUtilizationAlarm = cpuUtilizationMetric.createAlarm(this, 'cpuUtilizationAlarm', {
      alarmDescription: 'cpuUtilizationAlarm',
      threshold: cpuMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(cpuUtilizationAlarm);
    return { cpuUtilizationMetric, cpuUtilizationAlarm };
  }

  private createMemoryUtilizationMonitor(memoryMaximumThresholdPercent = 0) {
    const memoryUtilizationMetric = this.metrics.metricMemoryUtilizationAverage(this.clusterName, this.serviceName);
    const memoryUtilizationAlarm = memoryUtilizationMetric.createAlarm(this, 'memoryUtilizationAlarm', {
      alarmDescription: 'memoryUtilizationAlarm',
      threshold: memoryMaximumThresholdPercent,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(memoryUtilizationAlarm);
    return { memoryUtilizationMetric, memoryUtilizationAlarm };
  }

  private createTargetResponseTimeMonitor(targetResponseTimeThreshold = 0) {
    const targetResponseTimeMetric = this.metrics.metricTargetResponseTime(this.targetGroupName, this.loadBalancerName).avg;
    const targetResponseTimeAlarm = targetResponseTimeMetric.createAlarm(this, 'targetResponseTimeAlarm', {
      alarmDescription: 'targetResponseTimeAlarm',
      threshold: targetResponseTimeThreshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 3,
    });
    this.watchful.addAlarm(targetResponseTimeAlarm);
    return { targetResponseTimeMetric, targetResponseTimeAlarm };
  }

  private createRequestsMonitor(requestsThreshold = 0) {
    const requestsMetric = this.metrics.metricRequestCount(this.targetGroupName, this.loadBalancerName);
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
    const metrics = this.metrics.metricHttpStatusCodeCount(this.targetGroupName, this.loadBalancerName);
    const http2xxMetric = metrics.count2XX;
    const http3xxMetric = metrics.count3XX;
    const http4xxMetric = metrics.count4XX;
    const http5xxMetric = metrics.count5XX;
    return { http2xxMetric, http3xxMetric, http4xxMetric, http5xxMetric };
  }

  private createHostCountMetrics() {
    const healthyHostsMetric = this.metrics.metricMinHealthyHostCount(this.targetGroupName, this.loadBalancerName);
    const unhealthyHostsMetric = this.metrics.metricMaxUnhealthyHostCount(this.targetGroupName, this.loadBalancerName);
    return { healthyHostsMetric, unhealthyHostsMetric };
  }

  private requestsErrorRate(requestsErrorRateThreshold = 0) {
    const requestsErrorRateMetric = this.metrics.metricHttpErrorStatusCodeRate(this.targetGroupName, this.loadBalancerName);
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


