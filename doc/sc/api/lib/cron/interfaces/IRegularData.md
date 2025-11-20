[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegularData

# Interface: IRegularData

Defined in: [lib/cron.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L102)

定时任务

## Extends

- [`IRegular`](IRegular.md)

## Properties

### callback()

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L99)

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

Defined in: [lib/cron.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L106)

总执行次数

***

### last

> **last**: `string`

Defined in: [lib/cron.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L104)

上次执行时间字符串，格式：YmdHi（系统时区）

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L95)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

#### Inherited from

[`IRegular`](IRegular.md).[`name`](IRegular.md#name)

***

### rcount

> **rcount**: `number`

Defined in: [lib/cron.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L108)

定时任务重启后的执行次数

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L97)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

#### Inherited from

[`IRegular`](IRegular.md).[`rule`](IRegular.md#rule)
