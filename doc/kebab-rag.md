
quick-start.md
---

# 快速开始

## 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

也可以使用 pm2 启动项目，执行 `pm2 start npx --name "kebab" -- kebab` 即可。

## 目录

项目初始化后，会生成一些基础文件和目录，介绍如下：

- `conf/`: 配置
  - `cert/`: 证书
  - `vhost/`: 虚拟主机配置
  - `cert.json`: 框架自动引入的证书配置
  - `config.json`: 框架的所有配置内容（如 db、kv 等连接信息也在本文件）
- `ftmp/`: 上传文件的临时存放
- `ind/`: 独立应用，可用 npx kebab --ind xxx 启动
- `lib/`: 用户编写的库
- `log/`: 日志
- `mod/`: 用户定义的模型
- `www/`: 网站根目录
  - `站点名或网址` - 例如 example.com、example，可多层
    - `ctr/`: 控制器目录
    - `data/`: 数据目录，存放语言文件等
      - `locale/`: 语言文件目录
    - `stc/`: 静态资源目录
    - `view/`: 视图目录，存放 ejs 文件
    - `ws/`: WebSocket 目录

## 集成 JSON Schema

控制器的 `_checkInput` 方法已集成 JSON Schema（ajv、ajv-formats），可通过 `schema` 参数使用，例如：

```ts
const retur: kebab.Json[] = [];
if (!this._checkInput(this._post, {
  'sdata': [{
    'schema': {
      'type': 'object',
      'properties': {
        'foo': { 'type': 'integer' },
        'bar': { 'type': 'string' }
      },
      'required': ['foo']
    }
  }, [0, 'The sdata param is incorrect.']],
}, retur)) {
  return retur;
}
```
index/index.md
---

[**Documents for @maiyunnet/kebab**](../index.md)

***

[Documents for @maiyunnet/kebab](../index.md) / index

# index

## Interfaces

- [IConfig](interfaces/IConfig.md)
- [IConfigAi](interfaces/IConfigAi.md)
- [IConfigConst](interfaces/IConfigConst.md)
- [IConfigDb](interfaces/IConfigDb.md)
- [IConfigDns](interfaces/IConfigDns.md)
- [IConfigKv](interfaces/IConfigKv.md)
- [IConfigLang](interfaces/IConfigLang.md)
- [IConfigS3](interfaces/IConfigS3.md)
- [IConfigSql](interfaces/IConfigSql.md)
- [IConfigTurnstile](interfaces/IConfigTurnstile.md)
- [IConfigVector](interfaces/IConfigVector.md)
- [IPostFile](interfaces/IPostFile.md)
- [IUrlParse](interfaces/IUrlParse.md)
- [IVhost](interfaces/IVhost.md)

## Type Aliases

- [DbValue](type-aliases/DbValue.md)
- [Json](type-aliases/Json.md)

## Variables

- [CERT\_CWD](variables/CERT_CWD.md)
- [CONF\_CWD](variables/CONF_CWD.md)
- [FTMP\_CWD](variables/FTMP_CWD.md)
- [IND\_CWD](variables/IND_CWD.md)
- [LIB\_CWD](variables/LIB_CWD.md)
- [LIB\_PATH](variables/LIB_PATH.md)
- [LOG\_CWD](variables/LOG_CWD.md)
- [MOD\_CWD](variables/MOD_CWD.md)
- [ROOT\_CWD](variables/ROOT_CWD.md)
- [ROOT\_PATH](variables/ROOT_PATH.md)
- [SYS\_PATH](variables/SYS_PATH.md)
- [VER](variables/VER.md)
- [VHOST\_CWD](variables/VHOST_CWD.md)
- [WWW\_CWD](variables/WWW_CWD.md)

index/interfaces/IConfigAi.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigAi

# Interface: IConfigAi

