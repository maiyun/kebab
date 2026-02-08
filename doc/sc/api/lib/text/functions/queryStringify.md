[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / queryStringify

# Function: queryStringify()

## Call Signature

> **queryStringify**(`query`, `encode?`): `string`

Defined in: [lib/text.ts:396](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L396)

将对象转换为 query string

### Parameters

#### query

`Record`\<`string`, `any`\>

要转换的对象

#### encode?

`boolean`

是否转义，默认为 true

### Returns

`string`

## Call Signature

> **queryStringify**(`query`, `options`): `string`

Defined in: [lib/text.ts:402](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L402)

将对象转换为 query string

### Parameters

#### query

`Record`\<`string`, `any`\>

要转换的对象

#### options

选项

##### equal?

`string`

等号分隔符，默认 =

##### hyphen?

`string`

连字符分隔符，默认 &

### Returns

`string`
