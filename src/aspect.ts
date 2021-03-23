import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import * as firehose from '@aws-cdk/aws-kinesisfirehose';
import * as lambda from '@aws-cdk/aws-lambda';
import * as rds from '@aws-cdk/aws-rds';
import { IAspect, IConstruct } from '@aws-cdk/core';

export interface WatchfulAspectProps {
  /**
   * Automatically watch API Gateway APIs in the scope.
   * @default true
   */
  readonly apiGateway?: boolean;

  /**
   * Automatically watch all Amazon DynamoDB tables in the scope.
   * @default true
   */
  readonly dynamodb?: boolean;

  /**
   * Automatically watch AWS firehose in the scope.
   * @default true
   */
  readonly firehose?: boolean;

  /**
   * Automatically watch AWS Lambda functions in the scope.
   * @default true
   */
  readonly lambdaFn?: boolean;

  /**
   * Automatically watch RDS Aurora clusters in the scope.
   * @default true
   */
  readonly rdsaurora?: boolean;

  /**
   * Automatically watch ApplicationLoadBalanced Fargate Ecs Services in the scope (using ECS Pattern).
   * @default true
   */
  readonly fargateecs?: boolean;

  /**
   * Automatically watch ApplicationLoadBalanced EC2 Ecs Services in the scope (using ECS Pattern).
   * @default true
   */
  readonly ec2ecs?: boolean;
}

/**
 * A CDK aspect that can automatically watch all resources within a scope.
 */
export class WatchfulAspect implements IAspect {
  /**
   * Defines a watchful aspect
   * @param watchful The watchful to add those resources to
   * @param props Options
   */
  constructor(private readonly watchful: Watchful, private readonly props: WatchfulAspectProps = {}) {}

  public visit(node: IConstruct): void {
    const watchApiGateway = this.props.apiGateway === undefined ? true : this.props.apiGateway;
    const watchDynamo = this.props.dynamodb === undefined ? true : this.props.dynamodb;
    const watchLambda = this.props.lambdaFn === undefined ? true : this.props.lambdaFn;
    const watchFirehose = this.props.firehose === undefined ? true : this.props.firehose;
    const watchRdsAuroraCluster = this.props.rdsaurora === undefined ? true : this.props.rdsaurora;
    const watchFargateEcs = this.props.fargateecs === undefined ? true : this.props.fargateecs;
    const watchEc2Ecs = this.props.ec2ecs === undefined ? true : this.props.ec2ecs;

    if (watchApiGateway && node instanceof apigw.RestApi) {
      this.watchful.watchApiGateway(node.node.path, node);
    }

    if (watchDynamo && node instanceof dynamodb.Table) {
      this.watchful.watchDynamoTable(node.node.path, node);
    }

    if (watchFirehose && node instanceof firehose.CfnDeliveryStream) {
      this.watchful.watchFirehose(node.node.path, node);
    }

    if (watchLambda && node instanceof lambda.Function) {
      this.watchful.watchLambdaFunction(node.node.path, node);
    }

    if (watchRdsAuroraCluster && node instanceof rds.DatabaseCluster) {
      this.watchful.watchRdsAuroraCluster(node.node.path, node);
    }

    if (watchFargateEcs && node instanceof ecs_patterns.ApplicationLoadBalancedFargateService) {
      this.watchful.watchFargateEcs(node.node.path, node.service, node.targetGroup);
    }

    if (watchEc2Ecs && node instanceof ecs_patterns.ApplicationLoadBalancedEc2Service) {
      this.watchful.watchEc2Ecs(node.node.path, node.service, node.targetGroup);
    }
  }
}

import { Watchful } from './watchful';
