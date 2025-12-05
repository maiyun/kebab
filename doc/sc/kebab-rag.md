
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
- [lib/vector](lib/vector/index.md)
- [lib/ws](lib/ws/index.md)
- [lib/zip](lib/zip/index.md)
- [lib/zlib](lib/zlib/index.md)
- [main](main/index.md)
- [sys/ctr](sys/ctr/index.md)
- [sys/mod](sys/mod/index.md)
- [sys/route](sys/route/index.md)

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
- [IConfigJwt](interfaces/IConfigJwt.md)
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

index/interfaces/IConfig.md
---

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

index/interfaces/IConfigAi.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigAi

# Interface: IConfigAi

Defined in: [index.ts:118](https://github.com/maiyunnet/kebab/blob/master/index.ts#L118)

AI

## Properties

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [index.ts:120](https://github.com/maiyunnet/kebab/blob/master/index.ts#L120)

目前只有微软 Azure 有

***

### skey

> **skey**: `string`

Defined in: [index.ts:121](https://github.com/maiyunnet/kebab/blob/master/index.ts#L121)

index/interfaces/IConfigConst.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigConst

# Interface: IConfigConst

Defined in: [index.ts:190](https://github.com/maiyunnet/kebab/blob/master/index.ts#L190)

常量

## Properties

### ctrPath

> **ctrPath**: `string`

Defined in: [index.ts:215](https://github.com/maiyunnet/kebab/blob/master/index.ts#L215)

***

### dataPath

> **dataPath**: `string`

Defined in: [index.ts:217](https://github.com/maiyunnet/kebab/blob/master/index.ts#L217)

***

### host

> **host**: `string`

Defined in: [index.ts:206](https://github.com/maiyunnet/kebab/blob/master/index.ts#L206)

***

### hostname

> **hostname**: `string`

Defined in: [index.ts:207](https://github.com/maiyunnet/kebab/blob/master/index.ts#L207)

***

### hostport

> **hostport**: `number`

Defined in: [index.ts:208](https://github.com/maiyunnet/kebab/blob/master/index.ts#L208)

***

### https

> **https**: `boolean`

Defined in: [index.ts:205](https://github.com/maiyunnet/kebab/blob/master/index.ts#L205)

***

### miniprogram

> **miniprogram**: `""` \| `"wechat"`

Defined in: [index.ts:204](https://github.com/maiyunnet/kebab/blob/master/index.ts#L204)

***

### mobile

> **mobile**: `boolean`

Defined in: [index.ts:202](https://github.com/maiyunnet/kebab/blob/master/index.ts#L202)

***

### modPath

> **modPath**: `string`

Defined in: [index.ts:214](https://github.com/maiyunnet/kebab/blob/master/index.ts#L214)

***

### path

> **path**: `string`

Defined in: [index.ts:192](https://github.com/maiyunnet/kebab/blob/master/index.ts#L192)

不以 / 开头，不含 qs

***

### qs

> **qs**: `string`

Defined in: [index.ts:194](https://github.com/maiyunnet/kebab/blob/master/index.ts#L194)

不含 ? 开头

***

### qss

> **qss**: `string`

Defined in: [index.ts:196](https://github.com/maiyunnet/kebab/blob/master/index.ts#L196)

含 ? 开头

***

### rootPath

> **rootPath**: `string`

Defined in: [index.ts:213](https://github.com/maiyunnet/kebab/blob/master/index.ts#L213)

***

### startMemory

> **startMemory**: `number`

Defined in: [index.ts:198](https://github.com/maiyunnet/kebab/blob/master/index.ts#L198)

***

### startTime

> **startTime**: `bigint`

Defined in: [index.ts:197](https://github.com/maiyunnet/kebab/blob/master/index.ts#L197)

***

### uri

> **uri**: [`IUrlParse`](IUrlParse.md)

Defined in: [index.ts:209](https://github.com/maiyunnet/kebab/blob/master/index.ts#L209)

***

### urlBase

> **urlBase**: `string`

Defined in: [index.ts:222](https://github.com/maiyunnet/kebab/blob/master/index.ts#L222)

***

### urlFull

> **urlFull**: `string`

Defined in: [index.ts:224](https://github.com/maiyunnet/kebab/blob/master/index.ts#L224)

***

### urlStc

> **urlStc**: `string`

Defined in: [index.ts:223](https://github.com/maiyunnet/kebab/blob/master/index.ts#L223)

***

### urlStcFull

> **urlStcFull**: `string`

Defined in: [index.ts:225](https://github.com/maiyunnet/kebab/blob/master/index.ts#L225)

***

### viewPath

> **viewPath**: `string`

Defined in: [index.ts:216](https://github.com/maiyunnet/kebab/blob/master/index.ts#L216)

***

### wechat

> **wechat**: `boolean`

Defined in: [index.ts:203](https://github.com/maiyunnet/kebab/blob/master/index.ts#L203)

***

### wsPath

> **wsPath**: `string`

Defined in: [index.ts:218](https://github.com/maiyunnet/kebab/blob/master/index.ts#L218)

index/interfaces/IConfigDb.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigDb

# Interface: IConfigDb

Defined in: [index.ts:148](https://github.com/maiyunnet/kebab/blob/master/index.ts#L148)

数据库

## Properties

### charset

> **charset**: `string`

Defined in: [index.ts:151](https://github.com/maiyunnet/kebab/blob/master/index.ts#L151)

***

### host

> **host**: `string`

Defined in: [index.ts:149](https://github.com/maiyunnet/kebab/blob/master/index.ts#L149)

***

### name

> **name**: `string`

Defined in: [index.ts:152](https://github.com/maiyunnet/kebab/blob/master/index.ts#L152)

***

### port

> **port**: `number`

Defined in: [index.ts:150](https://github.com/maiyunnet/kebab/blob/master/index.ts#L150)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:155](https://github.com/maiyunnet/kebab/blob/master/index.ts#L155)

***

### user

> **user**: `string`

Defined in: [index.ts:154](https://github.com/maiyunnet/kebab/blob/master/index.ts#L154)

index/interfaces/IConfigDns.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigDns

# Interface: IConfigDns

Defined in: [index.ts:168](https://github.com/maiyunnet/kebab/blob/master/index.ts#L168)

DNS

## Properties

### sid

> **sid**: `string`

Defined in: [index.ts:169](https://github.com/maiyunnet/kebab/blob/master/index.ts#L169)

***

### skey

> **skey**: `string`

Defined in: [index.ts:170](https://github.com/maiyunnet/kebab/blob/master/index.ts#L170)

index/interfaces/IConfigJwt.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigJwt

# Interface: IConfigJwt

Defined in: [index.ts:159](https://github.com/maiyunnet/kebab/blob/master/index.ts#L159)

Jwt 信息

## Properties

### auth

> **auth**: `boolean`

Defined in: [index.ts:164](https://github.com/maiyunnet/kebab/blob/master/index.ts#L164)

***

### name

> **name**: `string`

Defined in: [index.ts:160](https://github.com/maiyunnet/kebab/blob/master/index.ts#L160)

***

### secret

> **secret**: `string`

Defined in: [index.ts:163](https://github.com/maiyunnet/kebab/blob/master/index.ts#L163)

***

### ssl

> **ssl**: `boolean`

Defined in: [index.ts:162](https://github.com/maiyunnet/kebab/blob/master/index.ts#L162)

***

### ttl

> **ttl**: `number`

Defined in: [index.ts:161](https://github.com/maiyunnet/kebab/blob/master/index.ts#L161)

index/interfaces/IConfigKv.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigKv

# Interface: IConfigKv

Defined in: [index.ts:174](https://github.com/maiyunnet/kebab/blob/master/index.ts#L174)

kv

## Properties

### host

> **host**: `string`

Defined in: [index.ts:175](https://github.com/maiyunnet/kebab/blob/master/index.ts#L175)

***

### index

> **index**: `number`

Defined in: [index.ts:177](https://github.com/maiyunnet/kebab/blob/master/index.ts#L177)

***

### port

> **port**: `number`

Defined in: [index.ts:176](https://github.com/maiyunnet/kebab/blob/master/index.ts#L176)

***

### pre

> **pre**: `string`

Defined in: [index.ts:178](https://github.com/maiyunnet/kebab/blob/master/index.ts#L178)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:181](https://github.com/maiyunnet/kebab/blob/master/index.ts#L181)

***

### user

> **user**: `string`

Defined in: [index.ts:180](https://github.com/maiyunnet/kebab/blob/master/index.ts#L180)

index/interfaces/IConfigLang.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigLang

# Interface: IConfigLang

Defined in: [index.ts:102](https://github.com/maiyunnet/kebab/blob/master/index.ts#L102)

语言

## Properties

### direct

> **direct**: `string`[]

Defined in: [index.ts:104](https://github.com/maiyunnet/kebab/blob/master/index.ts#L104)

***

### list

> **list**: `string`[]

Defined in: [index.ts:103](https://github.com/maiyunnet/kebab/blob/master/index.ts#L103)

index/interfaces/IConfigS3.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigS3

# Interface: IConfigS3

Defined in: [index.ts:108](https://github.com/maiyunnet/kebab/blob/master/index.ts#L108)

对象存储

## Properties

### account?

> `optional` **account**: `string`

Defined in: [index.ts:110](https://github.com/maiyunnet/kebab/blob/master/index.ts#L110)

cf r2 要用

***

### bucket

> **bucket**: `string`

Defined in: [index.ts:114](https://github.com/maiyunnet/kebab/blob/master/index.ts#L114)

***

### region

> **region**: `string`

Defined in: [index.ts:113](https://github.com/maiyunnet/kebab/blob/master/index.ts#L113)

***

### sid

> **sid**: `string`

Defined in: [index.ts:111](https://github.com/maiyunnet/kebab/blob/master/index.ts#L111)

***

### skey

> **skey**: `string`

Defined in: [index.ts:112](https://github.com/maiyunnet/kebab/blob/master/index.ts#L112)

index/interfaces/IConfigSql.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigSql

# Interface: IConfigSql

Defined in: [index.ts:185](https://github.com/maiyunnet/kebab/blob/master/index.ts#L185)

sql

## Properties

### pre

> **pre**: `string`

Defined in: [index.ts:186](https://github.com/maiyunnet/kebab/blob/master/index.ts#L186)

index/interfaces/IConfigTurnstile.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigTurnstile

# Interface: IConfigTurnstile

Defined in: [index.ts:134](https://github.com/maiyunnet/kebab/blob/master/index.ts#L134)

人机码信息

## Properties

### CF

> **CF**: `object`

Defined in: [index.ts:135](https://github.com/maiyunnet/kebab/blob/master/index.ts#L135)

#### sid

> **sid**: `string`

#### skey

> **skey**: `string`

***

### TENCENT

> **TENCENT**: `object`

Defined in: [index.ts:139](https://github.com/maiyunnet/kebab/blob/master/index.ts#L139)

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

Defined in: [index.ts:125](https://github.com/maiyunnet/kebab/blob/master/index.ts#L125)

向量数据库

## Properties

### host

> **host**: `string`

Defined in: [index.ts:126](https://github.com/maiyunnet/kebab/blob/master/index.ts#L126)

***

### name

> **name**: `string`

Defined in: [index.ts:128](https://github.com/maiyunnet/kebab/blob/master/index.ts#L128)

***

### port

> **port**: `number`

Defined in: [index.ts:127](https://github.com/maiyunnet/kebab/blob/master/index.ts#L127)

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:130](https://github.com/maiyunnet/kebab/blob/master/index.ts#L130)

***

### user

> **user**: `string`

Defined in: [index.ts:129](https://github.com/maiyunnet/kebab/blob/master/index.ts#L129)

index/interfaces/IPostFile.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IPostFile

# Interface: IPostFile

Defined in: [index.ts:237](https://github.com/maiyunnet/kebab/blob/master/index.ts#L237)

上传的文件信息对象

## Properties

### name

> `readonly` **name**: `string`

Defined in: [index.ts:238](https://github.com/maiyunnet/kebab/blob/master/index.ts#L238)

***

### origin

> `readonly` **origin**: `string`

Defined in: [index.ts:239](https://github.com/maiyunnet/kebab/blob/master/index.ts#L239)

***

### path

> `readonly` **path**: `string`

Defined in: [index.ts:241](https://github.com/maiyunnet/kebab/blob/master/index.ts#L241)

***

### size

> `readonly` **size**: `number`

Defined in: [index.ts:240](https://github.com/maiyunnet/kebab/blob/master/index.ts#L240)

index/interfaces/IUrlParse.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IUrlParse

# Interface: IUrlParse

Defined in: [index.ts:87](https://github.com/maiyunnet/kebab/blob/master/index.ts#L87)

## Properties

### auth

> **auth**: `string` \| `null`

Defined in: [index.ts:89](https://github.com/maiyunnet/kebab/blob/master/index.ts#L89)

***

### hash

> **hash**: `string` \| `null`

Defined in: [index.ts:98](https://github.com/maiyunnet/kebab/blob/master/index.ts#L98)

***

### host

> **host**: `string` \| `null`

Defined in: [index.ts:92](https://github.com/maiyunnet/kebab/blob/master/index.ts#L92)

***

### hostname

> **hostname**: `string` \| `null`

Defined in: [index.ts:93](https://github.com/maiyunnet/kebab/blob/master/index.ts#L93)

***

### pass

> **pass**: `string` \| `null`

Defined in: [index.ts:91](https://github.com/maiyunnet/kebab/blob/master/index.ts#L91)

***

### path

> **path**: `string` \| `null`

Defined in: [index.ts:96](https://github.com/maiyunnet/kebab/blob/master/index.ts#L96)

***

### pathname

> **pathname**: `string`

Defined in: [index.ts:95](https://github.com/maiyunnet/kebab/blob/master/index.ts#L95)

***

### port

> **port**: `string` \| `null`

Defined in: [index.ts:94](https://github.com/maiyunnet/kebab/blob/master/index.ts#L94)

***

### protocol

> **protocol**: `string` \| `null`

Defined in: [index.ts:88](https://github.com/maiyunnet/kebab/blob/master/index.ts#L88)

***

### query

> **query**: `string` \| `null`

Defined in: [index.ts:97](https://github.com/maiyunnet/kebab/blob/master/index.ts#L97)

***

### user

> **user**: `string` \| `null`

Defined in: [index.ts:90](https://github.com/maiyunnet/kebab/blob/master/index.ts#L90)

index/interfaces/IVhost.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IVhost

# Interface: IVhost

Defined in: [index.ts:229](https://github.com/maiyunnet/kebab/blob/master/index.ts#L229)

虚拟机配置对象

## Properties

### domains

> `readonly` **domains**: `string`[]

Defined in: [index.ts:231](https://github.com/maiyunnet/kebab/blob/master/index.ts#L231)

***

### name?

> `readonly` `optional` **name**: `string`

Defined in: [index.ts:230](https://github.com/maiyunnet/kebab/blob/master/index.ts#L230)

***

### remark?

> `readonly` `optional` **remark**: `string`

Defined in: [index.ts:233](https://github.com/maiyunnet/kebab/blob/master/index.ts#L233)

***

### root

> `readonly` **root**: `string`

Defined in: [index.ts:232](https://github.com/maiyunnet/kebab/blob/master/index.ts#L232)

index/type-aliases/DbValue.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / DbValue

# Type Alias: DbValue

> **DbValue** = `string` \| `number` \| `null` \| `Record`\<`string`, [`Json`](Json.md)\>

Defined in: [index.ts:47](https://github.com/maiyunnet/kebab/blob/master/index.ts#L47)

数据库值的类型

index/type-aliases/Json.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / Json

# Type Alias: Json

> **Json** = `any`

Defined in: [index.ts:44](https://github.com/maiyunnet/kebab/blob/master/index.ts#L44)

除非确定是不可知的 Json，否则不能使用

index/variables/CERT_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / CERT\_CWD

# Variable: CERT\_CWD

> `const` **CERT\_CWD**: `string`

Defined in: [index.ts:32](https://github.com/maiyunnet/kebab/blob/master/index.ts#L32)

index/variables/CONF_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / CONF\_CWD

# Variable: CONF\_CWD

> `const` **CONF\_CWD**: `string`

Defined in: [index.ts:31](https://github.com/maiyunnet/kebab/blob/master/index.ts#L31)

index/variables/FTMP_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / FTMP\_CWD

# Variable: FTMP\_CWD

> `const` **FTMP\_CWD**: `string`

Defined in: [index.ts:38](https://github.com/maiyunnet/kebab/blob/master/index.ts#L38)

index/variables/IND_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IND\_CWD

# Variable: IND\_CWD

> `const` **IND\_CWD**: `string`

Defined in: [index.ts:37](https://github.com/maiyunnet/kebab/blob/master/index.ts#L37)

index/variables/LIB_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LIB\_CWD

# Variable: LIB\_CWD

> `const` **LIB\_CWD**: `string`

Defined in: [index.ts:34](https://github.com/maiyunnet/kebab/blob/master/index.ts#L34)

index/variables/LIB_PATH.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LIB\_PATH

# Variable: LIB\_PATH

> `const` **LIB\_PATH**: `string`

Defined in: [index.ts:20](https://github.com/maiyunnet/kebab/blob/master/index.ts#L20)

index/variables/LOG_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / LOG\_CWD

# Variable: LOG\_CWD

> `const` **LOG\_CWD**: `string`

Defined in: [index.ts:35](https://github.com/maiyunnet/kebab/blob/master/index.ts#L35)

index/variables/MOD_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / MOD\_CWD

# Variable: MOD\_CWD

> `const` **MOD\_CWD**: `string`

Defined in: [index.ts:39](https://github.com/maiyunnet/kebab/blob/master/index.ts#L39)

index/variables/ROOT_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / ROOT\_CWD

# Variable: ROOT\_CWD

> `const` **ROOT\_CWD**: `string`

Defined in: [index.ts:30](https://github.com/maiyunnet/kebab/blob/master/index.ts#L30)

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

Defined in: [index.ts:21](https://github.com/maiyunnet/kebab/blob/master/index.ts#L21)

index/variables/VER.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / VER

# Variable: VER

> `const` **VER**: `"7.1.1"` = `'7.1.1'`

Defined in: [index.ts:10](https://github.com/maiyunnet/kebab/blob/master/index.ts#L10)

当前系统版本号

index/variables/VHOST_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / VHOST\_CWD

# Variable: VHOST\_CWD

> `const` **VHOST\_CWD**: `string`

Defined in: [index.ts:33](https://github.com/maiyunnet/kebab/blob/master/index.ts#L33)

index/variables/WWW_CWD.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / WWW\_CWD

# Variable: WWW\_CWD

> `const` **WWW\_CWD**: `string`

Defined in: [index.ts:36](https://github.com/maiyunnet/kebab/blob/master/index.ts#L36)

lib/ai/classes/Ai.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / Ai

# Class: Ai

Defined in: [lib/ai.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L49)

## Constructors

### Constructor

> **new Ai**(`ctrEtc`, `opt`): `Ai`

Defined in: [lib/ai.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L56)

#### Parameters

##### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Ai`

## Properties

### link

> `readonly` **link**: `OpenAI`

Defined in: [lib/ai.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L52)

openai 原生对象，建议只读

## Methods

### chat()

创建对话

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

Defined in: [lib/ai.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L111)

创建非流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsNonStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

Defined in: [lib/ai.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L115)

创建流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

***

### embedding()

> **embedding**(`body`): `Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

Defined in: [lib/ai.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L135)

创建向量

#### Parameters

##### body

`EmbeddingCreateParams`

#### Returns

`Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

lib/ai/enumerations/ESERVICE.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / ESERVICE

# Enumeration: ESERVICE

Defined in: [lib/ai.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L18)

服务商定义

## Enumeration Members

### ALIAS

> **ALIAS**: `1`

Defined in: [lib/ai.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L22)

阿里国际区

***

### ALICN

> **ALICN**: `0`

Defined in: [lib/ai.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L20)

阿里中国大陆区

***

### AZURE

> **AZURE**: `2`

Defined in: [lib/ai.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L24)

微软 Azure

***

### AZURE2

> **AZURE2**: `3`

Defined in: [lib/ai.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L26)

微软 Azure 2

***

### AZURE3

> **AZURE3**: `4`

Defined in: [lib/ai.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L28)

微软 Azure 3

lib/ai/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `opt`): [`Ai`](../classes/Ai.md)

Defined in: [lib/ai.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L154)

创建一个 AI 对象

## Parameters

### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

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

Defined in: [lib/ai.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L32)

选项

## Properties

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/ai.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L36)

接入点

***

### fetch()?

> `optional` **fetch**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L40)

自定义 fetch 函数

#### Parameters

##### input

`string` | `Request` | `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

***

### secretKey?

> `optional` **secretKey**: `string`

Defined in: [lib/ai.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L38)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L34)

服务商 -

lib/buffer/classes/Reader.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Reader

# Class: Reader

Defined in: [lib/buffer.ts:2](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L2)

读对象

## Constructors

### Constructor

> **new Reader**(`buffer`): `Reader`

Defined in: [lib/buffer.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L9)

#### Parameters

##### buffer

`Buffer`

#### Returns

`Reader`

## Methods

### length()

> **length**(): `number`

Defined in: [lib/buffer.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L83)

获取完整的 buffer 长度

#### Returns

`number`

***

### readBCDString()

> **readBCDString**(`length?`): `string`

Defined in: [lib/buffer.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L49)

读取一个 BCD 编码的字符串（每个字节表示两个数字）

#### Parameters

##### length?

`number`

#### Returns

`string`

***

### readBuffer()

> **readBuffer**(`length?`): `Buffer`

Defined in: [lib/buffer.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L77)

读取 Buffer

#### Parameters

##### length?

`number`

#### Returns

`Buffer`

***

### readString()

> **readString**(`length?`, `encoding?`): `string`

Defined in: [lib/buffer.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L62)

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

Defined in: [lib/buffer.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L21)

读取一个无符号 16 位整数（大端模式），WORD

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [lib/buffer.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L28)

读取一个无符号 16 位整数（小端模式）

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [lib/buffer.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L35)

读取一个无符号 32 位整数（大端模式）, DWORD

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [lib/buffer.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L42)

读取一个无符号 32 位整数（小端模式）

#### Returns

`number`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [lib/buffer.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L14)

读取一个无符号 8 位整数, BYTE

#### Returns

`number`

lib/buffer/classes/Writer.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Writer

# Class: Writer

Defined in: [lib/buffer.ts:90](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L90)

写对象

## Constructors

### Constructor

> **new Writer**(`size`): `Writer`

Defined in: [lib/buffer.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L97)

#### Parameters

##### size

`number`

#### Returns

`Writer`

## Methods

### get()

> **get**(): `Buffer`

Defined in: [lib/buffer.ts:140](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L140)

返回 Buffer 对象

#### Returns

`Buffer`

***

### writeBCDString()

> **writeBCDString**(`value`): `void`

Defined in: [lib/buffer.ts:120](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L120)

[每字节 2 数字] 写入一个 BCD 编码的字符串（仅支持数字）

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`, `encoding`): `number`

Defined in: [lib/buffer.ts:130](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L130)

写入普通字符串，返回写入的长度

#### Parameters

##### value

`string`

##### encoding

`BufferEncoding` = `'utf8'`

#### Returns

`number`

***

### writeUInt16BE()

> **writeUInt16BE**(`value`): `void`

Defined in: [lib/buffer.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L108)

[2 字节] 写入一个无符号 16 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt32BE()

> **writeUInt32BE**(`value`): `void`

Defined in: [lib/buffer.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L114)

[4 字节] 写入一个无符号 32 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt8()

> **writeUInt8**(`value`): `void`

Defined in: [lib/buffer.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L102)

[1 字节] 写入一个无符号 8 位整数

#### Parameters

##### value

`number`

#### Returns

`void`

lib/buffer/functions/getReader.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / getReader

# Function: getReader()

> **getReader**(`buffer`): [`Reader`](../classes/Reader.md)

Defined in: [lib/buffer.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L150)

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

Defined in: [lib/buffer.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L158)

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

> **get**(`width`, `height`, `length`): [`Captcha`](../classes/Captcha.md)

Defined in: [lib/captcha.ts:57](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L57)

获取验证码对象

## Parameters

### width

`number`

宽度

### height

`number`

高度

### length

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

node 节点名一个或多个

`string` | `string`[]

#### Returns

`void`

***

### find()

> **find**(`key`): `string` \| `null`

Defined in: [lib/consistent.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L59)

获得一个最近的顺时针节点

#### Parameters

##### key

为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点

`string` | `number`

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

原始数据 key 集

`string` | `number` | (`string` \| `number`)[]

##### node

新增的节点一个或多个

`string` | `string`[]

#### Returns

`Record`\<`string`, \{ `new`: `string`; `old`: `string`; \}\>

***

### remove()

> **remove**(`node`): `void`

Defined in: [lib/consistent.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L43)

移除节点

#### Parameters

##### node

node 节点名

`string` | `string`[]

#### Returns

`void`

lib/consistent/functions/addToCircle.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / addToCircle

# Function: addToCircle()

> **addToCircle**(`circle`, `node`, `vcount`): `void`

Defined in: [lib/consistent.ts:167](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L167)

添加到圆环

## Parameters

### circle

`Record`\<`string`, `string`\>

圆环

### node

node 节点名一个或多个

`string` | `string`[]

### vcount

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

> **fast**(`key`, `nodes`, `vcount`): `string` \| `null`

Defined in: [lib/consistent.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L124)

快速查找一个 key 属于哪个 node

## Parameters

### key

要查找的key

`string` | `number`

### nodes

node 列表

`string` | `string`[]

### vcount

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

> **findInCircle**(`circle`, `key`, `keys`): `string` \| `null`

Defined in: [lib/consistent.ts:188](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L188)

获得一个最近的顺时针节点

## Parameters

### circle

`Record`\<`string`, `string`\>

圆环

### key

为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点

`string` | `number`

### keys

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

> **get**(`vcount`): [`Consistent`](../classes/Consistent.md)

Defined in: [lib/consistent.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L114)

## Parameters

### vcount

`number` = `300`

## Returns

[`Consistent`](../classes/Consistent.md)

lib/consistent/functions/getRange.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / getRange

# Function: getRange()

> **getRange**(`min`, `max`, `pre`): `string`[]

Defined in: [lib/consistent.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L153)

获取区间节点系列

## Parameters

### min

`number`

最小值（含）

### max

`number`

最大值（含）

### pre

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

要 hash 的值

`string` | `number`

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

lib/core/functions/checkType.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / checkType

# Function: checkType()

> **checkType**(`val`, `type`, `tree`): `string`

Defined in: [lib/core.ts:200](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L200)

判断一个对象是否符合示例组，返回空字符串代表校验通过，返回：应该的类型:位置:传入的类型

## Parameters

### val

`any`

对象

### type

`any`

示例组

### tree

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

Defined in: [lib/core.ts:901](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L901)

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

Defined in: [lib/core.ts:141](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L141)

将 10 进制转换为 62 进制

## Parameters

### n

10 进制数字最大 9223372036854775807n

`string` | `number` | `bigint`

## Returns

`string`

lib/core/functions/debug.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / debug

# Function: debug()

> **debug**(`message?`, ...`optionalParams?`): `void`

Defined in: [lib/core.ts:935](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L935)

打印调试信息，线上环境不会打印

## Parameters

### message?

`any`

参数

### optionalParams?

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

> **display**(`message?`, ...`optionalParams?`): `void`

Defined in: [lib/core.ts:948](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L948)

向控制台直接显示内容，一般情况下禁止使用

## Parameters

### message?

`any`

参数

### optionalParams?

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

> **emptyObject**(`obj`, `deep`): `void`

Defined in: [lib/core.ts:409](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L409)

将对象的所有属性清除包括键，不会破坏引用关系，对象变量依然保证是引用状态

## Parameters

### obj

`Record`\<`string`, `any`\>

要清除的对象

### deep

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

> **exec**(`command`): `Promise`\<`string` \| `false`\>

Defined in: [lib/core.ts:467](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L467)

执行命令行

## Parameters

### command

`string`

命令字符串

## Returns

`Promise`\<`string` \| `false`\>

lib/core/functions/getLog.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getLog

# Function: getLog()

> **getLog**(`opt`): `Promise`\<`false` \| `string`[][] \| `null`\>

Defined in: [lib/core.ts:808](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L808)

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

#### start?

`number`

跳过的字节数，默认不跳过

## Returns

`Promise`\<`false` \| `string`[][] \| `null`\>

lib/core/functions/ip.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ip

# Function: ip()

> **ip**(`ctr`, `req?`): `string`

Defined in: [lib/core.ts:328](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L328)

获取 IP（非安全 IP）

## Parameters

### ctr

`IncomingHttpHeaders` | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### req?

`IncomingMessage` | `Http2ServerRequest`

## Returns

`string`

lib/core/functions/log.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / log

# Function: log()

> **log**(`opt`, `msg`, `fend`): `void`

Defined in: [lib/core.ts:730](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L730)

写入文件日志

## Parameters

### opt

选项

[`Ctr`](../../../sys/ctr/classes/Ctr.md) | [`ILogOptions`](../interfaces/ILogOptions.md)

### msg

`string`

自定义内容

### fend

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

Defined in: [lib/core.ts:862](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L862)

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

如 2024/08/01/22，无所谓开头结尾

## Returns

`Promise`\<`object`[]\>

lib/core/functions/muid.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / muid

# Function: muid()

> **muid**(`ctr`, `opt`): `string`

Defined in: [lib/core.ts:288](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L288)

获取 MUID

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

Ctr 对象

### opt

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

Defined in: [lib/core.ts:390](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L390)

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

> **passThroughAppend**(`passThrough`, `data`, `end`): `Promise`\<`void`\>

Defined in: [lib/core.ts:428](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L428)

调用前自行创建 passThrough，并且调用 pipe 绑定到应该绑定的对象，然后再调用本函数

## Parameters

### passThrough

`PassThrough`

passThrough 对象

### data

(`string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable` \| [`Response`](../../net/response/classes/Response.md))[]

数组

### end

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

Defined in: [lib/core.ts:170](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L170)

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

> **rand**(`min`, `max`, `prec`): `number`

Defined in: [lib/core.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L79)

生成基础的范围随机数

## Parameters

### min

`number`

>= 最小值

### max

`number`

<= 最大值

### prec

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

> **random**(`length`, `source`, `block`): `string`

Defined in: [lib/core.ts:116](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L116)

生成随机字符串

## Parameters

### length

`number` = `8`

长度

### source

`string` = `RANDOM_LN`

采样值

### block

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

> **realIP**(`ctr`, `name`): `string`

Defined in: [lib/core.ts:362](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L362)

获取直连 IP（安全 IP）

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### name

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

> **removeGlobal**(`key`, `hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:653](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L653)

移除某个跨线程/跨内网服务器全局变量

## Parameters

### key

`string`

变量名

### hosts?

`string`[]

局域网列表

## Returns

`Promise`\<`string`[]\>

lib/core/functions/sendPm2.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendPm2

# Function: sendPm2()

> **sendPm2**(`name`, `action`, `hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:568](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L568)

向本机或局域网 RPC 发送 PM2 操作

## Parameters

### name

`string`

PM2 进程名称

### action

[`TPm2Action`](../type-aliases/TPm2Action.md) = `'restart'`

PM2 操作类型

### hosts?

局域网列表

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>

lib/core/functions/sendReload.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendReload

# Function: sendReload()

> **sendReload**(`hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:483](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L483)

向主进程（或局域网同代码机子）发送广播将进行 reload 操作，等待回传
主要作用除代码热更新以外的其他情况

## Parameters

### hosts?

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>

lib/core/functions/sendRestart.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendRestart

# Function: sendRestart()

> **sendRestart**(`hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:523](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L523)

向主进程（或局域网同代码机子）发送广播将进行 restart 操作，停止监听并启动新进程，老进程在连接全部断开后自行销毁
主要用作不间断的代码热更新

## Parameters

### hosts?

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>

lib/core/functions/setCookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / setCookie

# Function: setCookie()

> **setCookie**(`ctr`, `name`, `value`, `opt`): `void`

Defined in: [lib/core.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L50)

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

### opt

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

> **setGlobal**(`key`, `data`, `hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:612](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L612)

设置跨线程/指定的局域网主机的全局变量

## Parameters

### key

`string`

变量名

### data

`any`

变量值

### hosts?

局域网列表

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>

lib/core/functions/sleep.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sleep

# Function: sleep()

> **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [lib/core.ts:378](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L378)

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

Defined in: [lib/core.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L157)

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

Defined in: [lib/core.ts:665](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L665)

上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新建

## Parameters

### sourcePath

`string`

zip 文件

### path

`string`

要更新的目标路径，无所谓是否 / 开头 / 结尾，是对方 kebab 的根据路径开始算起

### hosts?

局域网多机部署，不设置默认本机部署

`string`[] | `"config"`

### config?

`boolean` = `true`

是否自动更新 config 的 set.staticVer 为最新，默认更新

### strict?

`boolean` = `true`

严格模式，只有存在的文件才会被覆盖，不存在则中途直接报错，默认为 true

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

lib/core/functions/write.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / write

# Function: write()

> **write**(`res`, `data`): `void`

Defined in: [lib/core.ts:982](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L982)

向 res 发送数据

## Parameters

### res

响应对象

`Socket` | `Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### data

数据

`string` | `Buffer`\<`ArrayBufferLike`\>

## Returns

`void`

lib/core/functions/writeEventStreamHead.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeEventStreamHead

# Function: writeEventStreamHead()

> **writeEventStreamHead**(`res`): `void`

Defined in: [lib/core.ts:970](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L970)

## Parameters

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

## Returns

`void`

lib/core/functions/writeHead.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeHead

# Function: writeHead()

> **writeHead**(`res`, `statusCode`, `headers?`): `void`

Defined in: [lib/core.ts:959](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L959)

让 res 发送头部（前提是头部没有被发送才能调用本方法

## Parameters

### res

响应对象

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### statusCode

`number`

状态码

### headers?

`OutgoingHttpHeaders`

头部

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

- [checkType](functions/checkType.md)
- [clone](functions/clone.md)
- [convert62](functions/convert62.md)
- [debug](functions/debug.md)
- [display](functions/display.md)
- [emptyObject](functions/emptyObject.md)
- [exec](functions/exec.md)
- [getLog](functions/getLog.md)
- [ip](functions/ip.md)
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
- [sendPm2](functions/sendPm2.md)
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

Defined in: [lib/core.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L34)

Cookie 设置的选项

## Properties

### domain?

> `optional` **domain**: `string`

Defined in: [lib/core.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L37)

***

### httponly?

> `optional` **httponly**: `boolean`

Defined in: [lib/core.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L39)

***

### path?

> `optional` **path**: `string`

Defined in: [lib/core.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L36)

***

### samesite?

> `optional` **samesite**: `"Strict"` \| `"Lax"` \| `"None"`

Defined in: [lib/core.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L40)

***

### ssl?

> `optional` **ssl**: `boolean`

Defined in: [lib/core.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L38)

***

### ttl?

> `optional` **ttl**: `number`

Defined in: [lib/core.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L35)

lib/core/interfaces/ILogOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ILogOptions

# Interface: ILogOptions

Defined in: [lib/core.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L713)

log 设置的选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, `string`\>

Defined in: [lib/core.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L719)

***

### get?

> `optional` **get**: `Record`\<`string`, `any`\>

Defined in: [lib/core.ts:718](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L718)

***

### headers?

> `optional` **headers**: `IncomingHttpHeaders`

Defined in: [lib/core.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L721)

***

### hostname?

> `optional` **hostname**: `string`

Defined in: [lib/core.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L716)

***

### path?

> `optional` **path**: `string`

Defined in: [lib/core.ts:714](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L714)

***

### req?

> `optional` **req**: `IncomingMessage` \| `Http2ServerRequest` \| `null`

Defined in: [lib/core.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L717)

***

### session?

> `optional` **session**: `Record`\<`string`, `any`\>

Defined in: [lib/core.ts:720](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L720)

***

### urlFull?

> `optional` **urlFull**: `string`

Defined in: [lib/core.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L715)

lib/core/type-aliases/TPm2Action.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / TPm2Action

# Type Alias: TPm2Action

> **TPm2Action** = `"start"` \| `"stop"` \| `"restart"`

Defined in: [lib/core.ts:560](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L560)

PM2 操作类型

lib/core/variables/global.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / global

# Variable: global

> `const` **global**: `Record`\<`string`, `any`\> = `{}`

Defined in: [lib/core.ts:604](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L604)

跨进程全局变量

lib/core/variables/globalConfig.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / globalConfig

# Variable: globalConfig

> `const` **globalConfig**: [`IConfig`](../../../index/interfaces/IConfig.md) & `object`

Defined in: [lib/core.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L22)

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

### max

> **max**: `number`

### rpcPort

> **rpcPort**: `number`

### rpcSecret

> **rpcSecret**: `string`

lib/core/variables/RANDOM_L.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_L

# Variable: RANDOM\_L

> `const` **RANDOM\_L**: `"abcdefghijklmnopqrstuvwxyz"` = `'abcdefghijklmnopqrstuvwxyz'`

Defined in: [lib/core.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L95)

小写字母字符集

lib/core/variables/RANDOM_LN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LN

# Variable: RANDOM\_LN

> `const` **RANDOM\_LN**: `string`

Defined in: [lib/core.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L100)

小写字母 + 数字字符集

lib/core/variables/RANDOM_LU.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LU

# Variable: RANDOM\_LU

> `const` **RANDOM\_LU**: `string`

Defined in: [lib/core.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L102)

小写字母 + 大写字母字符集

lib/core/variables/RANDOM_LUN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LUN

# Variable: RANDOM\_LUN

> `const` **RANDOM\_LUN**: `string`

Defined in: [lib/core.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L104)

小写字母 + 大写字母 + 数字字符集

lib/core/variables/RANDOM_LUNS.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_LUNS

# Variable: RANDOM\_LUNS

> `const` **RANDOM\_LUNS**: `string`

Defined in: [lib/core.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L108)

小写字母 + 大写字母 + 数字字符集 + 特殊字符字符集

lib/core/variables/RANDOM_N.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_N

# Variable: RANDOM\_N

> `const` **RANDOM\_N**: `"0123456789"` = `'0123456789'`

Defined in: [lib/core.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L91)

数字字符集

lib/core/variables/RANDOM_U.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_U

# Variable: RANDOM\_U

> `const` **RANDOM\_U**: `"ABCDEFGHIJKLMNOPQRSTUVWXYZ"` = `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

Defined in: [lib/core.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L93)

大写字母字符集

lib/core/variables/RANDOM_UN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_UN

# Variable: RANDOM\_UN

> `const` **RANDOM\_UN**: `string`

Defined in: [lib/core.ts:98](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L98)

大写字母 + 数字字符集

lib/core/variables/RANDOM_V.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / RANDOM\_V

# Variable: RANDOM\_V

> `const` **RANDOM\_V**: `"ACEFGHJKLMNPRSTWXY34567"` = `'ACEFGHJKLMNPRSTWXY34567'`

Defined in: [lib/core.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L106)

验证码字符集

lib/core/variables/REAL_IP_CF.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / REAL\_IP\_CF

# Variable: REAL\_IP\_CF

> `const` **REAL\_IP\_CF**: `"cf-connecting-ip"` = `'cf-connecting-ip'`

Defined in: [lib/core.ts:355](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L355)

使用的是 Cloudflare

lib/core/variables/REAL_IP_X.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / REAL\_IP\_X

# Variable: REAL\_IP\_X

> `const` **REAL\_IP\_X**: `"x-forwarded-for"` = `'x-forwarded-for'`

Defined in: [lib/core.ts:353](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L353)

使用 X-Forwarded-For 的 CDN 厂商

lib/cron/functions/getRegulars.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / getRegulars

# Function: getRegulars()

> **getRegulars**(): [`IRegularData`](../interfaces/IRegularData.md)[]

Defined in: [lib/cron.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L17)

获取定时任务列表

## Returns

[`IRegularData`](../interfaces/IRegularData.md)[]

lib/cron/functions/regular.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / regular

# Function: regular()

> **regular**(`task`, `immediate`): `Promise`\<`boolean`\>

Defined in: [lib/cron.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L26)

创建定时执行的计划任务

## Parameters

### task

[`IRegular`](../interfaces/IRegular.md)

计划任务对象

### immediate

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

lib/cron/interfaces/IRegular.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegular

# Interface: IRegular

Defined in: [lib/cron.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L93)

定时任务

## Extended by

- [`IRegularData`](IRegularData.md)

## Properties

### callback()

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L99)

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

Defined in: [lib/cron.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L95)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L97)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

lib/cron/interfaces/IRegularData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / IRegularData

# Interface: IRegularData

Defined in: [lib/cron.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L102)

定时任务

## Extends

- [`IRegular`](IRegular.md)

## Properties

### callback()

> **callback**: (`date`, `immediate`) => `void` \| `Promise`\<`void`\>

Defined in: [lib/cron.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L99)

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

Defined in: [lib/cron.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L106)

总执行次数

***

### last

> **last**: `string`

Defined in: [lib/cron.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L104)

上次执行时间字符串，格式：YmdHi（系统时区）

***

### name

> **name**: `string`

Defined in: [lib/cron.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L95)

任务名称，只能小写字母、数字、短横线、下划线，长度 1-32

#### Inherited from

[`IRegular`](IRegular.md).[`name`](IRegular.md#name)

***

### rcount

> **rcount**: `number`

Defined in: [lib/cron.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L108)

定时任务重启后的执行次数

***

### rule

> **rule**: `string`

Defined in: [lib/cron.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L97)

规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒）

#### Inherited from

[`IRegular`](IRegular.md).[`rule`](IRegular.md#rule)

lib/crypto/functions/aesDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / aesDecrypt

# Function: aesDecrypt()

## Call Signature

> **aesDecrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:339](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L339)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:340](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L340)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:226](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L226)

AES 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:227](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L227)

AES 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:445](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L445)

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

Defined in: [lib/crypto.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L446)

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

Defined in: [lib/crypto.ts:431](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L431)

base64 编码

## Parameters

### data

字符串或 Buffer

`string` | `Buffer`\<`ArrayBufferLike`\>

## Returns

`string`

lib/crypto/functions/cipherDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / cipherDecrypt

# Function: cipherDecrypt()

> **cipherDecrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:276](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L276)

cipher 解密

## Parameters

### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

### key

`CipherKey`

密钥 32 个英文字母和数字

### iv

`string` = `''`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

### method

`string` = `AES_256_ECB`

加密方法

### output

输出类型

`"buffer"` | `"binary"`

## Returns

`string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

lib/crypto/functions/cipherEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / cipherEncrypt

# Function: cipherEncrypt()

> **cipherEncrypt**(`original`, `key`, `iv`, `method`, `output`): `string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:166](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L166)

cipher 加密，强烈不建议使用 AES_256_ECB

## Parameters

### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

### key

`CipherKey`

密钥 32 个英文字母和数字

### iv

`string` = `''`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

### method

`string` = `AES_256_ECB`

加密方法

### output

输出类型

`"buffer"` | `"base64"`

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

Defined in: [lib/crypto.ts:354](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L354)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:355](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L355)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L241)

AES GCM 托管加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L242)

AES GCM 托管加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

> **generateKeyPair**(`type`, `options`): `Promise`\<\{ `private`: `string` \| `Buffer`\<`ArrayBufferLike`\>; `public`: `string` \| `Buffer`\<`ArrayBufferLike`\>; \}\>

Defined in: [lib/crypto.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L18)

创建非对称秘钥

## Parameters

### type

`string`

如 rsa/ec

### options

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

lib/crypto/functions/hashHmac.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmac

# Function: hashHmac()

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key?`, `format?`): `string`

Defined in: [lib/crypto.ts:387](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L387)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

源数据

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key?

`CipherKey`

设置则采用 hmac 加密

#### format?

`"hex"` | `"base64"`

### Returns

`string`

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key`, `format`): `Buffer`

Defined in: [lib/crypto.ts:388](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L388)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

源数据

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

设置则采用 hmac 加密

`CipherKey` | `undefined`

#### format

`"buffer"`

### Returns

`Buffer`

lib/crypto/functions/hashHmacFile.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmacFile

# Function: hashHmacFile()

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key?`, `encoding?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/crypto.ts:406](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L406)

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

`"hex"` | `"base64"` | `"base64url"`

### Returns

`Promise`\<`string` \| `false`\>

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key`, `encoding`): `Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/crypto.ts:407](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L407)

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

lib/crypto/functions/privateDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / privateDecrypt

# Function: privateDecrypt()

> **privateDecrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L135)

非对称私钥解密

## Parameters

### key

私钥

`KeyLike` | `RsaPrivateKey`

### buffer

数据

`string` | `ArrayBufferView`\<`ArrayBufferLike`\>

## Returns

`Buffer`

lib/crypto/functions/privateEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / privateEncrypt

# Function: privateEncrypt()

> **privateEncrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L113)

非对称私钥加密

## Parameters

### key

私钥

`KeyLike` | `RsaPrivateKey`

### buffer

数据

`string` | `ArrayBufferView`\<`ArrayBufferLike`\>

## Returns

`Buffer`

lib/crypto/functions/publicDecrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / publicDecrypt

# Function: publicDecrypt()

> **publicDecrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L124)

非对称公钥解密

## Parameters

### key

公钥

`KeyLike` | `RsaPublicKey` | `RsaPrivateKey`

### buffer

数据

`string` | `ArrayBufferView`\<`ArrayBufferLike`\>

## Returns

`Buffer`

lib/crypto/functions/publicEncrypt.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / publicEncrypt

# Function: publicEncrypt()

> **publicEncrypt**(`key`, `buffer`): `Buffer`

Defined in: [lib/crypto.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L102)

非对称公钥加密

## Parameters

### key

公钥

`KeyLike` | `RsaPublicKey` | `RsaPrivateKey`

### buffer

数据

`string` | `ArrayBufferView`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L68)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

私钥

`KeyLike` | `SignKeyObjectInput` | `SignPrivateKeyInput` | `SignJsonWebKeyInput`

#### format

输出格式

`"hex"` | `"base64"` | `"binary"`

#### algorithm?

`string`

哈希方式

### Returns

`string`

## Call Signature

> **sign**(`data`, `privateKey`, `format?`, `algorithm?`): `Buffer`

Defined in: [lib/crypto.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L71)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

私钥

`KeyLike` | `SignKeyObjectInput` | `SignPrivateKeyInput` | `SignJsonWebKeyInput`

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

Defined in: [lib/crypto.ts:372](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L372)

SM4 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:373](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L373)

SM4 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:259](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L259)

SM4 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:260](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L260)

SM4 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/crypto.ts:459](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L459)

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

> **verify**(`data`, `object`, `signature`, `algorithm`): `boolean`

Defined in: [lib/crypto.ts:89](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L89)

非对称验签

## Parameters

### data

`BinaryLike`

数据

### object

证书

`KeyLike` | `VerifyKeyObjectInput` | `VerifyPublicKeyInput` | `VerifyJsonWebKeyInput`

### signature

`ArrayBufferView`

签名

### algorithm

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

Defined in: [lib/crypto.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L146)

一般不用，兼容性场景下用

lib/crypto/variables/AES_256_CTR.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_CTR

# Variable: AES\_256\_CTR

> `const` **AES\_256\_CTR**: `"aes-256-ctr"` = `'aes-256-ctr'`

Defined in: [lib/crypto.ts:148](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L148)

设置 iv 会自动切换为 CTR，流式下使用，非流直接使用 GCM

lib/crypto/variables/AES_256_ECB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_ECB

# Variable: AES\_256\_ECB

> `const` **AES\_256\_ECB**: `"aes-256-ecb"` = `'aes-256-ecb'`

Defined in: [lib/crypto.ts:144](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L144)

勿使用，无 iv 默认，但勿使用

lib/crypto/variables/AES_256_GCM.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / AES\_256\_GCM

# Variable: AES\_256\_GCM

> `const` **AES\_256\_GCM**: `"aes-256-gcm"` = `'aes-256-gcm'`

Defined in: [lib/crypto.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L150)

非流直接使用 GCM

lib/crypto/variables/SM4_CBC.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_CBC

# Variable: SM4\_CBC

> `const` **SM4\_CBC**: `"sm4-cbc"` = `'sm4-cbc'`

Defined in: [lib/crypto.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L154)

lib/crypto/variables/SM4_CFB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_CFB

# Variable: SM4\_CFB

> `const` **SM4\_CFB**: `"sm4-cfb"` = `'sm4-cfb'`

Defined in: [lib/crypto.ts:156](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L156)

SM4 一般用这个，设置 iv，自动就切换成了这个

lib/crypto/variables/SM4_ECB.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / SM4\_ECB

# Variable: SM4\_ECB

> `const` **SM4\_ECB**: `"sm4-ecb"` = `'sm4-ecb'`

Defined in: [lib/crypto.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L153)

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

`Connection` | `Client`

#### Returns

`Connection`

## Methods

### beginTransaction()

> **beginTransaction**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:317](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L317)

#### Returns

`Promise`\<`boolean`\>

***

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L338)

#### Returns

`Promise`\<`boolean`\>

***

### end()

> **end**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:306](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L306)

关闭连接，一般情况下不使用

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/conn.ts:233](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L233)

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

> **isAvailable**(`last`): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:154](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L154)

通过执行一条语句判断当前连接是否可用

#### Parameters

##### last

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

Defined in: [lib/db/conn.ts:356](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L356)

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

> **get**(`ctrEtc`, `opt`): [`Pool`](../pool/classes/Pool.md)

Defined in: [lib/db.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L68)

获取 Db Pool 对象

## Parameters

### ctrEtc

控制器对象或数据库配置信息

[`IConfigDb`](../../../index/interfaces/IConfigDb.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

选项

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

#### Type Declaration

\{ `affected`: `number`; `insert`: `number`; \}

#### affected

> **affected**: `number`

受影响的行数

#### insert

> **insert**: `number`

插入的 id

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

Defined in: [lib/db/pool.ts:189](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L189)

开启事务，返回事务对象并锁定连接，别人任何人不可用，有 ctr 的话必传 this，独立执行时可传 null

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) | `null`

#### Returns

`Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/pool.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L169)

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

### getQueries()

> **getQueries**(): `number`

Defined in: [lib/db/pool.ts:321](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L321)

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

Defined in: [lib/db/pool.ts:145](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L145)

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

### name

> **name**: `string`

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

> **new Transaction**(`ctr`, `conn`, `opts`): `Transaction`

Defined in: [lib/db/tran.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L28)

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) | `null`

##### conn

[`Connection`](../../conn/classes/Connection.md)

##### opts

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

Defined in: [lib/dns.ts:224](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L224)

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

Defined in: [lib/dns.ts:359](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L359)

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

Defined in: [lib/dns.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L158)

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

Defined in: [lib/dns.ts:290](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L290)

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

Defined in: [lib/dns.ts:404](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L404)

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

> `optional` **secretId**: `string`

Defined in: [lib/dns.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L31)

密钥键

***

### secretKey?

> `optional` **secretKey**: `string`

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

权限

`string` | `number`

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

> **copyFolder**(`from`, `to`, `ignore`): `Promise`\<`number`\>

Defined in: [lib/fs.ts:341](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L341)

复制文件夹里的内容到另一个地方，失败不会回滚

## Parameters

### from

`string`

源，末尾加 /

### to

`string`

目标，末尾加 /

### ignore

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

编码或配置

`BufferEncoding` | \{ `autoClose?`: `boolean`; `encoding?`: BufferEncoding \| undefined; `end?`: `number`; `flags?`: `string`; `start?`: `number`; \}

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

编码或配置

`BufferEncoding` | \{ `autoClose?`: `boolean`; `encoding?`: BufferEncoding \| undefined; `flags?`: `string`; `mode?`: `number`; `start?`: `number`; \}

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

`BufferEncoding` | \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

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

> **mkdir**(`path`, `mode`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:207](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L207)

深度创建目录，如果最末目录存在，则自动创建成功

## Parameters

### path

`string`

要创建的路径，如 /a/b/c/

### mode

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

> **putContent**(`path`, `data`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L93)

写入文件内容

## Parameters

### path

`string`

文件路径

### data

要写入的内容

`string` | `Buffer`\<`ArrayBufferLike`\>

### options

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

http 请求对象

`IncomingMessage` | `Http2ServerRequest`

### res

http 响应对象

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### stat?

文件的 stat（如果有）

`Stats` | `null`

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

仅 Windows，类型，默认 file

`"file"` | `"dir"` | `"junction"`

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

> **add**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L115)

添加一个值，存在则不变

#### Parameters

##### key

`string`

##### val

`string` | `number` | `object`

##### ttl

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

`"LEFT"` | `"RIGHT"`

##### deo

`"LEFT"` | `"RIGHT"`

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

`string` | `string`[]

##### timeout

`number`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string`\>\>

***

### decr()

> **decr**(`key`, `num`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:387](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L387)

自减

#### Parameters

##### key

`string`

##### num

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

`string` | `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L194)

检测 key 是否存在

#### Parameters

##### keys

单个或序列

`string` | `string`[]

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

值序列

`string` | `string`[]

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

> **hSet**(`key`, `field`, `val`, `mod`): `Promise`\<`boolean`\>

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

值

`string` | `number` | `object`

##### mod

空,nx(key不存在才建立)

`""` | `"nx"`

#### Returns

`Promise`\<`boolean`\>

***

### incr()

> **incr**(`key`, `num`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:359](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L359)

自增

#### Parameters

##### key

`string`

##### num

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

> **replace**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:129](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L129)

替换一个存在的值

#### Parameters

##### key

`string`

键

##### val

值

`string` | `number` | `object`

##### ttl

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

> **scan**(`cursor`, `pattern`, `count`): `Promise`\<`false` \| `IScanResult`\<`string`\>\>

Defined in: [lib/kv.ts:458](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L458)

根据条件获取服务器上的 keys

#### Parameters

##### cursor

`number` = `0`

##### pattern

`string` = `'*'`

例如 *

##### count

`number` = `10`

获取的条数

#### Returns

`Promise`\<`false` \| `IScanResult`\<`string`\>\>

***

### set()

> **set**(`key`, `val`, `ttl`, `mod`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L83)

设定一个值

#### Parameters

##### key

`string`

##### val

`string` | `number` | `object`

##### ttl

`number` = `0`

秒，0 为不限制

##### mod

设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）

`""` | `"nx"` | `"xx"`

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

成员

`string` | `Buffer`\<`ArrayBufferLike`\>

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

控制器或配置信息

[`IConfigKv`](../../../index/interfaces/IConfigKv.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### oetc?

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

可用来覆盖 ctr 的一些选项，如 index

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

Defined in: [lib/kv.ts:968](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L968)

连接信息

## Properties

### conn

> **conn**: `ICommandClient`

Defined in: [lib/kv.ts:972](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L972)

***

### host

> **host**: `string`

Defined in: [lib/kv.ts:969](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L969)

***

### index

> **index**: `number`

Defined in: [lib/kv.ts:971](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L971)

***

### port

> **port**: `number`

Defined in: [lib/kv.ts:970](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L970)

lib/kv/interfaces/IZRangeOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZRangeOptions

# Interface: IZRangeOptions

Defined in: [lib/kv.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L15)

## Properties

### by?

> `optional` **by**: `"SCORE"` \| `"LEX"`

Defined in: [lib/kv.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L22)

Range query type.

- SCORE: Query by score range
- LEX: Query by lexicographical range

***

### count?

> `optional` **count**: `number`

Defined in: [lib/kv.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L37)

Pagination count. Must be used together with offset.

***

### offset?

> `optional` **offset**: `number`

Defined in: [lib/kv.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L32)

Pagination offset. Must be used together with count.

***

### rev?

> `optional` **rev**: `boolean`

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

lib/lan/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/lan

# lib/lan

## Functions

- [card](functions/card.md)
- [scan](functions/scan.md)

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

lib/net/formdata/classes/FormData.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / FormData

# Class: FormData

Defined in: [lib/net/formdata.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L22)

## Extends

- `Readable`

## Constructors

### Constructor

> **new FormData**(`opts?`): `FormData`

Defined in: node\_modules/@types/node/stream.d.ts:163

#### Parameters

##### opts?

`ReadableOptions`\<`Readable`\>

#### Returns

`FormData`

#### Inherited from

`stream.Readable.constructor`

## Methods

### \_read()

> **\_read**(): `void`

Defined in: [lib/net/formdata.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L115)

间隔读取（on data 或 pipe 触发）

#### Returns

`void`

#### Overrides

`stream.Readable._read`

***

### getBoundary()

> **getBoundary**(): `string`

Defined in: [lib/net/formdata.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L93)

获取 boundary

#### Returns

`string`

***

### getLength()

> **getLength**(): `number`

Defined in: [lib/net/formdata.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L100)

获取总字节长度

#### Returns

`number`

***

### getSent()

> **getSent**(): `number`

Defined in: [lib/net/formdata.ts:107](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L107)

获取已发送的字节长度

#### Returns

`number`

***

### putFile()

> **putFile**(`key`, `path`, `fname?`): `Promise`\<`boolean`\>

Defined in: [lib/net/formdata.ts:67](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L67)

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

Defined in: [lib/net/formdata.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L50)

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

## Interfaces

- [IItem](interfaces/IItem.md)

lib/net/formdata/interfaces/IItem.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / IItem

# Interface: IItem

Defined in: [lib/net/formdata.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L12)

Item 对象

## Properties

### isFile

> **isFile**: `boolean`

Defined in: [lib/net/formdata.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L15)

***

### isString

> **isString**: `boolean`

Defined in: [lib/net/formdata.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L16)

***

### key

> **key**: `string`

Defined in: [lib/net/formdata.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L14)

key 键

***

### path

> **path**: `string`

Defined in: [lib/net/formdata.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L19)

***

### value

> **value**: `string`

Defined in: [lib/net/formdata.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L18)

值或者文件名

lib/net/functions/buildCookieQuery.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / buildCookieQuery

# Function: buildCookieQuery()

> **buildCookieQuery**(`cookie`, `uri`): `string`

Defined in: [lib/net.ts:468](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L468)

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

lib/net/functions/fetch.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / fetch

# Function: fetch()

> **fetch**(`input`, `init`): `Promise`\<`Response`\>

Defined in: [lib/net.ts:118](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L118)

发起一个原生 fetch 请求，增加了一些框架选项，注意：会抛出错误

## Parameters

### input

请求的 URL 或 Request 对象

`string` | `Request` | `URL`

### init

`RequestInit` & `object` = `{}`

增加 mproxy

## Returns

`Promise`\<`Response`\>

lib/net/functions/filterHeaders.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / filterHeaders

# Function: filterHeaders()

> **filterHeaders**(`headers`, `res?`, `filter?`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/net.ts:546](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L546)

剔除不代理的 header，返回新的 header

## Parameters

### headers

剔除前的 header

`IncomingHttpHeaders` | `IncomingHttpHeaders` | [`THttpHeaders`](../type-aliases/THttpHeaders.md)

### res?

直接设置头部而不返回，可置空

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### filter?

(`h`) => `boolean`

返回 true 则留下

## Returns

`Record`\<`string`, `string` \| `string`[]\>

lib/net/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / get

# Function: get()

> **get**(`u`, `opt`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L54)

发起一个 get 请求

## Parameters

### u

`string`

请求的 URL

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

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

Defined in: [lib/net.ts:530](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L530)

创建 FormData 对象

## Returns

[`FormData`](../formdata/classes/FormData.md)

lib/net/functions/mproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / mproxy

# Function: mproxy()

> **mproxy**(`ctr`, `auth`, `opt`): `Promise`\<`number`\>

Defined in: [lib/net.ts:582](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L582)

正向 mproxy 代理，注意提前处理不要自动处理 post 数据，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt

[`IMproxyOptions`](../interfaces/IMproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`number`\>

lib/net/functions/mproxyData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / mproxyData

# Function: mproxyData()

> **mproxyData**(`ctr`): `any`

Defined in: [lib/net.ts:631](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L631)

获取 mproxy 的附加数据

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

## Returns

`any`

lib/net/functions/open.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / open

# Function: open()

> **open**(`u`): [`Request`](../request/classes/Request.md)

Defined in: [lib/net.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L45)

创建一个请求对象

## Parameters

### u

`string`

## Returns

[`Request`](../request/classes/Request.md)

lib/net/functions/post.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / post

# Function: post()

> **post**(`u`, `data`, `opt`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L64)

发起一个 post 请求

## Parameters

### u

`string`

请求的 URL

### data

要发送的数据

`string` | `Record`\<`string`, `any`\> | `Buffer`\<`ArrayBufferLike`\> | `Readable`

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/postJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / postJson

# Function: postJson()

> **postJson**(`u`, `data`, `opt`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L79)

发起 JSON 请求

## Parameters

### u

`string`

网址

### data

数据

`any`[] | `Record`\<`string`, `any`\>

### opt

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

> **postJsonResponseJson**(`u`, `data`, `opt`): `Promise`\<`any`\>

Defined in: [lib/net.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L96)

发起 JSON 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### data

数据

`any`[] | `Record`\<`string`, `any`\>

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null

lib/net/functions/request.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / request

# Function: request()

> **request**(`u`, `data?`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L151)

发起一个请求

## Parameters

### u

`string`

### data?

`string` | `Record`\<`string`, `any`\> | `Buffer`\<`ArrayBufferLike`\> | `Readable`

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

配置项

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>

lib/net/functions/resetCookieSession.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / resetCookieSession

# Function: resetCookieSession()

> **resetCookieSession**(`cookie`): `void`

Defined in: [lib/net.ts:518](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L518)

模拟重启浏览器后的状态

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

## Returns

`void`

lib/net/functions/rproxy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/net.ts:649](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L649)

反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### route

`Record`\<`string`, `string`\>

要反代的路由

### opt

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>

lib/net/functions/setCookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / setCookie

# Function: setCookie()

> **setCookie**(`cookie`, `name`, `value`, `domain`, `opt`): `void`

Defined in: [lib/net.ts:330](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L330)

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

### opt

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

lib/net/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/net

# lib/net

## Interfaces

- [ICookie](interfaces/ICookie.md)
- [IMproxyOptions](interfaces/IMproxyOptions.md)
- [IRequestOptions](interfaces/IRequestOptions.md)
- [IRproxyOptions](interfaces/IRproxyOptions.md)

## Type Aliases

- [THttpHeaders](type-aliases/THttpHeaders.md)

## Functions

- [buildCookieQuery](functions/buildCookieQuery.md)
- [fetch](functions/fetch.md)
- [filterHeaders](functions/filterHeaders.md)
- [get](functions/get.md)
- [getCa](functions/getCa.md)
- [getFormData](functions/getFormData.md)
- [mproxy](functions/mproxy.md)
- [mproxyData](functions/mproxyData.md)
- [open](functions/open.md)
- [post](functions/post.md)
- [postJson](functions/postJson.md)
- [postJsonResponseJson](functions/postJsonResponseJson.md)
- [request](functions/request.md)
- [resetCookieSession](functions/resetCookieSession.md)
- [rproxy](functions/rproxy.md)
- [setCookie](functions/setCookie.md)

lib/net/interfaces/ICookie.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / ICookie

# Interface: ICookie

Defined in: [lib/net.ts:772](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L772)

Net Cookie 对象

## Properties

### domain

> **domain**: `string`

Defined in: [lib/net.ts:778](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L778)

***

### exp

> **exp**: `number`

Defined in: [lib/net.ts:776](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L776)

有效期秒级时间戳

***

### httponly

> **httponly**: `boolean`

Defined in: [lib/net.ts:780](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L780)

***

### name

> **name**: `string`

Defined in: [lib/net.ts:773](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L773)

***

### path

> **path**: `string`

Defined in: [lib/net.ts:777](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L777)

***

### secure

> **secure**: `boolean`

Defined in: [lib/net.ts:779](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L779)

***

### value

> **value**: `string`

Defined in: [lib/net.ts:774](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L774)

lib/net/interfaces/IMproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L727)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:736](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L736)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:730](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L730)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L734)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:732](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L732)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L733)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:738](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L738)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L729)

秒数

lib/net/interfaces/IRequestOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L702)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:723](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L723)

cookie 托管对象

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:708](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L708)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L713)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L710)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L712)

***

### method?

> `optional` **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data**: `any`

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L721)

默认为 default

***

### save?

> `optional` **save**: `string`

Defined in: [lib/net.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L711)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L706)

秒数

***

### type?

> `optional` **type**: `"form"` \| `"json"`

Defined in: [lib/net.ts:704](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L704)

lib/net/interfaces/IRproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:742](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L742)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:751](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L751)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:745](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L745)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:749](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L749)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:747](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L747)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:748](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L748)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:753](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L753)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data**: `any`

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:759](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L759)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:744](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L744)

秒数

lib/net/request/classes/Request.md
---

[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/request](../index.md) / Request

# Class: Request

Defined in: [lib/net/request.ts:10](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L10)

## Constructors

### Constructor

> **new Request**(`url`): `Request`

Defined in: [lib/net/request.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L21)

#### Parameters

##### url

`string`

#### Returns

`Request`

## Methods

### data()

> **data**(`data`): `this`

Defined in: [lib/net/request.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L29)

设置 get 或 post 的数据

#### Parameters

##### data

数据

`string` | `Record`\<`string`, `any`\> | `Buffer`\<`ArrayBufferLike`\> | `Readable`

#### Returns

`this`

***

### follow()

> **follow**(`follow`): `this`

Defined in: [lib/net/request.ts:86](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L86)

设置是否跟随请求方的 location，留空为跟随，不设置为不跟随

#### Parameters

##### follow

`number` = `5`

#### Returns

`this`

***

### get()

> **get**(): `this`

Defined in: [lib/net/request.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L46)

method get 方法别名

#### Returns

`this`

***

### headers()

> **headers**(`headers`): `this`

Defined in: [lib/net/request.ts:122](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L122)

批量设置提交的 headers

#### Parameters

##### headers

[`THttpHeaders`](../../type-aliases/THttpHeaders.md)

#### Returns

`this`

***

### hosts()

> **hosts**(`hosts`): `this`

Defined in: [lib/net/request.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L95)

设置域名 -> ip的对应键值，就像电脑里的 hosts 一样

#### Parameters

##### hosts

`string` | `Record`\<`string`, `string`\>

#### Returns

`this`

***

### json()

> **json**(): `this`

Defined in: [lib/net/request.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L69)

type json 方法别名

#### Returns

`this`

***

### local()

> **local**(`addr`): `this`

Defined in: [lib/net/request.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L113)

设置使用的本地网卡 IP

#### Parameters

##### addr

`string`

#### Returns

`this`

***

### method()

> **method**(`method`): `this`

Defined in: [lib/net/request.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L38)

设置 get 或 post 请求

#### Parameters

##### method

`"GET"` | `"POST"`

#### Returns

`this`

***

### post()

> **post**(): `this`

Defined in: [lib/net/request.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L53)

method post 方法别名

#### Returns

`this`

***

### request()

> **request**(`cookie?`): `Promise`\<[`Response`](../../response/classes/Response.md)\>

Defined in: [lib/net/request.ts:142](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L142)

发起请求

#### Parameters

##### cookie?

`Record`\<`string`, [`ICookie`](../../interfaces/ICookie.md)\>

#### Returns

`Promise`\<[`Response`](../../response/classes/Response.md)\>

***

### save()

> **save**(`save`): `this`

Defined in: [lib/net/request.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L104)

设置后将直接保存到本地文件，不会返回，save 为本地实体路径

#### Parameters

##### save

`string`

#### Returns

`this`

***

### setHeader()

> **setHeader**(`name`, `val`): `this`

Defined in: [lib/net/request.ts:132](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L132)

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

Defined in: [lib/net/request.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L77)

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

Defined in: [lib/net/request.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L61)

设置提交模式，json 还是普通 form

#### Parameters

##### type

`"form"` | `"json"`

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

`IResponse` | `null`

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

Defined in: [lib/net/response.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L55)

获取原生响应读取流对象

#### Returns

`Readable` \| `null`

***

### getStream()

> **getStream**(): `Readable` \| `null`

Defined in: [lib/net/response.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L48)

获取响应读取流对象

#### Returns

`Readable` \| `null`

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/net/response.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L41)

用户自定义的 content 内容

#### Parameters

##### v

内容值

`string` | `Buffer`\<`ArrayBufferLike`\>

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

Defined in: [lib/net.ts:764](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L764)

http headers

## Type Declaration

### http-code?

> `optional` **http-code**: `number`

### http-url?

> `optional` **http-url**: `string`

### http-version?

> `optional` **http-version**: `"1.1"` \| `"2.0"`

lib/s3/classes/S3.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / S3

# Class: S3

Defined in: [lib/s3.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L49)

## Constructors

### Constructor

> **new S3**(`ctr`, `opt`): `S3`

Defined in: [lib/s3.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L58)

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

Defined in: [lib/s3.ts:184](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L184)

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

Defined in: [lib/s3.ts:204](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L204)

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

### getObject()

> **getObject**(`key`, `bucket?`): `Promise`\<`false` \| `Readable` & `SdkStreamMixin` \| `Blob` & `SdkStreamMixin` \| `ReadableStream`\<`any`\> & `SdkStreamMixin` \| `undefined`\>

Defined in: [lib/s3.ts:164](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L164)

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

Defined in: [lib/s3.ts:226](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L226)

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

Defined in: [lib/s3.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L119)

上传对象（可传流且也可无需设置 length） --

#### Parameters

##### key

`string`

对象路径

##### content

内容

`string` | `Buffer`\<`ArrayBufferLike`\> | `Readable`

##### length?

设置 contentLength，如果是流模式则需要设置此项，也可以设置为对象参数

`number` | \{ `bucket?`: `string`; `disposition?`: `string`; `length?`: `number`; `type?`: `string`; \}

##### bucket?

`string`

bucket 名

#### Returns

`Promise`\<`false` \| `CompleteMultipartUploadCommandOutput`\>

***

### setBucket()

> **setBucket**(`bucket`): `void`

Defined in: [lib/s3.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L108)

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

Defined in: [lib/s3.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L26)

服务商定义

## Enumeration Members

### ALIBABA

> **ALIBABA**: `2`

Defined in: [lib/s3.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L29)

***

### AMAZON

> **AMAZON**: `0`

Defined in: [lib/s3.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L27)

***

### CF

> **CF**: `3`

Defined in: [lib/s3.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L30)

***

### TENCENT

> **TENCENT**: `1`

Defined in: [lib/s3.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L28)

lib/s3/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/s3](../index.md) / get

# Function: get()

> **get**(`ctr`, `opt`): [`S3`](../classes/S3.md)

Defined in: [lib/s3.ts:248](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L248)

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

Defined in: [lib/s3.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L34)

选项

## Properties

### account?

> `optional` **account**: `string`

Defined in: [lib/s3.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L38)

cf r2 使用

***

### bucket?

> `optional` **bucket**: `string`

Defined in: [lib/s3.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L46)

预定义 bucket

***

### region?

> `optional` **region**: `string`

Defined in: [lib/s3.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L44)

区域

***

### secretId?

> `optional` **secretId**: `string`

Defined in: [lib/s3.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L40)

密钥键

***

### secretKey?

> `optional` **secretKey**: `string`

Defined in: [lib/s3.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L42)

密钥值

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/s3.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/s3.ts#L36)

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

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

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

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

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

> **scanned**(`link`, `token`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:265](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L265)

对 token 执行访问操作，通常用户扫码后展示的网页所调用，代表已扫码

## Parameters

### link

Db 或 Kv

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

### token

`string`

必填

### opt

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

> **setData**(`link`, `token`, `data`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:323](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L323)

将数据写入 token，通常在客户的逻辑下去写，服务器会 poll 到

## Parameters

### link

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

### token

`string`

### data

`string` | `number` | `Record`\<`string`, `any`\>

### opt

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

> `optional` **ctr**: [`Ctr`](../../../sys/ctr/classes/Ctr.md)

Defined in: [lib/scan.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L32)

***

### name?

> `optional` **name**: `string`

Defined in: [lib/scan.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L34)

***

### pre?

> `optional` **pre**: `string`

Defined in: [lib/scan.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L33)

***

### ttl?

> `optional` **ttl**: `number`

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

> `optional` **ctr**: [`Ctr`](../../../sys/ctr/classes/Ctr.md)

Defined in: [lib/scan.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L39)

***

### name?

> `optional` **name**: `string`

Defined in: [lib/scan.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L41)

***

### pre?

> `optional` **pre**: `string`

Defined in: [lib/scan.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L40)

lib/session/classes/Session.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / Session

# Class: Session

Defined in: [lib/session.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L37)

## Constructors

### Constructor

> **new Session**(): `Session`

#### Returns

`Session`

## Methods

### getName()

> **getName**(): `string`

Defined in: [lib/session.ts:201](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L201)

获取当前的 cookie 的 name 值

#### Returns

`string`

***

### getToken()

> **getToken**(): `string`

Defined in: [lib/session.ts:194](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L194)

获取当前的 token 值

#### Returns

`string`

***

### init()

> **init**(`ctr`, `link`, `auth`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/session.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L65)

初始化函数，相当于 construct

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

模型实例

##### link

Kv 或 Db 实例

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

##### auth

`boolean` = `false`

设为 true 则优先从头 Authorization 或 post _auth 值读取 token

##### opt

[`IOptions`](../interfaces/IOptions.md) = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

false 表示系统错误

***

### update()

> **update**(): `Promise`\<`void`\>

Defined in: [lib/session.ts:208](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L208)

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

Defined in: [lib/session.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L30)

## Properties

### name?

> `optional` **name**: `string`

Defined in: [lib/session.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L31)

***

### sqlPre?

> `optional` **sqlPre**: `string`

Defined in: [lib/session.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L34)

***

### ssl?

> `optional` **ssl**: `boolean`

Defined in: [lib/session.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L33)

***

### ttl?

> `optional` **ttl**: `number`

Defined in: [lib/session.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L32)

lib/socket/functions/rwebsocket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/socket](../index.md) / rwebsocket

# Function: rwebsocket()

> **rwebsocket**(`port`, `url`, `opt`): `Server`

Defined in: [lib/socket.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L37)

创建一个 Socket 服务器并反代到 WebSocket

## Parameters

### port

`number`

监听端口

### url

`string`

反代到的 WebSocket

### opt

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

Defined in: [lib/socket.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L12)

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](../../net/interfaces/ICookie.md)\>

Defined in: [lib/socket.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L19)

cookie 托管对象

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/socket.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L17)

***

### hosts?

> `optional` **hosts**: `Record`\<`string`, `string`\>

Defined in: [lib/socket.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L15)

***

### local?

> `optional` **local**: `string`

Defined in: [lib/socket.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L16)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/socket.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L23)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../../ws/enumerations/EFrameReceiveMode.md)

Defined in: [lib/socket.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L21)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/socket.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L25)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/socket.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L14)

秒数

lib/sql/classes/Sql.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L23)

## Constructors

### Constructor

> **new Sql**(`opt`): `Sql`

Defined in: [lib/sql.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L47)

#### Parameters

##### opt

###### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

###### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

###### pre?

`string`

###### service

[`ESERVICE`](../enumerations/ESERVICE.md)

###### sql?

`string`[]

#### Returns

`Sql`

## Methods

### append()

> **append**(`sql`): `this`

Defined in: [lib/sql.ts:772](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L772)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d`): `this`

Defined in: [lib/sql.ts:573](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L573)

ORDER BY

#### Parameters

##### c

字段字符串或数组

`string` | (`string` \| `string`[])[]

##### d

排序规则

`"DESC"` | `"ASC"`

#### Returns

`this`

***

### copy()

> **copy**(`f?`, `opt?`): `Sql`

Defined in: [lib/sql.ts:641](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L641)

创建一个本对象的一个新的 sql 对象拷贝

#### Parameters

##### f?

可为空，可设置新对象的 table 名变化

`string` | `string`[]

##### opt?

###### where?

`any`

#### Returns

`Sql`

***

### crossJoin()

> **crossJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:388](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L388)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### delete()

> **delete**(`f`): `this`

Defined in: [lib/sql.ts:283](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L283)

'xx'

#### Parameters

##### f

`string`

表名

#### Returns

`this`

***

### field()

> **field**(`str`, `pre`, `suf`): `string`

Defined in: [lib/sql.ts:783](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L783)

对字段进行包裹

#### Parameters

##### str

`string` | `number` | (`string` \| `string`[])[]

##### pre

`string` = `''`

表前缀，仅请在 field 表名时倒入前缀

##### suf

`string` = `''`

表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS，可能是分表查询时用

#### Returns

`string`

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [lib/sql.ts:762](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L762)

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

> **fullJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:377](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L377)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### getData()

> **getData**(): [`DbValue`](../../../index/type-aliases/DbValue.md)[]

Defined in: [lib/sql.ts:746](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L746)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:753](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L753)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:730](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L730)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:597](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L597)

GROUP BY

#### Parameters

##### c

字段字符串或数组

`string` | `string`[]

#### Returns

`this`

***

### having()

> **having**(`s`): `this`

Defined in: [lib/sql.ts:395](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L395)

having 后置筛选器，用法类似 where

#### Parameters

##### s

`any` = `''`

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L366)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### insert()

> **insert**(`table`): `this`

Defined in: [lib/sql.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L71)

插入数据前导

#### Parameters

##### table

`string`

表名

#### Returns

`this`

***

### join()

> **join**(`f`, `s`, `type`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:318](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L318)

join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### type

`string` = `'INNER'`

类型

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### leftJoin()

> **leftJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:344](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L344)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b`): `this`

Defined in: [lib/sql.ts:617](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L617)

LIMIT（limit、offset, limit）

#### Parameters

##### a

`number`

起始（offset）

##### b

`number` = `0`

长度（limit）

#### Returns

`this`

***

### lock()

> **lock**(): `this`

Defined in: [lib/sql.ts:632](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L632)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### rightJoin()

> **rightJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:355](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L355)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### select()

> **select**(`c`, `f`): `this`

Defined in: [lib/sql.ts:174](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L174)

'*', 'xx'

#### Parameters

##### c

字段字符串或字段数组

`string` | (`string` \| `any`[])[]

##### f

表，允许多张表

`string` | `string`[]

#### Returns

`this`

***

### union()

> **union**(`lsql`, `type`): `this`

Defined in: [lib/sql.ts:295](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L295)

联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

##### type

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`lsql`): `this`

Defined in: [lib/sql.ts:306](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L306)

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

Defined in: [lib/sql.ts:215](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L215)

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

### upsert()

> **upsert**(`data`, `conflict?`): `this`

Defined in: [lib/sql.ts:140](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L140)

如果存在则更新不存在则插入（UPSERT）

#### Parameters

##### data

`any`

更新的数据

##### conflict?

冲突字段，PostgreSQL 用于指定 ON CONFLICT 字段；MySQL 时忽略，因为会对所有唯一键冲突执行更新

`string` | `string`[]

#### Returns

`this`

***

### values()

> **values**(`cs`, `vs`): `this`

Defined in: [lib/sql.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L85)

实际插入数据的数据

#### Parameters

##### cs

[] 数据列或字段列

`string`[] | `Record`\<`string`, [`DbValue`](../../../index/type-aliases/DbValue.md)\>

##### vs

[] | [][] 数据

[`DbValue`](../../../index/type-aliases/DbValue.md)[] | [`DbValue`](../../../index/type-aliases/DbValue.md)[][]

#### Returns

`this`

***

### where()

> **where**(`s`): `this`

Defined in: [lib/sql.ts:428](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L428)

筛选器
1. 'city': 'bj', 'type': '2'
2. ['type', '>', '1']
3. ['type', 'in', ['1', '2']]
4. 'type': ['1', '2']
5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2'
6. 'city_in': column('city_out')
7. ['JSON_CONTAINS(`uid`, ?)', ['hello']]

#### Parameters

##### s

`any`

筛选数据

#### Returns

`this`

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

Defined in: [lib/sql.ts:1095](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1095)

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

Defined in: [lib/sql.ts:1116](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1116)

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

> **format**(`sql`, `data`, `service`): `string`

Defined in: [lib/sql.ts:1066](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1066)

返回代入后的完整 SQL 字符串，这并不安全不能直接执行，只是用来调试打印 sql 语句

## Parameters

### sql

`string`

SQL 字符串

### data

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

DATA 数据

### service

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

Defined in: [lib/sql.ts:1039](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1039)

创建 sql 对象

## Parameters

### opt

参数

#### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

#### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### pre?

`string`

#### service

[`ESERVICE`](../enumerations/ESERVICE.md)

#### sql?

`string`[]

## Returns

[`Sql`](../classes/Sql.md)

lib/sql/index.md
---

[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / lib/sql

# lib/sql

## Enumerations

- [ESERVICE](enumerations/ESERVICE.md)

## Classes

- [Sql](classes/Sql.md)

## Functions

- [aoMix](functions/aoMix.md)
- [column](functions/column.md)
- [format](functions/format.md)
- [get](functions/get.md)

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

> `optional` **mproxy**: `object`

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

权限

`string` | `number`

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

编码或配置

`BufferEncoding` | `WriteStreamOptions`

#### Returns

`Writable`

***

### downloadFile()

> **downloadFile**(`remoteFile`, `localFile`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:442](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L442)

下载文件到本地

#### Parameters

##### remoteFile

`string`

远程路径

##### localFile

`string`

本地路径

##### options

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

`BufferEncoding` | \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

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

> **mkdir**(`path`, `mode`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L242)

深度创建目录，如果最末目录存在，则自动创建成功

#### Parameters

##### path

`string`

要创建的路径，如 /a/b/c/

##### mode

`number` = `0o755`

权限

#### Returns

`Promise`\<`boolean`\>

***

### pipe()

> **pipe**\<`T`\>(`path`, `destination`, `options`): `Promise`\<`boolean`\>

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

##### options

写入后是否终止写入流，默认终止

###### end?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### putContent()

> **putContent**(`path`, `data`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L109)

写入文件内容

#### Parameters

##### path

`string`

文件路径

##### data

要写入的内容

`string` | `Buffer`\<`ArrayBufferLike`\>

##### options

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

> **uploadFile**(`localFile`, `remoteFile`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L466)

上传本地文件到远程

#### Parameters

##### localFile

`string`

本地绝对路径

##### remoteFile

`string`

##### options

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

命令

`string` | `Buffer`\<`ArrayBufferLike`\>

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`void`\>

***

### getContent()

> **getContent**(`tryCount`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/ssh/shell.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L96)

获取返回值

#### Parameters

##### tryCount

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

指令

`string` | `Buffer`\<`ArrayBufferLike`\>

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

lib/text/functions/getFilename.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / getFilename

# Function: getFilename()

> **getFilename**(`path`): `string`

Defined in: [lib/text.ts:456](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L456)

获取文件名

## Parameters

### path

`string`

文件路径

## Returns

`string`

lib/text/functions/htmlescape.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / htmlescape

# Function: htmlescape()

> **htmlescape**(`html`): `string`

Defined in: [lib/text.ts:432](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L432)

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

> **int2str**(`int`, `digits`, `decimal`): `string`

Defined in: [lib/text.ts:647](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L647)

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

### digits

`number` = `4`

小数点左移位数

### decimal

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

Defined in: [lib/text.ts:234](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L234)

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

Defined in: [lib/text.ts:223](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L223)

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

Defined in: [lib/text.ts:192](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L192)

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

Defined in: [lib/text.ts:598](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L598)

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

Defined in: [lib/text.ts:346](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L346)

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

Defined in: [lib/text.ts:202](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L202)

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

Defined in: [lib/text.ts:212](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L212)

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

Defined in: [lib/text.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L338)

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

Defined in: [lib/text.ts:444](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L444)

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

Defined in: [lib/text.ts:606](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L606)

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

Defined in: [lib/text.ts:615](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L615)

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

Defined in: [lib/text.ts:323](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L323)

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

> **nlReplace**(`str`, `to`): `string`

Defined in: [lib/text.ts:243](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L243)

换行替换为别的

## Parameters

### str

`string`

要替换的字符串

### to

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

Defined in: [lib/text.ts:266](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L266)

解析域名并获取 tld/sld/domain/sub

## Parameters

### domain

`string`

域名

## Returns

`Promise`\<[`IDomain`](../interfaces/IDomain.md)\>

lib/text/functions/parseJson.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseJson

# Function: parseJson()

> **parseJson**(`str`): `any`

Defined in: [lib/text.ts:509](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L509)

将字符串解析为对象，返回 false 代表解析失败，支持 BigInt

## Parameters

### str

`string`

要解析的 json 字符串

## Returns

`any`

lib/text/functions/parseUrl.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseUrl

# Function: parseUrl()

> **parseUrl**(`url`): [`IUrlParse`](../../../index/interfaces/IUrlParse.md)

Defined in: [lib/text.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L28)

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

Defined in: [lib/text.ts:395](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L395)

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

> **queryStringify**(`query`, `encode`): `string`

Defined in: [lib/text.ts:374](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L374)

将对象转换为 query string

## Parameters

### query

`Record`\<`string`, `any`\>

要转换的对象

### encode

`boolean` = `true`

是否转义

## Returns

`string`

lib/text/functions/sizeFormat.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / sizeFormat

# Function: sizeFormat()

> **sizeFormat**(`size`, `spliter`): `string`

Defined in: [lib/text.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L15)

将文件大小格式化为带单位的字符串

## Parameters

### size

`number`

文件大小

### spliter

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

> **str2int**(`str`, `digits`): `number`

Defined in: [lib/text.ts:629](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L629)

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

### digits

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

Defined in: [lib/text.ts:552](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L552)

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

Defined in: [lib/text.ts:539](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L539)

将对象转换为 json 字符串，返回 false 代表解析失败，支持 BigInt

## Parameters

### obj

`any`

要转换的 json 对象

### space?

美化方式

`string` | `number`

## Returns

`string`

lib/text/functions/stringifyResult.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / stringifyResult

# Function: stringifyResult()

> **stringifyResult**(`rtn`): `string`

Defined in: [lib/text.ts:469](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L469)

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

Defined in: [lib/text.ts:560](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L560)

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

Defined in: [lib/text.ts:173](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L173)

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

> **urlResolve**(`from`, `to`): `string`

Defined in: [lib/text.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L111)

将相对路径根据基准路径进行转换

## Parameters

### from

`string`

基准路径

### to

`string`

相对路径

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

- [getFilename](functions/getFilename.md)
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

Defined in: [lib/text.ts:255](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L255)

解析后的 domain

## Properties

### domain

> **domain**: `string` \| `null`

Defined in: [lib/text.ts:258](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L258)

***

### sld

> **sld**: `string` \| `null`

Defined in: [lib/text.ts:257](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L257)

***

### sub

> **sub**: `string` \| `null`

Defined in: [lib/text.ts:259](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L259)

***

### tld

> **tld**: `string` \| `null`

Defined in: [lib/text.ts:256](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L256)

lib/text/type-aliases/TFalsy.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / TFalsy

# Type Alias: TFalsy

> **TFalsy** = `false` \| `""` \| `0` \| `null` \| `undefined` \| *typeof* `NaN`

Defined in: [lib/text.ts:592](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L592)

虚假值类型

lib/text/variables/REGEXP_ASCII.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_ASCII

# Variable: REGEXP\_ASCII

> `const` **REGEXP\_ASCII**: `RegExp`

Defined in: [lib/text.ts:228](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L228)

可打印的 ascii 字符集

lib/text/variables/REGEXP_DOMAIN.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_DOMAIN

# Variable: REGEXP\_DOMAIN

> `const` **REGEXP\_DOMAIN**: `RegExp`

Defined in: [lib/text.ts:216](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L216)

lib/text/variables/REGEXP_EMAIL.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_EMAIL

# Variable: REGEXP\_EMAIL

> `const` **REGEXP\_EMAIL**: `RegExp`

Defined in: [lib/text.ts:186](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L186)

lib/text/variables/REGEXP_IPV4.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_IPV4

# Variable: REGEXP\_IPV4

> `const` **REGEXP\_IPV4**: `RegExp`

Defined in: [lib/text.ts:196](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L196)

lib/text/variables/REGEXP_IPV6.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / REGEXP\_IPV6

# Variable: REGEXP\_IPV6

> `const` **REGEXP\_IPV6**: `RegExp`

Defined in: [lib/text.ts:206](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L206)

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

Defined in: [lib/time.ts:161](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L161)

将时间对象转换为时间字符串

## Parameters

### zone

时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准

`number` | [`Ctr`](../../../sys/ctr/classes/Ctr.md) | `null`

### f

`string`

转换格式

### date?

时间对象秒/毫秒级数字均可

`number` | `Date`

## Returns

`string`

lib/time/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / get

# Function: get()

> **get**(`ctr`, `opt`): [`Time`](../classes/Time.md)

Defined in: [lib/time.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L113)

创建获取一个时间对象

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

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

Defined in: [lib/time.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L151)

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

Date 对象可选

`string` | `Date`

### zone?

时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准

`number` | [`Ctr`](../../../sys/ctr/classes/Ctr.md) | `null`

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

> `optional` **data**: `string` \| `number`

Defined in: [lib/time.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L12)

字符串、时间戳（秒或毫秒）

***

### zone?

> `optional` **zone**: `number`

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

lib/vector/classes/Vector.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / Vector

# Class: Vector

Defined in: [lib/vector.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L31)

## Constructors

### Constructor

> **new Vector**(`etc`): `Vector`

Defined in: [lib/vector.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L36)

#### Parameters

##### etc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md)

#### Returns

`Vector`

## Methods

### delete()

> **delete**(`data`): `Promise`\<`false` \| `MutationResult`\>

Defined in: [lib/vector.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L104)

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

`Promise`\<`false` \| `MutationResult`\>

***

### insert()

> **insert**(`data`): `Promise`\<`false` \| `MutationResult`\>

Defined in: [lib/vector.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L79)

插入数据

#### Parameters

##### data

###### collection

`string`

表名

###### data

`RowData`[]

要插入的数据

#### Returns

`Promise`\<`false` \| `MutationResult`\>

***

### seach()

> **seach**(`data`): `Promise`\<`false` \| `SearchResults`\<\{ `collection_name`: `string`; `data`: `number`[]; `filter`: `string` \| `undefined`; `limit`: `number`; `metric_type`: `"L2"` \| `"IP"` \| `"COSINE"`; `output_fields`: `string`[] \| `undefined`; \}\>\>

Defined in: [lib/vector.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L42)

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

`Promise`\<`false` \| `SearchResults`\<\{ `collection_name`: `string`; `data`: `number`[]; `filter`: `string` \| `undefined`; `limit`: `number`; `metric_type`: `"L2"` \| `"IP"` \| `"COSINE"`; `output_fields`: `string`[] \| `undefined`; \}\>\>

lib/vector/functions/get.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / get

# Function: get()

> **get**(`ctrEtc`): [`Vector`](../classes/Vector.md)

Defined in: [lib/vector.ts:165](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L165)

创建一个 Vector 对象

## Parameters

### ctrEtc

控制器或配置信息

[`IConfigVector`](../../../index/interfaces/IConfigVector.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

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

Defined in: [lib/vector.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L18)

选项

## Properties

### host?

> `optional` **host**: `string`

Defined in: [lib/vector.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L20)

主机地址

***

### name?

> `optional` **name**: `string`

Defined in: [lib/vector.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L24)

数据库名称

***

### port?

> `optional` **port**: `number`

Defined in: [lib/vector.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L22)

端口号

***

### pwd?

> `optional` **pwd**: `string`

Defined in: [lib/vector.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L28)

密码

***

### user?

> `optional` **user**: `string`

Defined in: [lib/vector.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L26)

用户名

lib/ws/classes/Socket.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L95)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L100)

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

Defined in: [lib/ws.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L338)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:343](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L343)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:350](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L350)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:333](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L333)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L123)

以客户端形式发起链接

#### Parameters

##### u

`string`

以 ws, wss 开头的地址

##### opt

[`IConnectOptions`](../interfaces/IConnectOptions.md) = `{}`

参数

#### Returns

`Promise`\<`Socket` \| `null`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [lib/ws.ts:304](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L304)

#### Returns

`void`

***

### end()

> **end**(): `void`

Defined in: [lib/ws.ts:300](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L300)

#### Returns

`void`

***

### on()

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:260](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L260)

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

Defined in: [lib/ws.ts:264](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L264)

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

Defined in: [lib/ws.ts:265](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L265)

绑定监听

##### Parameters

###### event

`"end"` | `"close"` | `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:355](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L355)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L366)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:325](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L325)

发送二进制

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:317](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L317)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:309](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L309)

发送文本

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

lib/ws/enumerations/EFrameReceiveMode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / EFrameReceiveMode

# Enumeration: EFrameReceiveMode

Defined in: [lib/ws.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L17)

一般用 SIMPLE

## Enumeration Members

### LITE

> **LITE**: `1`

Defined in: [lib/ws.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L19)

***

### SIMPLE

> **SIMPLE**: `2`

Defined in: [lib/ws.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L20)

***

### STANDARD

> **STANDARD**: `0`

Defined in: [lib/ws.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L18)

lib/ws/enumerations/EOpcode.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / EOpcode

# Enumeration: EOpcode

Defined in: [lib/ws.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L24)

OPCODE

## Enumeration Members

### BINARY

> **BINARY**: `2`

Defined in: [lib/ws.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L27)

***

### CLOSE

> **CLOSE**: `8`

Defined in: [lib/ws.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L28)

***

### CONTINUATION

> **CONTINUATION**: `0`

Defined in: [lib/ws.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L25)

***

### PING

> **PING**: `9`

Defined in: [lib/ws.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L29)

***

### PONG

> **PONG**: `10`

Defined in: [lib/ws.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L30)

***

### TEXT

> **TEXT**: `1`

Defined in: [lib/ws.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L26)

lib/ws/functions/connect.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / connect

# Function: connect()

> **connect**(`u`, `opt`): `Promise`\<[`Socket`](../classes/Socket.md) \| `null`\>

Defined in: [lib/ws.ts:383](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L383)

创建一个 ws 客户端发起 ws 请求

## Parameters

### u

`string`

以 ws, wss 开头的地址

### opt

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

Defined in: [lib/ws.ts:393](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L393)

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

> **mproxy**(`ctr`, `auth`, `opt`): `Promise`\<`number`\>

Defined in: [lib/ws.ts:481](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L481)

正向 mproxy 代理，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt

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

> **rproxy**(`ctr`, `url`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/ws.ts:518](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L518)

反向代理，将本 socket 连接反代到其他网址，在 ws 的 onLoad 事件中使用

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### url

`string`

反代真实请求地址，如有 get 需要自行添加

### opt

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

Defined in: [lib/ws.ts:547](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L547)

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

Defined in: [lib/ws.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L34)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](../../net/interfaces/ICookie.md)\>

Defined in: [lib/ws.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L42)

cookie 托管对象

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L40)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L38)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/ws.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L39)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/ws.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L46)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L44)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/ws.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L48)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/ws.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L36)

秒数

lib/ws/interfaces/IMproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/ws.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L55)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/ws.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L63)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L61)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L59)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/ws.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L60)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/ws.ts:67](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L67)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L65)

小帧模式，默认 false

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/ws.ts:57](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L57)

秒数

lib/ws/interfaces/IRproxyOptions.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/ws.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L71)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/ws.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L79)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L77)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L75)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/ws.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L76)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/ws.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L83)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L81)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/ws.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L85)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/ws.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L73)

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

> **generate**\<`T`\>(`options`): `Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\]\>

Defined in: [lib/zip.ts:350](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L350)

打包 zip

#### Type Parameters

##### T

`T` *extends* keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

#### Parameters

##### options

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

> **putContent**\<`T`\>(`path`, `data`, `options`): `void`

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

##### options

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

> **brotliCompress**(`buffer`, `options`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:212](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L212)

Brotli 压缩一段

## Parameters

### buffer

`InputType`

段

### options

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

段

`InputType` | `null`

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

> **createBrotliCompress**(`options`): `BrotliCompress`

Defined in: [lib/zlib.ts:57](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L57)

创建 Brotli 压缩对象

## Parameters

### options

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

> **createCompress**(`types`, `options`): [`ICompress`](../interfaces/ICompress.md) \| `null`

Defined in: [lib/zlib.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L74)

根据字符串创建压缩类型

## Parameters

### types

`string`

用 , 间隔的字符串，如 gzip,deflate

### options

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

> **createDeflate**(`options`): `Deflate`

Defined in: [lib/zlib.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L41)

创建 Deflate 对象

## Parameters

### options

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

> **createGzip**(`options`): `Gzip`

Defined in: [lib/zlib.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L25)

创建 Gzip 对象

## Parameters

### options

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

段

`InputType` | `null`

## Returns

`Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

lib/zlib/functions/deflate.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / deflate

# Function: deflate()

> **deflate**(`buffer`, `options`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:176](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L176)

Deflate 压缩一段

## Parameters

### buffer

`InputType`

段

### options

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

> **gzip**(`buffer`, `options`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/zlib.ts:140](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L140)

Gzip 压缩一段

## Parameters

### buffer

`InputType`

段

### options

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

`IncomingMessage` | `Http2ServerRequest`

##### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

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

页面浏览器客户端缓存

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

> `protected` `optional` **\_timer**: `object`

Defined in: [sys/ctr.ts:125](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L125)

timeout 的 timer

#### callback()

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

获取当前过期时间

##### Returns

`number`

#### Set Signature

> **set** **timeout**(`num`): `void`

Defined in: [sys/ctr.ts:139](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L139)

设置当前过期时间

##### Parameters

###### num

`number`

##### Returns

`void`

## Methods

### \_asyncTask()

> `protected` **\_asyncTask**(`func`): `void`

Defined in: [sys/ctr.ts:168](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L168)

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

Defined in: [sys/ctr.ts:356](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L356)

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

Defined in: [sys/ctr.ts:524](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L524)

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

> `protected` **\_cross**(): `boolean`

Defined in: [sys/ctr.ts:738](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L738)

开启跨域请求
返回 true 接续执行，返回 false 需要中断用户本次访问（options请求）

#### Returns

`boolean`

***

### \_device()

> `protected` **\_device**(): `"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

Defined in: [sys/ctr.ts:563](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L563)

根据用户 ua 获取当前用户的设备类型

#### Returns

`"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

***

### \_enabledXsrf()

> `protected` **\_enabledXsrf**(): `void`

Defined in: [sys/ctr.ts:535](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L535)

当前页面开启 XSRF 支持（主要检测 cookie 是否存在）
如果当前页面有 CDN，请不要使用

#### Returns

`void`

***

### \_end()

> `protected` **\_end**(): `void`

Defined in: [sys/ctr.ts:821](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L821)

主动关闭当前 socket 连接

#### Returns

`void`

***

### \_getBasicAuth()

> `protected` **\_getBasicAuth**(`user`, `pwd`): `string`

Defined in: [sys/ctr.ts:556](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L556)

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

Defined in: [sys/ctr.ts:730](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L730)

获取当前语言名

#### Returns

`string`

***

### \_getLocaleJsonString()

> `protected` **\_getLocaleJsonString**(): `string`

Defined in: [sys/ctr.ts:718](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L718)

根据当前后台语言包设置情况获取 JSON 字符串传输到前台

#### Returns

`string`

string

***

### \_getMemoryUsage()

> `protected` **\_getMemoryUsage**(): `number`

Defined in: [sys/ctr.ts:309](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L309)

获取截止当前内存的使用情况

#### Returns

`number`

***

### \_getRunTime()

> `protected` **\_getRunTime**(`ms`): `number`

Defined in: [sys/ctr.ts:301](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L301)

获取截止当前时间的总运行时间

#### Parameters

##### ms

`boolean` = `false`

为 true 为毫秒，否则为秒

#### Returns

`number`

***

### \_handleFormData()

> `protected` **\_handleFormData**(`events`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:829](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L829)

获取 formdata 的信息

#### Parameters

##### events

文件处理情况

###### onfiledata?

(`chunk`) => `void`

###### onfileend?

() => `void`

###### onfilestart?

(`name`) => `boolean` \| `undefined`

#### Returns

`Promise`\<`boolean`\>

***

### \_l()

> **\_l**(`key`, `data?`): `string`

Defined in: [sys/ctr.ts:756](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L756)

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

Defined in: [sys/ctr.ts:621](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L621)

获取 data 数据

#### Parameters

##### path

`string`

文件路径（不含扩展名）

#### Returns

`Promise`\<`Record`\<`string`, `string`\> \| `null`\>

***

### \_loadLocale()

> `protected` **\_loadLocale**(`loc`, `pkg`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:669](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L669)

设定语言并加载语言包

#### Parameters

##### loc

`string`

要加载的目标语言

##### pkg

`string` = `'default'`

包名，为空自动填充为 default

#### Returns

`Promise`\<`boolean`\>

***

### \_loadView()

> `protected` **\_loadView**(`path`, `data`): `Promise`\<`string`\>

Defined in: [sys/ctr.ts:318](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L318)

加载视图

#### Parameters

##### path

`string`

##### data

`any` = `{}`

#### Returns

`Promise`\<`string`\>

***

### \_location()

> `protected` **\_location**(`location`): `false`

Defined in: [sys/ctr.ts:639](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L639)

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

Defined in: [sys/ctr.ts:806](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L806)

发送 socket ping

#### Parameters

##### data?

要发送的信息

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### \_pong()

> `protected` **\_pong**(`data?`): `boolean`

Defined in: [sys/ctr.ts:814](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L814)

发送 socket pong

#### Parameters

##### data?

要发送的信息

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### \_startSession()

> `protected` **\_startSession**(`link`, `auth`, `opt`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:653](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L653)

开启 Session

#### Parameters

##### link

Kv 或 Db 实例

[`Pool`](../../../lib/db/pool/classes/Pool.md) | [`Kv`](../../../lib/kv/classes/Kv.md)

##### auth

`boolean` = `false`

设为 true 则从头 Authorization 或 post _auth 值读取 token

##### opt

[`IOptions`](../../../lib/session/interfaces/IOptions.md) = `{}`

name, ttl, ssl, sqlPre

#### Returns

`Promise`\<`boolean`\>

***

### \_writeBinary()

> `protected` **\_writeBinary**(`data`): `boolean`

Defined in: [sys/ctr.ts:798](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L798)

发送 socket 二进制

#### Parameters

##### data

要发送的信息

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### \_writeResult()

> `protected` **\_writeResult**(`data`): `boolean`

Defined in: [sys/ctr.ts:790](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L790)

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

Defined in: [sys/ctr.ts:782](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L782)

发送 socket 文本

#### Parameters

##### data

要发送的信息

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### getAuthorization()

> **getAuthorization**(): `string` \| `false` \| \{ `pwd`: `string`; `user`: `string`; \}

Defined in: [sys/ctr.ts:584](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L584)

通过 header 或 _auth 获取鉴权信息或 JWT 信息（不解析）

#### Returns

`string` \| `false` \| \{ `pwd`: `string`; `user`: `string`; \}

***

### getPrototype()

#### Call Signature

> **getPrototype**(`name`): [`IConfig`](../../../index/interfaces/IConfig.md)

Defined in: [sys/ctr.ts:192](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L192)

获取类内部的 prototype

##### Parameters

###### name

`"_config"`

##### Returns

[`IConfig`](../../../index/interfaces/IConfig.md)

#### Call Signature

> **getPrototype**(`name`): [`Session`](../../../lib/session/classes/Session.md) \| `null`

Defined in: [sys/ctr.ts:193](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L193)

获取类内部的 prototype

##### Parameters

###### name

`"_sess"`

##### Returns

[`Session`](../../../lib/session/classes/Session.md) \| `null`

#### Call Signature

> **getPrototype**(`name`): `IncomingHttpHeaders`

Defined in: [sys/ctr.ts:194](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L194)

获取类内部的 prototype

##### Parameters

###### name

`"_headers"`

##### Returns

`IncomingHttpHeaders`

#### Call Signature

> **getPrototype**(`name`): `IncomingMessage` \| `Http2ServerRequest`

Defined in: [sys/ctr.ts:195](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L195)

获取类内部的 prototype

##### Parameters

###### name

`"_req"`

##### Returns

`IncomingMessage` \| `Http2ServerRequest`

#### Call Signature

> **getPrototype**(`name`): `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

Defined in: [sys/ctr.ts:196](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L196)

获取类内部的 prototype

##### Parameters

###### name

`"_res"`

##### Returns

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### Call Signature

> **getPrototype**(`name`): [`Socket`](../../../lib/ws/classes/Socket.md)

Defined in: [sys/ctr.ts:197](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L197)

获取类内部的 prototype

##### Parameters

###### name

`"_socket"`

##### Returns

[`Socket`](../../../lib/ws/classes/Socket.md)

#### Call Signature

> **getPrototype**(`name`): `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

Defined in: [sys/ctr.ts:198](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L198)

获取类内部的 prototype

##### Parameters

###### name

`"_get"` | `"_rawPost"` | `"_post"` | `"_session"`

##### Returns

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

#### Call Signature

> **getPrototype**(`name`): `string`

Defined in: [sys/ctr.ts:199](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L199)

获取类内部的 prototype

##### Parameters

###### name

`"_input"`

##### Returns

`string`

#### Call Signature

> **getPrototype**(`name`): `any`

Defined in: [sys/ctr.ts:200](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L200)

获取类内部的 prototype

##### Parameters

###### name

`string`

##### Returns

`any`

***

### onClose()

> **onClose**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:288](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L288)

WebSocket 下连接被终止后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onData()

> **onData**(`data`, `opcode`): `any`

Defined in: [sys/ctr.ts:253](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L253)

WebSocket 下当收到数据时会自动被调用的事件，即只文本和二进制数据，返回内容会被发送给 socket
但返回 false 连接会被中断，什么都不返回则什么都不做

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\>

##### opcode

[`EOpcode`](../../../lib/ws/enumerations/EOpcode.md)

#### Returns

`any`

***

### onDrain()

> **onDrain**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:274](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L274)

WebSocket 下连接恢复可写入状态后会调用此事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onEnd()

> **onEnd**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:281](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L281)

WebSocket 下连接被 end 后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onLoad()

> **onLoad**(): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:217](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L217)

实例化后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

***

### onMessage()

> **onMessage**(`data`, `opcode`): `boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

Defined in: [sys/ctr.ts:265](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L265)

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

Defined in: [sys/ctr.ts:225](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L225)

onLoad 执行后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

***

### onReqStart()

> **onReqStart**(): `number` \| `Promise`\<`number`\>

Defined in: [sys/ctr.ts:293](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L293)

请求发送开始时调用，返回 -1-流程中断，一般用于代理/反代,0-框架不会自动处理 post,1-自动处理(默认)（仅会在 middle 内触发）

#### Returns

`number` \| `Promise`\<`number`\>

***

### onUnload()

> **onUnload**(`rtn`): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:234](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L234)

整个结束前会执行本方法，可重写此方法对输出结果再处理一次（Websocket 模式无效）

#### Parameters

##### rtn

之前用户的输出结果

`string` | `boolean` | [`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

***

### onUpgrade()

> **onUpgrade**(): `object`

Defined in: [sys/ctr.ts:242](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L242)

WebSocket 下在建立 Server 连接之前可对 WebSocket 的信息进行配置

#### Returns

`object`

##### headers?

> `optional` **headers**: `OutgoingHttpHeaders`

##### timeout?

> `optional` **timeout**: `number`

***

### setPrototype()

> **setPrototype**(`name`, `val`): `void`

Defined in: [sys/ctr.ts:206](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L206)

设置类内部的 prototype

#### Parameters

##### name

`string`

##### val

`string` | `string`[] | `Record`\<`string`, `any`\> | `IncomingHttpHeaders` | [`Session`](../../../lib/session/classes/Session.md) | [`Socket`](../../../lib/ws/classes/Socket.md) | `null`

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

Defined in: [sys/mod.ts:113](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L113)

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

> `protected` `optional` **\_ctr**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

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

> `protected` `static` `optional` **\_$pre**: `string`

Defined in: [sys/mod.ts:80](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L80)

前缀，顺序：选项前缀 -> 本前缀 -> 配置文件前缀

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

Defined in: [sys/mod.ts:1750](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1750)

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

Defined in: [sys/mod.ts:1117](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1117)

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

Defined in: [sys/mod.ts:1118](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1118)

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

Defined in: [sys/mod.ts:1292](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1292)

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

Defined in: [sys/mod.ts:1293](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1293)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

***

### append()

> **append**(`sql`): `this`

Defined in: [sys/mod.ts:1659](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1659)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d`): `this`

Defined in: [sys/mod.ts:1615](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1615)

ORDER BY

#### Parameters

##### c

字段字符串或数组

`string` | (`string` \| `string`[])[]

##### d

排序规则

`"DESC"` | `"ASC"`

#### Returns

`this`

***

### contain()

> **contain**(`contain`): `this`

Defined in: [sys/mod.ts:1668](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1668)

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

Defined in: [sys/mod.ts:1481](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1481)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1501](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1501)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:817](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L817)

创建数据

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-报错,null-唯一键非 _$key 键冲突

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1575](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1575)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

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

Defined in: [sys/mod.ts:1414](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1414)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1415](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1415)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1593](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1593)

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

Defined in: [sys/mod.ts:1006](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1006)

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1010](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1010)

##### Parameters

###### lock?

`boolean`

###### array?

`false`

##### Returns

`Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

***

### firstArray()

> **firstArray**(`lock`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1050](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1050)

获取数据库第一个原生对象

#### Parameters

##### lock

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [sys/mod.ts:1695](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1695)

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

> **fullJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1563](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1563)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### get()

> **get**(`n`): `any`

Defined in: [sys/mod.ts:809](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L809)

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

Defined in: [sys/mod.ts:1686](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1686)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:1679](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1679)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1624](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1624)

GROUP BY

#### Parameters

##### c

字段字符串或数组

`string` | `string`[]

#### Returns

`this`

***

### having()

> **having**(`s`): `this`

Defined in: [sys/mod.ts:1584](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1584)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1551](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1551)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### join()

> **join**(`f`, `s`, `type`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1515](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1515)

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### type

`string` = `'INNER'`

类型

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### langText()

> **langText**(`col`, `lang`): `string`

Defined in: [sys/mod.ts:1730](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1730)

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

> **leftJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1527](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1527)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b`): `this`

Defined in: [sys/mod.ts:1637](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1637)

LIMIT

#### Parameters

##### a

`number`

起始

##### b

`number` = `0`

长度

#### Returns

`this`

***

### page()

> **page**(`count`, `page`): `this`

Defined in: [sys/mod.ts:1648](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1648)

分页

#### Parameters

##### count

`number`

每页条数

##### page

`number` = `1`

当前页数

#### Returns

`this`

***

### refresh()

> **refresh**(`lock`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:931](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L931)

刷新当前模型获取最新数据

#### Parameters

##### lock

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:988](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L988)

移除本条目

#### Returns

`Promise`\<`boolean`\>

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1539](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1539)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### save()

> **save**(`where?`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:959](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L959)

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

Defined in: [sys/mod.ts:770](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L770)

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

Defined in: [sys/mod.ts:771](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L771)

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

Defined in: [sys/mod.ts:1702](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1702)

获取值对象，获取的是新创建的数组

#### Type Parameters

##### TC

`TC` *extends* (...`args`) => `any`

#### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

***

### total()

> **total**(`f`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1457](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1457)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### union()

> **union**(`f`, `type`): `this`

Defined in: [sys/mod.ts:1061](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1061)

联合查询表数据

#### Parameters

##### f

要联合查询的表列表、单个表、sql 对象

`string` | `string`[] | [`Sql`](../../../lib/sql/classes/Sql.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

##### type

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`f`): `this`

Defined in: [sys/mod.ts:1091](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1091)

所有联合查询表数据

#### Parameters

##### f

要联合查询的表列表、单个表、sql 对象

`string` | `string`[] | [`Sql`](../../../lib/sql/classes/Sql.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

#### Returns

`this`

***

### unsaved()

> **unsaved**(): `boolean`

Defined in: [sys/mod.ts:1721](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1721)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:1710](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1710)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:901](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L901)

插入数据，如果存在则更新（UPSERT）

#### Parameters

##### conflict

冲突字段，不能为 _$key 或 _$primary，应该是你要判断的唯一索引字段

`string` | `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### where()

> **where**(`s`): `this`

Defined in: [sys/mod.ts:1604](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1604)

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

Defined in: [sys/mod.ts:168](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L168)

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

> `static` **find**\<`T`\>(`db`, `val`, `opt`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:597](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L597)

根据主键（或 key 字段）获取对象

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### val

主键值

`string` | `number` | `null`

##### opt

选项

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

> `static` **getCreate**\<`T`\>(`db`, `opt`): `T`

Defined in: [sys/mod.ts:579](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L579)

获取创建对象，通常用于新建数据库条目

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### opt

选项

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

Defined in: [sys/mod.ts:183](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L183)

添加一个序列（允许超过 65536 的占位符会被拆分多次执行）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### cs

字段列表

`string`[] | `Record`\<`string`, `any`\>

##### vs?

数据列表

`any`[] | `any`[][]

##### opt?

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### insertSql()

> `static` **insertSql**(`db`, `cs`, `vs?`, `opt?`): `string`

Defined in: [sys/mod.ts:242](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L242)

获取添加一个序列的模拟 SQL

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### cs

字段列表

`string`[] | `Record`\<`string`, `any`\>

##### vs?

数据列表

`any`[] | `any`[][]

##### opt?

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`string`

***

### one()

通过 where 条件筛选单条数据

#### Param

数据库对象

#### Param

筛选条件数组或字符串

#### Param

选项

#### Call Signature

> `static` **one**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:624](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L624)

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

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

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> `static` **one**\<`T`\>(`db`, `s`, `opt`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:636](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L636)

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

###### array?

`false`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### oneArray()

> `static` **oneArray**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:711](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L711)

通过 where 条件筛选单条数据返回原生对象

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### s

`any`

筛选条件数组或字符串

##### opt

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

###### select?

`string` \| `string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### primarys()

> `static` **primarys**(`db`, `where`, `opt`): `Promise`\<`false` \| `any`[]\>

Defined in: [sys/mod.ts:731](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L731)

根据 where 条件获取主键值列表

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any` = `''`

where 条件

##### opt

选项

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

> `static` **removeByWhere**(`db`, `where`, `opt`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:267](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L267)

根据条件移除条目

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **removeByWhereSql**(`db`, `where`, `opt`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:311](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L311)

根据条件移除条目（仅获取 SQL 对象）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **select**\<`T`\>(`db`, `c`, `opt`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:520](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L520)

select 自定字段

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### c

字段字符串或字段数组

`string` | `string`[]

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

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T` & `Record`\<`string`, `any`\>

***

### toArrayByRecord()

> `static` **toArrayByRecord**\<`T`\>(`obj`): `Record`\<`string`, `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:758](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L758)

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

> `static` **updateByWhere**(`db`, `data`, `where`, `opt`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:344](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L344)

根据条件更新数据

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **updateByWhereSql**(`db`, `data`, `where`, `opt`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:390](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L390)

根据条件更新数据（仅获取 SQL 对象）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **updateList**(`db`, `data`, `key`, `opt`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:424](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L424)

批量更新数据

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`Record`\<`string`, `any`\>[]

数据列表

##### key

`string`

用于定位的主键或唯一键字段名

##### opt

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### where()

> `static` **where**\<`T`\>(`db`, `s`, `opt`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:550](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L550)

通过 where 条件获取模型

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### s

`any` = `''`

筛选条件数组或字符串

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

> **new Rows**\<`T`\>(`initialItems`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:23](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L23)

#### Parameters

##### initialItems

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

> **map**\<`TU`\>(`allbackfn`): `TU`[]

Defined in: [sys/mod.ts:48](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L48)

重塑对象内容为数组

#### Type Parameters

##### TU

`TU`

#### Parameters

##### allbackfn

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

Defined in: [sys/mod.ts:1764](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1764)

## Properties

### field

> **field**: `string`

Defined in: [sys/mod.ts:1765](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1765)

***

### where?

> `optional` **where**: `any`

Defined in: [sys/mod.ts:1766](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1766)

sys/mod/interfaces/IRows.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / IRows

# Interface: IRows\<T\>

Defined in: [sys/mod.ts:1758](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1758)

## Extends

- `Iterable`\<`T`\>

## Type Parameters

### T

`T`

## Properties

### length

> `readonly` **length**: `number`

Defined in: [sys/mod.ts:1759](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1759)

## Methods

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:1760](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1760)

#### Parameters

##### index

`number`

#### Returns

`T`

***

### toArray()

> **toArray**(): `Record`\<`string`, `any`\>[]

Defined in: [sys/mod.ts:1761](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1761)

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

Defined in: [sys/route.ts:30](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L30)

清除已经加载的虚拟主机配置文件

## Returns

`void`

sys/route/functions/getFormData.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / getFormData

# Function: getFormData()

> **getFormData**(`req`, `events`): `Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

Defined in: [sys/route.ts:932](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L932)

获取 formdata 的 post

## Parameters

### req

请求头

`IncomingMessage` | `Http2ServerRequest`

### events

文件处理情况

#### onfiledata?

(`chunk`) => `void`

#### onfileend?

() => `void`

#### onfilestart?

(`name`) => `boolean` \| `undefined`

## Returns

`Promise`\<`false` \| \{ `files`: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>; `post`: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>; \}\>

sys/route/functions/getPost.md
---

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

sys/route/functions/run.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / run

# Function: run()

> **run**(`data`): `Promise`\<`boolean`\>

Defined in: [sys/route.ts:76](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L76)

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

Defined in: [sys/route.ts:825](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L825)

删除本次请求所有已上传的临时文件

## Parameters

### cctr

Ctr 对象 或 files

[`Ctr`](../../ctr/classes/Ctr.md) | `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\>

## Returns

`Promise`\<`void`\>

sys/route/functions/waitCtr.md
---

[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / waitCtr

# Function: waitCtr()

> **waitCtr**(`cctr`): `Promise`\<`void`\>

Defined in: [sys/route.ts:845](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L845)

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
