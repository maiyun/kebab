[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegular

# Interface: IRegular

Defined in: [lib/cron.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L93)

定时任务

## Extended by

- [`IRegularData`](IRegularData.md)

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

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L95)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L97)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）
