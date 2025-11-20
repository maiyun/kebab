[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfig

# Interface: IConfig

Defined in: [index.ts:46](https://github.com/maiyunnet/kebab/blob/master/index.ts#L46)

目录配置文件

## Indexable

\[`key`: `string`\]: `Record`\<`string`, `any`\>

## Properties

### ai

> **ai**: `Record`\<`string`, [`IConfigAi`](IConfigAi.md)\>

Defined in: [index.ts:77](https://github.com/maiyunnet/kebab/blob/master/index.ts#L77)

***

### const

> **const**: [`IConfigConst`](IConfigConst.md)

Defined in: [index.ts:58](https://github.com/maiyunnet/kebab/blob/master/index.ts#L58)

***

### db

> **db**: `Record`\<`string`, \{ `default`: [`IConfigDb`](IConfigDb.md); `read`: [`IConfigDb`](IConfigDb.md); \}\> & `object`

Defined in: [index.ts:59](https://github.com/maiyunnet/kebab/blob/master/index.ts#L59)

#### Type Declaration

##### default

> **default**: `"MYSQL"` \| `"PGSQL"`

***

### dns

> **dns**: `Record`\<`string`, [`IConfigDns`](IConfigDns.md)\>

Defined in: [index.ts:73](https://github.com/maiyunnet/kebab/blob/master/index.ts#L73)

***

### kv

> **kv**: [`IConfigKv`](IConfigKv.md)

Defined in: [index.ts:65](https://github.com/maiyunnet/kebab/blob/master/index.ts#L65)

***

### lang

> **lang**: [`IConfigLang`](IConfigLang.md)

Defined in: [index.ts:74](https://github.com/maiyunnet/kebab/blob/master/index.ts#L74)

***

### route

> **route**: `Record`\<`string`, `string`\>

Defined in: [index.ts:66](https://github.com/maiyunnet/kebab/blob/master/index.ts#L66)

***

### s3

> **s3**: `Record`\<`string`, [`IConfigS3`](IConfigS3.md)\>

Defined in: [index.ts:75](https://github.com/maiyunnet/kebab/blob/master/index.ts#L75)

***

### session

> **session**: `object`

Defined in: [index.ts:67](https://github.com/maiyunnet/kebab/blob/master/index.ts#L67)

#### name

> **name**: `string`

#### ssl

> **ssl**: `boolean`

#### ttl

> **ttl**: `number`

***

### set

> **set**: `object`

Defined in: [index.ts:47](https://github.com/maiyunnet/kebab/blob/master/index.ts#L47)

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

Defined in: [index.ts:72](https://github.com/maiyunnet/kebab/blob/master/index.ts#L72)

***

### turnstile

> **turnstile**: [`IConfigTurnstile`](IConfigTurnstile.md)

Defined in: [index.ts:76](https://github.com/maiyunnet/kebab/blob/master/index.ts#L76)

***

### vector

> **vector**: [`IConfigVector`](IConfigVector.md)

Defined in: [index.ts:78](https://github.com/maiyunnet/kebab/blob/master/index.ts#L78)
