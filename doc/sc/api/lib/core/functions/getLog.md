[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getLog

# Function: getLog()

> **getLog**(`opt`): `Promise`\<`false` \| \{ `list`: `any`[] \| `string`[][]; `total`: `number`; \}\>

Defined in: [lib/core.ts:1074](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1074)

获取日志内容为一个数组

## Parameters

### opt

参数

#### fend?

`string`

如 -error

#### host?

`string`

获取局域网服务器的日志，为空代表获取本机的

#### hostname

`string`

要查询的头，如 127.0.0.1、system、www.maiyun.net 等

#### limit?

`number`

最大限制，默认 100

#### offset?

`number`

跳过条数

#### path

`string`

如 2024/08/01/22

#### search?

`string`

仅显示被搜索到的行

## Returns

`Promise`\<`false` \| \{ `list`: `any`[] \| `string`[][]; `total`: `number`; \}\>
