[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / IMonitorFile

# Interface: IMonitorFile

Defined in: [lib/core.ts:1368](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1368)

监控文件元数据；复杂格式或超过 1 MiB 的文件不提供预览

## Properties

### mtime

> **mtime**: `number`

Defined in: [lib/core.ts:1376](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1376)

最后修改时间，单位 ms

***

### name

> **name**: `string`

Defined in: [lib/core.ts:1372](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1372)

文件名

***

### path

> **path**: `string`

Defined in: [lib/core.ts:1370](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1370)

文件相对路径

***

### preview

> **preview**: `"text"` \| `"json"` \| `null`

Defined in: [lib/core.ts:1378](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1378)

支持的在线预览格式，不可预览时为 null

***

### size

> **size**: `number`

Defined in: [lib/core.ts:1374](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1374)

文件字节数
