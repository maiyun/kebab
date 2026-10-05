[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getMonitorEvent

# Function: getMonitorEvent()

> **getMonitorEvent**(`opt`): `Promise`\<`false` \| [`IMonitorEvent`](../interfaces/IMonitorEvent.md) \| `null`\>

Defined in: [lib/core.ts:1457](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1457)

读取事件详情和文件清单；只解析事件记录，不解析 Profile 或堆快照

## Parameters

### opt

path 使用 getMonitorEvents 返回的事件路径；host 默认本机

#### host?

`string`

#### path

`string`

## Returns

`Promise`\<`false` \| [`IMonitorEvent`](../interfaces/IMonitorEvent.md) \| `null`\>

事件详情；不存在时返回 null，参数、配置或读取错误时返回 false
