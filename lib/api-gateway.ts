import apigw = require('@aws-cdk/aws-apigateway');
import { Metric, MetricOptions, ComparisonOperator, GraphWidget } from '@aws-cdk/aws-cloudwatch';
import { Construct, Duration } from '@aws-cdk/core';
import { IWatchful } from './api';

export interface WatchApiGatewayRestApiOptions {
  /**
   * Alarm when 5XX errors reach this threshold over 5 minutes.
   *
   * @default - no alarm.
   */
  readonly serverErrorThreshold?: number;

  /**
   * A list of operations to monitor separately.
   *
   * @default - only API-level monitoring is added.
   */
  readonly watchedOperations?: WatchedOperation[];
}

export interface WatchApiGatewayRestApiProps extends WatchApiGatewayRestApiOptions {
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

export class WatchApiGatewayRestApi extends Construct {
  private readonly api: apigw.CfnRestApi;
  private readonly stage: string;
  private readonly watchful: IWatchful;

  constructor(scope: Construct, id: string, props: WatchApiGatewayRestApiProps) {
    super(scope, id);

    this.api = props.restApi.node.findChild('Resource') as apigw.CfnRestApi;
    this.stage = props.restApi.deploymentStage.stageName;
    this.watchful = props.watchful;

    if (props.serverErrorThreshold) {
      this.watchful.addAlarm(
        this.createApiGatewayMetric(ApiGatewayMetric.FiveHundredError)
          .createAlarm(this, '5XXErrorAlarm', {
            alarmDescription: `at ${props.serverErrorThreshold}`,
            threshold: props.serverErrorThreshold,
            period: Duration.minutes(5),
            comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            evaluationPeriods: 1,
            statistic: 'sum',
          })
      );
    }

    this.watchful.addSection(props.title, {
      links: [{ title: 'Amazon API Gateway Console', url: linkForApiGateway(props.restApi) }]
    });
    [undefined, ...props.watchedOperations || []].forEach(operation =>
      this.watchful.addWidgets(
        this.createCallGraphWidget(operation),
        this.createCacheGraphWidget(operation),
        this.createLatencyGraphWidget(ApiGatewayMetric.Latency, operation),
        this.createLatencyGraphWidget(ApiGatewayMetric.IntegrationLatency, operation),
      )
    );
  }

  private createCallGraphWidget(opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'} Calls`,
      width: 12,
      stacked: false,
      left: [
        this.createApiGatewayMetric(ApiGatewayMetric.Count, opts, { label: 'Calls', statistic: 'sum', color: '#1f77b4' }),
        this.createApiGatewayMetric(ApiGatewayMetric.FourHundredError, opts, { label: 'HTTP 4XX', statistic: 'sum', color: '#ff7f0e' }),
        this.createApiGatewayMetric(ApiGatewayMetric.FiveHundredError, opts, { label: 'HTTP 5XX', statistic: 'sum', color: '#d62728' }),
      ],
    });
  }

  private createCacheGraphWidget(opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'} Cache`,
      width: 12,
      stacked: false,
      left: [
        this.createApiGatewayMetric(ApiGatewayMetric.Count, opts, { label: 'Calls', statistic: 'sum', color: '#1f77b4' }),
        this.createApiGatewayMetric(ApiGatewayMetric.CacheHitCount, opts, { label: 'Cache Hit', statistic: 'sum', color: '#2ca02c' }),
        this.createApiGatewayMetric(ApiGatewayMetric.CacheMissCount, opts, { label: 'Cache Miss', statistic: 'sum', color: '#d62728' }),
      ],
    });
  }

  private createLatencyGraphWidget(metric: ApiGatewayMetric, opts?: WatchedOperation) {
    return new GraphWidget({
      title: `${opts ? `${opts.httpMethod} ${opts.resourcePath}` : 'Overall'} ${metric}`,
      width: 12,
      stacked: false,
      left: ['min', 'avg', 'p90', 'p99', 'max'].map(statistic =>
        this.createApiGatewayMetric(metric, opts, { label: statistic, statistic })),
    });
  }

  private createApiGatewayMetric(
    metricName: ApiGatewayMetric,
    opts?: WatchedOperation,
    metricOpts?: MetricOptions
  ): Metric {
    return new Metric({
      metricName,
      namespace: 'AWS/ApiGateway',
      dimensions: {
        ApiName: this.api.name,
        Stage: this.stage,
        ...opts && {
          Method: opts.httpMethod,
          Resource: opts.resourcePath,
        },
      },
      ...metricOpts,
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

const enum ApiGatewayMetric {
  FourHundredError = '4XXError',
  FiveHundredError = '5XXError',
  CacheHitCount = 'CacheHitCount',
  CacheMissCount = 'CacheMissCount',
  Count = 'Count',
  IntegrationLatency = 'IntegrationLatency',
  Latency = 'Latency',
}

function linkForApiGateway(api: apigw.IRestApi) {
  return `https://console.aws.amazon.com/apigateway/home?region=${api.stack.region}#/apis/${api.restApiId}`;
}