Defined in: [index.ts:120](https://github.com/maiyunnet/kebab/blob/master/index.ts#L120)

AI

## Properties

### endpoint?

> `optional` **endpoint?**: `string`

Defined in: [index.ts:122](https://github.com/maiyunnet/kebab/blob/master/index.ts#L122)

目前只有微软 Azure 有

***

### skey

> **skey**: `string`

Defined in: [index.ts:123](https://github.com/maiyunnet/kebab/blob/master/index.ts#L123)

index/interfaces/IConfigConst.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigConst

# Interface: IConfigConst

Defined in: [index.ts:183](https://github.com/maiyunnet/kebab/blob/master/index.ts#L183)

常量

## Properties

### ctrPath

> **ctrPath**: `string`

Defined in: [index.ts:208](https://github.com/maiyunnet/kebab/blob/master/index.ts#L208)

***

### dataPath

> **dataPath**: `string`

Defined in: [index.ts:210](https://github.com/maiyunnet/kebab/blob/master/index.ts#L210)

***

### host

> **host**: `string`

Defined in: [index.ts:199](https://github.com/maiyunnet/kebab/blob/master/index.ts#L199)

***

### hostname

> **hostname**: `string`

Defined in: [index.ts:200](https://github.com/maiyunnet/kebab/blob/master/index.ts#L200)

***

### hostport

> **hostport**: `number`

Defined in: [index.ts:201](https://github.com/maiyunnet/kebab/blob/master/index.ts#L201)

***

### https

> **https**: `boolean`

Defined in: [index.ts:198](https://github.com/maiyunnet/kebab/blob/master/index.ts#L198)

***

### miniprogram

> **miniprogram**: `""` \| `"wechat"`

Defined in: [index.ts:197](https://github.com/maiyunnet/kebab/blob/master/index.ts#L197)

***

### mobile

> **mobile**: `boolean`

Defined in: [index.ts:195](https://github.com/maiyunnet/kebab/blob/master/index.ts#L195)

***

### modPath

> **modPath**: `string`

Defined in: [index.ts:207](https://github.com/maiyunnet/kebab/blob/master/index.ts#L207)

***

### path

> **path**: `string`

Defined in: [index.ts:185](https://github.com/maiyunnet/kebab/blob/master/index.ts#L185)

不以 / 开头，不含 qs

***

### qs

> **qs**: `string`

Defined in: [index.ts:187](https://github.com/maiyunnet/kebab/blob/master/index.ts#L187)

不含 ? 开头

***

### qss

> **qss**: `string`

Defined in: [index.ts:189](https://github.com/maiyunnet/kebab/blob/master/index.ts#L189)

含 ? 开头

***

### rootPath

> **rootPath**: `string`

Defined in: [index.ts:206](https://github.com/maiyunnet/kebab/blob/master/index.ts#L206)

***

### startMemory

> **startMemory**: `number`

Defined in: [index.ts:191](https://github.com/maiyunnet/kebab/blob/master/index.ts#L191)

***

### startTime

> **startTime**: `bigint`

Defined in: [index.ts:190](https://github.com/maiyunnet/kebab/blob/master/index.ts#L190)

***

### uri

> **uri**: [`IUrlParse`](IUrlParse.md)

Defined in: [index.ts:202](https://github.com/maiyunnet/kebab/blob/master/index.ts#L202)

***

### urlBase

> **urlBase**: `string`

Defined in: [index.ts:215](https://github.com/maiyunnet/kebab/blob/master/index.ts#L215)

***

### urlFull

> **urlFull**: `string`

Defined in: [index.ts:217](https://github.com/maiyunnet/kebab/blob/master/index.ts#L217)

***

### urlStc

> **urlStc**: `string`

Defined in: [index.ts:216](https://github.com/maiyunnet/kebab/blob/master/index.ts#L216)

***

### urlStcFull

> **urlStcFull**: `string`

Defined in: [index.ts:218](https://github.com/maiyunnet/kebab/blob/master/index.ts#L218)

***

### viewPath

> **viewPath**: `string`

Defined in: [index.ts:209](https://github.com/maiyunnet/kebab/blob/master/index.ts#L209)

***

### wechat

> **wechat**: `boolean`

Defined in: [index.ts:196](https://github.com/maiyunnet/kebab/blob/master/index.ts#L196)

***

### wsPath

> **wsPath**: `string`

Defined in: [index.ts:211](https://github.com/maiyunnet/kebab/blob/master/index.ts#L211)

index/interfaces/IConfigDb.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigDb

# Interface: IConfigDb

Defined in: [index.ts:150](https://github.com/maiyunnet/kebab/blob/master/index.ts#L150)

数据库

## Properties

### charset?

> `optional` **charset?**: `string`

Defined in: [index.ts:153](https://github.com/maiyunnet/kebab/blob/master/index.ts#L153)

***

### host

> **host**: `string`

Defined in: [index.ts:151](https://github.com/maiyunnet/kebab/blob/master/index.ts#L151)

***

### name?

> `optional` **name?**: `string`

Defined in: [index.ts:154](https://github.com/maiyunnet/kebab/blob/master/index.ts#L154)

***

### port

> **port**: `number`

Defined in: [index.ts:152](https://github.com/maiyunnet/kebab/blob/master/index.ts#L152)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:157](https://github.com/maiyunnet/kebab/blob/master/index.ts#L157)

***

### user

> **user**: `string`

Defined in: [index.ts:156](https://github.com/maiyunnet/kebab/blob/master/index.ts#L156)

index/interfaces/IConfigDns.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigDns

# Interface: IConfigDns

Defined in: [index.ts:161](https://github.com/maiyunnet/kebab/blob/master/index.ts#L161)

DNS

## Properties

### sid

> **sid**: `string`

Defined in: [index.ts:162](https://github.com/maiyunnet/kebab/blob/master/index.ts#L162)

***

### skey

> **skey**: `string`

Defined in: [index.ts:163](https://github.com/maiyunnet/kebab/blob/master/index.ts#L163)

index/interfaces/IConfigKv.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigKv

# Interface: IConfigKv

Defined in: [index.ts:167](https://github.com/maiyunnet/kebab/blob/master/index.ts#L167)

kv

## Properties

### host

> **host**: `string`

Defined in: [index.ts:168](https://github.com/maiyunnet/kebab/blob/master/index.ts#L168)

***

### index

> **index**: `number`

Defined in: [index.ts:170](https://github.com/maiyunnet/kebab/blob/master/index.ts#L170)

***

### port

> **port**: `number`

Defined in: [index.ts:169](https://github.com/maiyunnet/kebab/blob/master/index.ts#L169)

***

### pre

> **pre**: `string`

Defined in: [index.ts:171](https://github.com/maiyunnet/kebab/blob/master/index.ts#L171)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:174](https://github.com/maiyunnet/kebab/blob/master/index.ts#L174)

***

### user

> **user**: `string`

Defined in: [index.ts:173](https://github.com/maiyunnet/kebab/blob/master/index.ts#L173)

index/interfaces/IConfigLang.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigLang

# Interface: IConfigLang

Defined in: [index.ts:104](https://github.com/maiyunnet/kebab/blob/master/index.ts#L104)

语言

## Properties

### direct

> **direct**: `string`[]

Defined in: [index.ts:106](https://github.com/maiyunnet/kebab/blob/master/index.ts#L106)

***

### list

> **list**: `string`[]

Defined in: [index.ts:105](https://github.com/maiyunnet/kebab/blob/master/index.ts#L105)

index/interfaces/IConfig.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfig

# Interface: IConfig

Defined in: [index.ts:52](https://github.com/maiyunnet/kebab/blob/master/index.ts#L52)

目录配置文件

## Indexable

> \[`key`: `string`\]: `Record`\<`string`, `any`\>

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

index/interfaces/IConfigS3.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigS3

# Interface: IConfigS3

Defined in: [index.ts:110](https://github.com/maiyunnet/kebab/blob/master/index.ts#L110)

对象存储

## Properties

### account?

> `optional` **account?**: `string`

Defined in: [index.ts:112](https://github.com/maiyunnet/kebab/blob/master/index.ts#L112)

cf r2 要用

***

### bucket

> **bucket**: `string`

Defined in: [index.ts:116](https://github.com/maiyunnet/kebab/blob/master/index.ts#L116)

***

### region

> **region**: `string`

Defined in: [index.ts:115](https://github.com/maiyunnet/kebab/blob/master/index.ts#L115)

***

### sid

> **sid**: `string`

Defined in: [index.ts:113](https://github.com/maiyunnet/kebab/blob/master/index.ts#L113)

***

### skey

> **skey**: `string`

Defined in: [index.ts:114](https://github.com/maiyunnet/kebab/blob/master/index.ts#L114)

index/interfaces/IConfigSql.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigSql

# Interface: IConfigSql

Defined in: [index.ts:178](https://github.com/maiyunnet/kebab/blob/master/index.ts#L178)

sql

## Properties

### pre

> **pre**: `string`

Defined in: [index.ts:179](https://github.com/maiyunnet/kebab/blob/master/index.ts#L179)

index/interfaces/IConfigTurnstile.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigTurnstile

# Interface: IConfigTurnstile

Defined in: [index.ts:136](https://github.com/maiyunnet/kebab/blob/master/index.ts#L136)

人机码信息

## Properties

### CF

> **CF**: `object`

Defined in: [index.ts:137](https://github.com/maiyunnet/kebab/blob/master/index.ts#L137)

#### sid

> **sid**: `string`

#### skey

> **skey**: `string`

***

### TENCENT

> **TENCENT**: `object`

Defined in: [index.ts:141](https://github.com/maiyunnet/kebab/blob/master/index.ts#L141)

#### aid

> **aid**: `string`

#### akey

> **akey**: `string`

#### sid

> **sid**: `string`

#### skey

> **skey**: `string`

index/interfaces/IConfigVector.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigVector

# Interface: IConfigVector

Defined in: [index.ts:127](https://github.com/maiyunnet/kebab/blob/master/index.ts#L127)

向量数据库

## Properties

### host

> **host**: `string`

Defined in: [index.ts:128](https://github.com/maiyunnet/kebab/blob/master/index.ts#L128)

***

### name

> **name**: `string`

Defined in: [index.ts:130](https://github.com/maiyunnet/kebab/blob/master/index.ts#L130)

***

### port

> **port**: `number`

Defined in: [index.ts:129](https://github.com/maiyunnet/kebab/blob/master/index.ts#L129)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:132](https://github.com/maiyunnet/kebab/blob/master/index.ts#L132)

***

### user

> **user**: `string`

Defined in: [index.ts:131](https://github.com/maiyunnet/kebab/blob/master/index.ts#L131)

index/interfaces/IPostFile.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IPostFile

# Interface: IPostFile

Defined in: [index.ts:230](https://github.com/maiyunnet/kebab/blob/master/index.ts#L230)

上传的文件信息对象

## Properties

### name

> `readonly` **name**: `string`

Defined in: [index.ts:231](https://github.com/maiyunnet/kebab/blob/master/index.ts#L231)

***

### origin

> `readonly` **origin**: `string`

Defined in: [index.ts:232](https://github.com/maiyunnet/kebab/blob/master/index.ts#L232)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:234](https://github.com/maiyunnet/kebab/blob/master/index.ts#L234)

***

### size

> `readonly` **size**: `number`

Defined in: [index.ts:233](https://github.com/maiyunnet/kebab/blob/master/index.ts#L233)

index/interfaces/IUrlParse.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IUrlParse

# Interface: IUrlParse

Defined in: [index.ts:89](https://github.com/maiyunnet/kebab/blob/master/index.ts#L89)

## Properties

### auth

> **auth**: `string` \| `null`

Defined in: [index.ts:91](https://github.com/maiyunnet/kebab/blob/master/index.ts#L91)

***

### hash

> **hash**: `string` \| `null`

Defined in: [index.ts:100](https://github.com/maiyunnet/kebab/blob/master/index.ts#L100)

***

### host

> **host**: `string` \| `null`

Defined in: [index.ts:94](https://github.com/maiyunnet/kebab/blob/master/index.ts#L94)

***

### hostname

> **hostname**: `string` \| `null`

Defined in: [index.ts:95](https://github.com/maiyunnet/kebab/blob/master/index.ts#L95)

***

### pass

> **pass**: `string` \| `null`

Defined in: [index.ts:93](https://github.com/maiyunnet/kebab/blob/master/index.ts#L93)

***

### path

> **path**: `string` \| `null`

Defined in: [index.ts:98](https://github.com/maiyunnet/kebab/blob/master/index.ts#L98)

***

### pathname

> **pathname**: `string`

Defined in: [index.ts:97](https://github.com/maiyunnet/kebab/blob/master/index.ts#L97)

***

### port

> **port**: `string` \| `null`

Defined in: [index.ts:96](https://github.com/maiyunnet/kebab/blob/master/index.ts#L96)

***

### protocol

> **protocol**: `string` \| `null`

Defined in: [index.ts:90](https://github.com/maiyunnet/kebab/blob/master/index.ts#L90)

***

### query

> **query**: `string` \| `null`

Defined in: [index.ts:99](https://github.com/maiyunnet/kebab/blob/master/index.ts#L99)

***

### user

> **user**: `string` \| `null`

Defined in: [index.ts:92](https://github.com/maiyunnet/kebab/blob/master/index.ts#L92)

index/interfaces/IVhost.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IVhost

# Interface: IVhost

Defined in: [index.ts:222](https://github.com/maiyunnet/kebab/blob/master/index.ts#L222)

虚拟机配置对象

## Properties

### domains

> `readonly` **domains**: `string`[]

Defined in: [index.ts:224](https://github.com/maiyunnet/kebab/blob/master/index.ts#L224)

***

### name?

> `readonly` `optional` **name?**: `string`

Defined in: [index.ts:223](https://github.com/maiyunnet/kebab/blob/master/index.ts#L223)

***

### remark?

> `readonly` `optional` **remark?**: `string`

Defined in: [index.ts:226](https://github.com/maiyunnet/kebab/blob/master/index.ts#L226)

***

### root

> `readonly` **root**: `string`

Defined in: [index.ts:225](https://github.com/maiyunnet/kebab/blob/master/index.ts#L225)

index.md
---

**Documents for @maiyunnet/kebab**

***

# Documents for @maiyunnet/kebab

## Modules

- [index](index/index.md)
- [lib/ai](lib/ai/index.md)
- [lib/buffer](lib/buffer/index.md)
- [lib/captcha](lib/captcha/index.md)
- [lib/consistent](lib/consistent/index.md)
- [lib/cookie](lib/cookie/index.md)
- [lib/core](lib/core/index.md)
- [lib/cron](lib/cron/index.md)
- [lib/crypto](lib/crypto/index.md)
- [lib/db](lib/db/index.md)
- [lib/db/conn](lib/db/conn/index.md)
- [lib/db/pool](lib/db/pool/index.md)
- [lib/db/tran](lib/db/tran/index.md)
- [lib/dns](lib/dns/index.md)
- [lib/fs](lib/fs/index.md)
- [lib/kv](lib/kv/index.md)
- [lib/lan](lib/lan/index.md)
- [lib/lang](lib/lang/index.md)
- [lib/net](lib/net/index.md)
- [lib/net/formdata](lib/net/formdata/index.md)
- [lib/net/request](lib/net/request/index.md)
- [lib/net/response](lib/net/response/index.md)
- [lib/ratelimit](lib/ratelimit/index.md)
- [lib/s3](lib/s3/index.md)
- [lib/scan](lib/scan/index.md)
- [lib/session](lib/session/index.md)
- [lib/socket](lib/socket/index.md)
- [lib/sql](lib/sql/index.md)
- [lib/ssh](lib/ssh/index.md)
- [lib/ssh/sftp](lib/ssh/sftp/index.md)
- [lib/ssh/shell](lib/ssh/shell/index.md)
- [lib/text](lib/text/index.md)
- [lib/time](lib/time/index.md)
- [lib/turnstile](lib/turnstile/index.md)
- [lib/undici](lib/undici/index.md)
- [lib/undici/formdata](lib/undici/formdata/index.md)
- [lib/undici/request](lib/undici/request/index.md)
- [lib/undici/response](lib/undici/response/index.md)
- [lib/vector](lib/vector/index.md)
- [lib/ws](lib/ws/index.md)
- [lib/zip](lib/zip/index.md)
- [lib/zlib](lib/zlib/index.md)
- [main](main/index.md)
- [sys/ctr](sys/ctr/index.md)
- [sys/mod](sys/mod/index.md)
- [sys/route](sys/route/index.md)

index/type-aliases/DbValue.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / DbValue

# Type Alias: DbValue

> **DbValue** = `string` \| `number` \| `null` \| `Record`\<`string`, [`Json`](Json.md)\>

Defined in: [index.ts:49](https://github.com/maiyunnet/kebab/blob/master/index.ts#L49)

数据库值的类型

index/type-aliases/Json.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / Json

# Type Alias: Json

> **Json** = `any`

Defined in: [index.ts:46](https://github.com/maiyunnet/kebab/blob/master/index.ts#L46)

除非确定是不可知的 Json，否则不能使用

index/variables/CERT_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / CERT\_CWD

# Variable: CERT\_CWD

> `const` **CERT\_CWD**: `string`

Defined in: [index.ts:33](https://github.com/maiyunnet/kebab/blob/master/index.ts#L33)

index/variables/CONF_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / CONF\_CWD

# Variable: CONF\_CWD

> `const` **CONF\_CWD**: `string`

Defined in: [index.ts:32](https://github.com/maiyunnet/kebab/blob/master/index.ts#L32)

index/variables/FTMP_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / FTMP\_CWD

# Variable: FTMP\_CWD

> `const` **FTMP\_CWD**: `string`

Defined in: [index.ts:40](https://github.com/maiyunnet/kebab/blob/master/index.ts#L40)

index/variables/IND_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IND\_CWD

# Variable: IND\_CWD

> `const` **IND\_CWD**: `string`

Defined in: [index.ts:39](https://github.com/maiyunnet/kebab/blob/master/index.ts#L39)

index/variables/LIB_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LIB\_CWD

# Variable: LIB\_CWD

> `const` **LIB\_CWD**: `string`

Defined in: [index.ts:36](https://github.com/maiyunnet/kebab/blob/master/index.ts#L36)

用户的根 LIB，以 / 结尾

index/variables/LIB_PATH.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LIB\_PATH

# Variable: LIB\_PATH

> `const` **LIB\_PATH**: `string`

Defined in: [index.ts:21](https://github.com/maiyunnet/kebab/blob/master/index.ts#L21)

框架的 LIB，以 / 结尾

index/variables/LOG_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LOG\_CWD

# Variable: LOG\_CWD

> `const` **LOG\_CWD**: `string`

Defined in: [index.ts:37](https://github.com/maiyunnet/kebab/blob/master/index.ts#L37)

index/variables/MOD_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / MOD\_CWD

# Variable: MOD\_CWD

> `const` **MOD\_CWD**: `string`

Defined in: [index.ts:41](https://github.com/maiyunnet/kebab/blob/master/index.ts#L41)

index/variables/ROOT_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / ROOT\_CWD

# Variable: ROOT\_CWD

> `const` **ROOT\_CWD**: `string`

Defined in: [index.ts:31](https://github.com/maiyunnet/kebab/blob/master/index.ts#L31)

执行根目录，以 / 结尾

index/variables/ROOT_PATH.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / ROOT\_PATH

# Variable: ROOT\_PATH

> `const` **ROOT\_PATH**: `string`

Defined in: [index.ts:19](https://github.com/maiyunnet/kebab/blob/master/index.ts#L19)

框架根目录，以 / 结尾

index/variables/SYS_PATH.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / SYS\_PATH

# Variable: SYS\_PATH

> `const` **SYS\_PATH**: `string`

Defined in: [index.ts:22](https://github.com/maiyunnet/kebab/blob/master/index.ts#L22)

index/variables/VER.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / VER

# Variable: VER

> `const` **VER**: `"9.10.1"` = `'9.10.1'`

Defined in: [index.ts:10](https://github.com/maiyunnet/kebab/blob/master/index.ts#L10)

当前系统版本号

index/variables/VHOST_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / VHOST\_CWD

# Variable: VHOST\_CWD

> `const` **VHOST\_CWD**: `string`

Defined in: [index.ts:34](https://github.com/maiyunnet/kebab/blob/master/index.ts#L34)

index/variables/WWW_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / WWW\_CWD

# Variable: WWW\_CWD

> `const` **WWW\_CWD**: `string`

Defined in: [index.ts:38](https://github.com/maiyunnet/kebab/blob/master/index.ts#L38)

lib/ai/classes/Ai.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / Ai

# Class: Ai

Defined in: [lib/ai.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L60)

## Constructors

### Constructor

> **new Ai**(`ctrEtc`, `opt`): `Ai`

Defined in: [lib/ai.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L73)

#### Parameters

##### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Ai`

## Properties

### link

> `readonly` **link**: `OpenAI`

Defined in: [lib/ai.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L63)

openai 原生对象

## Accessors

### service

#### Get Signature

> **get** **service**(): [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L149)

获取当前服务商

##### Returns

[`ESERVICE`](../enumerations/ESERVICE.md)

## Methods

### chat()

创建对话

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

Defined in: [lib/ai.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L154)

创建非流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsNonStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

Defined in: [lib/ai.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L158)

创建流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

***

### embedding()

> **embedding**(`body`): `Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

Defined in: [lib/ai.ts:181](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L181)

创建向量

#### Parameters

##### body

`EmbeddingCreateParams`

#### Returns

`Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

***

### image()

> **image**(`opt`): `Promise`\<`false` \| \{ `list`: `object`[]; `request`: `string`; `seed`: `number`; \}\>

Defined in: [lib/ai.ts:197](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L197)

生成图像，不支持 GEMINI、GROK 服务商

#### Parameters

##### opt

###### extend?

`boolean`

模型是否自动优化提示词，默认为 false，但有些服务商可能无效

###### imgs?

`string`[]

参考图，请注意模型是否支持，以及是否支持多张，仅支持 ALICN、ALIAS、ALINE、VOLCN、VOLAS 服务商

###### model

`string`

###### n?

`number`

###### negative?

`string`

负面提示词，用于引导模型避免生成某些内容

###### prompt

`string`

提示词

###### seed?

`number`

随机种子，默认为随机

###### size

`number`[]

长 x 宽，不同模型要求不同，如 [1664, 928]

#### Returns

`Promise`\<`false` \| \{ `list`: `object`[]; `request`: `string`; `seed`: `number`; \}\>

***

### poll()

> **poll**(`opt`): `Promise`\<`false` \| \{ `add?`: `number`; `end?`: `number`; `error?`: `string`; `start?`: `number`; `status`: `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"FAILED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; `url?`: `string`; \}\>

Defined in: [lib/ai.ts:546](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L546)

轮询任务

#### Parameters

##### opt

###### task

`string`

###### type

`"video"`

#### Returns

`Promise`\<`false` \| \{ `add?`: `number`; `end?`: `number`; `error?`: `string`; `start?`: `number`; `status`: `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"FAILED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; `url?`: `string`; \}\>

***

### video()

> **video**(`opt`): `Promise`\<`false` \| \{ `request`: `string`; `seed`: `number`; `status`: `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"FAILED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; \}\>

Defined in: [lib/ai.ts:378](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L378)

异步生成视频，仅支持 ALICN、ALIAS、ALINE

#### Parameters

##### opt

###### audio?

`string` \| `boolean`

视频声音，默认 false，true 代表自动配音，字符串代表自定义音频网址

###### duration?

`number`

视频时长，默认 2 秒

###### extend?

`boolean`

模型是否自动优化提示词，默认为 false，但有些服务商可能无效

###### imgs?

`string`[]

###### mode?

`"frame"` \| `"text"` \| `"ref"`

文本(默认)、首尾帧、参考图

###### model

`string`

###### negative?

`string`

负面提示词，用于引导模型避免生成某些内容

###### prompt

`string`

提示词，参考类可用 [I1] 指代图片，如 `[I1] 看向 [I2]`

###### ratio?

`"16:9"` \| `"9:16"` \| `"4:3"` \| `"3:4"` \| `"1:1"` \| `"21:9"`

比例，默认 16:9

###### resolution?

`"480p"` \| `"720p"` \| `"1080p"`

分辨率，默认 720p

###### seed?

`number`

随机种子，默认为随机，范围 0 - 2147483647

###### shot?

`"single"` \| `"multi"`

镜头，默认单镜头 single

#### Returns

`Promise`\<`false` \| \{ `request`: `string`; `seed`: `number`; `status`: `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"FAILED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; \}\>

lib/ai/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/ai.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L19)

服务商定义

## Enumeration Members

### ALIAS

> **ALIAS**: `1`

Defined in: [lib/ai.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L23)

阿里新加坡

***

### ALICN

> **ALICN**: `0`

Defined in: [lib/ai.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L21)

阿里中国大陆区

***

### ALINE

> **ALINE**: `2`

Defined in: [lib/ai.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L25)

阿里美国

***

### AZURE

> **AZURE**: `3`

Defined in: [lib/ai.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L27)

微软 Azure

***

### AZURE2

> **AZURE2**: `4`

Defined in: [lib/ai.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L29)

微软 Azure 2

***

### AZURE3

> **AZURE3**: `5`

Defined in: [lib/ai.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L31)

微软 Azure 3

***

### GEMINI

> **GEMINI**: `6`

Defined in: [lib/ai.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L33)

Gemini

***

### GROK

> **GROK**: `7`

Defined in: [lib/ai.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L35)

Grok

***

### VOLAS

> **VOLAS**: `9`

Defined in: [lib/ai.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L39)

火山引擎国际区

***

### VOLCN

> **VOLCN**: `8`

Defined in: [lib/ai.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L37)

火山引擎中国大陆区

lib/ai/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `opt`): [`Ai`](../classes/Ai.md)

Defined in: [lib/ai.ts:601](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L601)

创建一个 AI 对象

## Parameters

### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

[`IOptions`](../interfaces/IOptions.md)

选项

## Returns

[`Ai`](../classes/Ai.md)

lib/ai/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/ai

# lib/ai

## Enumerations

- [ESERVICE](enumerations/ESERVICE.md)

## Classes

- [Ai](classes/Ai.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)

## Functions

- [get](functions/get.md)

lib/ai/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/ai.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L43)

选项

## Properties

### endpoint?

> `optional` **endpoint?**: `string`

Defined in: [lib/ai.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L47)

接入点

***

### fetch?

> `optional` **fetch?**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L51)

自定义 fetch 函数

#### Parameters

##### input

`string` \| `Request` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

***

### secretKey?

> `optional` **secretKey?**: `string`

Defined in: [lib/ai.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L49)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L45)

服务商 -

lib/buffer/classes/Reader.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Reader

# Class: Reader

Defined in: [lib/buffer.ts:4](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L4)

读对象

## Constructors

### Constructor

> **new Reader**(`buffer`): `Reader`

Defined in: [lib/buffer.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L11)

#### Parameters

##### buffer

`Buffer`

#### Returns

`Reader`

## Methods

### length()

> **length**(): `number`

Defined in: [lib/buffer.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L78)

获取完整的 buffer 长度

#### Returns

`number`

***

### readBCDString()

> **readBCDString**(`length?`): `string`

Defined in: [lib/buffer.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L51)

读取一个 BCD 编码的字符串（每个字节表示两个数字）

#### Parameters

##### length?

`number`

#### Returns

`string`

***

### readBuffer()

> **readBuffer**(`length?`): `Buffer`

Defined in: [lib/buffer.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L72)

读取 Buffer

#### Parameters

##### length?

`number`

#### Returns

`Buffer`

***

### readString()

> **readString**(`length?`, `encoding?`): `string`

Defined in: [lib/buffer.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L64)

读取普通 string

#### Parameters

##### length?

`number`

##### encoding?

`BufferEncoding` = `'utf8'`

#### Returns

`string`

***

### readUInt16BE()

> **readUInt16BE**(): `number`

Defined in: [lib/buffer.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L23)

读取一个无符号 16 位整数（大端模式），WORD

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [lib/buffer.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L30)

读取一个无符号 16 位整数（小端模式）

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [lib/buffer.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L37)

读取一个无符号 32 位整数（大端模式）, DWORD

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [lib/buffer.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L44)

读取一个无符号 32 位整数（小端模式）

#### Returns

`number`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [lib/buffer.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L16)

读取一个无符号 8 位整数, BYTE

#### Returns

`number`

lib/buffer/classes/Writer.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Writer

# Class: Writer

Defined in: [lib/buffer.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L85)

写对象

## Constructors

### Constructor

> **new Writer**(`size`): `Writer`

Defined in: [lib/buffer.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L92)

#### Parameters

##### size

`number`

#### Returns

`Writer`

## Methods

### get()

> **get**(): `Buffer`

Defined in: [lib/buffer.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L135)

返回 Buffer 对象

#### Returns

`Buffer`

***

### writeBCDString()

> **writeBCDString**(`value`): `void`

Defined in: [lib/buffer.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L115)

[每字节 2 数字] 写入一个 BCD 编码的字符串（仅支持数字）

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`, `encoding?`): `number`

Defined in: [lib/buffer.ts:128](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L128)

写入普通字符串，返回写入的长度

#### Parameters

##### value

`string`

##### encoding?

`BufferEncoding` = `'utf8'`

#### Returns

`number`

***

### writeUInt16BE()

> **writeUInt16BE**(`value`): `void`

Defined in: [lib/buffer.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L103)

[2 字节] 写入一个无符号 16 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt32BE()

> **writeUInt32BE**(`value`): `void`

Defined in: [lib/buffer.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L109)

[4 字节] 写入一个无符号 32 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt8()

> **writeUInt8**(`value`): `void`

Defined in: [lib/buffer.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L97)

[1 字节] 写入一个无符号 8 位整数

#### Parameters

##### value

`number`

#### Returns

`void`

lib/buffer/functions/getFull.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / getFull

# Function: getFull()

> **getFull**(`stream`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/buffer.ts:161](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L161)

从可读流中获取完整的 Buffer

## Parameters

### stream

`ReadableStream`

可读流对象

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/buffer/functions/getReader.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / getReader

# Function: getReader()

> **getReader**(`buffer`): [`Reader`](../classes/Reader.md)

Defined in: [lib/buffer.ts:145](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L145)

Buffer Reader 对象

## Parameters

### buffer

`Buffer`

要读取的 buffer

## Returns

[`Reader`](../classes/Reader.md)

lib/buffer/functions/getWriter.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / getWriter

# Function: getWriter()

> **getWriter**(`size`): [`Writer`](../classes/Writer.md)

Defined in: [lib/buffer.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L153)

Buffer Writer 对象

## Parameters

### size

`number`

缓冲区大小

## Returns

[`Writer`](../classes/Writer.md)

lib/buffer/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/buffer

# lib/buffer

## Classes

- [Reader](classes/Reader.md)
- [Writer](classes/Writer.md)

## Functions

- [getFull](functions/getFull.md)
- [getReader](functions/getReader.md)
- [getWriter](functions/getWriter.md)

lib/captcha/classes/Captcha.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/captcha](../index.md) / Captcha

# Class: Captcha

Defined in: [lib/captcha.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L13)

## Constructors

### Constructor

> **new Captcha**(`opt`): `Captcha`

Defined in: [lib/captcha.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L17)

#### Parameters

##### opt

###### height

`number`

###### length

`number`

###### width

`number`

#### Returns

`Captcha`

## Methods

### getBase64()

> **getBase64**(): `string`

Defined in: [lib/captcha.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L38)

获取 base64 格式图片

#### Returns

`string`

***

### getBuffer()

> **getBuffer**(): `string`

Defined in: [lib/captcha.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L31)

获取图片 Buffer

#### Returns

`string`

***

### getPhrase()

> **getPhrase**(): `string`

Defined in: [lib/captcha.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L45)

获取当前随机码

#### Returns

`string`

lib/captcha/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/captcha](../index.md) / get

# Function: get()

> **get**(`width`, `height`, `length?`): [`Captcha`](../classes/Captcha.md)

Defined in: [lib/captcha.ts:57](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L57)

获取验证码对象

## Parameters

### width

`number`

宽度

### height

`number`

高度

### length?

`number` = `4`

字符个数

## Returns

[`Captcha`](../classes/Captcha.md)

lib/captcha/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/captcha

# lib/captcha

## Classes

- [Captcha](classes/Captcha.md)

## Functions

- [get](functions/get.md)

lib/consistent/classes/Consistent.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / Consistent

# Class: Consistent

Defined in: [lib/consistent.ts:8](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L8)

## Constructors

### Constructor

> **new Consistent**(`vcount`): `Consistent`

Defined in: [lib/consistent.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L19)

#### Parameters

##### vcount

`number`

#### Returns

`Consistent`

## Methods

### add()

> **add**(`node`): `void`

Defined in: [lib/consistent.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L34)

添加节点

#### Parameters

##### node

`string` \| `string`[]

node 节点名一个或多个

#### Returns

`void`

***

### find()

> **find**(`key`): `string` \| `null`

Defined in: [lib/consistent.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L59)

获得一个最近的顺时针节点

#### Parameters

##### key

`string` \| `number`

为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点

#### Returns

`string` \| `null`

***

### getVcount()

> **getVcount**(): `number`

Defined in: [lib/consistent.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L26)

获取当前的虚拟节点数量

#### Returns

`number`

***

### migration()

> **migration**(`keys`, `node`): `Record`\<`string`, \{ `new`: `string`; `old`: `string`; \}\>

Defined in: [lib/consistent.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L74)

原数据迁移到新地址

#### Parameters

##### keys

`string` \| `number` \| (`string` \| `number`)[]

原始数据 key 集

##### node

`string` \| `string`[]

新增的节点一个或多个

#### Returns

`Record`\<`string`, \{ `new`: `string`; `old`: `string`; \}\>

***

### remove()

> **remove**(`node`): `void`

Defined in: [lib/consistent.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L43)

移除节点

#### Parameters

##### node

`string` \| `string`[]

node 节点名

#### Returns

`void`

lib/consistent/functions/addToCircle.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / addToCircle

# Function: addToCircle()

> **addToCircle**(`circle`, `node`, `vcount?`): `void`

Defined in: [lib/consistent.ts:167](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L167)

添加到圆环

## Parameters

### circle

`Record`\<`string`, `string`\>

圆环

### node

`string` \| `string`[]

node 节点名一个或多个

### vcount?

`number` = `300`

虚拟节点数量

## Returns

`void`

lib/consistent/functions/fast.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / fast

# Function: fast()

> **fast**(`key`, `nodes`, `vcount?`): `string` \| `null`

Defined in: [lib/consistent.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L124)

快速查找一个 key 属于哪个 node

## Parameters

### key

`string` \| `number`

要查找的key

### nodes

`string` \| `string`[]

node 列表

### vcount?

`number` = `300`

虚拟节点数量

## Returns

`string` \| `null`

lib/consistent/functions/findInCircle.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / findInCircle

# Function: findInCircle()

> **findInCircle**(`circle`, `key`, `keys?`): `string` \| `null`

Defined in: [lib/consistent.ts:188](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L188)

获得一个最近的顺时针节点

## Parameters

### circle

`Record`\<`string`, `string`\>

圆环

### key

`string` \| `number`

为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点

### keys?

`string`[] = `[]`

keys，留空则自动从 circle 上取

## Returns

`string` \| `null`

lib/consistent/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / get

# Function: get()

> **get**(`vcount?`): [`Consistent`](../classes/Consistent.md)

Defined in: [lib/consistent.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L114)

## Parameters

### vcount?

`number` = `300`

## Returns

[`Consistent`](../classes/Consistent.md)

lib/consistent/functions/getRange.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / getRange

# Function: getRange()

> **getRange**(`min`, `max`, `pre?`): `string`[]

Defined in: [lib/consistent.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L153)

获取区间节点系列

## Parameters

### min

`number`

最小值（含）

### max

`number`

最大值（含）

### pre?

`string` = `''`

前导

## Returns

`string`[]

lib/consistent/functions/hash.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / hash

# Function: hash()

> **hash**(`val`): `number`

Defined in: [lib/consistent.ts:134](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L134)

hash 函数

## Parameters

### val

`string` \| `number`

要 hash 的值

## Returns

`number`

lib/consistent/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/consistent

# lib/consistent

## Classes

- [Consistent](classes/Consistent.md)

## Functions

- [addToCircle](functions/addToCircle.md)
- [fast](functions/fast.md)
- [findInCircle](functions/findInCircle.md)
- [get](functions/get.md)
- [getRange](functions/getRange.md)
- [hash](functions/hash.md)

lib/cookie/functions/buildCookieObject.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / buildCookieObject

# Function: buildCookieObject()

> **buildCookieObject**(`cookie`, `setCookies`, `uri`): `Promise`\<`void`\>

Defined in: [lib/cookie.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L46)

根据 Set-Cookie 头部转换到 cookie 对象

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

### setCookies

`string`[]

头部的 set-cookie 数组

### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

请求的 URI 对象

## Returns

`Promise`\<`void`\>

lib/cookie/functions/buildCookieQuery.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / buildCookieQuery

# Function: buildCookieQuery()

> **buildCookieQuery**(`cookie`, `uri`): `string`

Defined in: [lib/cookie.ts:175](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L175)

对象转换为 Cookie 拼接字符串（会自动筛掉不能发送的 cookie）

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

请求的 URI 对象

## Returns

`string`

lib/cookie/functions/resetCookieSession.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / resetCookieSession

# Function: resetCookieSession()

> **resetCookieSession**(`cookie`): `void`

Defined in: [lib/cookie.ts:225](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L225)

模拟重启浏览器后的状态

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

## Returns

`void`

lib/cookie/functions/setCookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / setCookie

# Function: setCookie()

> **setCookie**(`cookie`, `name`, `value`, `domain`, `opt?`): `void`

Defined in: [lib/cookie.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L13)

对 cookie 对象进行操作

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

要操作的对象

### name

`string`

名

### value

`string`

值

### domain

`string`

应用网址，如 .xxx.com

### opt?

选项 ttl, path, ssl, httponly

#### httponly?

`boolean`

#### path?

`string`

#### ssl?

`boolean`

#### ttl?

`number`

## Returns

`void`

lib/cookie/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/cookie

# lib/cookie

## Interfaces

- [ICookie](interfaces/ICookie.md)

## Functions

- [buildCookieObject](functions/buildCookieObject.md)
- [buildCookieQuery](functions/buildCookieQuery.md)
- [resetCookieSession](functions/resetCookieSession.md)
- [setCookie](functions/setCookie.md)

lib/cookie/interfaces/ICookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / ICookie

# Interface: ICookie

Defined in: [lib/cookie.ts:237](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L237)

Cookie 对象

## Properties

### domain

> **domain**: `string`

Defined in: [lib/cookie.ts:243](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L243)

***

### exp

> **exp**: `number`

Defined in: [lib/cookie.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L241)

有效期秒级时间戳

***

### httponly

> **httponly**: `boolean`

Defined in: [lib/cookie.ts:245](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L245)

***

### name

> **name**: `string`

Defined in: [lib/cookie.ts:238](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L238)

***

### path

> **path**: `string`

Defined in: [lib/cookie.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L242)

***

### secure

> **secure**: `boolean`

Defined in: [lib/cookie.ts:244](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L244)

***

### value

> **value**: `string`

Defined in: [lib/cookie.ts:239](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L239)

lib/core/functions/checkSchema.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / checkSchema

# Function: checkSchema()

> **checkSchema**(`val`, `schema`): `string`

Defined in: [lib/core.ts:301](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L301)

判断一个对象是否符合 JSON Schema

## Parameters

### val

`any`

对象

### schema

`any`

JSON Schema

## Returns

`string`

lib/core/functions/checkType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / checkType

# Function: checkType()

> **checkType**(`val`, `type`, `tree?`): `string`

Defined in: [lib/core.ts:213](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L213)

判断一个对象是否符合示例组，返回空字符串代表校验通过，返回：应该的类型:位置:传入的类型

## Parameters

### val

`any`

对象

### type

`any`

示例组

### tree?

`string` = `'root'`

当前树，无需传入

## Returns

`string`

lib/core/functions/clone.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / clone

# Function: clone()

> **clone**\<`T`\>(`obj`): `T`

Defined in: [lib/core.ts:1162](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1162)

完整的克隆一份数组/对象

## Type Parameters

### T

`T`

## Parameters

### obj

`T`

要克隆的对象

## Returns

`T`

lib/core/functions/convert62.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / convert62

# Function: convert62()

> **convert62**(`n`): `string`

Defined in: [lib/core.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L154)

将 10 进制转换为 62 进制

## Parameters

### n

`string` \| `number` \| `bigint`

10 进制数字最大 9223372036854775807n

## Returns

`string`

lib/core/functions/debug.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / debug

# Function: debug()

> **debug**(`message?`, ...`optionalParams`): `void`

Defined in: [lib/core.ts:1196](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1196)

打印调试信息，线上环境不会打印

## Parameters

### message?

`any`

参数

### optionalParams

...`any`[]

参数

## Returns

`void`

lib/core/functions/display.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / display

# Function: display()

> **display**(`message?`, ...`optionalParams`): `void`

Defined in: [lib/core.ts:1209](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1209)

向控制台直接显示内容，一般情况下禁止使用

## Parameters

### message?

`any`

参数

### optionalParams

...`any`[]

参数

## Returns

`void`

lib/core/functions/emptyObject.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / emptyObject

# Function: emptyObject()

> **emptyObject**(`obj`, `deep?`): `void`

Defined in: [lib/core.ts:453](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L453)

将对象的所有属性清除包括键，不会破坏引用关系，对象变量依然保证是引用状态

## Parameters

### obj

`Record`\<`string`, `any`\>

要清除的对象

### deep?

`boolean` = `false`

也将子项都清空，如果子项有独立引用的话也要清空的话则要设置为 true

## Returns

`void`

lib/core/functions/exec.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / exec

# Function: exec()

> **exec**(`command`, `options?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/core.ts:515](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L515)

执行命令行

## Parameters

### command

`string`

命令字符串

### options?

#### cwd?

`string`

## Returns

`Promise`\<`string` \| `false`\>

lib/core/functions/getLog.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getLog

# Function: getLog()

> **getLog**(`opt`): `Promise`\<`false` \| \{ `list`: `any`[] \| `string`[][]; `total`: `number`; \}\>

Defined in: [lib/core.ts:1074](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1074)

获取日志内容为一个数组

## Parameters

### opt

参数

#### fend?

`string`

如 -error

#### host?

`string`

获取局域网服务器的日志，为空代表获取本机的

#### hostname

`string`

要查询的头，如 127.0.0.1、system、www.maiyun.net 等

#### limit?

`number`

最大限制，默认 100

#### offset?

`number`

跳过条数

#### path

`string`

如 2024/08/01/22

#### search?

`string`

仅显示被搜索到的行

## Returns

`Promise`\<`false` \| \{ `list`: `any`[] \| `string`[][]; `total`: `number`; \}\>

lib/core/functions/ip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ip

# Function: ip()

> **ip**(`ctr`, `req?`): `string`

Defined in: [lib/core.ts:358](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L358)

获取 IP（非安全 IP）

## Parameters

### ctr

`IncomingHttpHeaders` \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### req?

`IncomingMessage` \| `Http2ServerRequest`

## Returns

`string`

lib/core/functions/ips.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ips

# Function: ips()

> **ips**(`ctr`): `object`

Defined in: [lib/core.ts:383](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L383)

获取 CF 和 X 的 IP

## Parameters

### ctr

`IncomingHttpHeaders` \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

## Returns

`object`

### cf

> **cf**: `string`

### x

> **x**: `string`

lib/core/functions/loadEnv.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / loadEnv

# Function: loadEnv()

> **loadEnv**(`dir`): `Promise`\<`void`\>

Defined in: [lib/core.ts:1261](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1261)

加载 .env 文件到 process.env，若文件不存在则跳过

## Parameters

### dir

`string`

.env 文件所在目录路径（以 / 结尾）

## Returns

`Promise`\<`void`\>

lib/core/functions/log.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / log

# Function: log()

> **log**(`opt`, `msg`, `fend?`): `void`

Defined in: [lib/core.ts:963](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L963)

写入文件日志

## Parameters

### opt

[`Ctr`](../../../sys/ctr/classes/Ctr.md) \| [`ILogOptions`](../interfaces/ILogOptions.md)

选项

### msg

`string`

自定义内容

### fend?

`string` = `''`

文件名追加

## Returns

`void`

lib/core/functions/ls.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ls

# Function: ls()

> **ls**(`opt`): `Promise`\<`object`[]\>

Defined in: [lib/core.ts:1123](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1123)

获取目录内文件/文件夹列表

## Parameters

### opt

参数

#### encoding?

`BufferEncoding`

#### host?

`string`

获取局域网服务器的目录列表，为空代表获取本机的

#### path

`string`

如 2024/08/01/22，无所谓开头结尾是否有 /，不会逃逸出 cwd 路径

## Returns

`Promise`\<`object`[]\>

lib/core/functions/muid.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / muid

# Function: muid()

> **muid**(`ctr`, `opt?`): `string`

Defined in: [lib/core.ts:318](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L318)

获取 MUID

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

Ctr 对象

### opt?

参数

#### bin?

`boolean`

是否含有大小写, 默认 true

#### insert?

`string`

插入指定字符, 最好不超过 2 字符，默认空

#### key?

`string`

多样性混合, 默认空

#### len?

`number`

8 - 32, 默认 8

#### num?

`boolean`

是否含有数字, 默认 true

## Returns

`string`

lib/core/functions/objectSort.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / objectSort

# Function: objectSort()

> **objectSort**\<`T`\>(`o`): `T`

Defined in: [lib/core.ts:434](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L434)

将对象进行升序排列

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `any`\>

## Parameters

### o

`T`

要重排的对象

## Returns

`T`

lib/core/functions/passThroughAppend.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / passThroughAppend

# Function: passThroughAppend()

> **passThroughAppend**(`passThrough`, `data`, `end?`): `Promise`\<`void`\>

Defined in: [lib/core.ts:472](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L472)

调用前自行创建 passThrough，并且调用 pipe 绑定到应该绑定的对象，然后再调用本函数

## Parameters

### passThrough

`PassThrough`

passThrough 对象

### data

(`string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable` \| [`Response`](../../undici/response/classes/Response.md) \| [`Response`](../../net/response/classes/Response.md))[]

数组

### end?

`boolean` = `true`

是否关闭写入，默认是，关闭后 passThrough 不能被写入，但仍然可读

## Returns

`Promise`\<`void`\>

lib/core/functions/purify.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / purify

# Function: purify()

> **purify**(`text`): `string`

Defined in: [lib/core.ts:183](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L183)

去除 html 的空白符、换行以及注释

## Parameters

### text

`string`

要纯净的字符串

## Returns

`string`

lib/core/functions/rand.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / rand

# Function: rand()

> **rand**(`min`, `max`, `prec?`): `number`

Defined in: [lib/core.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L91)

生成基础的范围随机数

## Parameters

### min

`number`

>= 最小值

### max

`number`

<= 最大值

### prec?

`number` = `0`

保留几位小数

## Returns

`number`

lib/core/functions/random.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / random

# Function: random()

> **random**(`length?`, `source?`, `block?`): `string`

Defined in: [lib/core.ts:129](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L129)

生成随机字符串

## Parameters

### length?

`number` = `8`

长度

### source?

`string` = `RANDOM_LN`

采样值

### block?

`string` = `''`

排除的字符

## Returns

`string`

lib/core/functions/realIP.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / realIP

# Function: realIP()

> **realIP**(`ctr`, `name?`): `string`

Defined in: [lib/core.ts:406](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L406)

获取直连 IP（安全 IP）

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### name?

`string` = `''`

输入安全的 header

## Returns

`string`

lib/core/functions/removeGlobal.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / removeGlobal

# Function: removeGlobal()

> **removeGlobal**(`key`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:782](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L782)

移除某个跨线程/跨内网服务器全局变量

## Parameters

### key

`string`

变量名

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/resolveEnvVars.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / resolveEnvVars

# Function: resolveEnvVars()

> **resolveEnvVars**(`obj`): `void`

Defined in: [lib/core.ts:1291](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1291)

将配置对象中的 ${ENV_VAR} 占位符替换为 process.env 的值

## Parameters

### obj

`Record`\<`string`, `any`\>

配置对象

## Returns

`void`

lib/core/functions/sendNpm.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendNpm

# Function: sendNpm()

> **sendNpm**(`path`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:683](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L683)

向本机或局域网 RPC 发送 npm install 操作

## Parameters

### path

`string`

路径，如 /home/kebab/

### hosts?

`string`[] \| `"config"`

局域网列表，不填则代表本机

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sendPackage.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendPackage

# Function: sendPackage()

> **sendPackage**(`content`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L904)

向本机或局域网 RPC 发送 package.json 更新操作

## Parameters

### content

`string`

package.json 文件内容

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sendPm2.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendPm2

# Function: sendPm2()

> **sendPm2**(`name`, `action?`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:636](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L636)

向本机或局域网 RPC 发送 PM2 操作

## Parameters

### name

`string`

PM2 进程名称

### action?

[`TPm2Action`](../type-aliases/TPm2Action.md) = `'restart'`

PM2 操作类型

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sendProject.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendProject

# Function: sendProject()

> **sendProject**(`path`, `key`, `value`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:857](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L857)

向本机或局域网 RPC 发送项目配置更新操作

## Parameters

### path

`string`

项目路径，相对 Kebab 根

### key

`string`

要更新的键名（目前仅支持 staticVer）

### value

`string`

要更新的值

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sendReload.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendReload

# Function: sendReload()

> **sendReload**(`hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:535](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L535)

向主进程（或局域网同代码机子）发送广播将进行 reload 操作，等待回传
主要作用除代码热更新以外的其他情况

## Parameters

### hosts?

`string`[] \| `"config"`

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sendRestart.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendRestart

# Function: sendRestart()

> **sendRestart**(`hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:583](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L583)

向主进程（或局域网同代码机子）发送广播将进行 restart 操作，停止监听并启动新进程，老进程在连接全部断开后自行销毁
主要用作不间断的代码热更新

## Parameters

### hosts?

`string`[] \| `"config"`

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/setCookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / setCookie

# Function: setCookie()

> **setCookie**(`ctr`, `name`, `value`, `opt?`): `void`

Defined in: [lib/core.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L62)

设置 cookie

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

ctr 实例

### name

`string`

名

### value

`string`

值

### opt?

[`ICookieOptions`](../interfaces/ICookieOptions.md) = `{}`

选项，ttl, 默认和 undefined 为关闭浏览器失效

## Returns

`void`

lib/core/functions/setGlobal.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / setGlobal

# Function: setGlobal()

> **setGlobal**(`key`, `data`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L733)

设置跨线程/指定的局域网主机的全局变量

## Parameters

### key

`string`

变量名

### data

`any`

变量值

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/sleep.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sleep

# Function: sleep()

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [lib/core.ts:422](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L422)

间隔一段时间

## Parameters

### ms

`number`

间隔毫秒

## Returns

`Promise`\<`void`\>

lib/core/functions/unconvert62.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / unconvert62

# Function: unconvert62()

> **unconvert62**(`n`): `bigint`

Defined in: [lib/core.ts:170](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L170)

将 62 进制转换为 10 进制

## Parameters

### n

`string`

62 进制数字最大 aZl8N0y58M7

## Returns

`bigint`

lib/core/functions/updateCode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / updateCode

# Function: updateCode()

> **updateCode**(`sourcePath`, `path`, `hosts?`, `config?`, `strict?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:797](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L797)

上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新创建

## Parameters

### sourcePath

`string`

zip 文件

### path

`string`

要更新的目标路径，无所谓是否 / 开头 / 结尾，是对方 kebab 的根据路径开始算起

### hosts?

`string`[] \| `"config"`

局域网多机部署，不设置默认本机部署

### config?

`string` \| `boolean`

是否自动更新 config 的 set.staticVer 为最新，默认更新，'0'|false-不更新,'1'|true-更新kebab.json若有,'2'|true-更新全局

### strict?

`boolean` = `true`

严格模式，只有存在的文件才会被覆盖，不存在则中途直接报错，默认为 true

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/writeEventStreamHead.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeEventStreamHead

# Function: writeEventStreamHead()

> **writeEventStreamHead**(`res`): `void`

Defined in: [lib/core.ts:1231](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1231)

## Parameters

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

## Returns

`void`

lib/core/functions/writeHead.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeHead

# Function: writeHead()

> **writeHead**(`res`, `statusCode`, `headers?`): `void`

Defined in: [lib/core.ts:1220](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1220)

让 res 发送头部（前提是头部没有被发送才能调用本方法

## Parameters

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

响应对象

### statusCode

`number`

状态码

### headers?

`OutgoingHttpHeaders`

头部

## Returns

`void`

lib/core/functions/write.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / write

# Function: write()

> **write**(`res`, `data`): `void`

Defined in: [lib/core.ts:1243](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1243)

向 res 发送数据

## Parameters

### res

`Socket` \| `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

响应对象

### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

数据

## Returns

`void`

lib/core/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/core

# lib/core

## Interfaces

- [ICookieOptions](interfaces/ICookieOptions.md)
- [ILogOptions](interfaces/ILogOptions.md)

## Type Aliases

- [TPm2Action](type-aliases/TPm2Action.md)

## Variables

- [global](variables/global.md)
- [globalConfig](variables/globalConfig.md)
- [RANDOM\_L](variables/RANDOM_L.md)
- [RANDOM\_LN](variables/RANDOM_LN.md)
- [RANDOM\_LU](variables/RANDOM_LU.md)
- [RANDOM\_LUN](variables/RANDOM_LUN.md)
- [RANDOM\_LUNS](variables/RANDOM_LUNS.md)
- [RANDOM\_N](variables/RANDOM_N.md)
- [RANDOM\_U](variables/RANDOM_U.md)
- [RANDOM\_UN](variables/RANDOM_UN.md)
- [RANDOM\_V](variables/RANDOM_V.md)
- [REAL\_IP\_CF](variables/REAL_IP_CF.md)
- [REAL\_IP\_X](variables/REAL_IP_X.md)

## Functions

- [checkSchema](functions/checkSchema.md)
- [checkType](functions/checkType.md)
- [clone](functions/clone.md)
- [convert62](functions/convert62.md)
- [debug](functions/debug.md)
- [display](functions/display.md)
- [emptyObject](functions/emptyObject.md)
- [exec](functions/exec.md)
- [getLog](functions/getLog.md)
- [ip](functions/ip.md)
- [ips](functions/ips.md)
- [loadEnv](functions/loadEnv.md)
- [log](functions/log.md)
- [ls](functions/ls.md)
- [muid](functions/muid.md)
- [objectSort](functions/objectSort.md)
- [passThroughAppend](functions/passThroughAppend.md)
- [purify](functions/purify.md)
- [rand](functions/rand.md)
- [random](functions/random.md)
- [realIP](functions/realIP.md)
- [removeGlobal](functions/removeGlobal.md)
- [resolveEnvVars](functions/resolveEnvVars.md)
- [sendNpm](functions/sendNpm.md)
- [sendPackage](functions/sendPackage.md)
- [sendPm2](functions/sendPm2.md)
- [sendProject](functions/sendProject.md)
- [sendReload](functions/sendReload.md)
- [sendRestart](functions/sendRestart.md)
- [setCookie](functions/setCookie.md)
- [setGlobal](functions/setGlobal.md)
- [sleep](functions/sleep.md)
- [unconvert62](functions/unconvert62.md)
- [updateCode](functions/updateCode.md)
- [write](functions/write.md)
- [writeEventStreamHead](functions/writeEventStreamHead.md)
- [writeHead](functions/writeHead.md)

lib/core/interfaces/ICookieOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ICookieOptions

# Interface: ICookieOptions

Defined in: [lib/core.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L46)

Cookie 设置的选项

## Properties

### domain?

> `optional` **domain?**: `string`

Defined in: [lib/core.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L49)

***

### httponly?

> `optional` **httponly?**: `boolean`

Defined in: [lib/core.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L51)

***

### path?

> `optional` **path?**: `string`

Defined in: [lib/core.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L48)

***

### samesite?

> `optional` **samesite?**: `"Strict"` \| `"Lax"` \| `"None"`

Defined in: [lib/core.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L52)

***

### ssl?

> `optional` **ssl?**: `boolean`

Defined in: [lib/core.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L50)

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/core.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L47)

lib/core/interfaces/ILogOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ILogOptions

# Interface: ILogOptions

Defined in: [lib/core.ts:946](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L946)

log 设置的选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, `string`\>

Defined in: [lib/core.ts:952](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L952)

***

### get?

> `optional` **get?**: `Record`\<`string`, `any`\>

Defined in: [lib/core.ts:951](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L951)

***

### headers?

> `optional` **headers?**: `IncomingHttpHeaders`

Defined in: [lib/core.ts:954](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L954)

***

### hostname?

> `optional` **hostname?**: `string`

Defined in: [lib/core.ts:949](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L949)

***

### path?

> `optional` **path?**: `string`

Defined in: [lib/core.ts:947](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L947)

***

### req?

> `optional` **req?**: `IncomingMessage` \| `Http2ServerRequest` \| `null`

Defined in: [lib/core.ts:950](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L950)

***

### session?

> `optional` **session?**: `Record`\<`string`, `any`\>

Defined in: [lib/core.ts:953](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L953)

***

### urlFull?

> `optional` **urlFull?**: `string`

Defined in: [lib/core.ts:948](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L948)

lib/core/type-aliases/TPm2Action.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / TPm2Action

# Type Alias: TPm2Action

> **TPm2Action** = `"start"` \| `"stop"` \| `"restart"`

Defined in: [lib/core.ts:628](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L628)

PM2 操作类型

lib/core/variables/globalConfig.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / globalConfig

# Variable: globalConfig

> `const` **globalConfig**: [`IConfig`](../../../index/interfaces/IConfig.md) & `object`

Defined in: [lib/core.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L25)

全局参数

## Type Declaration

### debug

> **debug**: `boolean`

### hosts

> **hosts**: `string`[]

### httpPort

> **httpPort**: `number`

### httpsPort

> **httpsPort**: `number`

### ind

> **ind**: `string`[]

### logFormat

> **logFormat**: `"csv"` \| `"jsonl"`

日志格式，csv 或 jsonl，默认 jsonl

### max

> **max**: `number`

### rpcPort

> **rpcPort**: `number`

### rpcSecret

> **rpcSecret**: `string`

lib/core/variables/global.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / global

# Variable: global

> `const` **global**: `Record`\<`string`, `any`\> = `{}`

Defined in: [lib/core.ts:725](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L725)

跨进程全局变量

lib/core/variables/RANDOM_L.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_L

# Variable: RANDOM\_L

> `const` **RANDOM\_L**: `"abcdefghijklmnopqrstuvwxyz"` = `'abcdefghijklmnopqrstuvwxyz'`

Defined in: [lib/core.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L108)

小写字母字符集

lib/core/variables/RANDOM_LN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LN

# Variable: RANDOM\_LN

> `const` **RANDOM\_LN**: `string`

Defined in: [lib/core.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L113)

小写字母 + 数字字符集

lib/core/variables/RANDOM_LU.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LU

# Variable: RANDOM\_LU

> `const` **RANDOM\_LU**: `string`

Defined in: [lib/core.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L115)

小写字母 + 大写字母字符集

lib/core/variables/RANDOM_LUN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LUN

# Variable: RANDOM\_LUN

> `const` **RANDOM\_LUN**: `string`

Defined in: [lib/core.ts:117](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L117)

小写字母 + 大写字母 + 数字字符集

lib/core/variables/RANDOM_LUNS.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LUNS

# Variable: RANDOM\_LUNS

> `const` **RANDOM\_LUNS**: `string`

Defined in: [lib/core.ts:121](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L121)

小写字母 + 大写字母 + 数字字符集 + 特殊字符字符集

lib/core/variables/RANDOM_N.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_N

# Variable: RANDOM\_N

> `const` **RANDOM\_N**: `"0123456789"` = `'0123456789'`

Defined in: [lib/core.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L104)

数字字符集

lib/core/variables/RANDOM_U.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_U

# Variable: RANDOM\_U

> `const` **RANDOM\_U**: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ"` = `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

Defined in: [lib/core.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L106)

大写字母字符集

lib/core/variables/RANDOM_UN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_UN

# Variable: RANDOM\_UN

> `const` **RANDOM\_UN**: `string`

Defined in: [lib/core.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L111)

大写字母 + 数字字符集

lib/core/variables/RANDOM_V.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_V

# Variable: RANDOM\_V

> `const` **RANDOM\_V**: `"ACEFGHJKLMNPRSTWXY34567"` = `'ACEFGHJKLMNPRSTWXY34567'`

Defined in: [lib/core.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L119)

验证码字符集

lib/core/variables/REAL_IP_CF.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / REAL\_IP\_CF

# Variable: REAL\_IP\_CF

> `const` **REAL\_IP\_CF**: `"cf-connecting-ip"` = `'cf-connecting-ip'`

Defined in: [lib/core.ts:399](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L399)

使用的是 Cloudflare

lib/core/variables/REAL_IP_X.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / REAL\_IP\_X

# Variable: REAL\_IP\_X

> `const` **REAL\_IP\_X**: `"x-forwarded-for"` = `'x-forwarded-for'`

Defined in: [lib/core.ts:397](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L397)

使用 X-Forwarded-For 的 CDN 厂商

lib/cron/functions/getRegulars.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / getRegulars

# Function: getRegulars()

> **getRegulars**(): [`IRegularData`](../interfaces/IRegularData.md)[]

Defined in: [lib/cron.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L18)

获取定时任务列表

## Returns

[`IRegularData`](../interfaces/IRegularData.md)[]

lib/cron/functions/regular.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / regular

# Function: regular()

> **regular**(`task`, `immediate?`): `Promise`\<`boolean`\>

Defined in: [lib/cron.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L27)

创建定时执行的计划任务

## Parameters

### task

[`IRegular`](../interfaces/IRegular.md)

计划任务对象

### immediate?

`string` = `''`

如果传入的时间小于当前时间且[没有执行过]则立即执行一次（格式：YmdHi，系统时区）

## Returns

`Promise`\<`boolean`\>

lib/cron/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/cron

# lib/cron

## Interfaces

- [IRegular](interfaces/IRegular.md)
- [IRegularData](interfaces/IRegularData.md)

## Functions

- [getRegulars](functions/getRegulars.md)
- [regular](functions/regular.md)

lib/cron/interfaces/IRegularData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegularData

# Interface: IRegularData

Defined in: [lib/cron.ts:156](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L156)

定时任务

## Extends

- [`IRegular`](IRegular.md)

## Properties

### callback

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L153)

任务函数

#### Parameters

##### date

`string`

##### immediate

`boolean`

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`IRegular`](IRegular.md).[`callback`](IRegular.md#callback)

***

### count

> **count**: `number`

Defined in: [lib/cron.ts:160](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L160)

总执行次数

***

### last

> **last**: `string`

Defined in: [lib/cron.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L158)

上次执行时间字符串，格式：YmdHi（系统时区）

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L149)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

#### Inherited from

[`IRegular`](IRegular.md).[`name`](IRegular.md#name)

***

### rcount

> **rcount**: `number`

Defined in: [lib/cron.ts:162](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L162)

定时任务重启后的执行次数

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L151)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

#### Inherited from

[`IRegular`](IRegular.md).[`rule`](IRegular.md#rule)

lib/cron/interfaces/IRegular.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegular

# Interface: IRegular

Defined in: [lib/cron.ts:147](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L147)

定时任务

## Extended by

- [`IRegularData`](IRegularData.md)

## Properties

### callback

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L153)

任务函数

#### Parameters

##### date

`string`

##### immediate

`boolean`

#### Returns

`void` \| `Promise`\<`void`\>

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L149)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L151)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

lib/crypto/functions/aesDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / aesDecrypt

# Function: aesDecrypt()

## Call Signature

> **aesDecrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:346](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L346)

AES 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **aesDecrypt**(`encrypt`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:347](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L347)

AES 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv?

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"binary"`

### Returns

`string` \| `false`

lib/crypto/functions/aesEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / aesEncrypt

# Function: aesEncrypt()

## Call Signature

> **aesEncrypt**(`original`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:230](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L230)

AES 加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### iv

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **aesEncrypt**(`original`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L231)

AES 加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### iv?

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"base64"`

输出类型

### Returns

`string` \| `false`

lib/crypto/functions/base64Decode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / base64Decode

# Function: base64Decode()

## Call Signature

> **base64Decode**(`data`, `encoding`): `Buffer`

Defined in: [lib/crypto.ts:452](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L452)

base64 解码

### Parameters

#### data

`string`

base64 编码的字符串

#### encoding

`"buffer"`

指定解出 Buffer 还是 string

### Returns

`Buffer`

## Call Signature

> **base64Decode**(`data`, `encoding?`): `string`

Defined in: [lib/crypto.ts:453](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L453)

base64 解码

### Parameters

#### data

`string`

base64 编码的字符串

#### encoding?

`"utf8"`

指定解出 Buffer 还是 string

### Returns

`string`

lib/crypto/functions/base64Encode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / base64Encode

# Function: base64Encode()

> **base64Encode**(`data`): `string`

Defined in: [lib/crypto.ts:438](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L438)

base64 编码

## Parameters

### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

字符串或 Buffer

## Returns

`string`

lib/crypto/functions/cipherDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / cipherDecrypt

# Function: cipherDecrypt()

> **cipherDecrypt**(`encrypt`, `key`, `iv?`, `method?`, `output?`): `string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:280](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L280)

cipher 解密

## Parameters

### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

### key

`CipherKey`

密钥 32 个英文字母和数字

### iv?

`string` = `''`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

### method?

`string` = `AES_256_ECB`

加密方法

### output?

`"buffer"` \| `"binary"`

输出类型

## Returns

`string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

lib/crypto/functions/cipherEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / cipherEncrypt

# Function: cipherEncrypt()

> **cipherEncrypt**(`original`, `key`, `iv?`, `method?`, `output?`): `string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:167](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L167)

cipher 加密，强烈不建议使用 AES_256_ECB

## Parameters

### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

### key

`CipherKey`

密钥 32 个英文字母和数字

### iv?

`string` = `''`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

### method?

`string` = `AES_256_ECB`

加密方法

### output?

`"buffer"` \| `"base64"`

输出类型

## Returns

`string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

lib/crypto/functions/gcmDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / gcmDecrypt

# Function: gcmDecrypt()

## Call Signature

> **gcmDecrypt**(`encrypt`, `key`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:361](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L361)

AES 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **gcmDecrypt**(`encrypt`, `key`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:362](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L362)

AES 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### output?

`"binary"`

输出类型

### Returns

`string` \| `false`

lib/crypto/functions/gcmEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / gcmEncrypt

# Function: gcmEncrypt()

## Call Signature

> **gcmEncrypt**(`original`, `key`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:245](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L245)

AES GCM 托管加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **gcmEncrypt**(`original`, `key`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:246](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L246)

AES GCM 托管加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### output?

`"base64"`

输出类型

### Returns

`string` \| `false`

lib/crypto/functions/generateKeyPair.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / generateKeyPair

# Function: generateKeyPair()

> **generateKeyPair**(`type`, `options?`): `Promise`\<\{ `private`: `string` \| `Buffer`\<`ArrayBufferLike`\>; `public`: `string` \| `Buffer`\<`ArrayBufferLike`\>; \}\>

Defined in: [lib/crypto.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L18)

创建非对称秘钥

## Parameters

### type

`string`

如 rsa/ec

### options?

参数

#### modulusLength?

`number`

#### namedCurve?

`string`

#### privateKeyEncoding?

\{ `format?`: `"pem"` \| `"der"`; `type?`: `"pkcs8"` \| `"pkcs1"` \| `"sec1"`; \}

#### privateKeyEncoding.format?

`"pem"` \| `"der"`

#### privateKeyEncoding.type?

`"pkcs8"` \| `"pkcs1"` \| `"sec1"`

#### publicKeyEncoding?

\{ `format?`: `"pem"` \| `"der"`; `type?`: `"spki"` \| `"pkcs1"`; \}

#### publicKeyEncoding.format?

`"pem"` \| `"der"`

#### publicKeyEncoding.type?

`"spki"` \| `"pkcs1"`

## Returns

`Promise`\<\{ `private`: `string` \| `Buffer`\<`ArrayBufferLike`\>; `public`: `string` \| `Buffer`\<`ArrayBufferLike`\>; \}\>

lib/crypto/functions/hashHmacFile.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmacFile

# Function: hashHmacFile()

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key?`, `encoding?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/crypto.ts:413](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L413)

hash 或 hmac 加密文件

### Parameters

#### algorithm

`string`

加密方式，如 md5、sha256、sm3 等

#### path

`string`

文件路径

#### key?

`CipherKey`

设置则采用 hmac 加密

#### encoding?

`"hex"` \| `"base64"` \| `"base64url"`

### Returns

`Promise`\<`string` \| `false`\>

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key`, `encoding`): `Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/crypto.ts:414](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L414)

hash 或 hmac 加密文件

### Parameters

#### algorithm

`string`

加密方式，如 md5、sha256、sm3 等

#### path

`string`

文件路径

#### key

`CipherKey`

设置则采用 hmac 加密

#### encoding

`"buffer"`

### Returns

`Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

lib/crypto/functions/hashHmac.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmac

# Function: hashHmac()

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key?`, `format?`): `string`

Defined in: [lib/crypto.ts:394](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L394)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

源数据

#### key?

`CipherKey`

设置则采用 hmac 加密

#### format?

`"hex"` \| `"base64"`

### Returns

`string`

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key`, `format`): `Buffer`

Defined in: [lib/crypto.ts:395](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L395)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

源数据

#### key

`CipherKey` \| `undefined`

设置则采用 hmac 加密

#### format

`"buffer"`

### Returns

`Buffer`

lib/crypto/functions/privateDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / privateDecrypt

# Function: privateDecrypt()

> **privateDecrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:136](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L136)

非对称私钥解密

## Parameters

### key

`KeyLike` \| `RsaPrivateKey`

私钥

### buffer

`string` \| `ArrayBufferView`\<`ArrayBufferLike`\>

数据

## Returns

`Buffer`

lib/crypto/functions/privateEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / privateEncrypt

# Function: privateEncrypt()

> **privateEncrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L114)

非对称私钥加密

## Parameters

### key

`KeyLike` \| `RsaPrivateKey`

私钥

### buffer

`string` \| `ArrayBufferView`\<`ArrayBufferLike`\>

数据

## Returns

`Buffer`

lib/crypto/functions/publicDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / publicDecrypt

# Function: publicDecrypt()

> **publicDecrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:125](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L125)

非对称公钥解密

## Parameters

### key

`KeyLike` \| `RsaPublicKey` \| `RsaPrivateKey`

公钥

### buffer

`string` \| `ArrayBufferView`\<`ArrayBufferLike`\>

数据

## Returns

`Buffer`

lib/crypto/functions/publicEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / publicEncrypt

# Function: publicEncrypt()

> **publicEncrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L103)

非对称公钥加密

## Parameters

### key

`KeyLike` \| `RsaPublicKey` \| `RsaPrivateKey`

公钥

### buffer

`string` \| `ArrayBufferView`\<`ArrayBufferLike`\>

数据

## Returns

`Buffer`

lib/crypto/functions/sign.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sign

# Function: sign()

## Call Signature

> **sign**(`data`, `privateKey`, `format`, `algorithm?`): `string`

Defined in: [lib/crypto.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L69)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

`KeyLike` \| `SignKeyObjectInput` \| `SignPrivateKeyInput` \| `SignJsonWebKeyInput`

私钥

#### format

`"binary"` \| `"hex"` \| `"base64"`

输出格式

#### algorithm?

`string`

哈希方式

### Returns

`string`

## Call Signature

> **sign**(`data`, `privateKey`, `format?`, `algorithm?`): `Buffer`

Defined in: [lib/crypto.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L72)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

`KeyLike` \| `SignKeyObjectInput` \| `SignPrivateKeyInput` \| `SignJsonWebKeyInput`

私钥

#### format?

`"buffer"`

输出格式

#### algorithm?

`string`

哈希方式

### Returns

`Buffer`

lib/crypto/functions/sm4Decrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sm4Decrypt

# Function: sm4Decrypt()

## Call Signature

> **sm4Decrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:379](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L379)

SM4 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv

`string`

向量 16 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **sm4Decrypt**(`encrypt`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:380](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L380)

SM4 解密

### Parameters

#### encrypt

`string` \| `Buffer`\<`ArrayBufferLike`\>

需解密的字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv?

`string`

向量 16 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"binary"`

### Returns

`string` \| `false`

lib/crypto/functions/sm4Encrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sm4Encrypt

# Function: sm4Encrypt()

## Call Signature

> **sm4Encrypt**(`original`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:263](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L263)

SM4 加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv

`string`

向量 16 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **sm4Encrypt**(`original`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:264](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L264)

SM4 加密

### Parameters

#### original

`string` \| `Buffer`\<`ArrayBufferLike`\>

原始字符串

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv?

`string`

向量 16 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"base64"`

### Returns

`string` \| `false`

lib/crypto/functions/uuid.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / uuid

# Function: uuid()

> **uuid**(`options?`): `string`

Defined in: [lib/crypto.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L466)

生成 uuid

## Parameters

### options?

`RandomUUIDOptions`

选项

## Returns

`string`

lib/crypto/functions/verify.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / verify

# Function: verify()

> **verify**(`data`, `object`, `signature`, `algorithm?`): `boolean`

Defined in: [lib/crypto.ts:90](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L90)

非对称验签

## Parameters

### data

`BinaryLike`

数据

### object

`KeyLike` \| `VerifyKeyObjectInput` \| `VerifyPublicKeyInput` \| `VerifyJsonWebKeyInput`

证书

### signature

`ArrayBufferView`

签名

### algorithm?

`string` = `'sha256'`

哈希方式

## Returns

`boolean`

lib/crypto/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/crypto

# lib/crypto

## Variables

- [AES\_256\_CBC](variables/AES_256_CBC.md)
- [AES\_256\_CTR](variables/AES_256_CTR.md)
- [AES\_256\_ECB](variables/AES_256_ECB.md)
- [AES\_256\_GCM](variables/AES_256_GCM.md)
- [SM4\_CBC](variables/SM4_CBC.md)
- [SM4\_CFB](variables/SM4_CFB.md)
- [SM4\_ECB](variables/SM4_ECB.md)

## Functions

- [aesDecrypt](functions/aesDecrypt.md)
- [aesEncrypt](functions/aesEncrypt.md)
- [base64Decode](functions/base64Decode.md)
- [base64Encode](functions/base64Encode.md)
- [cipherDecrypt](functions/cipherDecrypt.md)
- [cipherEncrypt](functions/cipherEncrypt.md)
- [gcmDecrypt](functions/gcmDecrypt.md)
- [gcmEncrypt](functions/gcmEncrypt.md)
- [generateKeyPair](functions/generateKeyPair.md)
- [hashHmac](functions/hashHmac.md)
- [hashHmacFile](functions/hashHmacFile.md)
- [privateDecrypt](functions/privateDecrypt.md)
- [privateEncrypt](functions/privateEncrypt.md)
- [publicDecrypt](functions/publicDecrypt.md)
- [publicEncrypt](functions/publicEncrypt.md)
- [sign](functions/sign.md)
- [sm4Decrypt](functions/sm4Decrypt.md)
- [sm4Encrypt](functions/sm4Encrypt.md)
- [uuid](functions/uuid.md)
- [verify](functions/verify.md)

lib/crypto/variables/AES_256_CBC.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_CBC

# Variable: AES\_256\_CBC

> `const` **AES\_256\_CBC**: `"aes-256-cbc"` = `'aes-256-cbc'`

Defined in: [lib/crypto.ts:147](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L147)

一般不用，兼容性场景下用

lib/crypto/variables/AES_256_CTR.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_CTR

# Variable: AES\_256\_CTR

> `const` **AES\_256\_CTR**: `"aes-256-ctr"` = `'aes-256-ctr'`

Defined in: [lib/crypto.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L149)

设置 iv 会自动切换为 CTR，流式下使用，非流直接使用 GCM

lib/crypto/variables/AES_256_ECB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_ECB

# Variable: AES\_256\_ECB

> `const` **AES\_256\_ECB**: `"aes-256-ecb"` = `'aes-256-ecb'`

Defined in: [lib/crypto.ts:145](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L145)

勿使用，无 iv 默认，但勿使用

lib/crypto/variables/AES_256_GCM.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_GCM

# Variable: AES\_256\_GCM

> `const` **AES\_256\_GCM**: `"aes-256-gcm"` = `'aes-256-gcm'`

Defined in: [lib/crypto.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L151)

非流直接使用 GCM

lib/crypto/variables/SM4_CBC.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_CBC

# Variable: SM4\_CBC

> `const` **SM4\_CBC**: `"sm4-cbc"` = `'sm4-cbc'`

Defined in: [lib/crypto.ts:155](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L155)

lib/crypto/variables/SM4_CFB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_CFB

# Variable: SM4\_CFB

> `const` **SM4\_CFB**: `"sm4-cfb"` = `'sm4-cfb'`

Defined in: [lib/crypto.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L157)

SM4 一般用这个，设置 iv，自动就切换成了这个

lib/crypto/variables/SM4_ECB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_ECB

# Variable: SM4\_ECB

> `const` **SM4\_ECB**: `"sm4-ecb"` = `'sm4-ecb'`

Defined in: [lib/crypto.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L154)

SM4 如果未设置 iv，则默认这个

lib/db/conn/classes/Connection.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/conn](../index.md) / Connection

# Class: Connection

Defined in: [lib/db/conn.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L34)

数据库连接对象

## Constructors

### Constructor

> **new Connection**(`etc`, `link`): `Connection`

Defined in: [lib/db/conn.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L59)

#### Parameters

##### etc

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

##### link

`Connection` \| `Client`

#### Returns

`Connection`

## Methods

### beginTransaction()

> **beginTransaction**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:319](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L319)

#### Returns

`Promise`\<`boolean`\>

***

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:340](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L340)

#### Returns

`Promise`\<`boolean`\>

***

### end()

> **end**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:308](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L308)

关闭连接，一般情况下不使用

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/conn.ts:235](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L235)

执行一条 SQL 并获得影响行数对象 packet

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

***

### getEtc()

> **getEtc**(): [`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

Defined in: [lib/db/conn.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L68)

获取连接 etc 信息

#### Returns

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

***

### getLast()

> **getLast**(): `number`

Defined in: [lib/db/conn.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L80)

获取最后一次获取连接的时间

#### Returns

`number`

***

### getLastSql()

> **getLastSql**(): `object`[]

Defined in: [lib/db/conn.ts:87](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L87)

获取最后两次执行的 sql 字符串

#### Returns

`object`[]

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/conn.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L73)

获取数据库服务类型

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### isAvailable()

> **isAvailable**(`last?`): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L154)

通过执行一条语句判断当前连接是否可用

#### Parameters

##### last?

`boolean` = `true`

是否刷新最后使用时间（默认刷新）

#### Returns

`Promise`\<`boolean`\>

***

### isLost()

> **isLost**(): `boolean`

Defined in: [lib/db/conn.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L104)

是否已经丢失

#### Returns

`boolean`

***

### isTransaction()

> **isTransaction**(): `boolean`

Defined in: [lib/db/conn.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L111)

是否是开启事务状态

#### Returns

`boolean`

***

### isUsing()

> **isUsing**(): `boolean`

Defined in: [lib/db/conn.ts:118](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L118)

获取当前状态是否正在被使用中

#### Returns

`boolean`

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/conn.ts:177](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L177)

执行一条 SQL 并获得返回数据

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\>

***

### refreshLast()

> **refreshLast**(): `void`

Defined in: [lib/db/conn.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L146)

设定最后使用时间

#### Returns

`void`

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:358](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L358)

#### Returns

`Promise`\<`boolean`\>

***

### setLost()

> **setLost**(): `void`

Defined in: [lib/db/conn.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L97)

将本条连接设置为不可用

#### Returns

`void`

***

### used()

> **used**(): `void`

Defined in: [lib/db/conn.ts:139](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L139)

取消占用

#### Returns

`void`

***

### using()

> **using**(): `boolean`

Defined in: [lib/db/conn.ts:125](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L125)

判断是否可用（丢失的也算不可用），返回 true 代表获取成功并自动刷新最后时间

#### Returns

`boolean`

lib/db/conn/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/db/conn

# lib/db/conn

## Classes

- [Connection](classes/Connection.md)

lib/db/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/db.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L17)

服务商定义

## Enumeration Members

### MYSQL

> **MYSQL**: `0`

Defined in: [lib/db.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L18)

***

### PGSQL

> **PGSQL**: `1`

Defined in: [lib/db.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L19)

lib/db/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `opt?`): [`Pool`](../pool/classes/Pool.md)

Defined in: [lib/db.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L68)

获取 Db Pool 对象

## Parameters

### ctrEtc

[`IConfigDb`](../../../index/interfaces/IConfigDb.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器对象或数据库配置信息

### opt?

选项

#### read?

`boolean`

是否使用只读库，默认 false

#### service?

[`ESERVICE`](../enumerations/ESERVICE.md)

服务商，默认 PGSQL

## Returns

[`Pool`](../pool/classes/Pool.md)

Db Pool 对象

lib/db/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/db

# lib/db

## Enumerations

- [ESERVICE](enumerations/ESERVICE.md)

## Interfaces

- [IData](interfaces/IData.md)
- [IPacket](interfaces/IPacket.md)

## Functions

- [get](functions/get.md)

## References

### Connection

Re-exports [Connection](conn/classes/Connection.md)

***

### getConnectionList

Re-exports [getConnectionList](pool/functions/getConnectionList.md)

***

### IConnectionInfo

Re-exports [IConnectionInfo](pool/interfaces/IConnectionInfo.md)

***

### Pool

Re-exports [Pool](pool/classes/Pool.md)

***

### Transaction

Re-exports [Transaction](tran/classes/Transaction.md)

lib/db/interfaces/IData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / IData

# Interface: IData

Defined in: [lib/db.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L23)

query 返回的数据

## Properties

### error

> **error**: \{ `errno`: `number`; `message`: `string`; \} \| `null`

Defined in: [lib/db.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L31)

***

### fields

> **fields**: `object`[]

Defined in: [lib/db.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L25)

#### length

> **length**: `number`

字段格式长度

#### name

> **name**: `string`

字段名

***

### result

> **result**: `number`

Defined in: [lib/db.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L36)

1-正常,-500-服务器错误

***

### rows

> **rows**: `Record`\<`string`, `any`\>[] \| `null`

Defined in: [lib/db.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L24)

lib/db/interfaces/IPacket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / IPacket

# Interface: IPacket

Defined in: [lib/db.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L40)

exec 返回对象

## Properties

### error

> **error**: \{\[`key`: `string`\]: `any`; `errno`: `number`; `message`: `string`; \} \| `null`

Defined in: [lib/db.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L53)

***

### fields

> **fields**: `object`[]

Defined in: [lib/db.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L47)

#### length

> **length**: `number`

字段格式长度

#### name

> **name**: `string`

字段名

***

### packet

> **packet**: \{ `affected`: `number`; `insert`: `number`; \} \| `null`

Defined in: [lib/db.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L41)

#### Union Members

##### Type Literal

\{ `affected`: `number`; `insert`: `number`; \}

##### affected

> **affected**: `number`

受影响的行数

##### insert

> **insert**: `number`

插入的 id

***

`null`

***

### result

> **result**: `number`

Defined in: [lib/db.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L59)

1-正常,-500-服务器错误

lib/db/pool/classes/Pool.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/pool](../index.md) / Pool

# Class: Pool

Defined in: [lib/db/pool.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L115)

数据库连接池对象

## Constructors

### Constructor

> **new Pool**(`etc`, `opt`): `Pool`

Defined in: [lib/db/pool.ts:126](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L126)

#### Parameters

##### etc

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

##### opt

###### service

[`ESERVICE`](../../enumerations/ESERVICE.md)

服务商

#### Returns

`Pool`

## Methods

### beginTransaction()

> **beginTransaction**(`ctr`): `Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

Defined in: [lib/db/pool.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L194)

开启事务，返回事务对象并锁定连接，别人任何人不可用，有 ctr 的话必传 this，独立执行时可传 null

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) \| `null`

#### Returns

`Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/pool.ts:174](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L174)

执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

***

### getName()

> **getName**(): `string`

Defined in: [lib/db/pool.ts:140](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L140)

获取当前连接的数据库名称

#### Returns

`string`

***

### getQueries()

> **getQueries**(): `number`

Defined in: [lib/db/pool.ts:326](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L326)

获取 SQL 执行次数

#### Returns

`number`

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/pool.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L135)

获取当前连接的服务商

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/pool.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L150)

执行一条 SQL，无视顺序和相同连接，随用随取

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\>

error.errno = -500 表示系统错误

lib/db/pool/functions/getConnectionList.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/pool](../index.md) / getConnectionList

# Function: getConnectionList()

> **getConnectionList**(): [`IConnectionInfo`](../interfaces/IConnectionInfo.md)[]

Defined in: [lib/db/pool.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L35)

获取当前连接池中所有连接的信息

## Returns

[`IConnectionInfo`](../interfaces/IConnectionInfo.md)[]

lib/db/pool/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/db/pool

# lib/db/pool

## Classes

- [Pool](classes/Pool.md)

## Interfaces

- [IConnectionInfo](interfaces/IConnectionInfo.md)

## Functions

- [getConnectionList](functions/getConnectionList.md)

lib/db/pool/interfaces/IConnectionInfo.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/pool](../index.md) / IConnectionInfo

# Interface: IConnectionInfo

Defined in: [lib/db/pool.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L18)

连接信息

## Properties

### host

> **host**: `string`

Defined in: [lib/db/pool.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L22)

***

### id

> **id**: `number`

Defined in: [lib/db/pool.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L19)

***

### last

> **last**: `number`

Defined in: [lib/db/pool.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L21)

***

### lost

> **lost**: `boolean`

Defined in: [lib/db/pool.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L27)

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/db/pool.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L24)

***

### port

> **port**: `number`

Defined in: [lib/db/pool.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L23)

***

### service

> **service**: [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/pool.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L20)

***

### transaction

> **transaction**: `boolean`

Defined in: [lib/db/pool.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L29)

***

### user

> **user**: `string`

Defined in: [lib/db/pool.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L25)

***

### using

> **using**: `boolean`

Defined in: [lib/db/pool.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L28)

lib/db/tran/classes/Transaction.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/tran](../index.md) / Transaction

# Class: Transaction

Defined in: [lib/db/tran.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L9)

事务连接对象，commit 和 rollback 后将无法使用

## Constructors

### Constructor

> **new Transaction**(`ctr`, `conn`, `opts?`): `Transaction`

Defined in: [lib/db/tran.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L28)

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) \| `null`

##### conn

[`Connection`](../../conn/classes/Connection.md)

##### opts?

###### danger?

`number`

###### warning?

`number`

#### Returns

`Transaction`

## Methods

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L104)

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/tran.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L85)

执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md) \| `null`

Defined in: [lib/db/tran.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L52)

获取当前连接的服务商

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md) \| `null`

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/tran.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L61)

在事务连接中执行一条 SQL

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\>

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:126](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L126)

#### Returns

`Promise`\<`boolean`\>

lib/db/tran/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/db/tran

# lib/db/tran

## Classes

- [Transaction](classes/Transaction.md)

lib/dns/classes/Dns.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / Dns

# Class: Dns

Defined in: [lib/dns.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L101)

## Constructors

### Constructor

> **new Dns**(`ctr`, `opt`): `Dns`

Defined in: [lib/dns.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L106)

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Dns`

## Methods

### addDomainRecord()

> **addDomainRecord**(`opt`): `Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

Defined in: [lib/dns.ts:223](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L223)

添加记录

#### Parameters

##### opt

参数

###### domain

`string`

###### line?

[`ERECORDLINE`](../enumerations/ERECORDLINE.md)

###### mx?

`number`

###### sub

`string`

###### ttl?

`number`

###### type

`string`

###### value

`string`

#### Returns

`Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

***

### deleteDomainRecord()

> **deleteDomainRecord**(`opt`): `Promise`\<\{ `success`: `boolean`; \} \| `null`\>

Defined in: [lib/dns.ts:358](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L358)

删除记录

#### Parameters

##### opt

参数

###### domain

`string`

###### id

`string`

#### Returns

`Promise`\<\{ `success`: `boolean`; \} \| `null`\>

***

### getDomainList()

> **getDomainList**(`opt`): `Promise`\<[`IDomainList`](../interfaces/IDomainList.md) \| `null`\>

Defined in: [lib/dns.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L157)

获取域名列表

#### Parameters

##### opt

参数

###### length?

`number`

###### offset?

`number`

#### Returns

`Promise`\<[`IDomainList`](../interfaces/IDomainList.md) \| `null`\>

***

### updateDomainRecord()

> **updateDomainRecord**(`opt`): `Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

Defined in: [lib/dns.ts:289](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L289)

修改记录

#### Parameters

##### opt

参数

###### domain

`string`

###### line?

[`ERECORDLINE`](../enumerations/ERECORDLINE.md)

###### mx?

`number`

###### record

`string`

###### sub

`string`

###### ttl?

`number`

###### type

`string`

###### value

`string`

#### Returns

`Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

lib/dns/enumerations/ERECORDLINE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / ERECORDLINE

# Enumeration: ERECORDLINE

Defined in: [lib/dns.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L73)

记录值线路

## Enumeration Members

### DEFAULT

> **DEFAULT**: `0`

Defined in: [lib/dns.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L74)

***

### EDU

> **EDU**: `4`

Defined in: [lib/dns.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L78)

***

### MOBILE

> **MOBILE**: `3`

Defined in: [lib/dns.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L77)

***

### OVERSEA

> **OVERSEA**: `5`

Defined in: [lib/dns.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L79)

***

### TELECOM

> **TELECOM**: `1`

Defined in: [lib/dns.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L75)

***

### UNICOM

> **UNICOM**: `2`

Defined in: [lib/dns.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L76)

lib/dns/enumerations/ERECORDTYPE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / ERECORDTYPE

# Enumeration: ERECORDTYPE

Defined in: [lib/dns.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L60)

记录值类型

## Enumeration Members

### A

> **A**: `0`

Defined in: [lib/dns.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L61)

***

### AAAA

> **AAAA**: `6`

Defined in: [lib/dns.ts:67](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L67)

***

### CNAME

> **CNAME**: `4`

Defined in: [lib/dns.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L65)

***

### MX

> **MX**: `2`

Defined in: [lib/dns.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L63)

***

### NS

> **NS**: `1`

Defined in: [lib/dns.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L62)

***

### SRV

> **SRV**: `5`

Defined in: [lib/dns.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L66)

***

### TXT

> **TXT**: `3`

Defined in: [lib/dns.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L64)

lib/dns/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/dns.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L21)

服务商定义

## Enumeration Members

### ALIBABA

> **ALIBABA**: `1`

Defined in: [lib/dns.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L23)

***

### DNSPOD

> **DNSPOD**: `0`

Defined in: [lib/dns.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L22)

lib/dns/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / get

# Function: get()

> **get**(`ctr`, `opt`): [`Dns`](../classes/Dns.md)

Defined in: [lib/dns.ts:403](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L403)

创建一个 Dns 对象

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

[`IOptions`](../interfaces/IOptions.md)

选项

## Returns

[`Dns`](../classes/Dns.md)

lib/dns/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/dns

# lib/dns

## Enumerations

- [ERECORDLINE](enumerations/ERECORDLINE.md)
- [ERECORDTYPE](enumerations/ERECORDTYPE.md)
- [ESERVICE](enumerations/ESERVICE.md)

## Classes

- [Dns](classes/Dns.md)

## Interfaces

- [IAddDomainRecord](interfaces/IAddDomainRecord.md)
- [IDomainList](interfaces/IDomainList.md)
- [IOptions](interfaces/IOptions.md)

## Functions

- [get](functions/get.md)

lib/dns/interfaces/IAddDomainRecord.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / IAddDomainRecord

# Interface: IAddDomainRecord

Defined in: [lib/dns.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L52)

添加记录的返回对象

## Properties

### id

> **id**: `string`

Defined in: [lib/dns.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L54)

***

### success

> **success**: `boolean`

Defined in: [lib/dns.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L53)

lib/dns/interfaces/IDomainList.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / IDomainList

# Interface: IDomainList

Defined in: [lib/dns.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L39)

获取域名列表的返回对象

## Properties

### list

> **list**: `object`[]

Defined in: [lib/dns.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L41)

#### count

> **count**: `number`

#### id

> **id**: `string`

#### name

> **name**: `string`

#### punyCode

> **punyCode**: `string`

***

### total

> **total**: `number`

Defined in: [lib/dns.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L40)

lib/dns/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/dns.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L27)

选项

## Properties

### secretId?

> `optional` **secretId?**: `string`

Defined in: [lib/dns.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L31)

密钥键

***

### secretKey?

> `optional` **secretKey?**: `string`

Defined in: [lib/dns.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L33)

密钥值

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/dns.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L29)

服务商 -

lib/fs/functions/chmod.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / chmod

# Function: chmod()

> **chmod**(`path`, `mod`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:278](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L278)

修改权限

## Parameters

### path

`string`

要修改的路径

### mod

`string` \| `number`

权限

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/copyFile.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / copyFile

# Function: copyFile()

> **copyFile**(`src`, `dest`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:386](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L386)

复制文件

## Parameters

### src

`string`

源文件

### dest

`string`

目标文件

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/copyFolder.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / copyFolder

# Function: copyFolder()

> **copyFolder**(`from`, `to`, `ignore?`): `Promise`\<`number`\>

Defined in: [lib/fs.ts:341](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L341)

复制文件夹里的内容到另一个地方，失败不会回滚

## Parameters

### from

`string`

源，末尾加 /

### to

`string`

目标，末尾加 /

### ignore?

`RegExp`[] = `[]`

忽略的文件

## Returns

`Promise`\<`number`\>

lib/fs/functions/createReadStream.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / createReadStream

# Function: createReadStream()

> **createReadStream**(`path`, `options?`): `ReadStream`

Defined in: [lib/fs.ts:401](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L401)

创建读取文件的流

## Parameters

### path

`string`

文件地址

### options?

`BufferEncoding` \| \{ `autoClose?`: `boolean`; `encoding?`: BufferEncoding \| undefined; `end?`: `number`; `flags?`: `string`; `start?`: `number`; \}

编码或配置

## Returns

`ReadStream`

lib/fs/functions/createWriteStream.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / createWriteStream

# Function: createWriteStream()

> **createWriteStream**(`path`, `options?`): `WriteStream`

Defined in: [lib/fs.ts:448](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L448)

创建写入文件的流

## Parameters

### path

`string`

文件地址

### options?

`BufferEncoding` \| \{ `autoClose?`: `boolean`; `encoding?`: BufferEncoding \| undefined; `flags?`: `string`; `mode?`: `number`; `start?`: `number`; \}

编码或配置

## Returns

`WriteStream`

lib/fs/functions/getContent.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / getContent

# Function: getContent()

读取完整文件或一段

## Param

文件路径

## Param

编码或选项

## Call Signature

> **getContent**(`path`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/fs.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L14)

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

Defined in: [lib/fs.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L18)

### Parameters

#### path

`string`

#### options

`BufferEncoding` \| \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

### Returns

`Promise`\<`string` \| `null`\>

lib/fs/functions/isDir.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / isDir

# Function: isDir()

> **isDir**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/fs.ts:182](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L182)

判断是否是目录或目录是否存在，是的话返回 stats

## Parameters

### path

`string`

判断路径

## Returns

`Promise`\<`false` \| `Stats`\>

lib/fs/functions/isFile.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / isFile

# Function: isFile()

> **isFile**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/fs.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L194)

判断是否是文件或文件是否存在，是的话返回 stats

## Parameters

### path

`string`

判断路径

## Returns

`Promise`\<`false` \| `Stats`\>

lib/fs/functions/mkdir.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / mkdir

# Function: mkdir()

> **mkdir**(`path`, `mode?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:207](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L207)

深度创建目录，如果最末目录存在，则自动创建成功

## Parameters

### path

`string`

要创建的路径，如 /a/b/c/

### mode?

`number` = `0o755`

权限

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/pipe.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / pipe

# Function: pipe()

> **pipe**(`path`, `destination`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:431](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L431)

读取文件写入到流，并等待写入完成

## Parameters

### path

`string`

文件地址

### destination

`WritableStream`

要写入的流

### options?

写入后是否终止写入流，默认终止

#### end?

`boolean`

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/putContent.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / putContent

# Function: putContent()

> **putContent**(`path`, `data`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L93)

写入文件内容

## Parameters

### path

`string`

文件路径

### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

要写入的内容

### options?

选项

#### encoding?

`BufferEncoding`

#### flag?

`string`

#### mode?

`number`

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/readDir.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / readDir

# Function: readDir()

> **readDir**(`path`, `encoding?`): `Promise`\<`Dirent`\<`string`\>[]\>

Defined in: [lib/fs.ts:307](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L307)

获取文件夹下文件列表

## Parameters

### path

`string`

文件夹路径

### encoding?

`BufferEncoding`

## Returns

`Promise`\<`Dirent`\<`string`\>[]\>

lib/fs/functions/readLink.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / readLink

# Function: readLink()

> **readLink**(`path`, `encoding?`): `Promise`\<`string` \| `null`\>

Defined in: [lib/fs.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L115)

读取链接的 target

## Parameters

### path

`string`

要读取的路径

### encoding?

`BufferEncoding`

编码

## Returns

`Promise`\<`string` \| `null`\>

lib/fs/functions/readToResponse.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / readToResponse

# Function: readToResponse()

> **readToResponse**(`path`, `req`, `res`, `stat?`): `Promise`\<`void`\>

Defined in: [lib/fs.ts:479](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L479)

读取文件并输出到 http 的 response

## Parameters

### path

`string`

文件绝对路径

### req

`IncomingMessage` \| `Http2ServerRequest`

http 请求对象

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

http 响应对象

### stat?

`Stats` \| `null`

文件的 stat（如果有）

## Returns

`Promise`\<`void`\>

lib/fs/functions/rename.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / rename

# Function: rename()

> **rename**(`oldPath`, `newPath`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:293](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L293)

重命名/移动文件文件夹

## Parameters

### oldPath

`string`

老名

### newPath

`string`

新名

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/rmdirDeep.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / rmdirDeep

# Function: rmdirDeep()

> **rmdirDeep**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:246](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L246)

Danger 危险：危险函数，尽量不要使用
This is a danger function, please don't use it
删除一个非空目录

## Parameters

### path

`string`

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/rmdir.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / rmdir

# Function: rmdir()

> **rmdir**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:228](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L228)

删除空目录

## Parameters

### path

`string`

要删除的目录

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/stats.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / stats

# Function: stats()

> **stats**(`path`): `Promise`\<`Stats` \| `null`\>

Defined in: [lib/fs.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L169)

获取对象是否存在，存在则返回 stats 对象，否则返回 null

## Parameters

### path

`string`

对象路径

## Returns

`Promise`\<`Stats` \| `null`\>

lib/fs/functions/symlink.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / symlink

# Function: symlink()

> **symlink**(`filePath`, `linkPath`, `type?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:132](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L132)

把源文件创建一个 link

## Parameters

### filePath

`string`

源文件

### linkPath

`string`

连接路径

### type?

`"file"` \| `"dir"` \| `"junction"`

仅 Windows，类型，默认 file

## Returns

`Promise`\<`boolean`\>

lib/fs/functions/unlink.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / unlink

# Function: unlink()

> **unlink**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L146)

删除一个文件

## Parameters

### path

`string`

要删除的文件路径

## Returns

`Promise`\<`boolean`\>

lib/fs/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/fs

# lib/fs

## Functions

- [chmod](functions/chmod.md)
- [copyFile](functions/copyFile.md)
- [copyFolder](functions/copyFolder.md)
- [createReadStream](functions/createReadStream.md)
- [createWriteStream](functions/createWriteStream.md)
- [getContent](functions/getContent.md)
- [isDir](functions/isDir.md)
- [isFile](functions/isFile.md)
- [mkdir](functions/mkdir.md)
- [pipe](functions/pipe.md)
- [putContent](functions/putContent.md)
- [readDir](functions/readDir.md)
- [readLink](functions/readLink.md)
- [readToResponse](functions/readToResponse.md)
- [rename](functions/rename.md)
- [rmdir](functions/rmdir.md)
- [rmdirDeep](functions/rmdirDeep.md)
- [stats](functions/stats.md)
- [symlink](functions/symlink.md)
- [unlink](functions/unlink.md)

lib/kv/classes/Kv.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / Kv

# Class: Kv

Defined in: [lib/kv.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L55)

键值存储操作类

## Example

```ts
import * as lKv from '@maiyunnet/kebab/lib/kv.js';
const kv = lKv.get(this);
await kv.ping();
const v = await kv.get('test');
const res = await kv.replace('test', 111);
```

## Constructors

### Constructor

> **new Kv**(`etc`): `Kv`

Defined in: [lib/kv.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L60)

#### Parameters

##### etc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

#### Returns

`Kv`

## Methods

### add()

> **add**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L115)

添加一个值，存在则不变

#### Parameters

##### key

`string`

##### val

`string` \| `number` \| `object`

##### ttl?

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### append()

> **append**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:142](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L142)

向已存在的值后追加数据

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`Promise`\<`boolean`\>

***

### bLMove()

> **bLMove**(`sourceKey`, `destKey`, `soo`, `deo`, `timeout`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:741](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L741)

#### Parameters

##### sourceKey

`string`

##### destKey

`string`

##### soo

`"LEFT"` \| `"RIGHT"`

##### deo

`"LEFT"` \| `"RIGHT"`

##### timeout

`number`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### bRPop()

> **bRPop**(`key`, `timeout`): `Promise`\<`false` \| `Record`\<`string`, `string`\>\>

Defined in: [lib/kv.ts:780](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L780)

#### Parameters

##### key

`string` \| `string`[]

##### timeout

`number`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string`\>\>

***

### decr()

> **decr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:387](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L387)

自减

#### Parameters

##### key

`string`

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### del()

> **del**(`keys`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:335](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L335)

删除已存在的值

#### Parameters

##### keys

`string` \| `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L194)

检测 key 是否存在

#### Parameters

##### keys

`string` \| `string`[]

单个或序列

#### Returns

`Promise`\<`number`\>

***

### expire()

> **expire**(`key`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:415](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L415)

仅修改过期时间不修改值

#### Parameters

##### key

`string`

##### ttl

`number`

#### Returns

`Promise`\<`boolean`\>

***

### flushDb()

> **flushDb**(): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:482](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L482)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:218](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L218)

获取字符串

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）

***

### getJson()

> **getJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:322](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L322)

获取 json 对象

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`any`\>

***

### hDel()

> **hDel**(`key`, `fields`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:643](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L643)

删除哈希键

#### Parameters

##### key

`string`

##### fields

`string` \| `string`[]

值序列

#### Returns

`Promise`\<`number` \| `false`\>

***

### hExists()

> **hExists**(`key`, `field`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:661](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L661)

判断哈希字段是否存在

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`boolean`\>

***

### hGet()

> **hGet**(`key`, `field`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:573](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L573)

获取哈希值

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### hGetAll()

> **hGetAll**(`key`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:625](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L625)

批量获取哈希键值对

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:591](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L591)

获取哈希 json 对象

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`any`\>

***

### hIncr()

> **hIncr**(`key`, `field`, `increment`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:680](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L680)

设置哈希自增自减

#### Parameters

##### key

`string`

key

##### field

`string`

字段

##### increment

`number`

正数或负数，整数或浮点

#### Returns

`Promise`\<`number` \| `false`\>

***

### hKeys()

> **hKeys**(`key`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L702)

获取哈希所有字段

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:608](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L608)

批量获取哈希值

#### Parameters

##### key

`string`

##### fields

`string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hMSet()

> **hMSet**(`key`, `rows`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:545](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L545)

批量设置哈希值

#### Parameters

##### key

`string`

key 名

##### rows

`Record`\<`string`, `object` \| `string` \| `number`\>

key / val 数组

#### Returns

`Promise`\<`boolean`\>

***

### hSet()

> **hSet**(`key`, `field`, `val`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:519](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L519)

设置哈希表值

#### Parameters

##### key

`string`

key 名

##### field

`string`

字段名

##### val

`string` \| `number` \| `object`

值

##### mod?

`""` \| `"nx"`

空,nx(key不存在才建立)

#### Returns

`Promise`\<`boolean`\>

***

### incr()

> **incr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:359](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L359)

自增

#### Parameters

##### key

`string`

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### keys()

> **keys**(`pattern`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:432](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L432)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:809](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L809)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:754](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L754)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L715)

#### Parameters

##### key

`string`

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### lRange()

> **lRange**(`key`, `start`, `stop`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:796](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L796)

#### Parameters

##### key

`string`

##### start

`number`

##### stop

`number`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### mGet()

> **mGet**(`keys`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:269](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L269)

批量获取值

#### Parameters

##### keys

`string`[]

key 序列

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### mSet()

> **mSet**(`rows`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:298](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L298)

批量设置哈希值

#### Parameters

##### rows

`Record`\<`string`, `string` \| `Buffer`\>

key / val 数组

#### Returns

`Promise`\<`boolean`\>

***

### ping()

> **ping**(): `Promise`\<`string` \| `false`\>

Defined in: [lib/kv.ts:499](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L499)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### pipeline()

> **pipeline**(): `Promise`\<`false` \| `IPipelineClient`\>

Defined in: [lib/kv.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L68)

获取一个 pipeline 操作对象

#### Returns

`Promise`\<`false` \| `IPipelineClient`\>

失败则返回 false

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:160](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L160)

向已存在的值之前追加数据

#### Parameters

##### key

`string`

##### val

`string`

#### Returns

`Promise`\<`boolean`\>

***

### pttl()

> **pttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:252](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L252)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:129](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L129)

替换一个存在的值

#### Parameters

##### key

`string`

键

##### val

`string` \| `number` \| `object`

值

##### ttl?

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### rPop()

> **rPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:767](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L767)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:728](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L728)

#### Parameters

##### key

`string`

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### scan()

> **scan**(`cursor?`, `pattern?`, `count?`): `Promise`\<`false` \| `IScanResult`\<`string`\>\>

Defined in: [lib/kv.ts:458](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L458)

根据条件获取服务器上的 keys

#### Parameters

##### cursor?

`number` = `0`

##### pattern?

`string` = `'*'`

例如 *

##### count?

`number` = `10`

获取的条数

#### Returns

`Promise`\<`false` \| `IScanResult`\<`string`\>\>

***

### set()

> **set**(`key`, `val`, `ttl?`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L83)

设定一个值

#### Parameters

##### key

`string`

##### val

`string` \| `number` \| `object`

##### ttl?

`number` = `0`

秒，0 为不限制

##### mod?

`""` \| `"nx"` \| `"xx"`

设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）

#### Returns

`Promise`\<`boolean`\>

***

### ttl()

> **ttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:235](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L235)

获取相应的剩余有效期秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### zAdd()

添加有序集合元素

#### Call Signature

> **zAdd**(`key`, `score`, `member`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:828](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L828)

添加有序集合元素（单个元素）

##### Parameters

###### key

`string`

key 名

###### score

`number`

分数

###### member

`string` \| `Buffer`\<`ArrayBufferLike`\>

成员

##### Returns

`Promise`\<`boolean`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:835](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L835)

添加有序集合元素（多个元素，含 INCR 选项）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options

`IZAddOptionsIncr`

选项，需要 INCR

##### Returns

`Promise`\<`number` \| `false`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [lib/kv.ts:842](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L842)

添加有序集合元素（多个元素，含 INCR 选项，可空）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options

`IZAddOptionsIncrNullable`

选项，需要 INCR Nullable

##### Returns

`Promise`\<`number` \| `false` \| `null`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:849](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L849)

添加有序集合元素（多个元素）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options?

`IZAddOptions`

选项

##### Returns

`Promise`\<`number` \| `false`\>

***

### zRangeWithScores()

> **zRangeWithScores**(`key`, `start`, `stop`, `options?`): `Promise`\<`false` \| `object`[]\>

Defined in: [lib/kv.ts:870](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L870)

#### Parameters

##### key

`string`

##### start

`number`

##### stop

`number`

##### options?

[`IZRangeOptions`](../interfaces/IZRangeOptions.md)

#### Returns

`Promise`\<`false` \| `object`[]\>

***

### zRem()

> **zRem**(`key`, `members`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:895](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L895)

#### Parameters

##### key

`string`

##### members

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

lib/kv/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `oetc?`): [`Kv`](../classes/Kv.md)

Defined in: [lib/kv.ts:956](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L956)

获取 Kv 对象

## Parameters

### ctrEtc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器或配置信息

### oetc?

可用来覆盖 ctr 的一些选项，如 index

#### index?

`number`

#### pwd?

`string`

#### user?

`string`

## Returns

[`Kv`](../classes/Kv.md)

lib/kv/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/kv

# lib/kv

## Classes

- [Kv](classes/Kv.md)

## Interfaces

- [IConnectionInfo](interfaces/IConnectionInfo.md)
- [IZRangeOptions](interfaces/IZRangeOptions.md)

## Functions

- [get](functions/get.md)

lib/kv/interfaces/IConnectionInfo.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IConnectionInfo

# Interface: IConnectionInfo

Defined in: [lib/kv.ts:972](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L972)

连接信息

## Properties

### conn

> **conn**: `ICommandClient`

Defined in: [lib/kv.ts:976](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L976)

***

### host

> **host**: `string`

Defined in: [lib/kv.ts:973](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L973)

***

### index

> **index**: `number`

Defined in: [lib/kv.ts:975](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L975)

***

### port

> **port**: `number`

Defined in: [lib/kv.ts:974](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L974)

lib/kv/interfaces/IZRangeOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZRangeOptions

# Interface: IZRangeOptions

Defined in: [lib/kv.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L15)

## Properties

### by?

> `optional` **by?**: `"SCORE"` \| `"LEX"`

Defined in: [lib/kv.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L22)

Range query type.

- SCORE: Query by score range
- LEX: Query by lexicographical range

***

### count?

> `optional` **count?**: `number`

Defined in: [lib/kv.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L37)

Pagination count. Must be used together with offset.

***

### offset?

> `optional` **offset?**: `number`

Defined in: [lib/kv.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L32)

Pagination offset. Must be used together with count.

***

### rev?

> `optional` **rev?**: `boolean`

Defined in: [lib/kv.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L27)

Whether to return results in reverse order.

lib/lan/functions/card.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lan](../index.md) / card

# Function: card()

> **card**(): `Promise`\<`object`[]\>

Defined in: [lib/lan.ts:7](https://github.com/maiyunnet/kebab/blob/master/lib/lan.ts#L7)

获取当前网卡的 IP、MAC 信息

## Returns

`Promise`\<`object`[]\>

lib/lan/functions/scan.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lan](../index.md) / scan

# Function: scan()

> **scan**(): `Promise`\<`object`[]\>

Defined in: [lib/lan.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/lan.ts#L63)

扫描发生关联的局域网 IP

## Returns

`Promise`\<`object`[]\>

lib/lang/functions/getCodeByAccept.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lang](../index.md) / getCodeByAccept

# Function: getCodeByAccept()

> **getCodeByAccept**(`accept?`): `string`

Defined in: [lib/lang.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/lang.ts#L36)

根据常用语言字符串获取语言 code

## Parameters

### accept?

`string`

常用字符串，如 zh-cn，或包含 zh-cn 的字符串

## Returns

`string`

lib/lang/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/lang

# lib/lang

## Variables

- [codes](variables/codes.md)
- [map](variables/map.md)
- [names](variables/names.md)

## Functions

- [getCodeByAccept](functions/getCodeByAccept.md)

lib/lang/variables/codes.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lang](../index.md) / codes

# Variable: codes

> `const` **codes**: `string`[]

Defined in: [lib/lang.ts:2](https://github.com/maiyunnet/kebab/blob/master/lib/lang.ts#L2)

支持的语言缩写列表

lib/lang/variables/map.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lang](../index.md) / map

# Variable: map

> `const` **map**: `Record`\<`string`, `string`\>

Defined in: [lib/lang.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/lang.ts#L13)

浏览器常用映射为本语言

lib/lang/variables/names.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lang](../index.md) / names

# Variable: names

> `const` **names**: `string`[]

Defined in: [lib/lang.ts:7](https://github.com/maiyunnet/kebab/blob/master/lib/lang.ts#L7)

lib/lan/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/lan

# lib/lan

## Functions

- [card](functions/card.md)
- [scan](functions/scan.md)

lib/net/formdata/classes/FormData.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / FormData

# Class: FormData

Defined in: [lib/net/formdata.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L37)

## Extends

- `Readable`

## Constructors

### Constructor

> **new FormData**(`options?`): `FormData`

Defined in: node\_modules/@types/node/stream.d.ts:80

#### Parameters

##### options?

`ReadableOptions`\<`Readable`\>

#### Returns

`FormData`

#### Inherited from

`stream.Readable.constructor`

## Methods

### \_read()

> **\_read**(): `void`

Defined in: [lib/net/formdata.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L146)

间隔读取（on data 或 pipe 触发）

#### Returns

`void`

#### Overrides

`stream.Readable._read`

***

### getBoundary()

> **getBoundary**(): `string`

Defined in: [lib/net/formdata.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L124)

获取 boundary

#### Returns

`string`

***

### getLength()

> **getLength**(): `number`

Defined in: [lib/net/formdata.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L131)

获取总字节长度

#### Returns

`number`

***

### getSent()

> **getSent**(): `number`

Defined in: [lib/net/formdata.ts:138](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L138)

获取已发送的字节长度

#### Returns

`number`

***

### putBuffer()

> **putBuffer**(`key`, `buffer`, `fname`): `void`

Defined in: [lib/net/formdata.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L109)

添加 Buffer 数据

#### Parameters

##### key

`string`

键

##### buffer

`Buffer`

Buffer 数据

##### fname

`string`

文件名

#### Returns

`void`

***

### putFile()

> **putFile**(`key`, `path`, `fname?`): `Promise`\<`boolean`\>

Defined in: [lib/net/formdata.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L81)

添加文件

#### Parameters

##### key

`string`

键

##### path

`string`

路径

##### fname?

`string`

可选，文件名

#### Returns

`Promise`\<`boolean`\>

***

### putString()

> **putString**(`key`, `val`): `void`

Defined in: [lib/net/formdata.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L65)

添加字符串

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`void`

lib/net/formdata/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/net/formdata

# lib/net/formdata

## Classes

- [FormData](classes/FormData.md)

## Type Aliases

- [IItem](type-aliases/IItem.md)

lib/net/formdata/type-aliases/IItem.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / IItem

# Type Alias: IItem

> **IItem** = \{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

Defined in: [lib/net/formdata.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L12)

Item 对象

## Union Members

### Type Literal

\{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `""`

#### type

> **type**: `"string"`

#### value

> **value**: `string`

字符串值

***

### Type Literal

\{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `string`

文件路径

#### type

> **type**: `"file"`

#### value

> **value**: `string`

文件名

***

### Type Literal

\{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `Buffer`

Buffer 数据

#### type

> **type**: `"buffer"`

#### value

> **value**: `string`

文件名

lib/net/functions/fetch.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / fetch

# Function: fetch()

> **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [lib/net.ts:155](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L155)

发起一个完全兼容 fetch 的请求

## Parameters

### input

`string` \| `Request` \| `URL`

请求的 URL 或 Request 对象

### init?

`RequestInit` & `object` = `{}`

增加 mproxy、hosts

## Returns

`Promise`\<`Response`\>

lib/net/functions/filterHeaders.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / filterHeaders

# Function: filterHeaders()

> **filterHeaders**(`headers`, `res?`, `filter?`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/net.ts:510](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L510)

剔除不代理的 header，返回新的 header

## Parameters

### headers

`IncomingHttpHeaders` \| `IncomingHttpHeaders` \| [`THttpHeaders`](../type-aliases/THttpHeaders.md)

剔除前的 header

### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

直接设置头部而不返回，可置空

### filter?

(`h`) => `boolean`

返回 true 则留下

## Returns

`Record`\<`string`, `string` \| `string`[]\>

lib/net/functions/getCa.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / getCa

# Function: getCa()

> **getCa**(): `Promise`\<`string`\>

Defined in: [lib/net.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L28)

获取 CA 证书

## Returns

`Promise`\<`string`\>

lib/net/functions/getFormData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(): [`FormData`](../formdata/classes/FormData.md)

Defined in: [lib/net.ts:494](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L494)

创建 FormData 对象

## Returns

[`FormData`](../formdata/classes/FormData.md)

lib/net/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / get

# Function: get()

> **get**(`u`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L69)

发起一个 get 请求

## Parameters

### u

`string`

请求的 URL

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/getResponseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / getResponseJson

# Function: getResponseJson()

> **getResponseJson**(`u`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/net.ts:134](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L134)

发起 GET 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

lib/net/functions/mproxyData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / mproxyData

# Function: mproxyData()

> **mproxyData**(`ctr`): `any`

Defined in: [lib/net.ts:598](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L598)

获取 mproxy 的附加数据

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

## Returns

`any`

lib/net/functions/mproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / mproxy

# Function: mproxy()

> **mproxy**(`ctr`, `auth`, `opt?`): `Promise`\<`number`\>

Defined in: [lib/net.ts:546](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L546)

正向 mproxy 代理，注意提前处理不要自动处理 post 数据，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt?

[`IMproxyOptions`](../interfaces/IMproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`number`\>

lib/net/functions/open.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / open

# Function: open()

> **open**(`u`): [`Request`](../request/classes/Request.md)

Defined in: [lib/net.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L60)

创建一个请求对象

## Parameters

### u

`string`

## Returns

[`Request`](../request/classes/Request.md)

lib/net/functions/postJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / postJson

# Function: postJson()

> **postJson**(`u`, `data`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:94](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L94)

发起 JSON 请求

## Parameters

### u

`string`

网址

### data

`any`[] \| `Record`\<`string`, `any`\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/postJsonResponseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / postJsonResponseJson

# Function: postJsonResponseJson()

> **postJsonResponseJson**(`u`, `data`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/net.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L111)

发起 JSON 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### data

`any`[] \| `Record`\<`string`, `any`\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

lib/net/functions/post.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / post

# Function: post()

> **post**(`u`, `data`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L79)

发起一个 post 请求

## Parameters

### u

`string`

请求的 URL

### data

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

要发送的数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/request.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / request

# Function: request()

> **request**(`u`, `data?`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:305](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L305)

发起一个请求

## Parameters

### u

`string`

### data?

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

配置项

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/rproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/net.ts:616](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L616)

反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### route

`Record`\<`string`, `string`\>

要反代的路由

### opt?

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>

lib/net/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/net

# lib/net

## Interfaces

- [IMproxyOptions](interfaces/IMproxyOptions.md)
- [IRequestOptions](interfaces/IRequestOptions.md)
- [IRproxyOptions](interfaces/IRproxyOptions.md)

## Type Aliases

- [THttpHeaders](type-aliases/THttpHeaders.md)

## Functions

- [fetch](functions/fetch.md)
- [filterHeaders](functions/filterHeaders.md)
- [get](functions/get.md)
- [getCa](functions/getCa.md)
- [getFormData](functions/getFormData.md)
- [getResponseJson](functions/getResponseJson.md)
- [mproxy](functions/mproxy.md)
- [mproxyData](functions/mproxyData.md)
- [open](functions/open.md)
- [post](functions/post.md)
- [postJson](functions/postJson.md)
- [postJsonResponseJson](functions/postJsonResponseJson.md)
- [request](functions/request.md)
- [rproxy](functions/rproxy.md)

lib/net/interfaces/IMproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:700](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L700)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:709](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L709)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:707](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L707)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:705](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L705)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L706)

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L711)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L702)

秒数

lib/net/interfaces/IRequestOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:669](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L669)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/net.ts:694](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L694)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:675](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L675)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:680](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L680)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:677](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L677)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L690)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:679](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L679)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:696](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L696)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:670](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L670)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:682](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L682)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:692](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L692)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:678](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L678)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L673)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:671](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L671)

lib/net/interfaces/IRproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:724](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L724)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:718](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L718)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:722](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L722)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:720](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L720)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L721)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L726)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L734)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L717)

秒数

lib/net/request/classes/Request.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/request](../index.md) / Request

# Class: Request

Defined in: [lib/net/request.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L11)

## Constructors

### Constructor

> **new Request**(`url`): `Request`

Defined in: [lib/net/request.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L22)

#### Parameters

##### url

`string`

#### Returns

`Request`

## Methods

### data()

> **data**(`data`): `this`

Defined in: [lib/net/request.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L30)

设置 get 或 post 的数据

#### Parameters

##### data

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

数据

#### Returns

`this`

***

### follow()

> **follow**(`follow?`): `this`

Defined in: [lib/net/request.ts:87](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L87)

设置是否跟随请求方的 location，留空为跟随，不设置为不跟随

#### Parameters

##### follow?

`number` = `5`

#### Returns

`this`

***

### get()

> **get**(): `this`

Defined in: [lib/net/request.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L47)

method get 方法别名

#### Returns

`this`

***

### headers()

> **headers**(`headers`): `this`

Defined in: [lib/net/request.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L123)

批量设置提交的 headers

#### Parameters

##### headers

[`THttpHeaders`](../../type-aliases/THttpHeaders.md)

#### Returns

`this`

***

### hosts()

> **hosts**(`hosts`): `this`

Defined in: [lib/net/request.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L96)

设置域名 -> ip的对应键值，就像电脑里的 hosts 一样

#### Parameters

##### hosts

`string` \| `Record`\<`string`, `string`\>

#### Returns

`this`

***

### json()

> **json**(): `this`

Defined in: [lib/net/request.ts:70](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L70)

type json 方法别名

#### Returns

`this`

***

### local()

> **local**(`addr`): `this`

Defined in: [lib/net/request.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L114)

设置使用的本地网卡 IP

#### Parameters

##### addr

`string`

#### Returns

`this`

***

### method()

> **method**(`method`): `this`

Defined in: [lib/net/request.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L39)

设置 get 或 post 请求

#### Parameters

##### method

`"GET"` \| `"POST"`

#### Returns

`this`

***

### post()

> **post**(): `this`

Defined in: [lib/net/request.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L54)

method post 方法别名

#### Returns

`this`

***

### request()

> **request**(`cookie?`): `Promise`\<[`Response`](../../response/classes/Response.md)\>

Defined in: [lib/net/request.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L143)

发起请求

#### Parameters

##### cookie?

`Record`\<`string`, [`ICookie`](../../../cookie/interfaces/ICookie.md)\>

#### Returns

`Promise`\<[`Response`](../../response/classes/Response.md)\>

***

### save()

> **save**(`save`): `this`

Defined in: [lib/net/request.ts:105](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L105)

设置后将直接保存到本地文件，不会返回，save 为本地实体路径

#### Parameters

##### save

`string`

#### Returns

`this`

***

### setHeader()

> **setHeader**(`name`, `val`): `this`

Defined in: [lib/net/request.ts:133](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L133)

设置单条 header

#### Parameters

##### name

`string`

##### val

`string`

#### Returns

`this`

***

### timeout()

> **timeout**(`timeout`): `this`

Defined in: [lib/net/request.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L78)

设置请求有效期

#### Parameters

##### timeout

`number`

秒

#### Returns

`this`

***

### type()

> **type**(`type`): `this`

Defined in: [lib/net/request.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L62)

设置提交模式，json 还是普通 form

#### Parameters

##### type

`"form"` \| `"json"`

#### Returns

`this`

lib/net/request/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/net/request

# lib/net/request

## Classes

- [Request](classes/Request.md)

lib/net/response/classes/Response.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/response](../index.md) / Response

# Class: Response

Defined in: [lib/net/response.ts:10](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L10)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/net/response.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L23)

#### Parameters

##### req

`IResponse` \| `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/net/response.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L18)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/net/response.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L16)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/net/response.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L30)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getRawStream()

> **getRawStream**(): `Readable` \| `null`

Defined in: [lib/net/response.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L65)

获取原生响应读取流对象

#### Returns

`Readable` \| `null`

***

### getStream()

> **getStream**(): `Readable` \| `null`

Defined in: [lib/net/response.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L53)

获取响应读取流对象

#### Returns

`Readable` \| `null`

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/net/response.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L46)

用户自定义的 content 内容

#### Parameters

##### v

`string` \| `Buffer`\<`ArrayBufferLike`\>

内容值

#### Returns

`void`

lib/net/response/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/net/response

# lib/net/response

## Classes

- [Response](classes/Response.md)

lib/net/type-aliases/THttpHeaders.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / THttpHeaders

# Type Alias: THttpHeaders

> **THttpHeaders** = `http.IncomingHttpHeaders` & `object`

Defined in: [lib/net.ts:739](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L739)

http headers

## Type Declaration

### http-code?

> `optional` **http-code?**: `number`

### http-url?

> `optional` **http-url?**: `string`

### http-version?

> `optional` **http-version?**: `"1.1"` \| `"2.0"`

lib/ratelimit/functions/checkFixed.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / checkFixed

# Function: checkFixed()

> **checkFixed**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L77)

简易固定窗口限速检查（性能更高，精度较低）

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识

### opt?

限速选项

#### max?

`number`

窗口内最大请求数，默认 60

#### pre?

`string`

key 前缀，默认 rl:

#### window?

`number`

窗口时间（秒），默认 60

## Returns

`Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

lib/ratelimit/functions/check.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / check

# Function: check()

> **check**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L18)

检查指定 key 是否超速，使用多段近似滑动窗口算法

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识（如 IP、用户 UID 等）

### opt?

限速选项

#### max?

`number`

窗口内最大请求数，默认 60

#### pre?

`string`

key 前缀，默认 rl:

#### window?

`number`

窗口时间（秒），默认 60

## Returns

`Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

返回结果对象

lib/ratelimit/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/ratelimit

# lib/ratelimit

## Interfaces

- [ICheckResult](interfaces/ICheckResult.md)

## Functions

- [check](functions/check.md)
- [checkFixed](functions/checkFixed.md)

lib/ratelimit/interfaces/ICheckResult.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / ICheckResult

# Interface: ICheckResult

Defined in: [lib/ratelimit.ts:117](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L117)

限速检查结果

## Properties

### allowed

> **allowed**: `boolean`

Defined in: [lib/ratelimit.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L119)

是否允许通过

***

### limit

> **limit**: `number`

Defined in: [lib/ratelimit.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L123)

总限额

***

### remaining

> **remaining**: `number`

Defined in: [lib/ratelimit.ts:121](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L121)

剩余可用次数

***

### reset

> **reset**: `number`

Defined in: [lib/ratelimit.ts:125](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L125)

窗口重置时间（Unix 时间戳秒）

lib/s3/classes/S3.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / S3

# Class: S3

Defined in: [lib/s3.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L43)

## Constructors

### Constructor

> **new S3**(`ctr`, `opt`): `S3`

Defined in: [lib/s3.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L52)

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`S3`

## Methods

### deleteObject()

> **deleteObject**(`key`, `bucket?`): `Promise`\<`boolean`\>

Defined in: [lib/s3.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L169)

删除对象

#### Parameters

##### key

`string`

对象路径

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`boolean`\>

***

### deleteObjects()

> **deleteObjects**(`keys`, `bucket?`): `Promise`\<`boolean`\>

Defined in: [lib/s3.ts:189](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L189)

批量删除对象

#### Parameters

##### keys

`string`[]

批量对象路径

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`boolean`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [lib/s3.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L231)

销毁连接，释放资源
一般会自动垃圾回收，但高频接口也可主动调用

#### Returns

`void`

***

### getObject()

> **getObject**(`key`, `bucket?`): `Promise`\<`false` \| `Readable` & `SdkStreamMixin` \| `Blob` & `SdkStreamMixin` \| `ReadableStream`\<`any`\> & `SdkStreamMixin` \| `undefined`\>

Defined in: [lib/s3.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L149)

获取对象流，可通过流获取 buffer 或 text

#### Parameters

##### key

`string`

对象路径

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`false` \| `Readable` & `SdkStreamMixin` \| `Blob` & `SdkStreamMixin` \| `ReadableStream`\<`any`\> & `SdkStreamMixin` \| `undefined`\>

***

### headObject()

> **headObject**(`key`, `bucket?`): `Promise`\<`false` \| `HeadObjectCommandOutput`\>

Defined in: [lib/s3.ts:211](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L211)

检测对象是否存在

#### Parameters

##### key

`string`

对象路径

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`false` \| `HeadObjectCommandOutput`\>

***

### putObject()

> **putObject**(`key`, `content`, `length?`, `bucket?`): `Promise`\<`false` \| `CompleteMultipartUploadCommandOutput`\>

Defined in: [lib/s3.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L103)

上传对象（可传流且也可无需设置 length） --

#### Parameters

##### key

`string`

对象路径

##### content

`string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

内容

##### length?

`number` \| \{ `bucket?`: `string`; `disposition?`: `string`; `length?`: `number`; `type?`: `string`; \}

设置 contentLength，如果是流模式则需要设置此项，也可以设置为对象参数

`number`

***

###### Type Literal

\{ `bucket?`: `string`; `disposition?`: `string`; `length?`: `number`; `type?`: `string`; \}

设置 contentLength，如果是流模式则需要设置此项，也可以设置为对象参数

###### bucket?

`string`

###### disposition?

`string`

###### length?

`number`

###### type?

`string`

content-type，如 application/javascript

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`false` \| `CompleteMultipartUploadCommandOutput`\>

***

### setBucket()

> **setBucket**(`bucket`): `void`

Defined in: [lib/s3.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L92)

修改预定义 bucket

#### Parameters

##### bucket

`string`

bucket 名

#### Returns

`void`

lib/s3/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/s3.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L20)

服务商定义

## Enumeration Members

### ALIBABA

> **ALIBABA**: `2`

Defined in: [lib/s3.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L23)

***

### AMAZON

> **AMAZON**: `0`

Defined in: [lib/s3.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L21)

***

### CF

> **CF**: `3`

Defined in: [lib/s3.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L24)

***

### TENCENT

> **TENCENT**: `1`

Defined in: [lib/s3.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L22)

lib/s3/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / get

# Function: get()

> **get**(`ctr`, `opt`): [`S3`](../classes/S3.md)

Defined in: [lib/s3.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L241)

创建一个对象存储对象

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

[`IOptions`](../interfaces/IOptions.md)

选项

## Returns

[`S3`](../classes/S3.md)

lib/s3/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/s3

# lib/s3

## Enumerations

- [ESERVICE](enumerations/ESERVICE.md)

## Classes

- [S3](classes/S3.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)

## Functions

- [get](functions/get.md)

lib/s3/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/s3.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L28)

选项

## Properties

### account?

> `optional` **account?**: `string`

Defined in: [lib/s3.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L32)

cf r2 使用

***

### bucket?

> `optional` **bucket?**: `string`

Defined in: [lib/s3.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L40)

预定义 bucket

***

### region?

> `optional` **region?**: `string`

Defined in: [lib/s3.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L38)

区域

***

### secretId?

> `optional` **secretId?**: `string`

Defined in: [lib/s3.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L34)

密钥键

***

### secretKey?

> `optional` **secretKey?**: `string`

Defined in: [lib/s3.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L36)

密钥值

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/s3.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L30)

服务商 -

lib/scan/classes/Scan.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / Scan

# Class: Scan

Defined in: [lib/scan.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L44)

## Constructors

### Constructor

> **new Scan**(`link`, `token?`, `opt?`): `Scan`

Defined in: [lib/scan.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L58)

#### Parameters

##### link

[`Pool`](../../db/pool/classes/Pool.md) \| [`Kv`](../../kv/classes/Kv.md)

##### token?

`string`

##### opt?

[`IOptions`](../interfaces/IOptions.md) = `{}`

#### Returns

`Scan`

## Methods

### createToken()

> **createToken**(): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:156](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L156)

创建 token，直接应用到本类

#### Returns

`Promise`\<`boolean`\>

***

### getTimeLeft()

> **getTimeLeft**(): `number` \| `null`

Defined in: [lib/scan.ts:223](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L223)

获取当前 token 可扫剩余有效期

#### Returns

`number` \| `null`

***

### getToken()

> **getToken**(): `string` \| `null`

Defined in: [lib/scan.ts:201](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L201)

获取当前 token

#### Returns

`string` \| `null`

***

### getTTL()

> **getTTL**(): `number`

Defined in: [lib/scan.ts:216](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L216)

获取设置的有效期

#### Returns

`number`

***

### poll()

> **poll**(): `Promise`\<`any`\>

Defined in: [lib/scan.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L85)

生成二维码处的轮询，检查是否被扫码、被录入数据

#### Returns

`Promise`\<`any`\>

-3 系统错误 -2 token 不存在或已过期 -1 无操作, 0 已扫码, 其他返回为存的数据并结束轮询

***

### setTTL()

> **setTTL**(`ttl`): `void`

Defined in: [lib/scan.ts:209](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L209)

设置有效期，设置后的新 token 被创建有效

#### Parameters

##### ttl

`number`

#### Returns

`void`

lib/scan/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / get

# Function: get()

> **get**(`link`, `token?`, `opt?`): `Promise`\<[`Scan`](../classes/Scan.md)\>

Defined in: [lib/scan.ts:251](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L251)

-- 创建 Scan 对象

## Parameters

### link

[`Pool`](../../db/pool/classes/Pool.md) \| [`Kv`](../../kv/classes/Kv.md)

### token?

`string`

Token

### opt?

[`IOptions`](../interfaces/IOptions.md) = `{}`

## Returns

`Promise`\<[`Scan`](../classes/Scan.md)\>

lib/scan/functions/scanned.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / scanned

# Function: scanned()

> **scanned**(`link`, `token`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:265](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L265)

对 token 执行访问操作，通常用户扫码后展示的网页所调用，代表已扫码

## Parameters

### link

[`Pool`](../../db/pool/classes/Pool.md) \| [`Kv`](../../kv/classes/Kv.md)

Db 或 Kv

### token

`string`

必填

### opt?

[`IStaticOptions`](../interfaces/IStaticOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>

lib/scan/functions/setData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / setData

# Function: setData()

> **setData**(`link`, `token`, `data`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:323](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L323)

将数据写入 token，通常在客户的逻辑下去写，服务器会 poll 到

## Parameters

### link

[`Pool`](../../db/pool/classes/Pool.md) \| [`Kv`](../../kv/classes/Kv.md)

### token

`string`

### data

`string` \| `number` \| `Record`\<`string`, `any`\>

### opt?

[`IStaticOptions`](../interfaces/IStaticOptions.md) = `{}`

## Returns

`Promise`\<`boolean`\>

lib/scan/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/scan

# lib/scan

## Classes

- [Scan](classes/Scan.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)
- [IStaticOptions](interfaces/IStaticOptions.md)

## Functions

- [get](functions/get.md)
- [scanned](functions/scanned.md)
- [setData](functions/setData.md)

lib/scan/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/scan.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L30)

Scan 设置的选项

## Properties

### ctr?

> `optional` **ctr?**: [`Ctr`](../../../sys/ctr/classes/Ctr.md)

Defined in: [lib/scan.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L32)

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/scan.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L34)

***

### pre?

> `optional` **pre?**: `string`

Defined in: [lib/scan.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L33)

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/scan.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L31)

lib/scan/interfaces/IStaticOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / IStaticOptions

# Interface: IStaticOptions

Defined in: [lib/scan.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L38)

scanned 函数的选项

## Properties

### ctr?

> `optional` **ctr?**: [`Ctr`](../../../sys/ctr/classes/Ctr.md)

Defined in: [lib/scan.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L39)

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/scan.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L41)

***

### pre?

> `optional` **pre?**: `string`

Defined in: [lib/scan.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L40)

lib/session/classes/Session.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / Session

# Class: Session

Defined in: [lib/session.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L51)

## Constructors

### Constructor

> **new Session**(): `Session`

#### Returns

`Session`

## Methods

### getName()

> **getName**(): `string`

Defined in: [lib/session.ts:224](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L224)

获取当前的 cookie 的 name 值

#### Returns

`string`

***

### getToken()

> **getToken**(): `string`

Defined in: [lib/session.ts:217](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L217)

获取当前的 token 值

#### Returns

`string`

***

### init()

> **init**(`ctr`, `link`, `auth?`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/session.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L79)

初始化函数，相当于 construct

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

模型实例

##### link

[`Pool`](../../db/pool/classes/Pool.md) \| [`Kv`](../../kv/classes/Kv.md)

Kv 或 Db 实例

##### auth?

`boolean` = `false`

设为 true 则优先从头 Authorization 或 post _auth 值读取 token

##### opt?

[`IOptions`](../interfaces/IOptions.md) = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

false 表示系统错误

***

### update()

> **update**(): `Promise`\<`void`\>

Defined in: [lib/session.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L231)

页面整体结束时，要写入到 Kv 或 数据库

#### Returns

`Promise`\<`void`\>

lib/session/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/session

# lib/session

## Classes

- [Session](classes/Session.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)

lib/session/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/session.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L42)

## Properties

### domain?

> `optional` **domain?**: `string`

Defined in: [lib/session.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L46)

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/session.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L43)

***

### sqlPre?

> `optional` **sqlPre?**: `string`

Defined in: [lib/session.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L47)

***

### ssl?

> `optional` **ssl?**: `boolean`

Defined in: [lib/session.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L45)

***

### token?

> `optional` **token?**: `string`

Defined in: [lib/session.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L48)

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/session.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L44)

lib/socket/functions/rwebsocket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/socket](../index.md) / rwebsocket

# Function: rwebsocket()

> **rwebsocket**(`port`, `url`, `opt?`): `Server`

Defined in: [lib/socket.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L38)

创建一个 Socket 服务器并反代到 WebSocket

## Parameters

### port

`number`

监听端口

### url

`string`

反代到的 WebSocket

### opt?

[`IRwebsocketOptions`](../interfaces/IRwebsocketOptions.md) = `{}`

选项

## Returns

`Server`

lib/socket/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/socket

# lib/socket

## Interfaces

- [IRwebsocketOptions](interfaces/IRwebsocketOptions.md)

## Functions

- [rwebsocket](functions/rwebsocket.md)

lib/socket/interfaces/IRwebsocketOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/socket](../index.md) / IRwebsocketOptions

# Interface: IRwebsocketOptions

Defined in: [lib/socket.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L13)

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/socket.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L20)

cookie 托管对象

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/socket.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L18)

***

### hosts?

> `optional` **hosts?**: `Record`\<`string`, `string`\>

Defined in: [lib/socket.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L16)

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/socket.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L17)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/socket.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L24)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../../ws/enumerations/EFrameReceiveMode.md)

Defined in: [lib/socket.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L22)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/socket.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L26)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/socket.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L15)

秒数

lib/sql/classes/Sql.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L42)

## Constructors

### Constructor

> **new Sql**(`opt`): `Sql`

Defined in: [lib/sql.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L69)

#### Parameters

##### opt

###### alias?

`string`[]

###### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

###### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

###### pre?

`string`

表前缀/Schema 名：MySQL 中作为表前缀（如 prefix_），PostgreSQL 中作为 Schema 名

###### service

[`ESERVICE`](../enumerations/ESERVICE.md)

###### sql?

`string`[]

#### Returns

`Sql`

## Methods

### append()

> **append**(`sql`): `this`

Defined in: [lib/sql.ts:1005](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1005)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [lib/sql.ts:761](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L761)

ORDER BY

#### Parameters

##### c

`string` \| (`string` \| `string`[])[]

字段字符串或数组

##### d?

`"DESC"` \| `"ASC"`

排序规则

#### Returns

`this`

***

### copy()

> **copy**(`f?`, `opt?`): `Sql`

Defined in: [lib/sql.ts:829](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L829)

创建一个本对象的一个新的 sql 对象拷贝

#### Parameters

##### f?

`string` \| `string`[]

可为空，可设置新对象的 table 名变化

##### opt?

###### where?

`any`

#### Returns

`Sql`

***

### crossJoin()

> **crossJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:490](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L490)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### delete()

> **delete**(`f`): `this`

Defined in: [lib/sql.ts:378](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L378)

'xx'

#### Parameters

##### f

`string`

表名

#### Returns

`this`

***

### field()

> **field**(`str`, `pre?`, `suf?`): `string`

Defined in: [lib/sql.ts:1016](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1016)

对字段进行包裹

#### Parameters

##### str

`string` \| `number` \| \[`string`, `string`[]\]

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅请在 field 表名时倒入前缀/Schema

##### suf?

`string` = `''`

表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS，可能是分表查询时用

#### Returns

`string`

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [lib/sql.ts:995](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L995)

获取带 data 的 sql 语句

#### Parameters

##### sql?

`string`

##### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### Returns

`string`

***

### fullJoin()

> **fullJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:479](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L479)

