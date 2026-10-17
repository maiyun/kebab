[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEvent

# Interface: IMonitorEvent

Defined in: [lib/core.ts:1314](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1314)

事件原始数据与可读取的文件；data 为 null 时可下载原始记录复盘

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [lib/core.ts:1316](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1316)

***

### files

> **files**: [`IMonitorFile`](IMonitorFile.md)[]

Defined in: [lib/core.ts:1318](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1318)

***

### recordStatus

> **recordStatus**: `"loaded"` \| `"invalid"` \| `"missing"` \| `"too-large"` \| `"unreadable"`

Defined in: [lib/core.ts:1317](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1317)

***

### summary

> **summary**: [`IMonitorEventSummary`](IMonitorEventSummary.md)

Defined in: [lib/core.ts:1315](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1315)
