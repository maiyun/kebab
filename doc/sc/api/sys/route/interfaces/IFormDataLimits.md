[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataLimits

# Interface: IFormDataLimits

Defined in: [sys/route.ts:1081](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1081)

multipart 上传限制

## Properties

### allowedExts?

> `optional` **allowedExts?**: `string`[]

Defined in: [sys/route.ts:1085](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1085)

允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf']

***

### maxFieldSize?

> `optional` **maxFieldSize?**: `number`

Defined in: [sys/route.ts:1087](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1087)

单个字段（非文件）最大字节数，默认 1 MB

***

### maxFileSize?

> `optional` **maxFileSize?**: `number`

Defined in: [sys/route.ts:1083](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1083)

单个文件最大字节数

***

### maxHeaderSize?

> `optional` **maxHeaderSize?**: `number`

Defined in: [sys/route.ts:1091](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1091)

每个字段或文件的 multipart 头部最多多少字节，默认 16 KB

***

### maxParts?

> `optional` **maxParts?**: `number`

Defined in: [sys/route.ts:1093](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1093)

multipart 字段与文件总数量，默认 1000

***

### maxTotalSize?

> `optional` **maxTotalSize?**: `number`

Defined in: [sys/route.ts:1089](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1089)

整体请求最大字节数，不设置或设为 0 则不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [sys/route.ts:1095](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1095)

整体请求超时时间（毫秒），默认 5 分钟，设为 0 禁用超时
