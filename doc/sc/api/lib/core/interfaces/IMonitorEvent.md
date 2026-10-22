[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEvent

# Interface: IMonitorEvent

Defined in: [lib/core.ts:1355](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1355)

事件原始数据与可读取的文件；data 为 null 时可下载原始记录复盘

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [lib/core.ts:1357](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1357)

***

### files

> **files**: [`IMonitorFile`](IMonitorFile.md)[]

Defined in: [lib/core.ts:1359](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1359)

***

### recordStatus

> **recordStatus**: `"loaded"` \| `"invalid"` \| `"missing"` \| `"too-large"` \| `"unreadable"`

Defined in: [lib/core.ts:1358](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1358)

***

### summary

> **summary**: [`IMonitorEventSummary`](IMonitorEventSummary.md)

Defined in: [lib/core.ts:1356](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1356)