full join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### getData()

> **getData**(): [`DbValue`](../../../index/type-aliases/DbValue.md)[]

Defined in: [lib/sql.ts:979](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L979)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:986](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L986)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:963](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L963)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:785](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L785)

GROUP BY

#### Parameters

##### c

`string` \| `string`[]

字段字符串或数组

#### Returns

`this`

***

### having()

> **having**(`s?`): `this`

Defined in: [lib/sql.ts:497](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L497)

having 后置筛选器，用法类似 where

#### Parameters

##### s?

`any` = `''`

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:468](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L468)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### insert()

> **insert**(`table`, `ignore?`): `this`

Defined in: [lib/sql.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L99)

插入数据前导

#### Parameters

##### table

`string`

表名

##### ignore?

`boolean` = `false`

是否忽略错误（MySQL: INSERT IGNORE, PGSQL: ON CONFLICT DO NOTHING）

#### Returns

`this`

***

### join()

> **join**(`f`, `s?`, `type?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:420](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L420)

join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### type?

`string` = `'INNER'`

类型

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### leftJoin()

> **leftJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L446)

left join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b?`): `this`

Defined in: [lib/sql.ts:805](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L805)

LIMIT（limit、offset, limit）

#### Parameters

##### a

`number`

起始（offset）

##### b?

