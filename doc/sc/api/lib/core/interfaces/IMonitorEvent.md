[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEvent

# Interface: IMonitorEvent

Defined in: [lib/core.ts:1339](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1339)

事件原始数据与可读取的文件；data 为 null 时可下载原始记录复盘

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\> \| `null`

Defined in: [lib/core.ts:1341](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1341)

***

### files

> **files**: [`IMonitorFile`](IMonitorFile.md)[]

Defined in: [lib/core.ts:1343](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1343)

***

### recordStatus

> **recordStatus**: `"loaded"` \| `"invalid"` \| `"missing"` \| `"too-large"` \| `"unreadable"`

Defined in: [lib/core.ts:1342](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1342)

***

### summary

> **summary**: [`IMonitorEventSummary`](IMonitorEventSummary.md)

Defined in: [lib/core.ts:1340](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1340)
