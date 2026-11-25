[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEvent

# Interface: IMonitorEvent

Defined in: [lib/core.ts:1382](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1382)

事件原始数据与可读取的文件；data 为 null 时可下载原始记录复盘

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [lib/core.ts:1386](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1386)

事件记录 JSON 数据，未成功加载时为 null

***

### files

> **files**: [`IMonitorFile`](IMonitorFile.md)[]

Defined in: [lib/core.ts:1390](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1390)

关联的可下载诊断文件清单

***

### recordStatus

> **recordStatus**: `"loaded"` \| `"invalid"` \| `"missing"` \| `"too-large"` \| `"unreadable"`

Defined in: [lib/core.ts:1388](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1388)

事件记录文件的读取状态

***

### summary

> **summary**: [`IMonitorEventSummary`](IMonitorEventSummary.md)

Defined in: [lib/core.ts:1384](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1384)

事件摘要