`number` = `0`

长度（limit）

#### Returns

`this`

***

### lock()

> **lock**(): `this`

Defined in: [lib/sql.ts:820](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L820)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### rightJoin()

> **rightJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:457](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L457)

right join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### select()

> **select**(`c`, `f`): `this`

Defined in: [lib/sql.ts:269](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L269)

'*', 'xx'

#### Parameters

##### c

`string` \| (`string` \| `any`[])[]

字段字符串或字段数组

##### f

`string` \| `string`[]

表，允许多张表

#### Returns

`this`

***

### union()

> **union**(`lsql`, `type?`): `this`

Defined in: [lib/sql.ts:390](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L390)

联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

##### type?

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`lsql`): `this`

Defined in: [lib/sql.ts:408](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L408)

所有联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

#### Returns

`this`

***

### update()

> **update**(`f`, `s`): `this`

Defined in: [lib/sql.ts:310](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L310)

UPDATE SQL 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

设定 update 的值

#### Returns

`this`

***

### updateByValues()

> **updateByValues**(`table`, `key`, `cols`, `rows`): `this`

Defined in: [lib/sql.ts:215](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L215)

批量 UPDATE，以子查询作为数据源，纯更新语义（不会插入新行）
MySQL: UPDATE t INNER JOIN (SELECT col AS alias ... UNION ALL SELECT ...) AS tmp ON t.key=tmp.key SET t.c=tmp.c
PostgreSQL: UPDATE t SET c=tmp.c FROM (VALUES ($1,...)) AS tmp(cols) WHERE t.key=tmp.key

