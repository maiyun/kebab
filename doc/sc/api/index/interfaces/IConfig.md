[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfig

# Interface: IConfig

Defined in: [index.ts:52](https://github.com/maiyunnet/kebab/blob/master/index.ts#L52)

目录配置文件

## Indexable

\[`key`: `string`\]: `Record`\<`string`, `any`\>

## Properties

### ai

> **ai**: `Record`\<`string`, [`IConfigAi`](IConfigAi.md)\>

Defined in: [index.ts:83](https://github.com/maiyunnet/kebab/blob/master/index.ts#L83)

***

### const

> **const**: [`IConfigConst`](IConfigConst.md)

Defined in: [index.ts:64](https://github.com/maiyunnet/kebab/blob/master/index.ts#L64)

***

### db

> **db**: `Record`\<`string`, \{ `default`: [`IConfigDb`](IConfigDb.md); `read`: [`IConfigDb`](IConfigDb.md); \}\> & `object`

Defined in: [index.ts:65](https://github.com/maiyunnet/kebab/blob/master/index.ts#L65)

#### Type Declaration

##### default

> **default**: `"MYSQL"` \| `"PGSQL"`

***

### dns

> **dns**: `Record`\<`string`, [`IConfigDns`](IConfigDns.md)\>

Defined in: [index.ts:79](https://github.com/maiyunnet/kebab/blob/master/index.ts#L79)

***

### kv

> **kv**: [`IConfigKv`](IConfigKv.md)

Defined in: [index.ts:71](https://github.com/maiyunnet/kebab/blob/master/index.ts#L71)

***

### lang

> **lang**: [`IConfigLang`](IConfigLang.md)

Defined in: [index.ts:80](https://github.com/maiyunnet/kebab/blob/master/index.ts#L80)

***

### route

> **route**: `Record`\<`string`, `string`\>

Defined in: [index.ts:72](https://github.com/maiyunnet/kebab/blob/master/index.ts#L72)

***

### s3

> **s3**: `Record`\<`string`, [`IConfigS3`](IConfigS3.md)\>

Defined in: [index.ts:81](https://github.com/maiyunnet/kebab/blob/master/index.ts#L81)

***

### session

> **session**: `object`

Defined in: [index.ts:73](https://github.com/maiyunnet/kebab/blob/master/index.ts#L73)

#### name

> **name**: `string`

#### ssl

> **ssl**: `boolean`

#### ttl

> **ttl**: `number`

***

### set

> **set**: `object`

Defined in: [index.ts:53](https://github.com/maiyunnet/kebab/blob/master/index.ts#L53)

#### Index Signature

\[`key`: `string`\]: `any`

#### cacheTtl

> **cacheTtl**: `number`

#### mustHttps

> **mustHttps**: `boolean`

#### staticPath

> **staticPath**: `string`

#### staticPathFull

> **staticPathFull**: `string`

#### staticVer

> **staticVer**: `string`

#### timezone

> **timezone**: `number`

***

### sql

> **sql**: [`IConfigSql`](IConfigSql.md)

Defined in: [index.ts:78](https://github.com/maiyunnet/kebab/blob/master/index.ts#L78)

***

### turnstile

> **turnstile**: [`IConfigTurnstile`](IConfigTurnstile.md)

Defined in: [index.ts:82](https://github.com/maiyunnet/kebab/blob/master/index.ts#L82)

***

### vector

> **vector**: [`IConfigVector`](IConfigVector.md)

Defined in: [index.ts:84](https://github.com/maiyunnet/kebab/blob/master/index.ts#L84)
