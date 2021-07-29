# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### WatchApiGateway <a name="@myhelix/cdk-watchful.WatchApiGateway"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchApiGateway.Initializer"></a>

```typescript
import { WatchApiGateway } from '@myhelix/cdk-watchful'

new WatchApiGateway(scope: Construct, id: string, props: WatchApiGatewayProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGateway.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGateway.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGateway.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchApiGatewayProps`](#@myhelix/cdk-watchful.WatchApiGatewayProps)

---





### WatchDynamoTable <a name="@myhelix/cdk-watchful.WatchDynamoTable"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchDynamoTable.Initializer"></a>

```typescript
import { WatchDynamoTable } from '@myhelix/cdk-watchful'

new WatchDynamoTable(scope: Construct, id: string, props: WatchDynamoTableProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTable.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTable.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTable.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchDynamoTableProps`](#@myhelix/cdk-watchful.WatchDynamoTableProps)

---





### WatchEcsService <a name="@myhelix/cdk-watchful.WatchEcsService"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchEcsService.Initializer"></a>

```typescript
import { WatchEcsService } from '@myhelix/cdk-watchful'

new WatchEcsService(scope: Construct, id: string, props: WatchEcsServiceProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsService.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsService.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsService.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchEcsServiceProps`](#@myhelix/cdk-watchful.WatchEcsServiceProps)

---





### WatchFirehoseService <a name="@myhelix/cdk-watchful.WatchFirehoseService"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchFirehoseService.Initializer"></a>

```typescript
import { WatchFirehoseService } from '@myhelix/cdk-watchful'

new WatchFirehoseService(scope: Construct, id: string, props: WatchFirehoseServiceProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseService.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseService.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseService.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchFirehoseServiceProps`](#@myhelix/cdk-watchful.WatchFirehoseServiceProps)

---





### Watchful <a name="@myhelix/cdk-watchful.Watchful"></a>

- *Implements:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

#### Initializer <a name="@myhelix/cdk-watchful.Watchful.Initializer"></a>

```typescript
import { Watchful } from '@myhelix/cdk-watchful'

new Watchful(scope: Construct, id: string, props?: WatchfulProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchfulProps`](#@myhelix/cdk-watchful.WatchfulProps)

---

#### Methods <a name="Methods"></a>

##### `addAlarm` <a name="@myhelix/cdk-watchful.Watchful.addAlarm"></a>

```typescript
public addAlarm(alarm: Alarm, autoResolveEvents?: boolean)
```

###### `alarm`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.alarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

###### `autoResolveEvents`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.autoResolveEvents"></a>

- *Type:* `boolean`

---

##### `addSection` <a name="@myhelix/cdk-watchful.Watchful.addSection"></a>

```typescript
public addSection(title: string, options?: SectionOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.SectionOptions`](#@myhelix/cdk-watchful.SectionOptions)

---

##### `addWidgets` <a name="@myhelix/cdk-watchful.Watchful.addWidgets"></a>

```typescript
public addWidgets(widgets: IWidget)
```

###### `widgets`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.widgets"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.IWidget`](#@aws-cdk/aws-cloudwatch.IWidget)

---

##### `watchApiGateway` <a name="@myhelix/cdk-watchful.Watchful.watchApiGateway"></a>

```typescript
public watchApiGateway(title: string, restApi: RestApi, options?: WatchApiGatewayOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `restApi`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.restApi"></a>

- *Type:* [`@aws-cdk/aws-apigateway.RestApi`](#@aws-cdk/aws-apigateway.RestApi)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchApiGatewayOptions`](#@myhelix/cdk-watchful.WatchApiGatewayOptions)

---

##### `watchDynamoTable` <a name="@myhelix/cdk-watchful.Watchful.watchDynamoTable"></a>

```typescript
public watchDynamoTable(title: string, table: Table, options?: WatchDynamoTableOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `table`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.table"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchDynamoTableOptions`](#@myhelix/cdk-watchful.WatchDynamoTableOptions)

---

##### `watchEc2Ecs` <a name="@myhelix/cdk-watchful.Watchful.watchEc2Ecs"></a>

```typescript
public watchEc2Ecs(title: string, ec2Service: Ec2Service, targetGroup: ApplicationTargetGroup, options?: WatchEcsServiceOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `ec2Service`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.ec2Service"></a>

- *Type:* [`@aws-cdk/aws-ecs.Ec2Service`](#@aws-cdk/aws-ecs.Ec2Service)

---

###### `targetGroup`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.targetGroup"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup`](#@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchEcsServiceOptions`](#@myhelix/cdk-watchful.WatchEcsServiceOptions)

---

##### `watchFargateEcs` <a name="@myhelix/cdk-watchful.Watchful.watchFargateEcs"></a>

```typescript
public watchFargateEcs(title: string, fargateService: FargateService, targetGroup: ApplicationTargetGroup, options?: WatchEcsServiceOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `fargateService`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.fargateService"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateService`](#@aws-cdk/aws-ecs.FargateService)

---

###### `targetGroup`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.targetGroup"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup`](#@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchEcsServiceOptions`](#@myhelix/cdk-watchful.WatchEcsServiceOptions)

---

##### `watchFirehose` <a name="@myhelix/cdk-watchful.Watchful.watchFirehose"></a>

```typescript
public watchFirehose(title: string, fh: CfnDeliveryStream, options?: WatchFirehoseServiceOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `fh`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.fh"></a>

- *Type:* [`@aws-cdk/aws-kinesisfirehose.CfnDeliveryStream`](#@aws-cdk/aws-kinesisfirehose.CfnDeliveryStream)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchFirehoseServiceOptions`](#@myhelix/cdk-watchful.WatchFirehoseServiceOptions)

---

##### `watchLambdaFunction` <a name="@myhelix/cdk-watchful.Watchful.watchLambdaFunction"></a>

```typescript
public watchLambdaFunction(title: string, fn: IFunction, options?: WatchLambdaFunctionOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `fn`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.fn"></a>

- *Type:* [`@aws-cdk/aws-lambda.IFunction`](#@aws-cdk/aws-lambda.IFunction)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchLambdaFunctionOptions`](#@myhelix/cdk-watchful.WatchLambdaFunctionOptions)

---

##### `watchRdsAuroraCluster` <a name="@myhelix/cdk-watchful.Watchful.watchRdsAuroraCluster"></a>

```typescript
public watchRdsAuroraCluster(title: string, cluster: DatabaseCluster, options?: WatchRdsAuroraOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.title"></a>

- *Type:* `string`

---

###### `cluster`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.cluster"></a>

- *Type:* [`@aws-cdk/aws-rds.DatabaseCluster`](#@aws-cdk/aws-rds.DatabaseCluster)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchRdsAuroraOptions`](#@myhelix/cdk-watchful.WatchRdsAuroraOptions)

---

##### `watchScope` <a name="@myhelix/cdk-watchful.Watchful.watchScope"></a>

```typescript
public watchScope(scope: Construct, options?: WatchfulAspectProps)
```

###### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.Watchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchfulAspectProps`](#@myhelix/cdk-watchful.WatchfulAspectProps)

---




### WatchLambdaFunction <a name="@myhelix/cdk-watchful.WatchLambdaFunction"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchLambdaFunction.Initializer"></a>

```typescript
import { WatchLambdaFunction } from '@myhelix/cdk-watchful'

new WatchLambdaFunction(scope: Construct, id: string, props: WatchLambdaFunctionProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunction.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunction.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunction.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchLambdaFunctionProps`](#@myhelix/cdk-watchful.WatchLambdaFunctionProps)

---





### WatchRdsAurora <a name="@myhelix/cdk-watchful.WatchRdsAurora"></a>

#### Initializer <a name="@myhelix/cdk-watchful.WatchRdsAurora.Initializer"></a>

```typescript
import { WatchRdsAurora } from '@myhelix/cdk-watchful'

new WatchRdsAurora(scope: Construct, id: string, props: WatchRdsAuroraProps)
```

##### `scope`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAurora.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAurora.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAurora.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchRdsAuroraProps`](#@myhelix/cdk-watchful.WatchRdsAuroraProps)

---





## Structs <a name="Structs"></a>

### QuickLink <a name="@myhelix/cdk-watchful.QuickLink"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { QuickLink } from '@myhelix/cdk-watchful'

const quickLink: QuickLink = { ... }
```

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.QuickLink.property.title"></a>

- *Type:* `string`

---

##### `url`<sup>Required</sup> <a name="@myhelix/cdk-watchful.QuickLink.property.url"></a>

- *Type:* `string`

---

### SectionOptions <a name="@myhelix/cdk-watchful.SectionOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { SectionOptions } from '@myhelix/cdk-watchful'

const sectionOptions: SectionOptions = { ... }
```

##### `links`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.SectionOptions.property.links"></a>

- *Type:* [`@myhelix/cdk-watchful.QuickLink`](#@myhelix/cdk-watchful.QuickLink)[]

---

### WatchApiGatewayOptions <a name="@myhelix/cdk-watchful.WatchApiGatewayOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchApiGatewayOptions } from '@myhelix/cdk-watchful'

const watchApiGatewayOptions: WatchApiGatewayOptions = { ... }
```

##### `cacheGraph`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayOptions.property.cacheGraph"></a>

- *Type:* `boolean`
- *Default:* false

Include a dashboard graph for caching metrics.

---

##### `serverErrorThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayOptions.property.serverErrorThreshold"></a>

- *Type:* `number`
- *Default:* 1 any 5xx HTTP response will trigger the alarm

Alarm when 5XX errors reach this threshold over 5 minutes.

---

##### `watchedOperations`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayOptions.property.watchedOperations"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchedOperation`](#@myhelix/cdk-watchful.WatchedOperation)[]
- *Default:* only API-level monitoring is added.

A list of operations to monitor separately.

---

### WatchApiGatewayProps <a name="@myhelix/cdk-watchful.WatchApiGatewayProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchApiGatewayProps } from '@myhelix/cdk-watchful'

const watchApiGatewayProps: WatchApiGatewayProps = { ... }
```

##### `cacheGraph`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.cacheGraph"></a>

- *Type:* `boolean`
- *Default:* false

Include a dashboard graph for caching metrics.

---

##### `serverErrorThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.serverErrorThreshold"></a>

- *Type:* `number`
- *Default:* 1 any 5xx HTTP response will trigger the alarm

Alarm when 5XX errors reach this threshold over 5 minutes.

---

##### `watchedOperations`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.watchedOperations"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchedOperation`](#@myhelix/cdk-watchful.WatchedOperation)[]
- *Default:* only API-level monitoring is added.

A list of operations to monitor separately.

---

##### `restApi`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.restApi"></a>

- *Type:* [`@aws-cdk/aws-apigateway.RestApi`](#@aws-cdk/aws-apigateway.RestApi)

The API Gateway REST API that is being watched.

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.title"></a>

- *Type:* `string`

The title of this section.

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchApiGatewayProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

The Watchful instance to add widgets into.

---

### WatchDynamoTableOptions <a name="@myhelix/cdk-watchful.WatchDynamoTableOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchDynamoTableOptions } from '@myhelix/cdk-watchful'

const watchDynamoTableOptions: WatchDynamoTableOptions = { ... }
```

##### `readCapacityThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableOptions.property.readCapacityThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for read capacity alarm (percentage).

---

##### `writeCapacityThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableOptions.property.writeCapacityThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for read capacity alarm (percentage).

---

### WatchDynamoTableProps <a name="@myhelix/cdk-watchful.WatchDynamoTableProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchDynamoTableProps } from '@myhelix/cdk-watchful'

const watchDynamoTableProps: WatchDynamoTableProps = { ... }
```

##### `readCapacityThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableProps.property.readCapacityThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for read capacity alarm (percentage).

---

##### `writeCapacityThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableProps.property.writeCapacityThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for read capacity alarm (percentage).

---

##### `table`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableProps.property.table"></a>

- *Type:* [`@aws-cdk/aws-dynamodb.Table`](#@aws-cdk/aws-dynamodb.Table)

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableProps.property.title"></a>

- *Type:* `string`

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchDynamoTableProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

---

### WatchEcsServiceOptions <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchEcsServiceOptions } from '@myhelix/cdk-watchful'

const watchEcsServiceOptions: WatchEcsServiceOptions = { ... }
```

##### `cpuMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions.property.cpuMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Cpu Maximum utilization.

---

##### `memoryMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions.property.memoryMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Memory Maximum utilization.

---

##### `requestsErrorRateThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions.property.requestsErrorRateThreshold"></a>

- *Type:* `number`
- *Default:* 0

Threshold for the Request Error rate.

---

##### `requestsThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions.property.requestsThreshold"></a>

- *Type:* `number`
- *Default:* 1000

Threshold for the Number of Requests.

---

##### `targetResponseTimeThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceOptions.property.targetResponseTimeThreshold"></a>

- *Type:* `number`
- *Default:* 1

Threshold for the Target Response Time.

---

### WatchEcsServiceProps <a name="@myhelix/cdk-watchful.WatchEcsServiceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchEcsServiceProps } from '@myhelix/cdk-watchful'

const watchEcsServiceProps: WatchEcsServiceProps = { ... }
```

##### `cpuMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.cpuMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Cpu Maximum utilization.

---

##### `memoryMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.memoryMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Memory Maximum utilization.

---

##### `requestsErrorRateThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.requestsErrorRateThreshold"></a>

- *Type:* `number`
- *Default:* 0

Threshold for the Request Error rate.

---

##### `requestsThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.requestsThreshold"></a>

- *Type:* `number`
- *Default:* 1000

Threshold for the Number of Requests.

---

##### `targetResponseTimeThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.targetResponseTimeThreshold"></a>

- *Type:* `number`
- *Default:* 1

Threshold for the Target Response Time.

---

##### `targetGroup`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.targetGroup"></a>

- *Type:* [`@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup`](#@aws-cdk/aws-elasticloadbalancingv2.ApplicationTargetGroup)

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.title"></a>

- *Type:* `string`

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

---

##### `ec2Service`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.ec2Service"></a>

- *Type:* [`@aws-cdk/aws-ecs.Ec2Service`](#@aws-cdk/aws-ecs.Ec2Service)

---

##### `fargateService`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchEcsServiceProps.property.fargateService"></a>

- *Type:* [`@aws-cdk/aws-ecs.FargateService`](#@aws-cdk/aws-ecs.FargateService)

---

### WatchedOperation <a name="@myhelix/cdk-watchful.WatchedOperation"></a>

An operation (path and method) worth monitoring.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchedOperation } from '@myhelix/cdk-watchful'

const watchedOperation: WatchedOperation = { ... }
```

##### `httpMethod`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchedOperation.property.httpMethod"></a>

- *Type:* `string`

The HTTP method for the operation (GET, POST, ...).

---

##### `resourcePath`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchedOperation.property.resourcePath"></a>

- *Type:* `string`

The REST API path for this operation (/, /resource/{id}, ...).

---

### WatchFirehoseServiceOptions <a name="@myhelix/cdk-watchful.WatchFirehoseServiceOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchFirehoseServiceOptions } from '@myhelix/cdk-watchful'

const watchFirehoseServiceOptions: WatchFirehoseServiceOptions = { ... }
```

### WatchFirehoseServiceProps <a name="@myhelix/cdk-watchful.WatchFirehoseServiceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchFirehoseServiceProps } from '@myhelix/cdk-watchful'

const watchFirehoseServiceProps: WatchFirehoseServiceProps = { ... }
```

##### `fh`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseServiceProps.property.fh"></a>

- *Type:* [`@aws-cdk/aws-kinesisfirehose.CfnDeliveryStream`](#@aws-cdk/aws-kinesisfirehose.CfnDeliveryStream)

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseServiceProps.property.title"></a>

- *Type:* `string`

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchFirehoseServiceProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

---

### WatchfulAspectProps <a name="@myhelix/cdk-watchful.WatchfulAspectProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchfulAspectProps } from '@myhelix/cdk-watchful'

const watchfulAspectProps: WatchfulAspectProps = { ... }
```

##### `apiGateway`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.apiGateway"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch API Gateway APIs in the scope.

---

##### `dynamodb`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.dynamodb"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch all Amazon DynamoDB tables in the scope.

---

##### `ec2ecs`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.ec2ecs"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch ApplicationLoadBalanced EC2 Ecs Services in the scope (using ECS Pattern).

---

##### `fargateecs`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.fargateecs"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch ApplicationLoadBalanced Fargate Ecs Services in the scope (using ECS Pattern).

---

##### `firehose`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.firehose"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch AWS firehose in the scope.

---

##### `lambdaFn`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.lambdaFn"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch AWS Lambda functions in the scope.

---

##### `rdsaurora`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspectProps.property.rdsaurora"></a>

- *Type:* `boolean`
- *Default:* true

Automatically watch RDS Aurora clusters in the scope.

---

### WatchfulProps <a name="@myhelix/cdk-watchful.WatchfulProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchfulProps } from '@myhelix/cdk-watchful'

const watchfulProps: WatchfulProps = { ... }
```

##### `alarmEmail`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulProps.property.alarmEmail"></a>

- *Type:* `string`

---

##### `alarmSns`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulProps.property.alarmSns"></a>

- *Type:* [`@aws-cdk/aws-sns.ITopic`](#@aws-cdk/aws-sns.ITopic)

---

##### `alarmSqs`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulProps.property.alarmSqs"></a>

- *Type:* [`@aws-cdk/aws-sqs.IQueue`](#@aws-cdk/aws-sqs.IQueue)

---

##### `dashboardName`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulProps.property.dashboardName"></a>

- *Type:* `string`

---

### WatchLambdaFunctionOptions <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchLambdaFunctionOptions } from '@myhelix/cdk-watchful'

const watchLambdaFunctionOptions: WatchLambdaFunctionOptions = { ... }
```

##### `durationThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions.property.durationThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the duration alarm as percentage of the function's timeout value.

If this is set to 50%, the alarm will be set when p99 latency of the
function exceeds 50% of the function's timeout setting.

---

##### `durationTimeoutSec`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions.property.durationTimeoutSec"></a>

- *Type:* `number`
- *Default:* 3

Override duration timeout threshold.

Necessary for lambdas that aren't created via the CDK.
This value is still adjusted by durationThresholdPercent

---

##### `errorsDisableAlerts`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions.property.errorsDisableAlerts"></a>

- *Type:* `boolean`
- *Default:* false

Flag to disable alerting on errors.

---

##### `errorsPerMinuteThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions.property.errorsPerMinuteThreshold"></a>

- *Type:* `number`
- *Default:* 0

Number of allowed errors per minute.

If there are more errors than that, an alarm will trigger.

---

##### `throttlesPerMinuteThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionOptions.property.throttlesPerMinuteThreshold"></a>

- *Type:* `number`
- *Default:* 0

Number of allowed throttles per minute.

---

### WatchLambdaFunctionProps <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchLambdaFunctionProps } from '@myhelix/cdk-watchful'

const watchLambdaFunctionProps: WatchLambdaFunctionProps = { ... }
```

##### `durationThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.durationThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the duration alarm as percentage of the function's timeout value.

If this is set to 50%, the alarm will be set when p99 latency of the
function exceeds 50% of the function's timeout setting.

---

##### `durationTimeoutSec`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.durationTimeoutSec"></a>

- *Type:* `number`
- *Default:* 3

Override duration timeout threshold.

Necessary for lambdas that aren't created via the CDK.
This value is still adjusted by durationThresholdPercent

---

##### `errorsDisableAlerts`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.errorsDisableAlerts"></a>

- *Type:* `boolean`
- *Default:* false

Flag to disable alerting on errors.

---

##### `errorsPerMinuteThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.errorsPerMinuteThreshold"></a>

- *Type:* `number`
- *Default:* 0

Number of allowed errors per minute.

If there are more errors than that, an alarm will trigger.

---

##### `throttlesPerMinuteThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.throttlesPerMinuteThreshold"></a>

- *Type:* `number`
- *Default:* 0

Number of allowed throttles per minute.

---

##### `fn`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.fn"></a>

- *Type:* [`@aws-cdk/aws-lambda.IFunction`](#@aws-cdk/aws-lambda.IFunction)

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.title"></a>

- *Type:* `string`

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchLambdaFunctionProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

---

### WatchRdsAuroraOptions <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchRdsAuroraOptions } from '@myhelix/cdk-watchful'

const watchRdsAuroraOptions: WatchRdsAuroraOptions = { ... }
```

##### `cpuMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions.property.cpuMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Cpu Maximum utilization.

---

##### `dbBufferCacheMinimumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions.property.dbBufferCacheMinimumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Minimum Db Buffer Cache.

---

##### `dbConnectionsMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions.property.dbConnectionsMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db Connections.

---

##### `dbReplicaLagMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions.property.dbReplicaLagMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db ReplicaLag.

---

##### `dbThroughputMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraOptions.property.dbThroughputMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db Throughput.

---

### WatchRdsAuroraProps <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { WatchRdsAuroraProps } from '@myhelix/cdk-watchful'

const watchRdsAuroraProps: WatchRdsAuroraProps = { ... }
```

##### `cpuMaximumThresholdPercent`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.cpuMaximumThresholdPercent"></a>

- *Type:* `number`
- *Default:* 80

Threshold for the Cpu Maximum utilization.

---

##### `dbBufferCacheMinimumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.dbBufferCacheMinimumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Minimum Db Buffer Cache.

---

##### `dbConnectionsMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.dbConnectionsMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db Connections.

---

##### `dbReplicaLagMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.dbReplicaLagMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db ReplicaLag.

---

##### `dbThroughputMaximumThreshold`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.dbThroughputMaximumThreshold"></a>

- *Type:* `number`
- *Default:* 0.

Threshold for the Maximum Db Throughput.

---

##### `cluster`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.cluster"></a>

- *Type:* [`@aws-cdk/aws-rds.DatabaseCluster`](#@aws-cdk/aws-rds.DatabaseCluster)

---

##### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.title"></a>

- *Type:* `string`

---

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchRdsAuroraProps.property.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

---

## Classes <a name="Classes"></a>

### WatchfulAspect <a name="@myhelix/cdk-watchful.WatchfulAspect"></a>

- *Implements:* [`@aws-cdk/core.IAspect`](#@aws-cdk/core.IAspect)

A CDK aspect that can automatically watch all resources within a scope.

#### Initializer <a name="@myhelix/cdk-watchful.WatchfulAspect.Initializer"></a>

```typescript
import { WatchfulAspect } from '@myhelix/cdk-watchful'

new WatchfulAspect(watchful: Watchful, props?: WatchfulAspectProps)
```

##### `watchful`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchfulAspect.parameter.watchful"></a>

- *Type:* [`@myhelix/cdk-watchful.Watchful`](#@myhelix/cdk-watchful.Watchful)

The watchful to add those resources to.

---

##### `props`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.WatchfulAspect.parameter.props"></a>

- *Type:* [`@myhelix/cdk-watchful.WatchfulAspectProps`](#@myhelix/cdk-watchful.WatchfulAspectProps)

Options.

---

#### Methods <a name="Methods"></a>

##### `visit` <a name="@myhelix/cdk-watchful.WatchfulAspect.visit"></a>

```typescript
public visit(node: IConstruct)
```

###### `node`<sup>Required</sup> <a name="@myhelix/cdk-watchful.WatchfulAspect.parameter.node"></a>

- *Type:* [`@aws-cdk/core.IConstruct`](#@aws-cdk/core.IConstruct)

---




## Protocols <a name="Protocols"></a>

### IWatchful <a name="@myhelix/cdk-watchful.IWatchful"></a>

- *Implemented By:* [`@myhelix/cdk-watchful.Watchful`](#@myhelix/cdk-watchful.Watchful), [`@myhelix/cdk-watchful.IWatchful`](#@myhelix/cdk-watchful.IWatchful)

#### Methods <a name="Methods"></a>

##### `addAlarm` <a name="@myhelix/cdk-watchful.IWatchful.addAlarm"></a>

```typescript
public addAlarm(alarm: Alarm, autoResolveEvents?: boolean)
```

###### `alarm`<sup>Required</sup> <a name="@myhelix/cdk-watchful.IWatchful.parameter.alarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---

###### `autoResolveEvents`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.IWatchful.parameter.autoResolveEvents"></a>

- *Type:* `boolean`

---

##### `addSection` <a name="@myhelix/cdk-watchful.IWatchful.addSection"></a>

```typescript
public addSection(title: string, options?: SectionOptions)
```

###### `title`<sup>Required</sup> <a name="@myhelix/cdk-watchful.IWatchful.parameter.title"></a>

- *Type:* `string`

---

###### `options`<sup>Optional</sup> <a name="@myhelix/cdk-watchful.IWatchful.parameter.options"></a>

- *Type:* [`@myhelix/cdk-watchful.SectionOptions`](#@myhelix/cdk-watchful.SectionOptions)

---

##### `addWidgets` <a name="@myhelix/cdk-watchful.IWatchful.addWidgets"></a>

```typescript
public addWidgets(widgets: IWidget)
```

###### `widgets`<sup>Required</sup> <a name="@myhelix/cdk-watchful.IWatchful.parameter.widgets"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.IWidget`](#@aws-cdk/aws-cloudwatch.IWidget)

---