#### Parameters

##### table

`string`

表名

##### key

`string`

用于定位待更新记录的字段名，通常为主键或唯一键，至少必须建立索引；
        该参数是字段名而不是索引名，仅参与 ON / WHERE 匹配，不会被更新

##### cols

`string`[]

要更新的列名数组（不含 key）

##### rows

`any`[][]

数据行数组，每行顺序为 [keyVal, col1Val, col2Val, ...]（与 [key, ...cols] 对应）

#### Returns

`this`

***

### upsert()

> **upsert**(`data`, `conflict?`): `this`

Defined in: [lib/sql.ts:176](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L176)

如果存在则更新不存在则插入（UPSERT）

#### Parameters

##### data

`any`

更新的数据

##### conflict?

`string` \| `string`[]

冲突字段，PostgreSQL 用于指定 ON CONFLICT 字段；MySQL 时忽略，因为会对所有唯一键冲突执行更新

#### Returns

`this`

***

### values()

> **values**(`cs`, `vs?`): `this`

Defined in: [lib/sql.ts:118](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L118)

实际插入数据的数据

#### Parameters

##### cs

`string`[] \| `Record`\<`string`, [`DbValue`](../../../index/type-aliases/DbValue.md)\>

[] 数据列或字段列

##### vs?

[`DbValue`](../../../index/type-aliases/DbValue.md)[] \| [`DbValue`](../../../index/type-aliases/DbValue.md)[][]

[] | [][] 数据

#### Returns

`this`

***

### where()

> **where**(`s`): `this`

Defined in: [lib/sql.ts:531](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L531)

筛选器
1. 'city': 'bj', 'type': '2'
2. ['type', '>', '1']
3. ['type', 'in', ['1', '2']]
4. 'type': ['1', '2']
5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2'
6. 'city_in': column('city_out')
7. ['JSON_CONTAINS(`uid`, ?)', ['hello']]
8. ['info', 'json', {'a': 1}]

#### Parameters

##### s

`any`

筛选数据

#### Returns

`this`

lib/sql/enumerations/EJSON.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / EJSON

# Enumeration: EJSON

Defined in: [lib/sql.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L21)

JSON 查询操作符

## Enumeration Members

### CONTAINED\_BY

> **CONTAINED\_BY**: `"json_in"`

Defined in: [lib/sql.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L25)

被包含值 (MySQL: JSON_CONTAINS, PG: <@)

***

### CONTAINS

> **CONTAINS**: `"json"`

Defined in: [lib/sql.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L23)

包含值 (MySQL: JSON_CONTAINS, PG: @>)

***

### HAS\_ALL\_KEYS

> **HAS\_ALL\_KEYS**: `"json_all"`

Defined in: [lib/sql.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L31)

存在所有 Key 不含值 (MySQL: JSON_CONTAINS_PATH all, PG: ?&)

***

### HAS\_ANY\_KEYS

> **HAS\_ANY\_KEYS**: `"json_any"`

Defined in: [lib/sql.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L29)

存在任意 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?|)

***

### HAS\_KEY

> **HAS\_KEY**: `"json_key"`

Defined in: [lib/sql.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L27)

存在 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?)

***

### OVERLAPS

> **OVERLAPS**: `"json_overlaps"`

Defined in: [lib/sql.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L33)

简单数组重叠 (MySQL: JSON_OVERLAPS, PG: &&)

lib/sql/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/sql.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L15)

服务商定义

## Enumeration Members

### MYSQL

> **MYSQL**: `0`

Defined in: [lib/sql.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L16)

***

### PGSQL

> **PGSQL**: `1`

Defined in: [lib/sql.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L17)

lib/sql/functions/aoMix.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / aoMix

# Function: aoMix()

> **aoMix**(`arr`): `Record`\<`string`, `string` \| `number` \| [`Json`](../../../index/type-aliases/Json.md)\>

Defined in: [lib/sql.ts:1401](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1401)

将数组兑换为组合的对象（Array/Object mix）

## Parameters

### arr

`any`

要转换的数组

## Returns

`Record`\<`string`, `string` \| `number` \| [`Json`](../../../index/type-aliases/Json.md)\>

lib/sql/functions/column.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / column

# Function: column()

> **column**(`field`): `object`

Defined in: [lib/sql.ts:1422](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1422)

创建字段对象

## Parameters

### field

`string`

## Returns

`object`

### token

> **token**: `string`

### type

> **type**: `"column"`

### value

> **value**: `string`

lib/sql/functions/format.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / format

# Function: format()

> **format**(`sql`, `data`, `service?`): `string`

Defined in: [lib/sql.ts:1363](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1363)

返回代入后的完整 SQL 字符串，这并不安全不能直接执行，只是用来调试打印 sql 语句

## Parameters

### sql

`string`

SQL 字符串

### data

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

DATA 数据

### service?

[`ESERVICE`](../enumerations/ESERVICE.md) = `ESERVICE.MYSQL`

服务商，默认 MySQL

## Returns

`string`

lib/sql/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / get

# Function: get()

> **get**(`opt`): [`Sql`](../classes/Sql.md)

Defined in: [lib/sql.ts:1335](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1335)

创建 sql 对象

## Parameters

### opt

参数

#### alias?

`string`[]

#### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

#### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### pre?

`string`

MySQL 时作为表前缀（如 prefix_），PostgreSQL 时作为 Schema 名。MySQL 会自动补充末尾下划线

#### service

[`ESERVICE`](../enumerations/ESERVICE.md)

#### sql?

`string`[]

## Returns

[`Sql`](../classes/Sql.md)

lib/sql/functions/json.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / json

# Function: json()

> **json**(`obj`): `any`

Defined in: [lib/sql.ts:1460](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1460)

将对象转换为 JSON 字符串并避开类型检查，用于适配 PostgreSQL 的 jsonb 字段

## Parameters

### obj

`any`

要转换的 JSON 对象

## Returns

`any`

lib/sql/functions/value.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / value

# Function: value()

> **value**(`val`): `object`

Defined in: [lib/sql.ts:1441](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1441)

创建字面量值对象，用于 where 条件中 v[0] 需要是值而非字段名的场景
例：[value('hello'), 'IN', column('tags')]

## Parameters

### val

[`DbValue`](../../../index/type-aliases/DbValue.md)

## Returns

`object`

### token

> **token**: `string`

### type

> **type**: `"value"`

### value

> **value**: [`DbValue`](../../../index/type-aliases/DbValue.md)

lib/sql/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/sql

# lib/sql

## Enumerations

- [EJSON](enumerations/EJSON.md)
- [ESERVICE](enumerations/ESERVICE.md)

## Classes

- [Sql](classes/Sql.md)

## Functions

- [aoMix](functions/aoMix.md)
- [column](functions/column.md)
- [format](functions/format.md)
- [get](functions/get.md)
- [json](functions/json.md)
- [value](functions/value.md)

lib/ssh/classes/Connection.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ssh](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L23)

主连接对象

## Constructors

### Constructor

> **new Connection**(): `Connection`

Defined in: [lib/ssh.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L31)

#### Returns

`Connection`

## Methods

### connect()

> **connect**(`opt`): `Promise`\<`boolean`\>

Defined in: [lib/ssh.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L39)

发起连接

#### Parameters

##### opt

`ConnectConfig` & [`IExtOptions`](../interfaces/IExtOptions.md)

选项

#### Returns

`Promise`\<`boolean`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: [lib/ssh.ts:98](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L98)

断开此连接 socket

#### Returns

`void`

***

### exec()

> **exec**(`command`): `Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/ssh.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L106)

执行一个命令并获取返回值，请不要在此执行无尽命令，否则获取不到返回值

#### Parameters

##### command

`string`

命令内容

#### Returns

`Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

***

### getSftp()

> **getSftp**(): `Promise`\<[`Connection`](../sftp/classes/Connection.md) \| `null`\>

Defined in: [lib/ssh.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L143)

获取 Sftp 执行对象

#### Returns

`Promise`\<[`Connection`](../sftp/classes/Connection.md) \| `null`\>

***

### getShell()

> **getShell**(): `Promise`\<[`Connection`](../shell/classes/Connection.md) \| `null`\>

Defined in: [lib/ssh.ts:128](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L128)

获取 Shell 执行对象

#### Returns

`Promise`\<[`Connection`](../shell/classes/Connection.md) \| `null`\>

***

### getStream()

> **getStream**(): `Promise`\<`ClientChannel` \| `null`\>

Defined in: [lib/ssh.ts:170](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L170)

直接获取原生 shell stream 对象

#### Returns

`Promise`\<`ClientChannel` \| `null`\>

lib/ssh/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ssh](../index.md) / get

# Function: get()

> **get**(`opt`): `Promise`\<[`Connection`](../classes/Connection.md) \| `null`\>

Defined in: [lib/ssh.ts:187](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L187)

创建一个 SSH 连接

## Parameters

### opt

`ConnectConfig` & [`IExtOptions`](../interfaces/IExtOptions.md)

选项

## Returns

`Promise`\<[`Connection`](../classes/Connection.md) \| `null`\>

lib/ssh/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/ssh

# lib/ssh

## Classes

- [Connection](classes/Connection.md)

## Interfaces

- [IExtOptions](interfaces/IExtOptions.md)

## Functions

- [get](functions/get.md)

lib/ssh/interfaces/IExtOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ssh](../index.md) / IExtOptions

# Interface: IExtOptions

Defined in: [lib/ssh.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L13)

## Properties

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ssh.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L14)

#### host

> **host**: `string`

#### password

> **password**: `string`

#### port

> **port**: `number`

#### username

> **username**: `string`

lib/ssh/sftp/classes/Connection.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/ssh/sftp](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh/sftp.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L12)

## Constructors

### Constructor

> **new Connection**(`sftp`, `path`): `Connection`

Defined in: [lib/ssh/sftp.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L20)

#### Parameters

##### sftp

`SFTPWrapper`

##### path

`string`

#### Returns

`Connection`

## Methods

### cd()

> **cd**(`dir`): `string`

Defined in: [lib/ssh/sftp.ts:489](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L489)

进入一个目录（不存在也能进入，需要自行判断）
返回进入后的路径值

#### Parameters

##### dir

`string`

相对路径或绝对路径

#### Returns

`string`

***

### chmod()

> **chmod**(`path`, `mode`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:333](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L333)

修改权限

#### Parameters

##### path

`string`

要修改的路径

##### mode

`string` \| `number`

权限

#### Returns

`Promise`\<`boolean`\>

***

### close()

> **close**(): `void`

Defined in: [lib/ssh/sftp.ts:500](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L500)

关闭当前频道

#### Returns

`void`

***

### createReadStream()

> **createReadStream**(`path`, `options?`): `Readable`

Defined in: [lib/ssh/sftp.ts:389](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L389)

读取文件流

#### Parameters

##### path

`string`

文件地址

##### options?

`ReadStreamOptions`

#### Returns

`Readable`

***

### createWriteStream()

> **createWriteStream**(`path`, `options?`): `Writable`

Defined in: [lib/ssh/sftp.ts:418](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L418)

创建写入文件的流

#### Parameters

##### path

`string`

文件地址

##### options?

`BufferEncoding` \| `WriteStreamOptions`

编码或配置

#### Returns

`Writable`

***

### downloadFile()

> **downloadFile**(`remoteFile`, `localFile`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:442](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L442)

下载文件到本地

#### Parameters

##### remoteFile

`string`

远程路径

##### localFile

`string`

本地路径

##### options?

`TransferOptions` = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

***

### getContent()

读取完整文件或一段

#### Param

文件路径

#### Param

编码或选项

#### Call Signature

> **getContent**(`path`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/ssh/sftp.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L25)

##### Parameters

###### path

`string`

###### options?

###### end?

`number`

###### start?

`number`

##### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

#### Call Signature

> **getContent**(`path`, `options`): `Promise`\<`string` \| `null`\>

Defined in: [lib/ssh/sftp.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L29)

##### Parameters

###### path

`string`

###### options

`BufferEncoding` \| \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

##### Returns

`Promise`\<`string` \| `null`\>

***

### isDir()

> **isDir**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/ssh/sftp.ts:217](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L217)

判断是否是目录或目录是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`Promise`\<`false` \| `Stats`\>

***

### isFile()

> **isFile**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/ssh/sftp.ts:229](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L229)

判断是否是文件或文件是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`Promise`\<`false` \| `Stats`\>

***

### mkdir()

> **mkdir**(`path`, `mode?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L242)

深度创建目录，如果最末目录存在，则自动创建成功

#### Parameters

##### path

`string`

要创建的路径，如 /a/b/c/

##### mode?

`number` = `0o755`

权限

#### Returns

`Promise`\<`boolean`\>

***

### pipe()

> **pipe**\<`T`\>(`path`, `destination`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:400](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L400)

读取文件写入到流，并等待写入完成

#### Type Parameters

##### T

`T` *extends* `WritableStream`

#### Parameters

##### path

`string`

文件地址

##### destination

`T`

要写入的流

##### options?

写入后是否终止写入流，默认终止

###### end?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### putContent()

> **putContent**(`path`, `data`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L109)

写入文件内容

#### Parameters

##### path

`string`

文件路径

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

要写入的内容

##### options?

`WriteFileOptions` = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

***

### pwd()

> **pwd**(): `string`

Defined in: [lib/ssh/sftp.ts:432](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L432)

获取当前目录，末尾不带 /

#### Returns

`string`

string

***

### readDir()

> **readDir**(`path`): `Promise`\<`FileEntry`[]\>

Defined in: [lib/ssh/sftp.ts:371](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L371)

获取文件夹下文件列表

#### Parameters

##### path

`string`

文件夹路径

#### Returns

`Promise`\<`FileEntry`[]\>

***

### readLink()

> **readLink**(`path`): `Promise`\<`string` \| `null`\>

Defined in: [lib/ssh/sftp.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L131)

读取链接的 target

#### Parameters

##### path

`string`

要读取的路径

#### Returns

`Promise`\<`string` \| `null`\>

***

### rename()

> **rename**(`oldPath`, `newPath`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:352](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L352)

重命名/移动 文件文件夹

#### Parameters

##### oldPath

`string`

老名

##### newPath

`string`

新名

#### Returns

`Promise`\<`boolean`\>

***

### rmdir()

> **rmdir**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:275](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L275)

删除一个空目录

#### Parameters

##### path

`string`

要删除的目录路径

#### Returns

`Promise`\<`boolean`\>

***

### rmdirDeep()

> **rmdirDeep**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:297](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L297)

Danger 危险：危险函数，尽量不要使用
This f**king is a dangerous function, please don't use it
删除一个非空目录

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`boolean`\>

***

### stats()

> **stats**(`path`): `Promise`\<`Stats` \| `null`\>

Defined in: [lib/ssh/sftp.ts:199](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L199)

获取对象是否存在，存在则返回 stats 对象，否则返回 null

#### Parameters

##### path

`string`

对象路径

#### Returns

`Promise`\<`Stats` \| `null`\>

***

### symlink()

> **symlink**(`filePath`, `linkPath`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L150)

把源文件创建一个 link

#### Parameters

##### filePath

`string`

源文件

##### linkPath

`string`

连接路径

#### Returns

`Promise`\<`boolean`\>

***

### unlink()

> **unlink**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L169)

删除一个文件

#### Parameters

##### path

`string`

要删除的文件路径

#### Returns

`Promise`\<`boolean`\>

***

### uploadFile()

> **uploadFile**(`localFile`, `remoteFile`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L466)

上传本地文件到远程

#### Parameters

##### localFile

`string`

本地绝对路径

##### remoteFile

`string`

##### options?

`TransferOptions` = `{}`

#### Returns

`Promise`\<`boolean`\>

bool

lib/ssh/sftp/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/ssh/sftp

# lib/ssh/sftp

## Classes

- [Connection](classes/Connection.md)

lib/ssh/shell/classes/Connection.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/ssh/shell](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh/shell.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L9)

## Constructors

### Constructor

> **new Connection**(`stream`): `Connection`

Defined in: [lib/ssh/shell.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L14)

#### Parameters

##### stream

`ClientChannel`

#### Returns

`Connection`

## Methods

### close()

> **close**(`cmd?`, `encoding?`): `Promise`\<`void`\>

Defined in: [lib/ssh/shell.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L77)

关闭 shell

#### Parameters

##### cmd?

`string` \| `Buffer`\<`ArrayBufferLike`\>

命令

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`void`\>

***

### getContent()

> **getContent**(`tryCount?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/ssh/shell.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L96)

获取返回值

#### Parameters

##### tryCount?

`number` = `10`

如果无知重试次数，1 次为 10 毫秒

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

***

### getStream()

> **getStream**(): `ClientChannel`

Defined in: [lib/ssh/shell.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L119)

获取响应读取流对象

#### Returns

`ClientChannel`

***

### send()

> **send**(`cmd`, `encoding?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L23)

发送指令

#### Parameters

##### cmd

`string` \| `Buffer`\<`ArrayBufferLike`\>

指令

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`boolean`\>

***

### sendCtrlC()

> **sendCtrlC**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L68)

发送中断

#### Returns

`Promise`\<`boolean`\>

***

### sendEnter()

> **sendEnter**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L54)

发送 Enter 键

#### Returns

`Promise`\<`boolean`\>

***

### sendLine()

> **sendLine**(`cmd`, `encoding?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L47)

发送带换行的内容（发送并执行）

#### Parameters

##### cmd

`string`

指令

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`boolean`\>

***

### sendTab()

> **sendTab**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L61)

发送 Tab 键

#### Returns

`Promise`\<`boolean`\>

lib/ssh/shell/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/ssh/shell

# lib/ssh/shell

## Classes

- [Connection](classes/Connection.md)

lib/text/functions/csvescape.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / csvescape

# Function: csvescape()

> **csvescape**(`str`): `string`

Defined in: [lib/text.ts:514](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L514)

CSV 特殊字符转换为实体字符

## Parameters

### str

`string`

## Returns

`string`

lib/text/functions/getFileExt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / getFileExt

# Function: getFileExt()

> **getFileExt**(`path`): `string`

Defined in: [lib/text.ts:555](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L555)

获取文件后缀

## Parameters

### path

`string`

文件路径

## Returns

`string`

lib/text/functions/getFileNameExt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / getFileNameExt

# Function: getFileNameExt()

> **getFileNameExt**(`path`): `object`

Defined in: [lib/text.ts:568](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L568)

获取文件名和后缀

## Parameters

### path

`string`

文件路径

## Returns

`object`

### ext

> **ext**: `string`

### name

> **name**: `string`

lib/text/functions/getFilename.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / getFilename

# Function: getFilename()

> **getFilename**(`path`, `ext?`): `string`

Defined in: [lib/text.ts:535](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L535)

获取文件名

## Parameters

### path

`string`

文件路径

### ext?

`boolean` = `true`

是否包含后缀，默认包含

## Returns

`string`

lib/text/functions/htmlescape.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / htmlescape

# Function: htmlescape()

> **htmlescape**(`html`): `string`

Defined in: [lib/text.ts:505](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L505)

HTML 特殊字符转换为实体字符

## Parameters

### html

`string`

待转换的 HTML

## Returns

`string`

lib/text/functions/int2str.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / int2str

# Function: int2str()

> **int2str**(`int`, `digits?`, `decimal?`): `string`

Defined in: [lib/text.ts:768](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L768)

为解决精度问题，将整数转换为小数字符串
以下几个示例都是当 digits 为 3、decimal 为 2 时
int 传入 2341，返回 '2.34'
int 传入 2345，返回 '2.35'
int 传入 23，返回 '0.02'
int 传入 2，返回 '0.00'

## Parameters

### int

`number`

要转换的整数

### digits?

`number` = `4`

小数点左移位数

### decimal?

`number` = `2`

最终保留的小数位数

## Returns

`string`

lib/text/functions/isAscii.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isAscii

# Function: isAscii()

> **isAscii**(`text`): `boolean`

