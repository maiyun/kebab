[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / IPutObjectItem

# Interface: IPutObjectItem

Defined in: [lib/s3.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L44)

批量上传单项

## Properties

### bucket?

> `optional` **bucket?**: `string`

Defined in: [lib/s3.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L56)

bucket 名，优先级高于 options.bucket

***

### content

> **content**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/s3.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L48)

内容

***

### disposition?

> `optional` **disposition?**: `string`

Defined in: [lib/s3.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L54)

content-disposition

***

### key

> **key**: `string`

Defined in: [lib/s3.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L46)

对象路径

***

### length?

> `optional` **length?**: `number`

Defined in: [lib/s3.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L50)

contentLength，流模式需要设置

***

### type?

> `optional` **type?**: `string`

Defined in: [lib/s3.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L52)

content-type，如 application/javascript
