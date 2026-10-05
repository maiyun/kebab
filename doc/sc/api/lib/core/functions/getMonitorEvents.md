[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getMonitorEvents

# Function: getMonitorEvents()

> **getMonitorEvents**(`opt?`): `Promise`\<`false` \| \{ `list`: [`IMonitorEventSummary`](../interfaces/IMonitorEventSummary.md)[]; `total`: `number`; \}\>

Defined in: [lib/core.ts:1430](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1430)

获取某天已保存的监控事件，按目录时间倒序分页

## Parameters

### opt?

path 为 YYYY/MM/DD，默认目标服务器的当天；offset 默认 0，limit 默认 20、最多 100

#### host?

`string`

与 getLog 相同，使用目标服务器的 RPC 端口和密钥

#### limit?

`number`

#### offset?

`number`

#### path?

`string`

## Returns

`Promise`\<`false` \| \{ `list`: [`IMonitorEventSummary`](../interfaces/IMonitorEventSummary.md)[]; `total`: `number`; \}\>

事件列表和总数；无事件时返回空列表，参数、配置或读取错误时返回 false