Defined in: [lib/text.ts:273](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L273)

判断是否在 ascii 字符集内，仅可输入部分

## Parameters

### text

`string`

要判断的文本

## Returns

`boolean`

lib/text/functions/isDomain.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isDomain

# Function: isDomain()

> **isDomain**(`domain`): `boolean`

Defined in: [lib/text.ts:262](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L262)

判断是否是域名

## Parameters

### domain

`string`

域名

## Returns

`boolean`

bool

lib/text/functions/isEMail.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isEMail

# Function: isEMail()

> **isEMail**(`email`): `boolean`

Defined in: [lib/text.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L231)

是否是邮件地址

## Parameters

### email

`string`

## Returns

`boolean`

lib/text/functions/isFalsy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isFalsy

# Function: isFalsy()

> **isFalsy**(`val`): `val is TFalsy`

Defined in: [lib/text.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L719)

判断一个值是否是虚假的（为 null/undefined/空字符串/false/0）

## Parameters

### val

`any`

要判断的值

## Returns

`val is TFalsy`

lib/text/functions/isIdCardCN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isIdCardCN

# Function: isIdCardCN()

> **isIdCardCN**(`idcard`): `boolean`

Defined in: [lib/text.ts:385](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L385)

是否是中国大陆身份证号码

## Parameters

### idcard

`string`

身份证号

## Returns

`boolean`

lib/text/functions/isIPv4.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isIPv4

# Function: isIPv4()

> **isIPv4**(`ip`): `boolean`

Defined in: [lib/text.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L241)

是否是 IPv4

## Parameters

### ip

`string`

## Returns

`boolean`

lib/text/functions/isIPv6.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isIPv6

# Function: isIPv6()

> **isIPv6**(`ip`): `boolean`

Defined in: [lib/text.ts:251](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L251)

是否是 IPv6

## Parameters

### ip

`string`

## Returns

`boolean`

lib/text/functions/isPhoneCN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isPhoneCN

# Function: isPhoneCN()

> **isPhoneCN**(`p`): `boolean`

Defined in: [lib/text.ts:377](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L377)

判断手机号是否是 11 位，不做真实性校验

## Parameters

### p

`string`

手机号

## Returns

`boolean`

lib/text/functions/isRealPath.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isRealPath

# Function: isRealPath()

> **isRealPath**(`path`): `boolean`

Defined in: [lib/text.ts:522](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L522)

判断是否是绝对路径，是返回 true，相对路径返回 false

## Parameters

### path

`string`

要判断的路径字符串

## Returns

`boolean`

lib/text/functions/isTruthy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / isTruthy

# Function: isTruthy()

> **isTruthy**\<`T`\>(`val`): `val is Exclude<T, TFalsy>`

Defined in: [lib/text.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L727)

判断一个值是否是真实的（不为 null/undefined/空字符串/false/0）

## Type Parameters

### T

`T`

## Parameters

### val

`T`

要判断的值

## Returns

`val is Exclude<T, TFalsy>`

lib/text/functions/logicalOr.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / logicalOr

# Function: logicalOr()

> **logicalOr**\<`T`, `T2`\>(`v1`, `v2`): `T` *extends* [`TFalsy`](../type-aliases/TFalsy.md) ? `T2` : `T`

Defined in: [lib/text.ts:736](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L736)

类似 || 运算符的效果

## Type Parameters

### T

`T`

### T2

`T2`

## Parameters

### v1

`T`

比对值

### v2

`T2`

比对值

## Returns

`T` *extends* [`TFalsy`](../type-aliases/TFalsy.md) ? `T2` : `T`

lib/text/functions/match.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / match

# Function: match()

> **match**(`str`, `regs`): `boolean`

Defined in: [lib/text.ts:362](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L362)

传入正则进行匹配 str 是否有一项满足

## Parameters

### str

`string`

要检测的字符串

### regs

`RegExp`[]

正则列表

## Returns

`boolean`

lib/text/functions/nlReplace.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / nlReplace

# Function: nlReplace()

> **nlReplace**(`str`, `to?`): `string`

Defined in: [lib/text.ts:282](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L282)

换行替换为别的

## Parameters

### str

`string`

要替换的字符串

### to?

`string` = '\n'

换行替换符

## Returns

`string`

lib/text/functions/parseDomain.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseDomain

# Function: parseDomain()

> **parseDomain**(`domain`): `Promise`\<[`IDomain`](../interfaces/IDomain.md)\>

Defined in: [lib/text.ts:305](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L305)

解析域名并获取 tld/sld/domain/sub

## Parameters

### domain

`string`

域名

## Returns

`Promise`\<[`IDomain`](../interfaces/IDomain.md)\>

lib/text/functions/parseHost.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseHost

# Function: parseHost()

> **parseHost**(`host`): `object`

Defined in: [lib/text.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L29)

解析主机名和端口号

## Parameters

### host

`string`

如 example.com:8080、[::1]:8080

## Returns

`object`

### hostname

> **hostname**: `string`

### port

> **port**: `string` \| `null`

### rawHostname

> **rawHostname**: `string`

lib/text/functions/parseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseJson

# Function: parseJson()

> **parseJson**\<`T`\>(`str`): `false` \| `T`

Defined in: [lib/text.ts:630](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L630)

将字符串解析为对象，返回 false 代表解析失败，支持 BigInt

## Type Parameters

### T

`T`

## Parameters

### str

`string`

要解析的 json 字符串

## Returns

`false` \| `T`

lib/text/functions/parseUrl.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseUrl

# Function: parseUrl()

> **parseUrl**(`url`): [`IUrlParse`](../../../index/interfaces/IUrlParse.md)

Defined in: [lib/text.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L55)

格式化一段 URL

## Parameters

### url

`string`

## Returns

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

lib/text/functions/queryParse.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / queryParse

# Function: queryParse()

> **queryParse**(`query`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/text.ts:462](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L462)

将 query string 转换为对象

## Parameters

### query

`string`

要转换的字符串

## Returns

`Record`\<`string`, `string` \| `string`[]\>

lib/text/functions/queryStringify.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / queryStringify

# Function: queryStringify()

## Call Signature

> **queryStringify**(`query`, `encode?`): `string`

Defined in: [lib/text.ts:413](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L413)

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

Defined in: [lib/text.ts:419](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L419)

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

lib/text/functions/sizeFormat.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / sizeFormat

# Function: sizeFormat()

> **sizeFormat**(`size`, `spliter?`): `string`

Defined in: [lib/text.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L15)

将文件大小格式化为带单位的字符串

## Parameters

### size

`number`

文件大小

### spliter?

`string` = `' '`

分隔符

## Returns

`string`

lib/text/functions/str2int.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / str2int

# Function: str2int()

> **str2int**(`str`, `digits?`): `number`

Defined in: [lib/text.ts:750](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L750)

为解决精度问题，将字符串数字转换为整数显示
以下几个示例都是当 digits 为 2 时
str 传入 '1.234'，返回 123
str 传入 '1.235'，返回 124
str 传入 '1.1'，返回 110
str 传入 '6'，返回 600

## Parameters

### str

`string`

要转换的数字字符串

### digits?

`number` = `3`

小数点右移位数

## Returns

`number`

lib/text/functions/stringifyBuffer.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / stringifyBuffer

# Function: stringifyBuffer()

> **stringifyBuffer**(`buf`): `string`

Defined in: [lib/text.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L673)

输出文本格式的 buffer

## Parameters

### buf

`Buffer`

原始 buffer

## Returns

`string`

lib/text/functions/stringifyJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / stringifyJson

# Function: stringifyJson()

> **stringifyJson**(`obj`, `space?`): `string`

Defined in: [lib/text.ts:660](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L660)

将对象转换为 json 字符串，返回 false 代表解析失败，支持 BigInt

## Parameters

### obj

`any`

要转换的 json 对象

### space?

`string` \| `number`

美化方式

## Returns

`string`

lib/text/functions/stringifyResult.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / stringifyResult

# Function: stringifyResult()

> **stringifyResult**(`rtn`): `string`

Defined in: [lib/text.ts:590](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L590)

将普通的返回 JSON 对象序列化为字符串

## Parameters

### rtn

`any`

返回 JSON 对象

## Returns

`string`

lib/text/functions/trimJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / trimJson

# Function: trimJson()

> **trimJson**(`json`): `any`

Defined in: [lib/text.ts:681](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L681)

递归删除 json 中的字符串首尾空格，会返回一个新的对象

## Parameters

### json

`any`

## Returns

`any`

lib/text/functions/urlAtom.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / urlAtom

# Function: urlAtom()

> **urlAtom**(`url`): `string`

Defined in: [lib/text.ts:212](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L212)

将路径中的 ../ ./ 都按规范妥善处理

## Parameters

### url

`string`

要处理的地址

## Returns

`string`

lib/text/functions/urlResolve.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / urlResolve

# Function: urlResolve()

> **urlResolve**(`from`, `to`, `limit?`): `string`

Defined in: [lib/text.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L146)

将相对路径根据基准路径进行转换

## Parameters

### from

`string`

基准路径

### to

`string`

相对路径

### limit?

`boolean` = `false`

是否限定结果不能逃逸出基准路径

## Returns

`string`

lib/text/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/text

# lib/text

## Interfaces

- [IDomain](interfaces/IDomain.md)

## Type Aliases

- [TFalsy](type-aliases/TFalsy.md)

## Variables

- [REGEXP\_ASCII](variables/REGEXP_ASCII.md)
- [REGEXP\_DOMAIN](variables/REGEXP_DOMAIN.md)
- [REGEXP\_EMAIL](variables/REGEXP_EMAIL.md)
- [REGEXP\_IPV4](variables/REGEXP_IPV4.md)
- [REGEXP\_IPV6](variables/REGEXP_IPV6.md)

## Functions

- [csvescape](functions/csvescape.md)
- [getFileExt](functions/getFileExt.md)
- [getFilename](functions/getFilename.md)
- [getFileNameExt](functions/getFileNameExt.md)
- [htmlescape](functions/htmlescape.md)
- [int2str](functions/int2str.md)
- [isAscii](functions/isAscii.md)
- [isDomain](functions/isDomain.md)
- [isEMail](functions/isEMail.md)
- [isFalsy](functions/isFalsy.md)
- [isIdCardCN](functions/isIdCardCN.md)
- [isIPv4](functions/isIPv4.md)
- [isIPv6](functions/isIPv6.md)
- [isPhoneCN](functions/isPhoneCN.md)
- [isRealPath](functions/isRealPath.md)
- [isTruthy](functions/isTruthy.md)
- [logicalOr](functions/logicalOr.md)
- [match](functions/match.md)
- [nlReplace](functions/nlReplace.md)
- [parseDomain](functions/parseDomain.md)
- [parseHost](functions/parseHost.md)
- [parseJson](functions/parseJson.md)
- [parseUrl](functions/parseUrl.md)
- [queryParse](functions/queryParse.md)
- [queryStringify](functions/queryStringify.md)
- [sizeFormat](functions/sizeFormat.md)
- [str2int](functions/str2int.md)
- [stringifyBuffer](functions/stringifyBuffer.md)
- [stringifyJson](functions/stringifyJson.md)
- [stringifyResult](functions/stringifyResult.md)
- [trimJson](functions/trimJson.md)
- [urlAtom](functions/urlAtom.md)
- [urlResolve](functions/urlResolve.md)

lib/text/interfaces/IDomain.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / IDomain

# Interface: IDomain

Defined in: [lib/text.ts:294](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L294)

解析后的 domain

## Properties

### domain

> **domain**: `string` \| `null`

Defined in: [lib/text.ts:297](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L297)

***

### sld

> **sld**: `string` \| `null`

Defined in: [lib/text.ts:296](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L296)

***

### sub

> **sub**: `string` \| `null`

Defined in: [lib/text.ts:298](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L298)

***

### tld

> **tld**: `string` \| `null`

Defined in: [lib/text.ts:295](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L295)

lib/text/type-aliases/TFalsy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / TFalsy

# Type Alias: TFalsy

> **TFalsy** = `false` \| `""` \| `0` \| `null` \| `undefined` \| *typeof* `NaN`

Defined in: [lib/text.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L713)

虚假值类型

lib/text/variables/REGEXP_ASCII.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_ASCII

# Variable: REGEXP\_ASCII

> `const` **REGEXP\_ASCII**: `RegExp`

Defined in: [lib/text.ts:267](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L267)

可打印的 ascii 字符集

lib/text/variables/REGEXP_DOMAIN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_DOMAIN

# Variable: REGEXP\_DOMAIN

> `const` **REGEXP\_DOMAIN**: `RegExp`

Defined in: [lib/text.ts:255](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L255)

lib/text/variables/REGEXP_EMAIL.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_EMAIL

# Variable: REGEXP\_EMAIL

> `const` **REGEXP\_EMAIL**: `RegExp`

Defined in: [lib/text.ts:225](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L225)

lib/text/variables/REGEXP_IPV4.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_IPV4

# Variable: REGEXP\_IPV4

> `const` **REGEXP\_IPV4**: `RegExp`

Defined in: [lib/text.ts:235](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L235)

lib/text/variables/REGEXP_IPV6.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_IPV6

# Variable: REGEXP\_IPV6

> `const` **REGEXP\_IPV6**: `RegExp`

Defined in: [lib/text.ts:245](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L245)

lib/time/classes/Time.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / Time

# Class: Time

Defined in: [lib/time.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L33)

## Constructors

### Constructor

> **new Time**(`ctr`, `opt`): `Time`

Defined in: [lib/time.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L45)

构造函数

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Time`

## Methods

### format()

> **format**(`f`, `zone?`): `string`

Defined in: [lib/time.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L97)

获取格式化的字符串

#### Parameters

##### f

`string`

格式化字符串

##### zone?

`number`

时区小时，如 8

#### Returns

`string`

***

### getZone()

> **getZone**(): `number`

Defined in: [lib/time.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L81)

获取时区

#### Returns

`number`

***

### setZone()

> **setZone**(`zone`): `void`

Defined in: [lib/time.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L74)

设置时区

#### Parameters

##### zone

`number`

北京时间如 8

#### Returns

`void`

***

### stamp()

> **stamp**(): `number`

Defined in: [lib/time.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L104)

获取秒级时间戳

#### Returns

`number`

***

### toUTCString()

> **toUTCString**(): `string`

Defined in: [lib/time.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L88)

获取 UTC 字符串

#### Returns

`string`

lib/time/functions/format.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / format

# Function: format()

> **format**(`zone`, `f`, `date?`): `string`

Defined in: [lib/time.ts:167](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L167)

将时间对象转换为时间字符串

## Parameters

### zone

`number` \| [`Ctr`](../../../sys/ctr/classes/Ctr.md) \| `null`

时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准

### f

`string`

转换格式

### date?

`number` \| `Date`

时间对象秒/毫秒级数字均可

## Returns

`string`

lib/time/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / get

# Function: get()

> **get**(`ctr`, `opt?`): [`Time`](../classes/Time.md)

Defined in: [lib/time.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L113)

创建获取一个时间对象

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt?

[`IOptions`](../interfaces/IOptions.md) = `{}`

## Returns

[`Time`](../classes/Time.md)

lib/time/functions/isMs.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / isMs

# Function: isMs()

> **isMs**(`time`): `boolean`

Defined in: [lib/time.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L157)

是否是毫秒

## Parameters

### time

`number`

要判断的时间戳

## Returns

`boolean`

lib/time/functions/stamp.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / stamp

# Function: stamp()

> **stamp**(`date?`, `zone?`): `number`

Defined in: [lib/time.ts:122](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L122)

获取秒级时间戳

## Parameters

### date?

`string` \| `Date`

Date 对象可选

### zone?

`number` \| [`Ctr`](../../../sys/ctr/classes/Ctr.md) \| `null`

时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准

## Returns

`number`

lib/time/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/time

# lib/time

## Classes

- [Time](classes/Time.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)

## Variables

- [DAY](variables/DAY.md)
- [HOUR](variables/HOUR.md)
- [YEAR](variables/YEAR.md)

## Functions

- [format](functions/format.md)
- [get](functions/get.md)
- [isMs](functions/isMs.md)
- [stamp](functions/stamp.md)

lib/time/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/time.ts:8](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L8)

## Properties

### data?

> `optional` **data?**: `string` \| `number`

Defined in: [lib/time.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L12)

字符串、时间戳（秒或毫秒）

***

### zone?

> `optional` **zone?**: `number`

Defined in: [lib/time.ts:10](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L10)

时区

lib/time/variables/DAY.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / DAY

# Variable: DAY

> `const` **DAY**: `86400` = `86400`

Defined in: [lib/time.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L18)

一天的秒数

lib/time/variables/HOUR.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / HOUR

# Variable: HOUR

> `const` **HOUR**: `3600` = `3600`

Defined in: [lib/time.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L16)

一小时的秒数

lib/time/variables/YEAR.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / YEAR

# Variable: YEAR

> `const` **YEAR**: `31536000` = `31536000`

Defined in: [lib/time.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L20)

一年（365 天）

lib/turnstile/enumerations/EFACTORY.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/turnstile](../index.md) / EFACTORY

# Enumeration: EFACTORY

Defined in: [lib/turnstile.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/turnstile.ts#L19)

厂家

## Enumeration Members

### CLOUDFLARE

> **CLOUDFLARE**: `0`

Defined in: [lib/turnstile.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/turnstile.ts#L20)

***

### TENCENT

> **TENCENT**: `1`

Defined in: [lib/turnstile.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/turnstile.ts#L21)

lib/turnstile/functions/verify.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/turnstile](../index.md) / verify

# Function: verify()

> **verify**(`ctr`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/turnstile.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/turnstile.ts#L24)

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

#### factory

[`EFACTORY`](../enumerations/EFACTORY.md)

#### ip

`string`

#### token

`string`

## Returns

`Promise`\<`boolean`\>

lib/turnstile/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/turnstile

# lib/turnstile

## Enumerations

- [EFACTORY](enumerations/EFACTORY.md)

## Functions

- [verify](functions/verify.md)

lib/undici/formdata/classes/FormData.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/formdata](../index.md) / FormData

# Class: FormData

Defined in: [lib/undici/formdata.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L37)

## Extends

- `Readable`

## Constructors

### Constructor

> **new FormData**(`options?`): `FormData`

Defined in: node\_modules/@types/node/stream.d.ts:80

#### Parameters

##### options?

`ReadableOptions`\<`Readable`\>

#### Returns

`FormData`

#### Inherited from

`stream.Readable.constructor`

## Methods

### \_read()

> **\_read**(): `void`

Defined in: [lib/undici/formdata.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L146)

间隔读取（on data 或 pipe 触发）

#### Returns

`void`

#### Overrides

`stream.Readable._read`

***

### getBoundary()

> **getBoundary**(): `string`

Defined in: [lib/undici/formdata.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L124)

获取 boundary

#### Returns

`string`

***

### getLength()

> **getLength**(): `number`

Defined in: [lib/undici/formdata.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L131)

获取总字节长度

#### Returns

`number`

***

### getSent()

> **getSent**(): `number`

Defined in: [lib/undici/formdata.ts:138](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L138)

获取已发送的字节长度

#### Returns

`number`

***

### putBuffer()

> **putBuffer**(`key`, `buffer`, `fname`): `void`

Defined in: [lib/undici/formdata.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L109)

添加 Buffer 数据

#### Parameters

##### key

`string`

键

##### buffer

`Buffer`

Buffer 数据

##### fname

`string`

文件名

#### Returns

`void`

***

### putFile()

> **putFile**(`key`, `path`, `fname?`): `Promise`\<`boolean`\>

Defined in: [lib/undici/formdata.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L81)

添加文件

#### Parameters

##### key

`string`

键

##### path

`string`

路径

##### fname?

`string`

可选，文件名

#### Returns

`Promise`\<`boolean`\>

***

### putString()

> **putString**(`key`, `val`): `void`

Defined in: [lib/undici/formdata.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L65)

添加字符串

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`void`

lib/undici/formdata/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/undici/formdata

# lib/undici/formdata

## Classes

- [FormData](classes/FormData.md)

## Type Aliases

- [IItem](type-aliases/IItem.md)

lib/undici/formdata/type-aliases/IItem.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/formdata](../index.md) / IItem

# Type Alias: IItem

> **IItem** = \{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

Defined in: [lib/undici/formdata.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/undici/formdata.ts#L12)

Item 对象

## Union Members

### Type Literal

\{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `""`

#### type

> **type**: `"string"`

#### value

> **value**: `string`

字符串值

***

### Type Literal

\{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `string`

文件路径

#### type

> **type**: `"file"`

#### value

> **value**: `string`

文件名

***

### Type Literal

\{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

#### key

> **key**: `string`

key 键

#### path

> **path**: `Buffer`

Buffer 数据

#### type

> **type**: `"buffer"`

#### value

> **value**: `string`

文件名

lib/undici/functions/fetch.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / fetch

# Function: fetch()

> **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [lib/undici.ts:174](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L174)

发起一个完全兼容 fetch 的请求

## Parameters

### input

`string` \| `Request` \| `URL`

请求的 URL 或 Request 对象

### init?

`RequestInit` & `object` = `{}`

增加 mproxy、hosts

## Returns

`Promise`\<`Response`\>

lib/undici/functions/filterHeaders.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / filterHeaders

# Function: filterHeaders()

> **filterHeaders**(`headers`, `res?`, `filter?`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/undici.ts:529](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L529)

剔除不代理的 header，返回新的 header

## Parameters

### headers

`IncomingHttpHeaders` \| `IncomingHttpHeaders` \| [`THttpHeaders`](../type-aliases/THttpHeaders.md)

剔除前的 header

### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

直接设置头部而不返回，可置空

### filter?

(`h`) => `boolean`

返回 true 则留下

## Returns

`Record`\<`string`, `string` \| `string`[]\>

lib/undici/functions/getFormData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(): [`FormData`](../formdata/classes/FormData.md)

Defined in: [lib/undici.ts:513](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L513)

创建 FormData 对象

## Returns

[`FormData`](../formdata/classes/FormData.md)

lib/undici/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / get

# Function: get()

> **get**(`u`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/undici.ts:89](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L89)

发起一个 get 请求

## Parameters

### u

`string`

请求的 URL

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/undici/functions/getProxyAgent.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getProxyAgent

# Function: getProxyAgent()

> **getProxyAgent**(`url`): `ProxyAgent`

Defined in: [lib/undici.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L20)

获取代理 agent

## Parameters

### url

`string`

## Returns

`ProxyAgent`

lib/undici/functions/getResponseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getResponseJson

# Function: getResponseJson()

> **getResponseJson**(`u`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L153)

发起 GET 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

lib/undici/functions/mproxyData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / mproxyData

# Function: mproxyData()

> **mproxyData**(`ctr`): `any`

Defined in: [lib/undici.ts:618](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L618)

获取 mproxy 的附加数据

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

## Returns

`any`

lib/undici/functions/mproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / mproxy

# Function: mproxy()

> **mproxy**(`ctr`, `auth`, `opt?`): `Promise`\<`number`\>

Defined in: [lib/undici.ts:565](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L565)

正向 mproxy 代理，注意提前处理不要自动处理 post 数据，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt?

[`IMproxyOptions`](../interfaces/IMproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`number`\>

lib/undici/functions/open.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / open

# Function: open()

> **open**(`u`): [`Request`](../request/classes/Request.md)

Defined in: [lib/undici.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L80)

创建一个请求对象

## Parameters

### u

`string`

## Returns

[`Request`](../request/classes/Request.md)

lib/undici/functions/postJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / postJson

# Function: postJson()

> **postJson**(`u`, `data`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/undici.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L114)

发起 JSON 请求

## Parameters

### u

`string`

网址

### data

`any`[] \| `Record`\<`string`, `any`\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/undici/functions/postJsonResponseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / postJsonResponseJson

# Function: postJsonResponseJson()

> **postJsonResponseJson**(`u`, `data`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:130](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L130)

发起 JSON 请求并解析 JSON 响应，失败时返回 null

## Parameters

### u

`string`

网址

### data

`any`[] \| `Record`\<`string`, `any`\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

lib/undici/functions/post.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / post

# Function: post()

> **post**(`u`, `data`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/undici.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L99)

发起一个 post 请求

## Parameters

### u

`string`

请求的 URL

### data

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

要发送的数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/undici/functions/request.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / request

# Function: request()

> **request**(`u`, `data?`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/undici.ts:343](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L343)

发起一个请求

## Parameters

### u

`string`

### data?

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

配置项

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/undici/functions/rproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/undici.ts:636](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L636)

反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### route

`Record`\<`string`, `string`\>

要反代的路由

### opt?

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>

lib/undici/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/undici

# lib/undici

## Interfaces

- [IMproxyOptions](interfaces/IMproxyOptions.md)
- [IRequestOptions](interfaces/IRequestOptions.md)
- [IRproxyOptions](interfaces/IRproxyOptions.md)

## Type Aliases

- [THttpHeaders](type-aliases/THttpHeaders.md)

## Functions

- [fetch](functions/fetch.md)
- [filterHeaders](functions/filterHeaders.md)
- [get](functions/get.md)
- [getFormData](functions/getFormData.md)
- [getProxyAgent](functions/getProxyAgent.md)
- [getResponseJson](functions/getResponseJson.md)
- [mproxy](functions/mproxy.md)
- [mproxyData](functions/mproxyData.md)
- [open](functions/open.md)
- [post](functions/post.md)
- [postJson](functions/postJson.md)
- [postJsonResponseJson](functions/postJsonResponseJson.md)
- [request](functions/request.md)
- [rproxy](functions/rproxy.md)

lib/undici/interfaces/IMproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:720](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L720)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L729)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:723](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L723)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L727)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:725](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L725)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L726)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L731)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:722](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L722)

秒数

lib/undici/interfaces/IRequestOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:689](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L689)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:714](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L714)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:695](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L695)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:700](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L700)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:697](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L697)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L710)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:699](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L699)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L716)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L690)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L702)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L712)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:698](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L698)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:693](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L693)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:691](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L691)

lib/undici/interfaces/IRproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:735](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L735)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:744](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L744)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:738](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L738)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:742](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L742)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:740](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L740)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:741](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L741)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:746](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L746)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:754](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L754)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:737](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L737)

秒数

lib/undici/request/classes/Request.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/request](../index.md) / Request

# Class: Request

Defined in: [lib/undici/request.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L11)

## Constructors

### Constructor

> **new Request**(`url`): `Request`

Defined in: [lib/undici/request.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L22)

#### Parameters

##### url

`string`

#### Returns

`Request`

## Methods

### data()

> **data**(`data`): `this`

Defined in: [lib/undici/request.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L30)

设置 get 或 post 的数据

#### Parameters

##### data

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

数据

#### Returns

`this`

***

### follow()

> **follow**(`follow?`): `this`

Defined in: [lib/undici/request.ts:87](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L87)

设置是否跟随请求方的 location，留空为跟随，不设置为不跟随

#### Parameters

##### follow?

`number` = `5`

#### Returns

`this`

***

### get()

> **get**(): `this`

Defined in: [lib/undici/request.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L47)

method get 方法别名

#### Returns

`this`

***

### headers()

> **headers**(`headers`): `this`

Defined in: [lib/undici/request.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L123)

批量设置提交的 headers

#### Parameters

##### headers

[`THttpHeaders`](../../type-aliases/THttpHeaders.md)

#### Returns

`this`

***

### hosts()

> **hosts**(`hosts`): `this`

Defined in: [lib/undici/request.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L96)

设置域名 -> ip的对应键值，就像电脑里的 hosts 一样

#### Parameters

##### hosts

`string` \| `Record`\<`string`, `string`\>

#### Returns

`this`

***

### json()

> **json**(): `this`

Defined in: [lib/undici/request.ts:70](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L70)

type json 方法别名

#### Returns

`this`

***

### local()

> **local**(`addr`): `this`

Defined in: [lib/undici/request.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L114)

设置使用的本地网卡 IP

#### Parameters

##### addr

`string`

#### Returns

`this`

***

### method()

> **method**(`method`): `this`

Defined in: [lib/undici/request.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L39)

设置 get 或 post 请求

#### Parameters

##### method

`"GET"` \| `"POST"`

#### Returns

`this`

***

### post()

> **post**(): `this`

Defined in: [lib/undici/request.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L54)

method post 方法别名

#### Returns

`this`

***

### request()

> **request**(`cookie?`): `Promise`\<[`Response`](../../response/classes/Response.md)\>

Defined in: [lib/undici/request.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L143)

发起请求

#### Parameters

##### cookie?

`Record`\<`string`, [`ICookie`](../../../cookie/interfaces/ICookie.md)\>

#### Returns

`Promise`\<[`Response`](../../response/classes/Response.md)\>

***

### save()

> **save**(`save`): `this`

Defined in: [lib/undici/request.ts:105](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L105)

设置后将直接保存到本地文件，不会返回，save 为本地实体路径

#### Parameters

##### save

`string`

#### Returns

`this`

***

### setHeader()

> **setHeader**(`name`, `val`): `this`

Defined in: [lib/undici/request.ts:133](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L133)

设置单条 header

#### Parameters

##### name

`string`

##### val

`string`

#### Returns

`this`

***

### timeout()

> **timeout**(`timeout`): `this`

Defined in: [lib/undici/request.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L78)

设置请求有效期

#### Parameters

##### timeout

`number`

秒

#### Returns

`this`

***

### type()

> **type**(`type`): `this`

Defined in: [lib/undici/request.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/undici/request.ts#L62)

设置提交模式，json 还是普通 form

#### Parameters

##### type

`"form"` \| `"json"`

#### Returns

`this`

lib/undici/request/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/undici/request

# lib/undici/request

## Classes

- [Request](classes/Request.md)

lib/undici/response/classes/Response.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/response](../index.md) / Response

# Class: Response

Defined in: [lib/undici/response.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L12)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/undici/response.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L25)

#### Parameters

##### req

`ResponseData`\<`null`\> \| `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/undici/response.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L20)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/undici/response.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L18)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/undici/response.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L32)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getJson()

> **getJson**(): `Promise`\<`any`\>

Defined in: [lib/undici/response.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L63)

读取所有内容为 JSON，失败返回 null

#### Returns

`Promise`\<`any`\>

***

### getRawStream()

> **getRawStream**(): `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L124)

获取原生响应读取流对象

#### Returns

`BodyReadable` & `BodyMixin` \| `null`

***

### getStream()

> **getStream**(): `BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L88)

获取响应读取流对象

#### Returns

`BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

***

### getText()

> **getText**(): `Promise`\<`string` \| `null`\>

Defined in: [lib/undici/response.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L49)

读取所有内容为文本

#### Returns

`Promise`\<`string` \| `null`\>

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/undici/response.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L80)

用户自定义的 content 内容

#### Parameters

##### v

`string` \| `Buffer`\<`ArrayBufferLike`\>

内容值

#### Returns

`void`

lib/undici/response/index.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / lib/undici/response

# lib/undici/response

## Classes

- [Response](classes/Response.md)

lib/undici/type-aliases/THttpHeaders.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / THttpHeaders

# Type Alias: THttpHeaders

> **THttpHeaders** = `http.IncomingHttpHeaders` & `object`

Defined in: [lib/undici.ts:759](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L759)

http headers

## Type Declaration

### http-code?

> `optional` **http-code?**: `number`

### http-url?

> `optional` **http-url?**: `string`

lib/vector/classes/Vector.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / Vector

# Class: Vector

Defined in: [lib/vector.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L25)

## Constructors

### Constructor

> **new Vector**(`etc`): `Vector`

Defined in: [lib/vector.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L30)

#### Parameters

##### etc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md)

#### Returns

`Vector`

## Methods

### delete()

> **delete**(`data`): `Promise`\<`false` \| \{ `deletedCount`: `number`; \}\>

Defined in: [lib/vector.ts:116](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L116)

删除数据

#### Parameters

##### data

###### collection

`string`

表名

###### filter

`string`

过滤器，如 word_count > 0 and book_id in [1, 2, 3]

#### Returns

`Promise`\<`false` \| \{ `deletedCount`: `number`; \}\>

***

### insert()

> **insert**(`data`): `Promise`\<`false` \| \{ `insertCount`: `number`; `insertIds`: (`string` \| `number`)[]; \}\>

Defined in: [lib/vector.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L85)

插入数据

#### Parameters

##### data

###### collection

`string`

表名

###### data

`Record`\<`string`, `any`\>[]

要插入的数据

#### Returns

`Promise`\<`false` \| \{ `insertCount`: `number`; `insertIds`: (`string` \| `number`)[]; \}\>

***

### seach()

> **seach**(`data`): `Promise`\<`false` \| `object`[]\>

Defined in: [lib/vector.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L35)

搜索

#### Parameters

##### data

###### collection

`string`

表名

###### data

`number`[]

查询的向量

###### fields?

`string`[]

输出的字段，如 ['book_id', 'word_count']，默认全部

###### filter?

`string`

过滤器，如 word_count > 0 and book_id in [1, 2, 3]

###### limit?

`number`

返回的结果数量，默认为 3

###### metric?

`"L2"` \| `"IP"` \| `"COSINE"`

计算两个向量相似度的度量，默认 L2

#### Returns

`Promise`\<`false` \| `object`[]\>

lib/vector/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / get

# Function: get()

> **get**(`ctrEtc`): [`Vector`](../classes/Vector.md)

Defined in: [lib/vector.ts:152](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L152)

创建一个 Vector 对象

## Parameters

### ctrEtc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器或配置信息

## Returns

[`Vector`](../classes/Vector.md)

lib/vector/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/vector

# lib/vector

## Classes

- [Vector](classes/Vector.md)

## Interfaces

- [IOptions](interfaces/IOptions.md)

## Functions

- [get](functions/get.md)

lib/vector/interfaces/IOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/vector.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L12)

选项

## Properties

### host?

> `optional` **host?**: `string`

Defined in: [lib/vector.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L14)

主机地址

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/vector.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L18)

数据库名称

***

### port?

> `optional` **port?**: `number`

Defined in: [lib/vector.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L16)

端口号

***

### pwd?

> `optional` **pwd?**: `string`

Defined in: [lib/vector.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L22)

密码

***

### user?

> `optional` **user?**: `string`

Defined in: [lib/vector.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L20)

用户名

lib/ws/classes/Socket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L96)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L101)

#### Parameters

##### request?

`IncomingMessage`

##### socket?

`Socket`

##### head?

`Buffer`\<`ArrayBufferLike`\>

##### options?

###### headers?

`OutgoingHttpHeaders`

###### timeout?

`number`

#### Returns

`Socket`

## Accessors

### ended

#### Get Signature

> **get** **ended**(): `boolean`

Defined in: [lib/ws.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L366)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:371](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L371)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:378](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L378)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:361](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L361)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt?`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L124)

