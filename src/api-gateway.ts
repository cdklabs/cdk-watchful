import { Duration } from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

import {
  ComparisonOperator,
  GraphWidget,
  HorizontalAnnotation,
} from 'aws-cdk-lib/aws-cloudwatch';

import { Construct } from 'constructs';
import { IWatchful } from './api';
import { ApiGatewayMetricFactory } from './monitoring/aws/api-gateway/metrics';

export interface WatchApiGatewayOptions {
  /**
   * Alarm when 5XX errors reach this threshold over 5 minutes.
   *
   * @default 1 any 5xx HTTP response will trigger the alarm
   */
  readonly serverErrorThreshold?: number;

  /**
   * A list of operations to monitor separately.
   *
   * @default - only API-level monitoring is added.
   */
  readonly watchedOperations?: WatchedOperation[];

  /**
   * Include a dashboard graph for caching metrics
   *
   * @default false
   */
  readonly cacheGraph?: boolean;
}

export interface WatchApiGatewayProps extends WatchApiGatewayOptions {
  /**
   * The title of this section.
   */
  readonly title: string;

  /**
   * The Watchful instance to add widgets into.
   */
  readonly watchful: IWatchful;

  /**
   * The API Gateway REST API that is being watched.
   */
  readonly restApi: apigw.RestApi;
}

export class WatchApiGateway extends Construct {
  private readonly api: apigw.CfnRestApi;
  private readonly apiName: string;
  private readonly stage: string;
  private readonly watchful: IWatchful;
  private readonly metrics: ApiGatewayMetricFactory;

  constructor(scope: Construct, id: string, props: WatchApiGatewayProps) {
    super(scope, id);

    this.api = props.restApi.node.findChild('Resource') as apigw.CfnRestApi;
    this.apiName = this.api.name!;
    this.stage = props.restApi.deploymentStage.stageName;
    this.watchful = props.watchful;
    this.metrics = new ApiGatewayMetricFactory();

    const alarmThreshold =
      props.serverErrorThreshold == null ? 1 : props.serverErrorThreshold;
    if (alarmThreshold) {
      this.metrics.metricErrors(this.apiName, this.stage).count5XX.with({
        statistic: 'sum',
        period: Duration.minutes(5),
      });
      this.watchful.addAlarm(
        this.metrics
          .metricErrors(this.apiName, this.stage)
          .count5XX.createAlarm(this, '5XXErrorAlarm', {
            alarmDescription: `at ${alarmThreshold}`,
            threshold: alarmThreshold,
            comparisonOperator:
              ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            evaluationPeriods: 1,
          }),
      );
    }

    this.watchful.addSection(props.title, {
      links: [
        {
          title: 'Amazon API Gateway Console',
          url: linkForApiGateway(props.restApi),
        },
      ],
    });
    [undefined, ...(props.watchedOperations || [])].forEach((operation) =>
      this.watchful.addWidgets(
        this.createCallGraphWidget(operation, alarmThreshold),
        ...(props.cacheGraph ? [this.createCacheGraphWidget(operation)] : []),
        this.createLatencyGraphWidget(operation),
        this.createIntegrationLatencyGraphWidget(operation),
      ),
    );
  }

  private createCallGraphWidget(
    opts?: WatchedOperation,
    alarmThreshold?: number,
  ) {
    const leftAnnotations: HorizontalAnnotation[] = alarmThreshold
      ? [{ value: alarmThreshold, color: '#ff0000', label: '5XX Errors Alarm' }]
      : [];

    return new GraphWidget({
      title: `${
        opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'
      } Calls/min`,
      width: 12,
      stacked: false,
      left: [
        this.metrics.metricCalls(this.apiName, this.stage, opts),
        this.metrics.metricErrors(this.apiName, this.stage, opts).count4XX,
        this.metrics.metricErrors(this.apiName, this.stage, opts).count5XX,
      ],
      leftAnnotations,
    });
  }

  private createCacheGraphWidget(opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${
        opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'
      } Cache/min`,
      width: 12,
      stacked: false,
      left: [
        this.metrics.metricCalls(this.apiName, this.stage, opts),
        this.metrics.metricCache(this.apiName, this.stage, opts).hits,
        this.metrics.metricCache(this.apiName, this.stage, opts).misses,
      ],
    });
  }

  private createLatencyGraphWidget(opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${
        opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'
      } (1-minute periods)`,
      width: 12,
      stacked: false,
      left: Object.values(
        this.metrics.metricLatency(this.apiName, this.stage, opts),
      ),
    });
  }

  private createIntegrationLatencyGraphWidget(opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${
        opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'
      } Integration (1-minute periods)`,
      width: 12,
      stacked: false,
      left: Object.values(
        this.metrics.metricIntegrationLatency(this.apiName, this.stage, opts),
      ),
    });
  }
}

/**
 * An operation (path and method) worth monitoring.
 */
export interface WatchedOperation {
  /**
   * The HTTP method for the operation (GET, POST, ...)
   */
  readonly httpMethod: string;

  /**
   * The REST API path for this operation (/, /resource/{id}, ...)
   */
  readonly resourcePath: string;
}

function linkForApiGateway(api: apigw.IRestApi) {
  return `https://console.aws.amazon.com/apigateway/home?region=${api.stack.region}#/apis/${api.restApiId}`;
}
