[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataLimits

# Interface: IFormDataLimits

Defined in: [sys/route.ts:1055](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1055)

multipart 上传限制

## Properties

### allowedExts?

> `optional` **allowedExts?**: `string`[]

Defined in: [sys/route.ts:1059](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1059)

允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf']

***

### maxFieldSize?

> `optional` **maxFieldSize?**: `number`

Defined in: [sys/route.ts:1061](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1061)

单个字段（非文件）最大字节数，默认 1 MB

***

### maxFileSize?

> `optional` **maxFileSize?**: `number`

Defined in: [sys/route.ts:1057](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1057)

单个文件最大字节数

***

### maxHeaderSize?

> `optional` **maxHeaderSize?**: `number`

Defined in: [sys/route.ts:1065](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1065)

单个 multipart 段头部最大字节数，默认 16 KB

***

### maxParts?

> `optional` **maxParts?**: `number`

Defined in: [sys/route.ts:1067](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1067)

multipart 字段与文件总数量，默认 1000

***

### maxTotalSize?

> `optional` **maxTotalSize?**: `number`

Defined in: [sys/route.ts:1063](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1063)

整体请求最大字节数，不设置或设为 0 则不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [sys/route.ts:1069](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1069)

整体请求超时时间（毫秒），默认 5 分钟，设为 0 禁用超时