以客户端形式发起链接

#### Parameters

##### u

`string`

以 ws, wss 开头的地址

##### opt?

[`IConnectOptions`](../interfaces/IConnectOptions.md) = `{}`

参数

#### Returns

`Promise`\<`Socket` \| `null`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [lib/ws.ts:332](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L332)

#### Returns

`void`

***

### end()

> **end**(): `void`

Defined in: [lib/ws.ts:328](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L328)

#### Returns

`void`

***

### off()

> **off**(`event`): `this`

Defined in: [lib/ws.ts:323](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L323)

取消监听

#### Parameters

##### event

`"error"` \| `"message"` \| `"end"` \| `"close"` \| `"timeout"` \| `"drain"`

#### Returns

`this`

***

### on()

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:282](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L282)

绑定监听

##### Parameters

###### event

`"message"`

###### cb

(`msg`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:286](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L286)

绑定监听

##### Parameters

###### event

`"error"`

###### cb

(`error`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:287](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L287)

绑定监听

##### Parameters

###### event

`"end"` \| `"close"` \| `"timeout"` \| `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:383](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L383)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:394](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L394)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:353](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L353)

发送二进制

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:345](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L345)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:337](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L337)

发送文本

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

lib/ws/enumerations/EFrameReceiveMode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / EFrameReceiveMode

# Enumeration: EFrameReceiveMode

Defined in: [lib/ws.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L18)

一般用 SIMPLE

## Enumeration Members

### LITE

> **LITE**: `1`

Defined in: [lib/ws.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L20)

***

### SIMPLE

> **SIMPLE**: `2`

Defined in: [lib/ws.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L21)

***

### STANDARD

> **STANDARD**: `0`

Defined in: [lib/ws.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L19)

lib/ws/enumerations/EOpcode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / EOpcode

# Enumeration: EOpcode

Defined in: [lib/ws.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L25)

OPCODE

## Enumeration Members

### BINARY

> **BINARY**: `2`

Defined in: [lib/ws.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L28)

***

### CLOSE

> **CLOSE**: `8`

Defined in: [lib/ws.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L29)

***

### CONTINUATION

> **CONTINUATION**: `0`

Defined in: [lib/ws.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L26)

***

### PING

> **PING**: `9`

Defined in: [lib/ws.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L30)

***

### PONG

> **PONG**: `10`

Defined in: [lib/ws.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L31)

***

### TEXT

> **TEXT**: `1`

Defined in: [lib/ws.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L27)

lib/ws/functions/connect.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / connect

# Function: connect()

> **connect**(`u`, `opt?`): `Promise`\<[`Socket`](../classes/Socket.md) \| `null`\>

Defined in: [lib/ws.ts:411](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L411)

创建一个 ws 客户端发起 ws 请求

## Parameters

### u

`string`

以 ws, wss 开头的地址

### opt?

[`IConnectOptions`](../interfaces/IConnectOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Socket`](../classes/Socket.md) \| `null`\>

lib/ws/functions/createServer.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / createServer

# Function: createServer()

> **createServer**(`request`, `socket`, `head?`, `options?`): [`Socket`](../classes/Socket.md)

Defined in: [lib/ws.ts:421](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L421)

创建一个 ws 服务器接收处理器

## Parameters

### request

`IncomingMessage`

Http 请求端

### socket

`Socket`

响应双向 socket

### head?

`Buffer`\<`ArrayBufferLike`\>

### options?

#### headers?

`OutgoingHttpHeaders`

#### timeout?

`number`

## Returns

[`Socket`](../classes/Socket.md)

lib/ws/functions/mproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / mproxy

# Function: mproxy()

> **mproxy**(`ctr`, `auth`, `opt?`): `Promise`\<`number`\>

Defined in: [lib/ws.ts:509](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L509)

正向 mproxy 代理，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt?

[`IMproxyOptions`](../interfaces/IMproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`number`\>

lib/ws/functions/rproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `url`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/ws.ts:546](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L546)

反向代理，将本 socket 连接反代到其他网址，在 ws 的 onLoad 事件中使用

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### url

`string`

反代真实请求地址，如有 get 需要自行添加

### opt?

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>

lib/ws/functions/rsocket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / rsocket

# Function: rsocket()

> **rsocket**(`ctr`, `host`, `port`): `Promise`\<`boolean`\>

Defined in: [lib/ws.ts:575](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L575)

反向代理，将本 websocket 连接反代到其他真正的 socket，在 ws 的 onLoad 事件中使用

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### host

`string`

反代真实请求地址

### port

`number`

反代真实请求端口

## Returns

`Promise`\<`boolean`\>

lib/ws/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/ws

# lib/ws

## Enumerations

- [EFrameReceiveMode](enumerations/EFrameReceiveMode.md)
- [EOpcode](enumerations/EOpcode.md)

## Classes

- [Socket](classes/Socket.md)

## Interfaces

- [IConnectOptions](interfaces/IConnectOptions.md)
- [IMproxyOptions](interfaces/IMproxyOptions.md)
- [IRproxyOptions](interfaces/IRproxyOptions.md)

## Functions

- [connect](functions/connect.md)
- [createServer](functions/createServer.md)
- [mproxy](functions/mproxy.md)
- [rproxy](functions/rproxy.md)
- [rsocket](functions/rsocket.md)

lib/ws/interfaces/IConnectOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IConnectOptions

# Interface: IConnectOptions

Defined in: [lib/ws.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L35)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/ws.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L43)

cookie 托管对象

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L41)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L39)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L40)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L47)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L45)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ws.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L49)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L37)

秒数

lib/ws/interfaces/IMproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/ws.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L56)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L64)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L62)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L60)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L61)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L68)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L66)

小帧模式，默认 false

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L58)

秒数

lib/ws/interfaces/IRproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/ws.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L72)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L80)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L78)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L76)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L77)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:84](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L84)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:82](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L82)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ws.ts:86](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L86)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L74)

秒数

lib/zip/classes/Zip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / Zip

# Class: Zip

Defined in: [lib/zip.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L9)

本库主要用于读取 zip，请尽量不要用来写入 zip，尤其是大文件 zip

## Constructors

### Constructor

> **new Zip**(`zip`): `Zip`

Defined in: [lib/zip.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L17)

#### Parameters

##### zip

`JSZip`

#### Returns

`Zip`

## Methods

### cd()

> **cd**(`dir`): `string`

Defined in: [lib/zip.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L338)

进入一个目录（不存在也能进入，需要自行判断）
返回进入后的路径值

#### Parameters

##### dir

`string`

相对路径或绝对路径

#### Returns

`string`

***

### generate()

> **generate**\<`T`\>(`options?`): `Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\]\>

Defined in: [lib/zip.ts:350](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L350)

打包 zip

#### Type Parameters

##### T

`T` *extends* keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

#### Parameters

##### options?

选项

###### level?

`number`

###### onUpdate?

(`percent`, `currentFile`) => `void`

###### type?

`T`

#### Returns

`Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\]\>

***

### getContent()

读取完整文件

#### Param

文件路径

#### Param

返回类型

#### Call Signature

> **getContent**(`path`): `Promise`\<`string` \| `null`\>

Defined in: [lib/zip.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L22)

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`string` \| `null`\>

#### Call Signature

> **getContent**\<`T`\>(`path`, `type`): `Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\] \| `null`\>

Defined in: [lib/zip.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L23)

##### Type Parameters

###### T

`T` *extends* keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

##### Parameters

###### path

`string`

###### type

`T`

##### Returns

`Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\] \| `null`\>

***

### getList()

> **getList**(): `Promise`\<`Record`\<`string`, `string` \| `Buffer`\<`ArrayBufferLike`\>\>\>

Defined in: [lib/zip.ts:375](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L375)

获取 path 和 string/Buffer 对应的文件列表

#### Returns

`Promise`\<`Record`\<`string`, `string` \| `Buffer`\<`ArrayBufferLike`\>\>\>

***

### isDir()

> **isDir**(`path`): `false` \| [`IZipStats`](../interfaces/IZipStats.md)

Defined in: [lib/zip.ts:134](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L134)

判断是否是目录或目录是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`false` \| [`IZipStats`](../interfaces/IZipStats.md)

***

### isFile()

> **isFile**(`path`): `false` \| [`IZipStats`](../interfaces/IZipStats.md)

Defined in: [lib/zip.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L146)

判断是否是文件或文件是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`false` \| [`IZipStats`](../interfaces/IZipStats.md)

***

### putContent()

> **putContent**\<`T`\>(`path`, `data`, `options?`): `void`

Defined in: [lib/zip.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L51)

写入文件内容

#### Type Parameters

##### T

`T` *extends* keyof [`IZipInputByType`](../interfaces/IZipInputByType.md)

#### Parameters

##### path

`string`

文件路径

##### data

[`IZipInputByType`](../interfaces/IZipInputByType.md)\[`T`\]

要写入的内容

##### options?

选项

###### base64?

`boolean`

###### binary?

`boolean`

###### date?

`Date`

#### Returns

`void`

***

### pwd()

> **pwd**(): `string`

Defined in: [lib/zip.ts:329](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L329)

获取当前目录，末尾不带 /

#### Returns

`string`

string

***

### readDir()

获取文件夹下文件列表

#### Param

文件夹路径

#### Param

选项

#### Call Signature

> **readDir**(`path?`, `opt?`): [`IZipItem`](../interfaces/IZipItem.md)[]

Defined in: [lib/zip.ts:155](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L155)

读取目录，hasChildren: false, hasDir: true, pathAsKey: false

##### Parameters

###### path?

`string`

###### opt?

###### hasChildren?

`boolean`

###### hasDir?

`boolean`

###### pathAsKey?

`false`

##### Returns

[`IZipItem`](../interfaces/IZipItem.md)[]

#### Call Signature

> **readDir**(`path?`, `opt?`): `Record`\<`string`, [`IZipItem`](../interfaces/IZipItem.md)\>

Defined in: [lib/zip.ts:156](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L156)

读取目录，hasChildren: false, hasDir: true, pathAsKey: false

##### Parameters

###### path?

`string`

###### opt?

###### hasChildren?

`boolean`

###### hasDir?

`boolean`

###### pathAsKey

`true`

##### Returns

`Record`\<`string`, [`IZipItem`](../interfaces/IZipItem.md)\>

***

### stats()

> **stats**(`path`): [`IZipStats`](../interfaces/IZipStats.md) \| `null`

Defined in: [lib/zip.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L75)

获取对象是否存在，存在则返回 stats 对象，否则返回 null

#### Parameters

##### path

`string`

对象路径

#### Returns

[`IZipStats`](../interfaces/IZipStats.md) \| `null`

***

### unlink()

> **unlink**(`path`): `void`

Defined in: [lib/zip.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L65)

删除一个文件/文件夹（深度删除）

#### Parameters

##### path

`string`

要删除的文件路径

#### Returns

`void`

lib/zip/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / get

# Function: get()

> **get**(`data?`): `Promise`\<[`Zip`](../classes/Zip.md) \| `null`\>

Defined in: [lib/zip.ts:428](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L428)

获取 zip 对象

## Parameters

### data?

[`TZipInputFileFormat`](../type-aliases/TZipInputFileFormat.md)

对象数据

## Returns

`Promise`\<[`Zip`](../classes/Zip.md) \| `null`\>

lib/zip/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/zip

# lib/zip

## Classes

- [Zip](classes/Zip.md)

## Interfaces

- [IZipInputByType](interfaces/IZipInputByType.md)
- [IZipItem](interfaces/IZipItem.md)
- [IZipMetadata](interfaces/IZipMetadata.md)
- [IZipOutputByType](interfaces/IZipOutputByType.md)
- [IZipStats](interfaces/IZipStats.md)

## Type Aliases

- [TZipInputFileFormat](type-aliases/TZipInputFileFormat.md)
- [TZipInputType](type-aliases/TZipInputType.md)
- [TZipOutputType](type-aliases/TZipOutputType.md)

## Functions

- [get](functions/get.md)

lib/zip/interfaces/IZipInputByType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipInputByType

# Interface: IZipInputByType

Defined in: [lib/zip.ts:475](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L475)

## Properties

### array

> **array**: `number`[]

Defined in: [lib/zip.ts:480](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L480)

***

### arraybuffer

> **arraybuffer**: `ArrayBuffer`

Defined in: [lib/zip.ts:482](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L482)

***

### base64

> **base64**: `string`

Defined in: [lib/zip.ts:476](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L476)

***

### binarystring

> **binarystring**: `string`

Defined in: [lib/zip.ts:479](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L479)

***

### blob

> **blob**: `Blob`

Defined in: [lib/zip.ts:483](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L483)

***

### nodebuffer

> **nodebuffer**: `Buffer`

Defined in: [lib/zip.ts:484](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L484)

***

### string

> **string**: `string`

Defined in: [lib/zip.ts:477](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L477)

***

### text

> **text**: `string`

Defined in: [lib/zip.ts:478](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L478)

***

### uint8array

> **uint8array**: `Uint8Array`

Defined in: [lib/zip.ts:481](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L481)

lib/zip/interfaces/IZipItem.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipItem

# Interface: IZipItem

Defined in: [lib/zip.ts:443](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L443)

## Properties

### compressedSize

> **compressedSize**: `number`

Defined in: [lib/zip.ts:445](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L445)

***

### date

> **date**: `Date`

Defined in: [lib/zip.ts:447](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L447)

***

### isDirectory

> **isDirectory**: `boolean`

Defined in: [lib/zip.ts:449](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L449)

***

### isFile

> **isFile**: `boolean`

Defined in: [lib/zip.ts:448](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L448)

***

### name

> **name**: `string`

Defined in: [lib/zip.ts:444](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L444)

***

### path

> **path**: `string`

Defined in: [lib/zip.ts:450](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L450)

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [lib/zip.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L446)

lib/zip/interfaces/IZipMetadata.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipMetadata

# Interface: IZipMetadata

Defined in: [lib/zip.ts:491](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L491)

## Properties

### currentFile

> **currentFile**: `string` \| `null`

Defined in: [lib/zip.ts:493](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L493)

***

### percent

> **percent**: `number`

Defined in: [lib/zip.ts:492](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L492)

lib/zip/interfaces/IZipOutputByType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipOutputByType

# Interface: IZipOutputByType

Defined in: [lib/zip.ts:461](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L461)

## Properties

### array

> **array**: `number`[]

Defined in: [lib/zip.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L466)

***

### arraybuffer

> **arraybuffer**: `ArrayBuffer`

Defined in: [lib/zip.ts:468](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L468)

***

### base64

> **base64**: `string`

Defined in: [lib/zip.ts:462](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L462)

***

### binarystring

> **binarystring**: `string`

Defined in: [lib/zip.ts:465](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L465)

***

### blob

> **blob**: `Blob`

Defined in: [lib/zip.ts:469](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L469)

***

### nodebuffer

> **nodebuffer**: `Buffer`

Defined in: [lib/zip.ts:470](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L470)

***

### string

> **string**: `string`

Defined in: [lib/zip.ts:463](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L463)

***

### text

> **text**: `string`

Defined in: [lib/zip.ts:464](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L464)

***

### uint8array

> **uint8array**: `Uint8Array`

Defined in: [lib/zip.ts:467](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L467)

lib/zip/interfaces/IZipStats.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipStats

# Interface: IZipStats

Defined in: [lib/zip.ts:453](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L453)

## Properties

### compressedSize

> **compressedSize**: `number`

Defined in: [lib/zip.ts:454](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L454)

***

### date

> **date**: `Date`

Defined in: [lib/zip.ts:456](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L456)

***

### isDirectory

> **isDirectory**: `boolean`

Defined in: [lib/zip.ts:458](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L458)

***

### isFile

> **isFile**: `boolean`

Defined in: [lib/zip.ts:457](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L457)

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [lib/zip.ts:455](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L455)

lib/zip/type-aliases/TZipInputFileFormat.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / TZipInputFileFormat

# Type Alias: TZipInputFileFormat

> **TZipInputFileFormat** = [`IZipInputByType`](../interfaces/IZipInputByType.md)\[keyof [`IZipInputByType`](../interfaces/IZipInputByType.md)\]

Defined in: [lib/zip.ts:489](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L489)

lib/zip/type-aliases/TZipInputType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / TZipInputType

# Type Alias: TZipInputType

> **TZipInputType** = keyof [`IZipInputByType`](../interfaces/IZipInputByType.md)

Defined in: [lib/zip.ts:487](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L487)

lib/zip/type-aliases/TZipOutputType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / TZipOutputType

# Type Alias: TZipOutputType

> **TZipOutputType** = keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

Defined in: [lib/zip.ts:473](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L473)

lib/zlib/functions/brotliCompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / brotliCompress

# Function: brotliCompress()

> **brotliCompress**(`buffer`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:212](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L212)

Brotli 压缩一段

## Parameters

### buffer

`InputType`

段

### options?

`ZlibOptions` = `{}`

选项

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/functions/brotliDecompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / brotliDecompress

# Function: brotliDecompress()

> **brotliDecompress**(`buffer`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:230](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L230)

Brotli 解压一段

## Parameters

### buffer

`InputType`

段

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/functions/compress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / compress

# Function: compress()

> **compress**(`types`, `buffer`, `options?`): `Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

Defined in: [lib/zlib.ts:249](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L249)

根据 types 判断用什么加密的段

## Parameters

### types

`string`

用,间隔的字符串，如 gzip,deflate

### buffer

`InputType` \| `null`

段

### options?

`ZlibOptions`

选项

## Returns

`Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

lib/zlib/functions/createBrotliCompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createBrotliCompress

# Function: createBrotliCompress()

> **createBrotliCompress**(`options?`): `BrotliCompress`

Defined in: [lib/zlib.ts:57](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L57)

创建 Brotli 压缩对象

## Parameters

### options?

`ZlibOptions` = `{}`

选项

## Returns

`BrotliCompress`

lib/zlib/functions/createBrotliDecompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createBrotliDecompress

# Function: createBrotliDecompress()

> **createBrotliDecompress**(): `BrotliDecompress`

Defined in: [lib/zlib.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L65)

创建 Brotli 解压对象

## Returns

`BrotliDecompress`

lib/zlib/functions/createCompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createCompress

# Function: createCompress()

> **createCompress**(`types`, `options?`): [`ICompress`](../interfaces/ICompress.md) \| `null`

Defined in: [lib/zlib.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L74)

根据字符串创建压缩类型

## Parameters

### types

`string`

用 , 间隔的字符串，如 gzip,deflate

### options?

`ZlibOptions` = `{}`

选项

## Returns

[`ICompress`](../interfaces/ICompress.md) \| `null`

lib/zlib/functions/createDecompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createDecompress

# Function: createDecompress()

> **createDecompress**(`types`): [`ICompress`](../interfaces/ICompress.md) \| `null`

Defined in: [lib/zlib.ts:107](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L107)

根据字符串创建解压类型

## Parameters

### types

`string`

用 , 间隔的字符串，如 gzip, deflate

## Returns

[`ICompress`](../interfaces/ICompress.md) \| `null`

lib/zlib/functions/createDeflate.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createDeflate

# Function: createDeflate()

> **createDeflate**(`options?`): `Deflate`

Defined in: [lib/zlib.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L41)

创建 Deflate 对象

## Parameters

### options?

`ZlibOptions` = `{}`

选项

## Returns

`Deflate`

lib/zlib/functions/createGunzip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createGunzip

# Function: createGunzip()

> **createGunzip**(): `Gunzip`

Defined in: [lib/zlib.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L33)

创建 Gzip 解压对象

## Returns

`Gunzip`

lib/zlib/functions/createGzip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createGzip

# Function: createGzip()

> **createGzip**(`options?`): `Gzip`

Defined in: [lib/zlib.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L25)

创建 Gzip 对象

## Parameters

### options?

`ZlibOptions` = `{}`

选项

## Returns

`Gzip`

lib/zlib/functions/createInflate.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / createInflate

# Function: createInflate()

> **createInflate**(): `Inflate`

Defined in: [lib/zlib.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L49)

创建 Deflate 解压对象

## Returns

`Inflate`

lib/zlib/functions/decompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / decompress

# Function: decompress()

> **decompress**(`types`, `buffer`): `Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

Defined in: [lib/zlib.ts:290](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L290)

根据 types 判断用什么解密的段

## Parameters

### types

`string`

用,间隔的字符串，如 gzip,deflate

### buffer

`InputType` \| `null`

段

## Returns

`Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

lib/zlib/functions/deflate.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / deflate

# Function: deflate()

> **deflate**(`buffer`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:176](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L176)

Deflate 压缩一段

## Parameters

### buffer

`InputType`

段

### options?

`ZlibOptions` = `{}`

选项

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/functions/gunzip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / gunzip

# Function: gunzip()

> **gunzip**(`buffer`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L158)

Gzip 解压一段

## Parameters

### buffer

`InputType`

段

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/functions/gzip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / gzip

# Function: gzip()

> **gzip**(`buffer`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:140](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L140)

Gzip 压缩一段

## Parameters

### buffer

`InputType`

段

### options?

`ZlibOptions` = `{}`

选项

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/functions/inflate.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / inflate

# Function: inflate()

> **inflate**(`buffer`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L194)

Deflate 解压一段

## Parameters

### buffer

`InputType`

段

## Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

lib/zlib/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/zlib

# lib/zlib

## Interfaces

- [ICompress](interfaces/ICompress.md)
- [ICompressBuffer](interfaces/ICompressBuffer.md)

## Functions

- [brotliCompress](functions/brotliCompress.md)
- [brotliDecompress](functions/brotliDecompress.md)
- [compress](functions/compress.md)
- [createBrotliCompress](functions/createBrotliCompress.md)
- [createBrotliDecompress](functions/createBrotliDecompress.md)
- [createCompress](functions/createCompress.md)
- [createDecompress](functions/createDecompress.md)
- [createDeflate](functions/createDeflate.md)
- [createGunzip](functions/createGunzip.md)
- [createGzip](functions/createGzip.md)
- [createInflate](functions/createInflate.md)
- [decompress](functions/decompress.md)
- [deflate](functions/deflate.md)
- [gunzip](functions/gunzip.md)
- [gzip](functions/gzip.md)
- [inflate](functions/inflate.md)

lib/zlib/interfaces/ICompressBuffer.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / ICompressBuffer

# Interface: ICompressBuffer

Defined in: [lib/zlib.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L16)

某个压缩后的变量

## Properties

### buffer

> `readonly` **buffer**: `Buffer`

Defined in: [lib/zlib.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L18)

***

### type

> `readonly` **type**: `string`

Defined in: [lib/zlib.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L17)

lib/zlib/interfaces/ICompress.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / ICompress

# Interface: ICompress

Defined in: [lib/zlib.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L9)

某个压缩对象

## Properties

### compress

> `readonly` **compress**: `BrotliCompress` \| `BrotliDecompress` \| `Gzip` \| `Gunzip` \| `Deflate` \| `Inflate`

Defined in: [lib/zlib.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L11)

***

### type

> `readonly` **type**: `string`

Defined in: [lib/zlib.ts:10](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L10)

main/index.md
---

[**Documents for @maiyunnet/kebab**](../index.md)

***

[Documents for @maiyunnet/kebab](../index.md) / main

# main

sys/ctr/classes/Ctr.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / Ctr

# Class: Ctr

Defined in: [sys/ctr.ts:44](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L44)

## Constructors

### Constructor

> **new Ctr**(`config`, `req`, `res?`): `Ctr`

Defined in: [sys/ctr.ts:106](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L106)

#### Parameters

##### config

[`IConfig`](../../../index/interfaces/IConfig.md)

##### req

`IncomingMessage` \| `Http2ServerRequest`

##### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### Returns

`Ctr`

## Properties

### \_action

> `protected` **\_action**: `string` = `''`

Defined in: [sys/ctr.ts:50](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L50)

当前的 action 名

***

### \_cacheTTL

> `protected` **\_cacheTTL**: `number`

Defined in: [sys/ctr.ts:80](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L80)

页面浏览器客户端缓存（单位：秒）

***

### \_config

> `protected` `readonly` **\_config**: [`IConfig`](../../../index/interfaces/IConfig.md)

Defined in: [sys/ctr.ts:92](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L92)

vhost 的 kebab.json 以及全局常量

***

### \_cookie

> `protected` **\_cookie**: `Record`\<`string`, `string`\> = `{}`

Defined in: [sys/ctr.ts:71](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L71)

Cookie 数组

***

### \_files

> `protected` **\_files**: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\> = `{}`

Defined in: [sys/ctr.ts:68](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L68)

上传的文件列表

***

### \_get

> `protected` **\_get**: `Record`\<`string`, `string`\>

Defined in: [sys/ctr.ts:56](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L56)

GET 数据

***

### \_headers

> `protected` **\_headers**: `IncomingHttpHeaders` = `{}`

Defined in: [sys/ctr.ts:53](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L53)

请求的 header 列表，key 均为小写

***

### \_httpCode

> `protected` **\_httpCode**: `number` = `0`

Defined in: [sys/ctr.ts:86](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L86)

自定义 http code

***

### \_input

> `protected` **\_input**: `string` = `''`

Defined in: [sys/ctr.ts:65](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L65)

原始 input 字符串

***

### \_locale

> `protected` **\_locale**: `string` = `'en'`

Defined in: [sys/ctr.ts:89](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L89)

当前语言名

***

### \_localeData

> `protected` **\_localeData**: `Record`\<`string`, `Record`\<`string`, `string`\>\> = `{}`

Defined in: [sys/ctr.ts:104](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L104)

本 ctr 的 locale data

***

### \_localeFiles

> `protected` **\_localeFiles**: `string`[] = `[]`

Defined in: [sys/ctr.ts:101](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L101)

本 ctr 已加载的语言文件列表

***

### \_param

> `protected` **\_param**: `string`[] = `[]`

Defined in: [sys/ctr.ts:47](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L47)

路由参数序列数组

***

### \_post

> `protected` **\_post**: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

Defined in: [sys/ctr.ts:62](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L62)

POST 数据

***

### \_rawPost

> `protected` **\_rawPost**: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

Defined in: [sys/ctr.ts:59](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L59)

原始 POST 数据

***

### \_req

> `protected` `readonly` **\_req**: `IncomingMessage` \| `Http2ServerRequest`

Defined in: [sys/ctr.ts:94](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L94)

***

### \_res

> `protected` `readonly` **\_res**: `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

Defined in: [sys/ctr.ts:96](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L96)

***

### \_sess

> `protected` **\_sess**: [`Session`](../../../lib/session/classes/Session.md) \| `null` = `null`

Defined in: [sys/ctr.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L77)

Session --- 对象

***

### \_session

> `protected` **\_session**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/ctr.ts:74](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L74)

Session 数组

***

### \_socket

> `protected` `readonly` **\_socket**: [`Socket`](../../../lib/ws/classes/Socket.md)

Defined in: [sys/ctr.ts:98](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L98)

***

### \_timer?

> `protected` `optional` **\_timer?**: `object`

Defined in: [sys/ctr.ts:125](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L125)

timeout 的 timer

#### callback

> **callback**: () => `void`

##### Returns

`void`

#### timeout

> **timeout**: `number`

#### timer

> **timer**: `Timeout`

***

### \_xsrf

> `protected` **\_xsrf**: `string` = `''`

Defined in: [sys/ctr.ts:83](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L83)

XSRF TOKEN 值

## Accessors

### \_isAvail

#### Get Signature

> **get** `protected` **\_isAvail**(): `boolean`

Defined in: [sys/ctr.ts:120](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L120)

当前用户连接是否还在连接中

##### Returns

`boolean`

***

### timeout

#### Get Signature

> **get** **timeout**(): `number`

Defined in: [sys/ctr.ts:132](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L132)

获取当前过期时间（毫秒）

##### Returns

`number`

#### Set Signature

> **set** **timeout**(`num`): `void`

Defined in: [sys/ctr.ts:139](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L139)

设置当前过期时间（毫秒）

##### Parameters

###### num

`number`

##### Returns

`void`

## Methods

### \_asyncTask()

> `protected` **\_asyncTask**(`func`): `void`

Defined in: [sys/ctr.ts:173](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L173)

执行一段跳出堆栈的异步代码，代码执行完成前，热更新不会杀死当面进程 且 ftmp 临时文件不会被清除

#### Parameters

##### func

() => `void` \| `Promise`\<`void`\>

异步代码

#### Returns

`void`

***

### \_checkInput()

> `protected` **\_checkInput**(`input`, `rule`, `rtn`): `boolean`

Defined in: [sys/ctr.ts:571](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L571)

检测提交的数据类型

#### Parameters

##### input

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

要校验的输入项

##### rule

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)[]\>

规则, int, double, num(可字符串), array, bool, string, ascii

##### rtn

`any`[]

返回值

#### Returns

`boolean`

***

### \_checkXInput()

> `protected` **\_checkXInput**(`input`, `rule`, `rtn`): `boolean`

Defined in: [sys/ctr.ts:749](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L749)

检测提交的数据类型（会检测 XSRF）

#### Parameters

##### input

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

要校验的输入项

##### rule

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)[]\>

规则, int, double, num(可字符串), array, bool, string, ascii

##### rtn

`any`[]

返回值

#### Returns

`boolean`

***

### \_cross()

> `protected` **\_cross**(`opt?`): `boolean`

Defined in: [sys/ctr.ts:978](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L978)

开启跨域请求

#### Parameters

##### opt?

可选 CORS 配置
返回 true 接续执行，返回 false 需要中断用户本次访问（options 请求）

###### credentials?

`boolean`

是否允许发送凭据（cookie），默认 false

###### headers?

`string`

允许的请求头

###### methods?

`string`

允许的方法

###### origins?

`string`[]

允许的来源列表，留空为 '*'

#### Returns

`boolean`

***

### \_device()

> `protected` **\_device**(): `"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

Defined in: [sys/ctr.ts:791](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L791)

根据用户 ua 获取当前用户的设备类型

#### Returns

