[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataLimits

# Interface: IFormDataLimits

Defined in: [sys/route.ts:1043](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1043)

multipart 上传限制及失败通知

## Properties

### allowedExts?

> `optional` **allowedExts?**: `string`[]

Defined in: [sys/route.ts:1047](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1047)

允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf']

***

### maxFieldSize?

> `optional` **maxFieldSize?**: `number`

Defined in: [sys/route.ts:1049](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1049)

单个字段（非文件）最大字节数，默认 1 MB

***

### maxFileSize?

> `optional` **maxFileSize?**: `number`

Defined in: [sys/route.ts:1045](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1045)

单个文件最大字节数

***

### maxHeaderSize?

> `optional` **maxHeaderSize?**: `number`

Defined in: [sys/route.ts:1053](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1053)

单个 multipart 段头部最大字节数，默认 16 KB

***

### maxParts?

> `optional` **maxParts?**: `number`

Defined in: [sys/route.ts:1055](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1055)

multipart 字段与文件总数量，默认 1000

***

### maxTotalSize?

> `optional` **maxTotalSize?**: `number`

Defined in: [sys/route.ts:1051](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1051)

整体请求最大字节数，不设置或设为 0 则不限制

***

### onError?

> `optional` **onError?**: (`error`) => `void`

Defined in: [sys/route.ts:1059](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1059)

首次失败时通知一次；原有 false 返回值不变，连接中断时响应可能无法送达

#### Parameters

##### error

[`IFormDataError`](IFormDataError.md)

#### Returns

`void`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [sys/route.ts:1057](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1057)

整体请求超时时间（毫秒），默认 5 分钟，设为 0 禁用超时
