[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegularData

# Interface: IRegularData

Defined in: [lib/cron.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L149)

定时任务

## Extends

- [`IRegular`](IRegular.md)

## Properties

### callback

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L146)

任务函数

#### Parameters

##### date

`string`

##### immediate

`boolean`

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`IRegular`](IRegular.md).[`callback`](IRegular.md#callback)

***

### count

> **count**: `number`

Defined in: [lib/cron.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L153)

总执行次数

***

### last

> **last**: `string`

Defined in: [lib/cron.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L151)

上次执行时间字符串，格式：YmdHi（系统时区）

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:142](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L142)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

#### Inherited from

[`IRegular`](IRegular.md).[`name`](IRegular.md#name)

***

### rcount

> **rcount**: `number`

Defined in: [lib/cron.ts:155](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L155)

定时任务重启后的执行次数

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:144](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L144)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

#### Inherited from

[`IRegular`](IRegular.md).[`rule`](IRegular.md#rule)
