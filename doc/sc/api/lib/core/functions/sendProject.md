[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendProject

# Function: sendProject()

> **sendProject**(`path`, `key`, `value`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:862](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L862)

向本机或局域网 RPC 发送项目配置更新操作

## Parameters

### path

`string`

项目路径，相对 Kebab 根

### key

`string`

要更新的键名（目前仅支持 staticVer）

### value

`string`

要更新的值

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>
