[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getPost

# Function: getPost()

> **getPost**(`req`): `Promise`\<`false` \| \{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>

Defined in: [sys/route.ts:914](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L914)

获取 post 对象（通常已自动获取），如果是文件上传（formdata）的情况则不获取

## Parameters

### req

`IncomingMessage` \| `Http2ServerRequest`

请求对象

## Returns

`Promise`\<`false` \| \{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>

解析后的 POST 数据，请求传输中断时返回 false
