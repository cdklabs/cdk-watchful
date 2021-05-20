# API Reference

**Classes**

Name|Description
----|-----------
[WatchApiGateway](#cdk-watchful-watchapigateway)|*No description*
[WatchDynamoTable](#cdk-watchful-watchdynamotable)|*No description*
[WatchEcsService](#cdk-watchful-watchecsservice)|*No description*
[WatchLambdaFunction](#cdk-watchful-watchlambdafunction)|*No description*
[WatchRdsAurora](#cdk-watchful-watchrdsaurora)|*No description*
[Watchful](#cdk-watchful-watchful)|*No description*
[WatchfulAspect](#cdk-watchful-watchfulaspect)|A CDK aspect that can automatically watch all resources within a scope.


**Structs**

Name|Description
----|-----------
[QuickLink](#cdk-watchful-quicklink)|*No description*
[SectionOptions](#cdk-watchful-sectionoptions)|*No description*
[WatchApiGatewayOptions](#cdk-watchful-watchapigatewayoptions)|*No description*
[WatchApiGatewayProps](#cdk-watchful-watchapigatewayprops)|*No description*
[WatchDynamoTableOptions](#cdk-watchful-watchdynamotableoptions)|*No description*
[WatchDynamoTableProps](#cdk-watchful-watchdynamotableprops)|*No description*
[WatchEcsServiceOptions](#cdk-watchful-watchecsserviceoptions)|*No description*
[WatchEcsServiceProps](#cdk-watchful-watchecsserviceprops)|*No description*
[WatchLambdaFunctionOptions](#cdk-watchful-watchlambdafunctionoptions)|*No description*
[WatchLambdaFunctionProps](#cdk-watchful-watchlambdafunctionprops)|*No description*
[WatchRdsAuroraOptions](#cdk-watchful-watchrdsauroraoptions)|*No description*
[WatchRdsAuroraProps](#cdk-watchful-watchrdsauroraprops)|*No description*
[WatchedOperation](#cdk-watchful-watchedoperation)|An operation (path and method) worth monitoring.
[WatchfulAspectProps](#cdk-watchful-watchfulaspectprops)|*No description*
[WatchfulProps](#cdk-watchful-watchfulprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[IWatchful](#cdk-watchful-iwatchful)|*No description*



## class WatchApiGateway  <a id="cdk-watchful-watchapigateway"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WatchApiGateway(scope: Construct, id: string, props: WatchApiGatewayProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchApiGatewayProps](#cdk-watchful-watchapigatewayprops)</code>)  *No description*
  * **cacheGraph** (<code>boolean</code>)  Include a dashboard graph for caching metrics. __*Default*__: false
  * **serverErrorThreshold** (<code>number</code>)  Alarm when 5XX errors reach this threshold over 5 minutes. __*Default*__: 1 any 5xx HTTP response will trigger the alarm
  * **watchedOperations** (<code>Array<[WatchedOperation](#cdk-watchful-watchedoperation)></code>)  A list of operations to monitor separately. __*Default*__: only API-level monitoring is added.
  * **restApi** (<code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code>)  The API Gateway REST API that is being watched. 
  * **title** (<code>string</code>)  The title of this section. 
  * **watchful** (<code>[IWatchful](#cdk-watchful-iwatchful)</code>)  The Watchful instance to add widgets into. 




## class WatchDynamoTable  <a id="cdk-watchful-watchdynamotable"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WatchDynamoTable(scope: Construct, id: string, props: WatchDynamoTableProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchDynamoTableProps](#cdk-watchful-watchdynamotableprops)</code>)  *No description*
  * **readCapacityThresholdPercent** (<code>number</code>)  Threshold for read capacity alarm (percentage). __*Default*__: 80
  * **writeCapacityThresholdPercent** (<code>number</code>)  Threshold for read capacity alarm (percentage). __*Default*__: 80
  * **table** (<code>[Table](#aws-cdk-aws-dynamodb-table)</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **watchful** (<code>[IWatchful](#cdk-watchful-iwatchful)</code>)  *No description* 




## class WatchEcsService  <a id="cdk-watchful-watchecsservice"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WatchEcsService(scope: Construct, id: string, props: WatchEcsServiceProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchEcsServiceProps](#cdk-watchful-watchecsserviceprops)</code>)  *No description*
  * **cpuMaximumThresholdPercent** (<code>number</code>)  Threshold for the Cpu Maximum utilization. __*Default*__: 80
  * **memoryMaximumThresholdPercent** (<code>number</code>)  Threshold for the Memory Maximum utilization. __*Default*__: 0.
  * **requestsThreshold** (<code>number</code>)  Threshold for the Number of Requests. __*Default*__: 0.
  * **targetResponseTimeThreshold** (<code>number</code>)  Threshold for the Target Response Time. __*Default*__: 0.
  * **targetGroup** (<code>[ApplicationTargetGroup](#aws-cdk-aws-elasticloadbalancingv2-applicationtargetgroup)</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **watchful** (<code>[IWatchful](#cdk-watchful-iwatchful)</code>)  *No description* 
  * **ec2Service** (<code>[Ec2Service](#aws-cdk-aws-ecs-ec2service)</code>)  *No description* __*Optional*__
  * **fargateService** (<code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code>)  *No description* __*Optional*__




## class WatchLambdaFunction  <a id="cdk-watchful-watchlambdafunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WatchLambdaFunction(scope: Construct, id: string, props: WatchLambdaFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchLambdaFunctionProps](#cdk-watchful-watchlambdafunctionprops)</code>)  *No description*
  * **durationThresholdPercent** (<code>number</code>)  Threshold for the duration alarm as percentage of the function's timeout value. __*Default*__: 80
  * **errorsPerMinuteThreshold** (<code>number</code>)  Number of allowed errors per minute. __*Default*__: 0
  * **throttlesPerMinuteThreshold** (<code>number</code>)  Number of allowed throttles per minute. __*Default*__: 0
  * **fn** (<code>[Function](#aws-cdk-aws-lambda-function)</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **watchful** (<code>[IWatchful](#cdk-watchful-iwatchful)</code>)  *No description* 




## class WatchRdsAurora  <a id="cdk-watchful-watchrdsaurora"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WatchRdsAurora(scope: Construct, id: string, props: WatchRdsAuroraProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchRdsAuroraProps](#cdk-watchful-watchrdsauroraprops)</code>)  *No description*
  * **cpuMaximumThresholdPercent** (<code>number</code>)  Threshold for the Cpu Maximum utilization. __*Default*__: 80
  * **dbBufferCacheMinimumThreshold** (<code>number</code>)  Threshold for the Minimum Db Buffer Cache. __*Default*__: 0.
  * **dbConnectionsMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db Connections. __*Default*__: 0.
  * **dbReplicaLagMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db ReplicaLag. __*Default*__: 0.
  * **dbThroughputMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db Throughput. __*Default*__: 0.
  * **cluster** (<code>[DatabaseCluster](#aws-cdk-aws-rds-databasecluster)</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **watchful** (<code>[IWatchful](#cdk-watchful-iwatchful)</code>)  *No description* 




## class Watchful  <a id="cdk-watchful-watchful"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IWatchful](#cdk-watchful-iwatchful)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Watchful(scope: Construct, id: string, props?: WatchfulProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WatchfulProps](#cdk-watchful-watchfulprops)</code>)  *No description*
  * **alarmActionArns** (<code>Array<string></code>)  ARNs of actions to perform when alarms go off. __*Default*__: []
  * **alarmEmail** (<code>string</code>)  Email address to send alarms to. __*Default*__: alarms are not sent to an email recipient.
  * **alarmSns** (<code>[ITopic](#aws-cdk-aws-sns-itopic)</code>)  SNS topic to send alarms to. __*Default*__: alarms are not sent to an SNS Topic.
  * **alarmSqs** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  SQS queue to send alarms to. __*Default*__: alarms are not sent to an SQS queue.
  * **dashboardName** (<code>string</code>)  The name of the CloudWatch dashboard generated by Watchful. __*Default*__: auto-generated


### Methods


#### addAlarm(alarm) <a id="cdk-watchful-watchful-addalarm"></a>



```ts
addAlarm(alarm: Alarm): void
```

* **alarm** (<code>[Alarm](#aws-cdk-aws-cloudwatch-alarm)</code>)  *No description*




#### addSection(title, options?) <a id="cdk-watchful-watchful-addsection"></a>



```ts
addSection(title: string, options?: SectionOptions): void
```

* **title** (<code>string</code>)  *No description*
* **options** (<code>[SectionOptions](#cdk-watchful-sectionoptions)</code>)  *No description*
  * **links** (<code>Array<[QuickLink](#cdk-watchful-quicklink)></code>)  *No description* __*Optional*__




#### addWidgets(...widgets) <a id="cdk-watchful-watchful-addwidgets"></a>



```ts
addWidgets(...widgets: IWidget[]): void
```

* **widgets** (<code>[IWidget](#aws-cdk-aws-cloudwatch-iwidget)</code>)  *No description*




#### watchApiGateway(title, restApi, options?) <a id="cdk-watchful-watchful-watchapigateway"></a>



```ts
watchApiGateway(title: string, restApi: RestApi, options?: WatchApiGatewayOptions): WatchApiGateway
```

* **title** (<code>string</code>)  *No description*
* **restApi** (<code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code>)  *No description*
* **options** (<code>[WatchApiGatewayOptions](#cdk-watchful-watchapigatewayoptions)</code>)  *No description*
  * **cacheGraph** (<code>boolean</code>)  Include a dashboard graph for caching metrics. __*Default*__: false
  * **serverErrorThreshold** (<code>number</code>)  Alarm when 5XX errors reach this threshold over 5 minutes. __*Default*__: 1 any 5xx HTTP response will trigger the alarm
  * **watchedOperations** (<code>Array<[WatchedOperation](#cdk-watchful-watchedoperation)></code>)  A list of operations to monitor separately. __*Default*__: only API-level monitoring is added.

__Returns__:
* <code>[WatchApiGateway](#cdk-watchful-watchapigateway)</code>

#### watchDynamoTable(title, table, options?) <a id="cdk-watchful-watchful-watchdynamotable"></a>



```ts
watchDynamoTable(title: string, table: Table, options?: WatchDynamoTableOptions): WatchDynamoTable
```

* **title** (<code>string</code>)  *No description*
* **table** (<code>[Table](#aws-cdk-aws-dynamodb-table)</code>)  *No description*
* **options** (<code>[WatchDynamoTableOptions](#cdk-watchful-watchdynamotableoptions)</code>)  *No description*
  * **readCapacityThresholdPercent** (<code>number</code>)  Threshold for read capacity alarm (percentage). __*Default*__: 80
  * **writeCapacityThresholdPercent** (<code>number</code>)  Threshold for read capacity alarm (percentage). __*Default*__: 80

__Returns__:
* <code>[WatchDynamoTable](#cdk-watchful-watchdynamotable)</code>

#### watchEc2Ecs(title, ec2Service, targetGroup, options?) <a id="cdk-watchful-watchful-watchec2ecs"></a>



```ts
watchEc2Ecs(title: string, ec2Service: Ec2Service, targetGroup: ApplicationTargetGroup, options?: WatchEcsServiceOptions): WatchEcsService
```

* **title** (<code>string</code>)  *No description*
* **ec2Service** (<code>[Ec2Service](#aws-cdk-aws-ecs-ec2service)</code>)  *No description*
* **targetGroup** (<code>[ApplicationTargetGroup](#aws-cdk-aws-elasticloadbalancingv2-applicationtargetgroup)</code>)  *No description*
* **options** (<code>[WatchEcsServiceOptions](#cdk-watchful-watchecsserviceoptions)</code>)  *No description*
  * **cpuMaximumThresholdPercent** (<code>number</code>)  Threshold for the Cpu Maximum utilization. __*Default*__: 80
  * **memoryMaximumThresholdPercent** (<code>number</code>)  Threshold for the Memory Maximum utilization. __*Default*__: 0.
  * **requestsThreshold** (<code>number</code>)  Threshold for the Number of Requests. __*Default*__: 0.
  * **targetResponseTimeThreshold** (<code>number</code>)  Threshold for the Target Response Time. __*Default*__: 0.

__Returns__:
* <code>[WatchEcsService](#cdk-watchful-watchecsservice)</code>

#### watchFargateEcs(title, fargateService, targetGroup, options?) <a id="cdk-watchful-watchful-watchfargateecs"></a>



```ts
watchFargateEcs(title: string, fargateService: FargateService, targetGroup: ApplicationTargetGroup, options?: WatchEcsServiceOptions): WatchEcsService
```

* **title** (<code>string</code>)  *No description*
* **fargateService** (<code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code>)  *No description*
* **targetGroup** (<code>[ApplicationTargetGroup](#aws-cdk-aws-elasticloadbalancingv2-applicationtargetgroup)</code>)  *No description*
* **options** (<code>[WatchEcsServiceOptions](#cdk-watchful-watchecsserviceoptions)</code>)  *No description*
  * **cpuMaximumThresholdPercent** (<code>number</code>)  Threshold for the Cpu Maximum utilization. __*Default*__: 80
  * **memoryMaximumThresholdPercent** (<code>number</code>)  Threshold for the Memory Maximum utilization. __*Default*__: 0.
  * **requestsThreshold** (<code>number</code>)  Threshold for the Number of Requests. __*Default*__: 0.
  * **targetResponseTimeThreshold** (<code>number</code>)  Threshold for the Target Response Time. __*Default*__: 0.

__Returns__:
* <code>[WatchEcsService](#cdk-watchful-watchecsservice)</code>

#### watchLambdaFunction(title, fn, options?) <a id="cdk-watchful-watchful-watchlambdafunction"></a>



```ts
watchLambdaFunction(title: string, fn: Function, options?: WatchLambdaFunctionOptions): WatchLambdaFunction
```

* **title** (<code>string</code>)  *No description*
* **fn** (<code>[Function](#aws-cdk-aws-lambda-function)</code>)  *No description*
* **options** (<code>[WatchLambdaFunctionOptions](#cdk-watchful-watchlambdafunctionoptions)</code>)  *No description*
  * **durationThresholdPercent** (<code>number</code>)  Threshold for the duration alarm as percentage of the function's timeout value. __*Default*__: 80
  * **errorsPerMinuteThreshold** (<code>number</code>)  Number of allowed errors per minute. __*Default*__: 0
  * **throttlesPerMinuteThreshold** (<code>number</code>)  Number of allowed throttles per minute. __*Default*__: 0

__Returns__:
* <code>[WatchLambdaFunction](#cdk-watchful-watchlambdafunction)</code>

#### watchRdsAuroraCluster(title, cluster, options?) <a id="cdk-watchful-watchful-watchrdsauroracluster"></a>



```ts
watchRdsAuroraCluster(title: string, cluster: DatabaseCluster, options?: WatchRdsAuroraOptions): WatchRdsAurora
```

* **title** (<code>string</code>)  *No description*
* **cluster** (<code>[DatabaseCluster](#aws-cdk-aws-rds-databasecluster)</code>)  *No description*
* **options** (<code>[WatchRdsAuroraOptions](#cdk-watchful-watchrdsauroraoptions)</code>)  *No description*
  * **cpuMaximumThresholdPercent** (<code>number</code>)  Threshold for the Cpu Maximum utilization. __*Default*__: 80
  * **dbBufferCacheMinimumThreshold** (<code>number</code>)  Threshold for the Minimum Db Buffer Cache. __*Default*__: 0.
  * **dbConnectionsMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db Connections. __*Default*__: 0.
  * **dbReplicaLagMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db ReplicaLag. __*Default*__: 0.
  * **dbThroughputMaximumThreshold** (<code>number</code>)  Threshold for the Maximum Db Throughput. __*Default*__: 0.

__Returns__:
* <code>[WatchRdsAurora](#cdk-watchful-watchrdsaurora)</code>

#### watchScope(scope, options?) <a id="cdk-watchful-watchful-watchscope"></a>



```ts
watchScope(scope: Construct, options?: WatchfulAspectProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **options** (<code>[WatchfulAspectProps](#cdk-watchful-watchfulaspectprops)</code>)  *No description*
  * **apiGateway** (<code>boolean</code>)  Automatically watch API Gateway APIs in the scope. __*Default*__: true
  * **dynamodb** (<code>boolean</code>)  Automatically watch all Amazon DynamoDB tables in the scope. __*Default*__: true
  * **ec2ecs** (<code>boolean</code>)  Automatically watch ApplicationLoadBalanced EC2 Ecs Services in the scope (using ECS Pattern). __*Default*__: true
  * **fargateecs** (<code>boolean</code>)  Automatically watch ApplicationLoadBalanced Fargate Ecs Services in the scope (using ECS Pattern). __*Default*__: true
  * **lambda** (<code>boolean</code>)  Automatically watch AWS Lambda functions in the scope. __*Default*__: true
  * **rdsaurora** (<code>boolean</code>)  Automatically watch RDS Aurora clusters in the scope. __*Default*__: true






## class WatchfulAspect  <a id="cdk-watchful-watchfulaspect"></a>

A CDK aspect that can automatically watch all resources within a scope.

__Implements__: [IAspect](#aws-cdk-core-iaspect)

### Initializer


Defines a watchful aspect.

```ts
new WatchfulAspect(watchful: Watchful, props?: WatchfulAspectProps)
```

* **watchful** (<code>[Watchful](#cdk-watchful-watchful)</code>)  The watchful to add those resources to.
* **props** (<code>[WatchfulAspectProps](#cdk-watchful-watchfulaspectprops)</code>)  Options.
  * **apiGateway** (<code>boolean</code>)  Automatically watch API Gateway APIs in the scope. __*Default*__: true
  * **dynamodb** (<code>boolean</code>)  Automatically watch all Amazon DynamoDB tables in the scope. __*Default*__: true
  * **ec2ecs** (<code>boolean</code>)  Automatically watch ApplicationLoadBalanced EC2 Ecs Services in the scope (using ECS Pattern). __*Default*__: true
  * **fargateecs** (<code>boolean</code>)  Automatically watch ApplicationLoadBalanced Fargate Ecs Services in the scope (using ECS Pattern). __*Default*__: true
  * **lambda** (<code>boolean</code>)  Automatically watch AWS Lambda functions in the scope. __*Default*__: true
  * **rdsaurora** (<code>boolean</code>)  Automatically watch RDS Aurora clusters in the scope. __*Default*__: true


### Methods


#### visit(node) <a id="cdk-watchful-watchfulaspect-visit"></a>

All aspects can visit an IConstruct.

```ts
visit(node: IConstruct): void
```

* **node** (<code>[IConstruct](#aws-cdk-core-iconstruct)</code>)  *No description*






## interface IWatchful  <a id="cdk-watchful-iwatchful"></a>

__Implemented by__: [Watchful](#cdk-watchful-watchful)


### Methods


#### addAlarm(alarm) <a id="cdk-watchful-iwatchful-addalarm"></a>



```ts
addAlarm(alarm: Alarm): void
```

* **alarm** (<code>[Alarm](#aws-cdk-aws-cloudwatch-alarm)</code>)  *No description*




#### addSection(title, options?) <a id="cdk-watchful-iwatchful-addsection"></a>



```ts
addSection(title: string, options?: SectionOptions): void
```

* **title** (<code>string</code>)  *No description*
* **options** (<code>[SectionOptions](#cdk-watchful-sectionoptions)</code>)  *No description*
  * **links** (<code>Array<[QuickLink](#cdk-watchful-quicklink)></code>)  *No description* __*Optional*__




#### addWidgets(...widgets) <a id="cdk-watchful-iwatchful-addwidgets"></a>



```ts
addWidgets(...widgets: IWidget[]): void
```

* **widgets** (<code>[IWidget](#aws-cdk-aws-cloudwatch-iwidget)</code>)  *No description*






## struct QuickLink  <a id="cdk-watchful-quicklink"></a>






Name | Type | Description 
-----|------|-------------
**title** | <code>string</code> | <span></span>
**url** | <code>string</code> | <span></span>



## struct SectionOptions  <a id="cdk-watchful-sectionoptions"></a>






Name | Type | Description 
-----|------|-------------
**links**? | <code>Array<[QuickLink](#cdk-watchful-quicklink)></code> | __*Optional*__



## struct WatchApiGatewayOptions  <a id="cdk-watchful-watchapigatewayoptions"></a>






Name | Type | Description 
-----|------|-------------
**cacheGraph**? | <code>boolean</code> | Include a dashboard graph for caching metrics.<br/>__*Default*__: false
**serverErrorThreshold**? | <code>number</code> | Alarm when 5XX errors reach this threshold over 5 minutes.<br/>__*Default*__: 1 any 5xx HTTP response will trigger the alarm
**watchedOperations**? | <code>Array<[WatchedOperation](#cdk-watchful-watchedoperation)></code> | A list of operations to monitor separately.<br/>__*Default*__: only API-level monitoring is added.



## struct WatchApiGatewayProps  <a id="cdk-watchful-watchapigatewayprops"></a>






Name | Type | Description 
-----|------|-------------
**restApi** | <code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code> | The API Gateway REST API that is being watched.
**title** | <code>string</code> | The title of this section.
**watchful** | <code>[IWatchful](#cdk-watchful-iwatchful)</code> | The Watchful instance to add widgets into.
**cacheGraph**? | <code>boolean</code> | Include a dashboard graph for caching metrics.<br/>__*Default*__: false
**serverErrorThreshold**? | <code>number</code> | Alarm when 5XX errors reach this threshold over 5 minutes.<br/>__*Default*__: 1 any 5xx HTTP response will trigger the alarm
**watchedOperations**? | <code>Array<[WatchedOperation](#cdk-watchful-watchedoperation)></code> | A list of operations to monitor separately.<br/>__*Default*__: only API-level monitoring is added.



## struct WatchDynamoTableOptions  <a id="cdk-watchful-watchdynamotableoptions"></a>






Name | Type | Description 
-----|------|-------------
**readCapacityThresholdPercent**? | <code>number</code> | Threshold for read capacity alarm (percentage).<br/>__*Default*__: 80
**writeCapacityThresholdPercent**? | <code>number</code> | Threshold for read capacity alarm (percentage).<br/>__*Default*__: 80



## struct WatchDynamoTableProps  <a id="cdk-watchful-watchdynamotableprops"></a>






Name | Type | Description 
-----|------|-------------
**table** | <code>[Table](#aws-cdk-aws-dynamodb-table)</code> | <span></span>
**title** | <code>string</code> | <span></span>
**watchful** | <code>[IWatchful](#cdk-watchful-iwatchful)</code> | <span></span>
**readCapacityThresholdPercent**? | <code>number</code> | Threshold for read capacity alarm (percentage).<br/>__*Default*__: 80
**writeCapacityThresholdPercent**? | <code>number</code> | Threshold for read capacity alarm (percentage).<br/>__*Default*__: 80



## struct WatchEcsServiceOptions  <a id="cdk-watchful-watchecsserviceoptions"></a>






Name | Type | Description 
-----|------|-------------
**cpuMaximumThresholdPercent**? | <code>number</code> | Threshold for the Cpu Maximum utilization.<br/>__*Default*__: 80
**memoryMaximumThresholdPercent**? | <code>number</code> | Threshold for the Memory Maximum utilization.<br/>__*Default*__: 0.
**requestsThreshold**? | <code>number</code> | Threshold for the Number of Requests.<br/>__*Default*__: 0.
**targetResponseTimeThreshold**? | <code>number</code> | Threshold for the Target Response Time.<br/>__*Default*__: 0.



## struct WatchEcsServiceProps  <a id="cdk-watchful-watchecsserviceprops"></a>






Name | Type | Description 
-----|------|-------------
**targetGroup** | <code>[ApplicationTargetGroup](#aws-cdk-aws-elasticloadbalancingv2-applicationtargetgroup)</code> | <span></span>
**title** | <code>string</code> | <span></span>
**watchful** | <code>[IWatchful](#cdk-watchful-iwatchful)</code> | <span></span>
**cpuMaximumThresholdPercent**? | <code>number</code> | Threshold for the Cpu Maximum utilization.<br/>__*Default*__: 80
**ec2Service**? | <code>[Ec2Service](#aws-cdk-aws-ecs-ec2service)</code> | __*Optional*__
**fargateService**? | <code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code> | __*Optional*__
**memoryMaximumThresholdPercent**? | <code>number</code> | Threshold for the Memory Maximum utilization.<br/>__*Default*__: 0.
**requestsThreshold**? | <code>number</code> | Threshold for the Number of Requests.<br/>__*Default*__: 0.
**targetResponseTimeThreshold**? | <code>number</code> | Threshold for the Target Response Time.<br/>__*Default*__: 0.



## struct WatchLambdaFunctionOptions  <a id="cdk-watchful-watchlambdafunctionoptions"></a>






Name | Type | Description 
-----|------|-------------
**durationThresholdPercent**? | <code>number</code> | Threshold for the duration alarm as percentage of the function's timeout value.<br/>__*Default*__: 80
**errorsPerMinuteThreshold**? | <code>number</code> | Number of allowed errors per minute.<br/>__*Default*__: 0
**throttlesPerMinuteThreshold**? | <code>number</code> | Number of allowed throttles per minute.<br/>__*Default*__: 0



## struct WatchLambdaFunctionProps  <a id="cdk-watchful-watchlambdafunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**fn** | <code>[Function](#aws-cdk-aws-lambda-function)</code> | <span></span>
**title** | <code>string</code> | <span></span>
**watchful** | <code>[IWatchful](#cdk-watchful-iwatchful)</code> | <span></span>
**durationThresholdPercent**? | <code>number</code> | Threshold for the duration alarm as percentage of the function's timeout value.<br/>__*Default*__: 80
**errorsPerMinuteThreshold**? | <code>number</code> | Number of allowed errors per minute.<br/>__*Default*__: 0
**throttlesPerMinuteThreshold**? | <code>number</code> | Number of allowed throttles per minute.<br/>__*Default*__: 0



## struct WatchRdsAuroraOptions  <a id="cdk-watchful-watchrdsauroraoptions"></a>






Name | Type | Description 
-----|------|-------------
**cpuMaximumThresholdPercent**? | <code>number</code> | Threshold for the Cpu Maximum utilization.<br/>__*Default*__: 80
**dbBufferCacheMinimumThreshold**? | <code>number</code> | Threshold for the Minimum Db Buffer Cache.<br/>__*Default*__: 0.
**dbConnectionsMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db Connections.<br/>__*Default*__: 0.
**dbReplicaLagMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db ReplicaLag.<br/>__*Default*__: 0.
**dbThroughputMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db Throughput.<br/>__*Default*__: 0.



## struct WatchRdsAuroraProps  <a id="cdk-watchful-watchrdsauroraprops"></a>






Name | Type | Description 
-----|------|-------------
**cluster** | <code>[DatabaseCluster](#aws-cdk-aws-rds-databasecluster)</code> | <span></span>
**title** | <code>string</code> | <span></span>
**watchful** | <code>[IWatchful](#cdk-watchful-iwatchful)</code> | <span></span>
**cpuMaximumThresholdPercent**? | <code>number</code> | Threshold for the Cpu Maximum utilization.<br/>__*Default*__: 80
**dbBufferCacheMinimumThreshold**? | <code>number</code> | Threshold for the Minimum Db Buffer Cache.<br/>__*Default*__: 0.
**dbConnectionsMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db Connections.<br/>__*Default*__: 0.
**dbReplicaLagMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db ReplicaLag.<br/>__*Default*__: 0.
**dbThroughputMaximumThreshold**? | <code>number</code> | Threshold for the Maximum Db Throughput.<br/>__*Default*__: 0.



## struct WatchedOperation  <a id="cdk-watchful-watchedoperation"></a>


An operation (path and method) worth monitoring.



Name | Type | Description 
-----|------|-------------
**httpMethod** | <code>string</code> | The HTTP method for the operation (GET, POST, ...).
**resourcePath** | <code>string</code> | The REST API path for this operation (/, /resource/{id}, ...).



## struct WatchfulAspectProps  <a id="cdk-watchful-watchfulaspectprops"></a>






Name | Type | Description 
-----|------|-------------
**apiGateway**? | <code>boolean</code> | Automatically watch API Gateway APIs in the scope.<br/>__*Default*__: true
**dynamodb**? | <code>boolean</code> | Automatically watch all Amazon DynamoDB tables in the scope.<br/>__*Default*__: true
**ec2ecs**? | <code>boolean</code> | Automatically watch ApplicationLoadBalanced EC2 Ecs Services in the scope (using ECS Pattern).<br/>__*Default*__: true
**fargateecs**? | <code>boolean</code> | Automatically watch ApplicationLoadBalanced Fargate Ecs Services in the scope (using ECS Pattern).<br/>__*Default*__: true
**lambda**? | <code>boolean</code> | Automatically watch AWS Lambda functions in the scope.<br/>__*Default*__: true
**rdsaurora**? | <code>boolean</code> | Automatically watch RDS Aurora clusters in the scope.<br/>__*Default*__: true



## struct WatchfulProps  <a id="cdk-watchful-watchfulprops"></a>






Name | Type | Description 
-----|------|-------------
**alarmActionArns**? | <code>Array<string></code> | ARNs of actions to perform when alarms go off.<br/>__*Default*__: []
**alarmEmail**? | <code>string</code> | Email address to send alarms to.<br/>__*Default*__: alarms are not sent to an email recipient.
**alarmSns**? | <code>[ITopic](#aws-cdk-aws-sns-itopic)</code> | SNS topic to send alarms to.<br/>__*Default*__: alarms are not sent to an SNS Topic.
**alarmSqs**? | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | SQS queue to send alarms to.<br/>__*Default*__: alarms are not sent to an SQS queue.
**dashboardName**? | <code>string</code> | The name of the CloudWatch dashboard generated by Watchful.<br/>__*Default*__: auto-generated



