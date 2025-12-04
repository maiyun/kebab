[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getPost

# Function: getPost()

> **getPost**(`req`): `Promise`\<\{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>

Defined in: [sys/route.ts:866](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L866)

获取 post 对象（通常已自动获取），如果是文件上传（formdata）的情况则不获取

## Parameters

### req

请求对象

`IncomingMessage` | `Http2ServerRequest`

## Returns

`Promise`\<\{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>
