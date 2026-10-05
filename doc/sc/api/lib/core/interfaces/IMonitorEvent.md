[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEvent

# Interface: IMonitorEvent

Defined in: [lib/core.ts:1387](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1387)

事件原始数据与可读取的文件；data 为 null 时可下载原始记录复盘

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [lib/core.ts:1389](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1389)

***

### files

> **files**: [`IMonitorFile`](IMonitorFile.md)[]

Defined in: [lib/core.ts:1391](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1391)

***

### recordStatus

> **recordStatus**: `"loaded"` \| `"invalid"` \| `"missing"` \| `"too-large"` \| `"unreadable"`

Defined in: [lib/core.ts:1390](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1390)

***

### summary

> **summary**: [`IMonitorEventSummary`](IMonitorEventSummary.md)

Defined in: [lib/core.ts:1388](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1388)
