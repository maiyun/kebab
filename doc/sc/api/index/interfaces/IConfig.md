[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfig

# Interface: IConfig

Defined in: [index.ts:50](https://github.com/maiyunnet/kebab/blob/master/index.ts#L50)

目录配置文件

## Indexable

\[`key`: `string`\]: `Record`\<`string`, `any`\>

## Properties

### ai

> **ai**: `Record`\<`string`, [`IConfigAi`](IConfigAi.md)\>

Defined in: [index.ts:81](https://github.com/maiyunnet/kebab/blob/master/index.ts#L81)

***

### const

> **const**: [`IConfigConst`](IConfigConst.md)

Defined in: [index.ts:62](https://github.com/maiyunnet/kebab/blob/master/index.ts#L62)

***

### db

> **db**: `Record`\<`string`, \{ `default`: [`IConfigDb`](IConfigDb.md); `read`: [`IConfigDb`](IConfigDb.md); \}\> & `object`

Defined in: [index.ts:63](https://github.com/maiyunnet/kebab/blob/master/index.ts#L63)

#### Type Declaration

##### default

> **default**: `"MYSQL"` \| `"PGSQL"`

***

### dns

> **dns**: `Record`\<`string`, [`IConfigDns`](IConfigDns.md)\>

Defined in: [index.ts:77](https://github.com/maiyunnet/kebab/blob/master/index.ts#L77)

***

### kv

> **kv**: [`IConfigKv`](IConfigKv.md)

Defined in: [index.ts:69](https://github.com/maiyunnet/kebab/blob/master/index.ts#L69)

***

### lang

> **lang**: [`IConfigLang`](IConfigLang.md)

Defined in: [index.ts:78](https://github.com/maiyunnet/kebab/blob/master/index.ts#L78)

***

### route

> **route**: `Record`\<`string`, `string`\>

Defined in: [index.ts:70](https://github.com/maiyunnet/kebab/blob/master/index.ts#L70)

***

### s3

> **s3**: `Record`\<`string`, [`IConfigS3`](IConfigS3.md)\>

Defined in: [index.ts:79](https://github.com/maiyunnet/kebab/blob/master/index.ts#L79)

***

### session

> **session**: `object`

Defined in: [index.ts:71](https://github.com/maiyunnet/kebab/blob/master/index.ts#L71)

#### name

> **name**: `string`

#### ssl

> **ssl**: `boolean`

#### ttl

> **ttl**: `number`

***

### set

> **set**: `object`

Defined in: [index.ts:51](https://github.com/maiyunnet/kebab/blob/master/index.ts#L51)

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

Defined in: [index.ts:76](https://github.com/maiyunnet/kebab/blob/master/index.ts#L76)

***

### turnstile

> **turnstile**: [`IConfigTurnstile`](IConfigTurnstile.md)

Defined in: [index.ts:80](https://github.com/maiyunnet/kebab/blob/master/index.ts#L80)

***

### vector

> **vector**: [`IConfigVector`](IConfigVector.md)

Defined in: [index.ts:82](https://github.com/maiyunnet/kebab/blob/master/index.ts#L82)
