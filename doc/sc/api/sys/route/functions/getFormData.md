[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(`req`, `events?`, `limits?`): `Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

Defined in: [sys/route.ts:1079](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1079)

获取 formdata 的 post

## Parameters

### req

`IncomingMessage` \| `Http2ServerRequest`

请求头

### events?

[`IFormDataEvents`](../interfaces/IFormDataEvents.md) = `{}`

文件处理情况

### limits?

[`IFormDataLimits`](../interfaces/IFormDataLimits.md) = `{}`

文件上传限制

## Returns

`Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

字段和临时文件；失败返回 false，并通过 events.onerror 通知首次失败原因