`"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

***

### \_enabledXsrf()

> `protected` **\_enabledXsrf**(`opt?`): `void`

Defined in: [sys/ctr.ts:760](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L760)

当前页面开启 XSRF 支持（主要检测 cookie 是否存在）
如果当前页面有 CDN，请不要使用

#### Parameters

##### opt?

###### domain?

`string`

#### Returns

`void`

***

### \_end()

> `protected` **\_end**(): `void`

Defined in: [sys/ctr.ts:1086](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1086)

主动关闭当前 socket 连接

#### Returns

`void`

***

### \_getBasicAuth()

> `protected` **\_getBasicAuth**(`user`, `pwd`): `string`

Defined in: [sys/ctr.ts:784](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L784)

获取 Auth 字符串，用于客户端提交

#### Parameters

##### user

`string`

用户名

##### pwd

`string`

密码

#### Returns

`string`

***

### \_getLocale()

> `protected` **\_getLocale**(): `string`

Defined in: [sys/ctr.ts:969](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L969)

获取当前语言名

#### Returns

`string`

***

### \_getLocaleJsonString()

> `protected` **\_getLocaleJsonString**(): `string`

Defined in: [sys/ctr.ts:957](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L957)

根据当前后台语言包设置情况获取 JSON 字符串传输到前台

#### Returns

`string`

string

***

### \_getMemoryUsage()

> `protected` **\_getMemoryUsage**(): `number`

Defined in: [sys/ctr.ts:323](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L323)

获取截止当前内存的使用情况

#### Returns

`number`

***

### \_getRunTime()

> `protected` **\_getRunTime**(`ms?`): `number`

Defined in: [sys/ctr.ts:315](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L315)

获取截止当前时间的总运行时间

#### Parameters

##### ms?

`boolean` = `false`

为 true 为毫秒，否则为秒

#### Returns

`number`

***

### \_handleFormData()

> `protected` **\_handleFormData**(`events?`, `limits?`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:1095](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1095)

获取 formdata 的信息

#### Parameters

##### events?

文件处理情况

###### onfiledata?

(`chunk`) => `void`

###### onfileend?

() => `void`

###### onfilestart?

(`name`) => `boolean` \| `undefined`

##### limits?

上传限制

###### allowedExts?

`string`[]

允许的文件扩展名（含点号），如 ['.jpg', '.png', '.pdf']

###### maxFileSize?

`number`

单个文件最大字节数

#### Returns

`Promise`\<`boolean`\>

***

### \_l()

> **\_l**(`key`, `data?`): `string`

Defined in: [sys/ctr.ts:1021](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1021)

获取语言包值

#### Parameters

##### key

`string`

##### data?

`string`[]

要替换的数据

#### Returns

`string`

***

### \_loadData()

> `protected` **\_loadData**(`path`): `Promise`\<`Record`\<`string`, `string`\> \| `null`\>

Defined in: [sys/ctr.ts:860](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L860)

获取 data 数据

#### Parameters

##### path

`string`

文件路径（不含扩展名）

#### Returns

`Promise`\<`Record`\<`string`, `string`\> \| `null`\>

***

### \_loadLocale()

> `protected` **\_loadLocale**(`loc`, `pkg?`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:908](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L908)

设定语言并加载语言包

#### Parameters

##### loc

`string`

要加载的目标语言

##### pkg?

`string` = `'default'`

包名，为空自动填充为 default

#### Returns

`Promise`\<`boolean`\>

***

### \_loadReactPage()

> `protected` **\_loadReactPage**(`path`, `props?`, `opt?`): `Promise`\<`string`\>

Defined in: [sys/ctr.ts:359](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L359)

加载 React 全页面进行 SSR 渲染，组件需渲染完整 HTML 文档（含 html/head/body），无需 EJS
框架自动注入 props：_urlBase/_urlFull/_urlStc/_staticVer/_staticPath/_staticPathFull
多语言：自动注入 _locale（当前语言名）和 _localeData（已载语言包的合并键值对）
组件内创建：const l = (key: string, ...args: string[]): string => { let i = 0; return (_localeData[key] ?? key).replace(/\?/g, () => args[i++] ?? ''); };

#### Parameters

##### path

`string`

页面组件路径（相对于 stc/ 目录，不含扩展名，tsx 编译后的 .js）

##### props?

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

传入组件的 props，框架常量自动合并，整体序列化为内联 JSON 供客户端水合复用

##### opt?

可选配置

###### hydrate?

`boolean`

是否注入客户端水合脚本（import map + hydrateRoot），默认 true

###### reactVer?

`string`

react/react-dom/react-router-dom 版本号，用于 esm.sh CDN，默认 19

###### router?

`"browser"`

路由模式，不传则不注入任何 Router，组件自行管理路由（如 MemoryRouter）或无路由
'browser'：服务端用 StaticRouter，客户端用 BrowserRouter，地址栏与路由联动
组件本身只需使用 Routes/Route/Link 等，不要包含任何 Router 包裹层

###### routerBase?

`string`

BrowserRouter 的 basename，相对于 urlBase，默认空字符串
例如组件挂载在 /test/react-router-page，则填 'test/react-router-page'

###### staticPath?

`string`

静态资源基础路径，覆盖 config.set.staticPath，用于指定 CDN 或自定义路径
影响 _staticPath prop 以及水合脚本中 JS 文件的 URL 前缀

#### Returns

`Promise`\<`string`\>

***

### \_loadView()

> `protected` **\_loadView**(`path`, `data?`): `Promise`\<`string`\>

Defined in: [sys/ctr.ts:332](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L332)

加载视图

#### Parameters

##### path

`string`

##### data?

`any` = `{}`

#### Returns

`Promise`\<`string`\>

***

### \_location()

> `protected` **\_location**(`location`): `false`

Defined in: [sys/ctr.ts:878](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L878)

跳转（302临时跳转），支持相对本项目根路径的路径或绝对路径

#### Parameters

##### location

`string`

相对或绝对网址

#### Returns

`false`

***

### \_ping()

> `protected` **\_ping**(`data?`): `boolean`

Defined in: [sys/ctr.ts:1071](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1071)

发送 socket ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

要发送的信息

#### Returns

`boolean`

***

### \_pong()

> `protected` **\_pong**(`data?`): `boolean`

Defined in: [sys/ctr.ts:1079](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1079)

发送 socket pong

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

要发送的信息

#### Returns

`boolean`

***

### \_startSession()

> `protected` **\_startSession**(`link`, `auth?`, `opt?`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:892](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L892)

开启 Session

#### Parameters

##### link

[`Pool`](../../../lib/db/pool/classes/Pool.md) \| [`Kv`](../../../lib/kv/classes/Kv.md)

Kv 或 Db 实例

##### auth?

`boolean` = `false`

设为 true 则从头 Authorization 或 post _auth 值读取 token

##### opt?

[`IOptions`](../../../lib/session/interfaces/IOptions.md) = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

***

### \_writeBinary()

> `protected` **\_writeBinary**(`data`): `boolean`

Defined in: [sys/ctr.ts:1063](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1063)

发送 socket 二进制

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

要发送的信息

#### Returns

`boolean`

***

### \_writeResult()

> `protected` **\_writeResult**(`data`): `boolean`

Defined in: [sys/ctr.ts:1055](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1055)

发送结果对象文本

#### Parameters

##### data

`any`

要发送的结果对象，如 [0, 'Failed.']

#### Returns

`boolean`

***

### \_writeText()

> `protected` **\_writeText**(`data`): `boolean`

Defined in: [sys/ctr.ts:1047](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1047)

发送 socket 文本

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

要发送的信息

#### Returns

`boolean`

***

### getAuthorization()

> **getAuthorization**(): `false` \| \{ `pwd`: `string`; `type`: `"basic"`; `user`: `string`; \} \| \{ `token`: `string`; `type`: `"bearer"`; \}

Defined in: [sys/ctr.ts:812](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L812)

通过 header 或 _auth 获取鉴权信息，支持 Basic Auth 和 Bearer Token

#### Returns

`false` \| \{ `pwd`: `string`; `type`: `"basic"`; `user`: `string`; \} \| \{ `token`: `string`; `type`: `"bearer"`; \}

***

### getPrototype()

#### Call Signature

> **getPrototype**(`name`): [`IConfig`](../../../index/interfaces/IConfig.md)

Defined in: [sys/ctr.ts:197](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L197)

获取类内部的 prototype

##### Parameters

###### name

`"_config"`

##### Returns

[`IConfig`](../../../index/interfaces/IConfig.md)

#### Call Signature

> **getPrototype**(`name`): [`Session`](../../../lib/session/classes/Session.md) \| `null`

Defined in: [sys/ctr.ts:198](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L198)

获取类内部的 prototype

##### Parameters

###### name

`"_sess"`

##### Returns

[`Session`](../../../lib/session/classes/Session.md) \| `null`

#### Call Signature

> **getPrototype**(`name`): `IncomingHttpHeaders`

Defined in: [sys/ctr.ts:199](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L199)

获取类内部的 prototype

##### Parameters

###### name

`"_headers"`

##### Returns

`IncomingHttpHeaders`

#### Call Signature

> **getPrototype**(`name`): `IncomingMessage` \| `Http2ServerRequest`

Defined in: [sys/ctr.ts:200](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L200)

获取类内部的 prototype

##### Parameters

###### name

`"_req"`

##### Returns

`IncomingMessage` \| `Http2ServerRequest`

#### Call Signature

> **getPrototype**(`name`): `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

Defined in: [sys/ctr.ts:201](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L201)

获取类内部的 prototype

##### Parameters

###### name

`"_res"`

##### Returns

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### Call Signature

> **getPrototype**(`name`): [`Socket`](../../../lib/ws/classes/Socket.md)

Defined in: [sys/ctr.ts:202](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L202)

获取类内部的 prototype

##### Parameters

###### name

`"_socket"`

##### Returns

[`Socket`](../../../lib/ws/classes/Socket.md)

#### Call Signature

> **getPrototype**(`name`): `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

Defined in: [sys/ctr.ts:203](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L203)

获取类内部的 prototype

##### Parameters

###### name

`"_get"` \| `"_rawPost"` \| `"_post"` \| `"_session"`

##### Returns

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

#### Call Signature

> **getPrototype**(`name`): `string`

Defined in: [sys/ctr.ts:204](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L204)

获取类内部的 prototype

##### Parameters

###### name

`"_input"`

##### Returns

`string`

#### Call Signature

> **getPrototype**(`name`): `any`

Defined in: [sys/ctr.ts:205](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L205)

获取类内部的 prototype

##### Parameters

###### name

`string`

##### Returns

`any`

***

### onClose()

> **onClose**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:299](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L299)

WebSocket 下连接被终止后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onData()

> **onData**(`data`, `opcode`): `any`

Defined in: [sys/ctr.ts:264](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L264)

WebSocket 下当收到数据时会自动被调用的事件，即只文本和二进制数据，返回内容会被发送给 socket

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\>

数据

##### opcode

[`EOpcode`](../../../lib/ws/enumerations/EOpcode.md)

操作码

#### Returns

`any`

返回内容会被发送给 socket；若返回 false 则连接会被中断；不返回则不发送任何内容

***

### onDrain()

> **onDrain**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:285](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L285)

WebSocket 下连接恢复可写入状态后会调用此事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onEnd()

> **onEnd**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:292](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L292)

WebSocket 下连接被 end 后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onLoad()

> **onLoad**(): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:223](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L223)

实例化后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

返回 true 或 undefined 则继续执行 onReady，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）

***

### onMessage()

> **onMessage**(`data`, `opcode`): `boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

Defined in: [sys/ctr.ts:276](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L276)

包含所有 opcode 的消息，若要发送数据需自行调用 write 方法，data 恒定为原始 buffer
返回 false 则不会执行默认方法，一般请什么都不要返回
返回 false 链接也不会中断

#### Parameters

##### data

`Buffer`

数据

##### opcode

[`EOpcode`](../../../lib/ws/enumerations/EOpcode.md)

opcode

#### Returns

`boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

***

### onReady()

> **onReady**(): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:232](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L232)

onLoad 执行后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

返回 true 或 undefined 则继续执行 action，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）

***

### onReqStart()

> **onReqStart**(): `number` \| `Promise`\<`number`\>

Defined in: [sys/ctr.ts:307](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L307)

请求发送开始时调用（仅会在 middle 内触发）

#### Returns

`number` \| `Promise`\<`number`\>

1-自动处理 POST (默认)，0-框架不自动处理 POST，-1-流程中断 (通常用于代理/反代场景)

***

### onUnload()

> **onUnload**(`rtn`): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:242](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L242)

整个结束前会执行本方法，可重写此方法对输出结果再处理一次（Websocket 模式无效）

#### Parameters

##### rtn

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]

之前用户的输出结果

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

处理后的输出结果，将作为最终发送给客户端的内容

***

### onUpgrade()

> **onUpgrade**(): `object`

Defined in: [sys/ctr.ts:251](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L251)

WebSocket 下在建立 Server 连接之前可对 WebSocket 的信息进行配置

#### Returns

`object`

WebSocket 配置参数，包含自定义 header 和超时时间

##### headers?

> `optional` **headers?**: `OutgoingHttpHeaders`

##### timeout?

> `optional` **timeout?**: `number`

***

### setPrototype()

> **setPrototype**(`name`, `val`): `void`

Defined in: [sys/ctr.ts:211](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L211)

设置类内部的 prototype

#### Parameters

##### name

`string`

##### val

`string` \| `string`[] \| `Record`\<`string`, `any`\> \| `IncomingHttpHeaders` \| [`Session`](../../../lib/session/classes/Session.md) \| [`Socket`](../../../lib/ws/classes/Socket.md) \| `null`

#### Returns

`void`

sys/ctr/functions/clearLocaleData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / clearLocaleData

# Function: clearLocaleData()

> **clearLocaleData**(): `void`

Defined in: [sys/ctr.ts:38](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L38)

清除已经加载的 data 与语言包文件缓存

## Returns

`void`

sys/ctr/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / sys/ctr

# sys/ctr

## Classes

- [Ctr](classes/Ctr.md)

## Functions

- [clearLocaleData](functions/clearLocaleData.md)

sys/mod/classes/default.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / default

# Class: default

Defined in: [sys/mod.ts:65](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L65)

开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`;

## Constructors

### Constructor

> **new default**(`opt`): `Mod`

Defined in: [sys/mod.ts:116](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L116)

构造函数

#### Parameters

##### opt

选项

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### index?

`string` \| `string`[]

框架会自动去重

###### pre?

`string`

MySQL 表前缀或 PostgreSQL Schema 名，优先级：选项 > 类属性 > 配置

###### row?

`Record`\<`string`, `any`\>

###### select?

`string` \| `string`[]

###### where?

`any`

#### Returns

`Mod`

## Properties

### \_contain

> `protected` **\_contain**: \{ `key`: `string`; `list`: `string`[]; \} \| `null` = `null`

Defined in: [sys/mod.ts:92](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L92)

必须追加的数据筛选 key 与 values，仅单表模式有效

***

### \_ctr?

> `protected` `optional` **\_ctr?**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

Defined in: [sys/mod.ts:107](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L107)

ctr 对象

***

### \_data

> `protected` **\_data**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/mod.ts:86](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L86)

模型获取的属性

***

### \_db

> `protected` **\_db**: [`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

Defined in: [sys/mod.ts:101](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L101)

数据库连接对象

***

### \_fieldPrefix

> `protected` **\_fieldPrefix**: `string` = `''`

Defined in: [sys/mod.ts:110](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L110)

主表筛选前缀，优先 alias，其次表名

***

### \_index

> `protected` **\_index**: `string`[] \| `null` = `null`

Defined in: [sys/mod.ts:89](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L89)

当前选择的分表 _ 后缀，多个代表联查

***

### \_sql

> `protected` **\_sql**: [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:104](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L104)

Sql 对象

***

### \_total

> `protected` **\_total**: `number`[] = `[]`

Defined in: [sys/mod.ts:98](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L98)

已算出的 total

***

### \_updates

> `protected` **\_updates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:83](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L83)

要 update 的内容

***

### \_$index

> `protected` `static` **\_$index**: `string` = `''`

Defined in: [sys/mod.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L77)

若使用 _$key 并且有多个 unique 索引，这里指定 _$key 的索引名

***

### \_$key

> `protected` `static` **\_$key**: `string` = `''`

Defined in: [sys/mod.ts:74](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L74)

设置后将由 _keyGenerator 函数生成唯一字段

***

### \_$pre?

> `protected` `static` `optional` **\_$pre?**: `string`

Defined in: [sys/mod.ts:80](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L80)

前缀，MySQL 时为表前缀（如 prefix_），PostgreSQL 时为 Schema 名。顺序：选项前缀 -> 本前缀 -> 配置文件前缀

***

### \_$primary

> `protected` `static` **\_$primary**: `string` = `'id'`

Defined in: [sys/mod.ts:71](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L71)

主键字段名

***

### \_$table

> `protected` `static` **\_$table**: `string` = `''`

Defined in: [sys/mod.ts:68](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L68)

表名

## Methods

### \_keyGenerator()

> `protected` **\_keyGenerator**(): `string`

Defined in: [sys/mod.ts:1785](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1785)

当 _key 不为空时，则依据继承此方法的方法自动生成填充 key

#### Returns

`string`

***

### all()

获取列表

#### Param

是否以某个字段为主键

#### Call Signature

> **all**(): `Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

Defined in: [sys/mod.ts:1127](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1127)

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

Defined in: [sys/mod.ts:1128](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1128)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

***

### allArray()

获取列表（得到的为原生对象或数组，不是模型）

#### Param

是否以某个字段为主键

#### Call Signature

> **allArray**(): `Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

Defined in: [sys/mod.ts:1306](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1306)

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

Defined in: [sys/mod.ts:1307](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1307)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

***

### append()

> **append**(`sql`): `this`

Defined in: [sys/mod.ts:1694](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1694)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [sys/mod.ts:1650](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1650)

ORDER BY

#### Parameters

##### c

`string` \| (`string` \| `string`[])[]

字段字符串或数组

##### d?

`"DESC"` \| `"ASC"`

排序规则

#### Returns

`this`

***

### contain()

> **contain**(`contain`): `this`

Defined in: [sys/mod.ts:1703](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1703)

设置闭包含数据

#### Parameters

##### contain

设置项

###### key

`string`

###### list

`string`[]

#### Returns

`this`

***

### count()

> **count**(): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1514](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1514)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1535](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1535)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:821](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L821)

创建数据

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-报错,null-唯一键非 _$key 键冲突

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1610](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1610)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### explain()

获取数查询（SELECT）扫描情况，获取字符串或对象

#### Param

是否获取完全的情况，默认不获取，只返回扫描情况

#### Call Signature

> **explain**(`all?`): `Promise`\<`string` \| `false`\>

Defined in: [sys/mod.ts:1432](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1432)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1433](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1433)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1628](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1628)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### first()

获取数据库第一个对象

#### Param

是否加锁

#### Param

是否返回原生对象

#### Call Signature

> **first**(`lock`, `array`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1016](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1016)

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1020](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1020)

##### Parameters

###### lock?

`boolean`

###### array?

`false`

##### Returns

`Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

***

### firstArray()

> **firstArray**(`lock?`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1060](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1060)

获取数据库第一个原生对象

#### Parameters

##### lock?

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [sys/mod.ts:1730](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1730)

获取带 data 的 sql 语句

#### Parameters

##### sql?

`string`

sql 语句

##### data?

`any`[]

数据

#### Returns

`string`

***

### fullJoin()

> **fullJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1598](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1598)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### get()

> **get**(`n`): `any`

Defined in: [sys/mod.ts:813](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L813)

获取一个字段值

#### Parameters

##### n

`string`

字段名

#### Returns

`any`

***

### getData()

> **getData**(): `any`[]

Defined in: [sys/mod.ts:1721](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1721)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:1714](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1714)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1659](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1659)

GROUP BY

#### Parameters

##### c

`string` \| `string`[]

字段字符串或数组

#### Returns

`this`

***

### having()

> **having**(`s`): `this`

Defined in: [sys/mod.ts:1619](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1619)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1586](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1586)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### join()

> **join**(`f`, `s?`, `type?`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1550](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1550)

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### type?

`string` = `'INNER'`

类型

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### langText()

> **langText**(`col`, `lang`): `string`

Defined in: [sys/mod.ts:1765](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1765)

获取字段的可用语种文本

#### Parameters

##### col

`string`

字段名

##### lang

`string`

当前请求语种，如 sc

#### Returns

`string`

***

### leftJoin()

> **leftJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1562](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1562)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b?`): `this`

Defined in: [sys/mod.ts:1672](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1672)

LIMIT

#### Parameters

##### a

`number`

起始

##### b?

`number` = `0`

长度

#### Returns

`this`

***

### page()

> **page**(`count`, `page?`): `this`

Defined in: [sys/mod.ts:1683](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1683)

分页

#### Parameters

##### count

`number`

每页条数

##### page?

`number` = `1`

当前页数

#### Returns

`this`

***

### refresh()

> **refresh**(`lock?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:941](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L941)

刷新当前模型获取最新数据

#### Parameters

##### lock?

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:998](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L998)

移除本条目

#### Returns

`Promise`\<`boolean`\>

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1574](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1574)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### save()

> **save**(`where?`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:969](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L969)

更新 set 的数据到数据库，有未保存数据时才保存

#### Parameters

##### where?

`any`

自定义筛选条件，默认根据主键筛选

#### Returns

`Promise`\<`boolean`\>

***

### set()

设置一个/多个属性，值为 undefined 则不会被更新

#### Param

字符串或键/值

#### Param

可能是数字

#### Call Signature

> **set**\<`T`, `TK`\>(`n`): `void`

Defined in: [sys/mod.ts:774](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L774)

##### Type Parameters

###### T

`T` *extends* `Mod`

###### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### n

`Record`\<`TK`, `T`\[`TK`\] \| `undefined`\>

##### Returns

`void`

#### Call Signature

> **set**\<`T`, `TK`\>(`n`, `v`): `void`

Defined in: [sys/mod.ts:775](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L775)

##### Type Parameters

###### T

`T` *extends* `Mod`

###### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### n

`TK`

###### v

`T`\[`TK`\]

##### Returns

`void`

***

### toArray()

> **toArray**\<`TC`\>(): [`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:1737](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1737)

获取值对象，获取的是新创建的数组

#### Type Parameters

##### TC

`TC` *extends* (...`args`) => `any`

#### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

***

### total()

> **total**(`f?`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1490](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1490)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f?

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### union()

> **union**(`f`, `type?`): `this`

Defined in: [sys/mod.ts:1071](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1071)

联合查询表数据

#### Parameters

##### f

`string` \| `string`[] \| [`Sql`](../../../lib/sql/classes/Sql.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

要联合查询的表列表、单个表、sql 对象

##### type?

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`f`): `this`

Defined in: [sys/mod.ts:1101](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1101)

所有联合查询表数据

#### Parameters

##### f

`string` \| `string`[] \| [`Sql`](../../../lib/sql/classes/Sql.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

要联合查询的表列表、单个表、sql 对象

#### Returns

`this`

***

### unsaved()

> **unsaved**(): `boolean`

Defined in: [sys/mod.ts:1756](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1756)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:1745](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1745)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:911](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L911)

插入数据，如果存在则更新（UPSERT）

#### Parameters

##### conflict

`string` \| `string`[]

冲突字段，不能为 _$key 或 _$primary，应该是你要判断的唯一索引字段

#### Returns

`Promise`\<`boolean`\>

***

### where()

> **where**(`s`): `this`

Defined in: [sys/mod.ts:1639](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1639)

是 filter 的别名

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### column()

> `static` **column**(`field`): `object`

Defined in: [sys/mod.ts:175](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L175)

创建字段对象

#### Parameters

##### field

`string`

#### Returns

`object`

##### token

> **token**: `string`

##### type

> **type**: `"column"`

##### value

> **value**: `string`

***

### find()

> `static` **find**\<`T`\>(`db`, `val`, `opt?`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:597](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L597)

根据主键（或 key 字段）获取对象

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### val

`string` \| `number` \| `null`

主键值

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### key?

`boolean`

通过 key 字段获取，默认为 false，即从主键获取

###### lock?

`boolean`

###### pre?

`string`

#### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### getCreate()

> `static` **getCreate**\<`T`\>(`db`, `opt?`): `T`

Defined in: [sys/mod.ts:579](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L579)

获取创建对象，通常用于新建数据库条目

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`T`

***

### insert()

> `static` **insert**(`db`, `cs`, `vs?`, `opt?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:204](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L204)

添加一个序列（允许超过 65536 的占位符会被拆分多次执行）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### cs

`string`[] \| `Record`\<`string`, `any`\>

字段列表

##### vs?

`any`[] \| `any`[][]

数据列表

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### ignore?

`boolean`

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### insertSql()

> `static` **insertSql**(`db`, `cs`, `vs?`, `opt?`): `string`

Defined in: [sys/mod.ts:264](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L264)

获取添加一个序列的模拟 SQL

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### cs

`string`[] \| `Record`\<`string`, `any`\>

字段列表

##### vs?

`any`[] \| `any`[][]

数据列表

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### ignore?

`boolean`

###### index?

`string`

###### pre?

`string`

#### Returns

`string`

***

### json()

> `static` **json**(`obj`): `any`

Defined in: [sys/mod.ts:193](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L193)

创建 JSON 字符串对象，用于 PGSQL 的 jsonb 字段

#### Parameters

##### obj

`any`

#### Returns

`any`

***

### one()

通过 where 条件筛选单条数据

#### Param

数据库对象

#### Param

筛选条件数组或字符串

#### Param

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名；lock 需确保 where 条件命中索引，否则可能退化为表锁）

#### Call Signature

> `static` **one**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:624](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L624)

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

###### array

`true`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> `static` **one**\<`T`\>(`db`, `s`, `opt?`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:637](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L637)

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt?

###### array?

`false`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### oneArray()

> `static` **oneArray**(`db`, `s`, `opt?`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:714](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L714)

通过 where 条件筛选单条数据返回原生对象

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### s

`any`

筛选条件数组或字符串

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### primarys()

> `static` **primarys**(`db`, `where?`, `opt?`): `Promise`\<`false` \| `any`[]\>

Defined in: [sys/mod.ts:735](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L735)

根据 where 条件获取主键值列表

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where?

`any` = `''`

where 条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`false` \| `any`[]\>

***

### removeByWhere()

> `static` **removeByWhere**(`db`, `where`, `opt?`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:290](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L290)

根据条件移除条目

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

`Promise`\<`number` \| `false` \| `null`\>

***

### removeByWhereSql()

> `static` **removeByWhereSql**(`db`, `where`, `opt?`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:334](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L334)

根据条件移除条目（仅获取 SQL 对象）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

[`Sql`](../../../lib/sql/classes/Sql.md)

***

### select()

> `static` **select**\<`T`\>(`db`, `c`, `opt?`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:520](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L520)

select 自定字段

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### c

`string` \| `string`[]

字段字符串或字段数组

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T` & `Record`\<`string`, `any`\>

***

### toArrayByRecord()

> `static` **toArrayByRecord**\<`T`\>(`obj`): `Record`\<`string`, `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:762](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L762)

将 key val 组成的数据列表转换为原生对象模式，获取的是新创建的数组

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### obj

`Record`\<`string`, `T`\>

要转换的 kv 数据列表

#### Returns

`Record`\<`string`, `Record`\<`string`, `any`\>\>

***

### updateByWhere()

> `static` **updateByWhere**(`db`, `data`, `where`, `opt?`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:367](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L367)

根据条件更新数据

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

`Promise`\<`number` \| `false` \| `null`\>

***

### updateByWhereSql()

> `static` **updateByWhereSql**(`db`, `data`, `where`, `opt?`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:413](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L413)

根据条件更新数据（仅获取 SQL 对象）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

[`Sql`](../../../lib/sql/classes/Sql.md)

***

### updateList()

> `static` **updateList**(`db`, `data`, `key`, `opt?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:450](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L450)

批量更新数据

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### data

`Record`\<`string`, `any`\>[]

数据列表，每个元素必须包含 key 字段，其余字段为要更新的列；
            支持稀疏数据（不同元素可以拥有不同的列集合），内部会自动按列集合分组批量执行

##### key

`string`

用于定位待更新记录的字段名，通常为主键或唯一键，至少必须建立索引；
           该参数是字段名而不是索引名，仅参与 ON / WHERE 条件匹配，不会被更新；
           data 中每个元素都必须包含此字段，否则该元素会被跳过

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名；opt.batchSize: 每批更新条数）

###### batchSize?

`number`

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### value()

> `static` **value**(`val`): `object`

Defined in: [sys/mod.ts:184](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L184)

创建字面量值对象，用于 where 条件中 v[0] 需要是值而非字段名的场景

#### Parameters

##### val

[`DbValue`](../../../index/type-aliases/DbValue.md)

#### Returns

`object`

##### token

> **token**: `string`

##### type

> **type**: `"value"`

##### value

> **value**: [`DbValue`](../../../index/type-aliases/DbValue.md)

***

### where()

> `static` **where**\<`T`\>(`db`, `s?`, `opt?`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:550](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L550)

通过 where 条件获取模型

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### s?

`any` = `''`

筛选条件数组或字符串

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T` & `Record`\<`string`, `any`\>

sys/mod/classes/Rows.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / Rows

# Class: Rows\<T\>

Defined in: [sys/mod.ts:19](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L19)

条数列表

## Type Parameters

### T

`T` *extends* [`default`](default.md)

## Implements

- [`IRows`](../interfaces/IRows.md)\<`T`\>

## Constructors

### Constructor

> **new Rows**\<`T`\>(`initialItems?`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:23](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L23)

#### Parameters

##### initialItems?

`T`[] = `[]`

#### Returns

`Rows`\<`T`\>

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [sys/mod.ts:28](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L28)

总行数

##### Returns

`number`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`length`](../interfaces/IRows.md#length)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`T`\>

Defined in: [sys/mod.ts:57](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L57)

for of

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

`IRows.[iterator]`

***

### filter()

> **filter**(`predicate`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:43](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L43)

根据规则筛掉项，predicate 返回 true 代表保留

#### Parameters

##### predicate

(`value`, `index`) => `boolean`

#### Returns

`Rows`\<`T`\>

***

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:33](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L33)

通过索引获取一个对象

#### Parameters

##### index

`number`

#### Returns

`T`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`item`](../interfaces/IRows.md#item)

***

### map()

> **map**\<`TU`\>(`callbackfn`): `TU`[]

Defined in: [sys/mod.ts:48](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L48)

重塑对象内容为数组

#### Type Parameters

##### TU

`TU`

#### Parameters

##### callbackfn

(`value`, `index`) => `TU`

#### Returns

`TU`[]

***

### toArray()

> **toArray**(): `Record`\<`string`, `any`\>[]

Defined in: [sys/mod.ts:38](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L38)

转换为数组对象，获取的是新创建的数组

#### Returns

`Record`\<`string`, `any`\>[]

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`toArray`](../interfaces/IRows.md#toarray)

sys/mod/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / sys/mod

# sys/mod

## Classes

- [default](classes/default.md)
- [Rows](classes/Rows.md)

## Interfaces

- [IModUnionItem](interfaces/IModUnionItem.md)
- [IRows](interfaces/IRows.md)

## Type Aliases

- [TOnlyProperties](type-aliases/TOnlyProperties.md)

sys/mod/interfaces/IModUnionItem.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / IModUnionItem

# Interface: IModUnionItem

Defined in: [sys/mod.ts:1799](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1799)

## Properties

### field

> **field**: `string`

Defined in: [sys/mod.ts:1800](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1800)

***

### where?

> `optional` **where?**: `any`

Defined in: [sys/mod.ts:1801](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1801)

sys/mod/interfaces/IRows.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / IRows

# Interface: IRows\<T\>

Defined in: [sys/mod.ts:1793](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1793)

## Extends

- `Iterable`\<`T`\>

## Type Parameters

### T

`T`

## Properties

### length

> `readonly` **length**: `number`

Defined in: [sys/mod.ts:1794](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1794)

## Methods

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:1795](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1795)

#### Parameters

##### index

`number`

#### Returns

`T`

***

### toArray()

> **toArray**(): `Record`\<`string`, `any`\>[]

Defined in: [sys/mod.ts:1796](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1796)

#### Returns

`Record`\<`string`, `any`\>[]

sys/mod/type-aliases/TOnlyProperties.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / TOnlyProperties

# Type Alias: TOnlyProperties\<T\>

> **TOnlyProperties**\<`T`\> = `{ [K in keyof T as T[K] extends (args: any[]) => any ? never : K]: T[K] }`

Defined in: [sys/mod.ts:14](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L14)

只获取变量

## Type Parameters

### T

`T`

sys/route/functions/clearKebabConfigs.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / clearKebabConfigs

# Function: clearKebabConfigs()

> **clearKebabConfigs**(): `void`

Defined in: [sys/route.ts:31](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L31)

清除已经加载的虚拟主机配置文件

## Returns

`void`

sys/route/functions/getFormData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(`req`, `events?`, `limits?`): `Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

Defined in: [sys/route.ts:967](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L967)

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

#### maxFileSize?

`number`

单个文件最大字节数

## Returns

`Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

sys/route/functions/getPost.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getPost

# Function: getPost()

> **getPost**(`req`): `Promise`\<\{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>

Defined in: [sys/route.ts:881](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L881)

获取 post 对象（通常已自动获取），如果是文件上传（formdata）的情况则不获取

## Parameters

### req

`IncomingMessage` \| `Http2ServerRequest`

请求对象

## Returns

`Promise`\<\{ `input`: `string`; `post`: `Record`\<`string`, `any`\>; `raw`: `Record`\<`string`, `any`\>; \}\>

sys/route/functions/run.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / run

# Function: run()

> **run**(`data`): `Promise`\<`boolean`\>

Defined in: [sys/route.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L77)

若为动态路径则执行此函数，此函数不进行判断 kebab.json 是否存在

## Parameters

### data

传导的数据

#### head?

`Buffer`\<`ArrayBufferLike`\>

WebSocket 的 head 数据

#### path

`string`

前面不带 /，末尾不一定，以用户请求为准

#### req

`IncomingMessage` \| `Http2ServerRequest`

#### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### rootPath

`string`

虚拟主机当前动态目录的绝对根目录，末尾带 /

#### socket?

`Socket`

WebSocket 连接的 socket 对象

#### timer?

\{ `callback`: () => `void`; `timeout`: `number`; `timer`: `Timeout`; \}

timeout timer

#### timer.callback

() => `void`

#### timer.timeout

`number`

#### timer.timer

`Timeout`

#### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

#### urlBase

`string`

base url，如 /abc/vhost/，前后都带 /

## Returns

`Promise`\<`boolean`\>

sys/route/functions/unlinkUploadFiles.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / unlinkUploadFiles

# Function: unlinkUploadFiles()

> **unlinkUploadFiles**(`cctr`): `Promise`\<`void`\>

Defined in: [sys/route.ts:840](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L840)

删除本次请求所有已上传的临时文件

## Parameters

### cctr

[`Ctr`](../../ctr/classes/Ctr.md) \| `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>

Ctr 对象 或 files

## Returns

`Promise`\<`void`\>

sys/route/functions/waitCtr.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / waitCtr

# Function: waitCtr()

> **waitCtr**(`cctr`): `Promise`\<`void`\>

Defined in: [sys/route.ts:860](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L860)

等待异步任务结束，并删除临时文件，如果结束后还有事务没关闭，则会在本函数中打印控制台并且写入 log 文件
此时其实已经给客户端返回了，此处等待不消耗客户端的等待时间

## Parameters

### cctr

[`Ctr`](../../ctr/classes/Ctr.md)

要等待的控制器

## Returns

`Promise`\<`void`\>

sys/route/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / sys/route

# sys/route

## Functions

- [clearKebabConfigs](functions/clearKebabConfigs.md)
- [getFormData](functions/getFormData.md)
- [getPost](functions/getPost.md)
- [run](functions/run.md)
- [unlinkUploadFiles](functions/unlinkUploadFiles.md)
- [waitCtr](functions/waitCtr.md)
