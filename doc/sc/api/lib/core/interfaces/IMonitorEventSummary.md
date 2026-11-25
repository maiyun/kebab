[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorEventSummary

# Interface: IMonitorEventSummary

Defined in: [lib/core.ts:1352](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1352)

已保存监控事件的简短摘要，path 相对于 log/monitor/

## Properties

### path

> **path**: `string`

Defined in: [lib/core.ts:1354](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1354)

事件目录相对路径

***

### pid

> **pid**: `number`

Defined in: [lib/core.ts:1356](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1356)

触发事件的进程 PID

***

### reasons

> **reasons**: `string`[]

Defined in: [lib/core.ts:1364](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1364)

触发告警的指标原因列表

***

### source

> **source**: `"main"` \| `"watchdog"`

Defined in: [lib/core.ts:1360](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1360)

事件来源：主线程监控或看门狗线程

***

### status

> **status**: `string`

Defined in: [lib/core.ts:1362](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1362)

事件当前状态或结束原因

***

### time

> **time**: `number`

Defined in: [lib/core.ts:1358](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1358)

事件确认时间戳，单位 ms
