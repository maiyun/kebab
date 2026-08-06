[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(`req`, `events?`, `limits?`): `Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

Defined in: [sys/route.ts:995](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L995)

获取 formdata 的 post

## Parameters

### req

`IncomingMessage` \| `Http2ServerRequest`

请求头

### events?

文件处理情况

#### onfiledata?

(`chunk`) => `void`

文件上传时触发，仅 start 返回 true 时触发

#### onfileend?

() => `void`

文件上传结束时触发，仅 start 返回 true 时触发

#### onfilestart?

(`name`) => `boolean` \| `undefined`

文件开始上传时触发，返回 true 则跳过该文件的保存

### limits?

文件上传限制

#### allowedExts?

`string`[]

允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf']

#### maxFieldSize?

`number`

单个字段（非文件）最大字节数，默认 1 MB

#### maxFileSize?

`number`

单个文件最大字节数

#### maxHeaderSize?

`number`

单个 multipart 段头部最大字节数，默认 16 KB

#### maxParts?

`number`

multipart 字段与文件总数量，默认 1000

#### maxTotalSize?

`number`

整体请求最大字节数，不设置或设为 0 则不限制

#### timeout?

`number`

整体请求超时时间（毫秒），默认 5 分钟，设为 0 禁用超时

## Returns

`Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>
