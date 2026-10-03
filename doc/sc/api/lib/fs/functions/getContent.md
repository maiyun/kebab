[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / getContent

# Function: getContent()

读取完整文件或一段，区间包含首尾字节

## Param

**path**

文件路径

## Param

**options**

编码或选项

## Call Signature

> **getContent**(`path`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/fs.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L16)

### Parameters

#### path

`string`

#### options?

##### end?

`number`

##### start?

`number`

### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

## Call Signature

> **getContent**(`path`, `options`): `Promise`\<`string` \| `null`\>

Defined in: [lib/fs.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L20)

### Parameters

#### path

`string`

#### options

`BufferEncoding` \| \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

### Returns

`Promise`\<`string` \| `null`\>
