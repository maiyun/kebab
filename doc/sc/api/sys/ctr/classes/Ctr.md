[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / Ctr

# Class: Ctr

Defined in: [sys/ctr.ts:142](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L142)

## Constructors

### Constructor

> **new Ctr**(`config`, `req`, `res?`): `Ctr`

Defined in: [sys/ctr.ts:204](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L204)

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

Defined in: [sys/ctr.ts:148](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L148)

当前的 action 名

***

### \_cacheTTL

> `protected` **\_cacheTTL**: `number`

Defined in: [sys/ctr.ts:178](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L178)

页面浏览器客户端缓存（单位：秒）

***

### \_config

> `protected` `readonly` **\_config**: [`IConfig`](../../../index/interfaces/IConfig.md)

Defined in: [sys/ctr.ts:190](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L190)

vhost 的 kebab.json 以及全局常量

***

### \_cookie

> `protected` **\_cookie**: `Record`\<`string`, `string`\> = `{}`

Defined in: [sys/ctr.ts:169](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L169)

Cookie 数组

***

### \_files

> `protected` **\_files**: `Record`\<`string`, [`IPostFile`](../../../index/interfaces/IPostFile.md) \| [`IPostFile`](../../../index/interfaces/IPostFile.md)[]\> = `{}`

Defined in: [sys/ctr.ts:166](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L166)

上传的文件列表

***

### \_get

> `protected` **\_get**: `Record`\<`string`, `string`\>

Defined in: [sys/ctr.ts:154](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L154)

GET 数据

***

### \_headers

> `protected` **\_headers**: `IncomingHttpHeaders` = `{}`

Defined in: [sys/ctr.ts:151](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L151)

请求的 header 列表，key 均为小写

***

### \_httpCode

> `protected` **\_httpCode**: `number` = `0`

Defined in: [sys/ctr.ts:184](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L184)

自定义 http code

***

### \_input

> `protected` **\_input**: `string` = `''`

Defined in: [sys/ctr.ts:163](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L163)

原始 input 字符串

***

### \_locale

> `protected` **\_locale**: `string` = `'en'`

Defined in: [sys/ctr.ts:187](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L187)

当前语言名

***

### \_localeData

> `protected` **\_localeData**: `Record`\<`string`, `Record`\<`string`, `string`\>\> = `{}`

Defined in: [sys/ctr.ts:202](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L202)

本 ctr 的 locale data

***

### \_localeFiles

> `protected` **\_localeFiles**: `string`[] = `[]`

Defined in: [sys/ctr.ts:199](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L199)

本 ctr 已加载的语言文件列表

***

### \_param

> `protected` **\_param**: `string`[] = `[]`

Defined in: [sys/ctr.ts:145](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L145)

路由参数序列数组

***

### \_post

> `protected` **\_post**: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

Defined in: [sys/ctr.ts:160](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L160)

POST 数据

***

### \_rawPost

> `protected` **\_rawPost**: `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

Defined in: [sys/ctr.ts:157](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L157)

原始 POST 数据

***

### \_req

> `protected` `readonly` **\_req**: `IncomingMessage` \| `Http2ServerRequest`

Defined in: [sys/ctr.ts:192](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L192)

***

### \_res

> `protected` `readonly` **\_res**: `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

Defined in: [sys/ctr.ts:194](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L194)

***

### \_sess

> `protected` **\_sess**: [`Session`](../../../lib/session/classes/Session.md) \| `null` = `null`

Defined in: [sys/ctr.ts:175](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L175)

Session --- 对象

***

### \_session

> `protected` **\_session**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/ctr.ts:172](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L172)

Session 数组

***

### \_socket

> `protected` `readonly` **\_socket**: [`Socket`](../../../lib/ws/classes/Socket.md)

Defined in: [sys/ctr.ts:196](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L196)

***

### \_timer?

> `protected` `optional` **\_timer?**: `object`

Defined in: [sys/ctr.ts:229](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L229)

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

Defined in: [sys/ctr.ts:181](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L181)

XSRF TOKEN 值

## Accessors

### \_isAvail

#### Get Signature

> **get** `protected` **\_isAvail**(): `boolean`

Defined in: [sys/ctr.ts:218](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L218)

当前用户连接是否还在连接中

##### Returns

`boolean`

***

### timeout

#### Get Signature

> **get** **timeout**(): `number`

Defined in: [sys/ctr.ts:236](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L236)

获取当前过期时间（毫秒）

##### Returns

`number`

#### Set Signature

> **set** **timeout**(`num`): `void`

Defined in: [sys/ctr.ts:243](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L243)

设置当前过期时间（毫秒）

##### Parameters

###### num

`number`

##### Returns

`void`

## Methods

### \_asyncTask()

> `protected` **\_asyncTask**(`func`): `void`

Defined in: [sys/ctr.ts:277](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L277)

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

Defined in: [sys/ctr.ts:720](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L720)

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

> `protected` **\_checkXInput**(`input`, `rule`, `rtn`, `ignore?`): `boolean`

Defined in: [sys/ctr.ts:899](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L899)

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

##### ignore?

`boolean` = `false`

忽略 xsrf 判断

#### Returns

`boolean`

***

### \_cross()

> `protected` **\_cross**(`opt?`): `boolean`

Defined in: [sys/ctr.ts:1136](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1136)

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

允许的请求头，默认 '*'

###### methods?

`string`

允许的方法，默认 '*'

###### origins?

`string`[]

允许的来源列表，默认 '*'

#### Returns

`boolean`

***

### \_device()

> `protected` **\_device**(): `"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

Defined in: [sys/ctr.ts:944](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L944)

根据用户 ua 获取当前用户的设备类型

#### Returns

`"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

***

### \_enabledXsrf()

> `protected` **\_enabledXsrf**(`opt?`): `void`

Defined in: [sys/ctr.ts:913](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L913)

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

> `protected` **\_end**(`code?`, `reason?`): `void`

Defined in: [sys/ctr.ts:1246](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1246)

主动关闭当前 socket 连接

#### Parameters

##### code?

`number` = `1000`

WebSocket 关闭码

##### reason?

`string` = `''`

关闭原因

#### Returns

`void`

***

### \_getBasicAuth()

> `protected` **\_getBasicAuth**(`user`, `pwd`): `string`

Defined in: [sys/ctr.ts:937](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L937)

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

Defined in: [sys/ctr.ts:1127](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1127)

获取当前语言名

#### Returns

`string`

***

### \_getLocaleJsonString()

> `protected` **\_getLocaleJsonString**(): `string`

Defined in: [sys/ctr.ts:1115](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1115)

根据当前后台语言包设置情况获取 JSON 字符串传输到前台

#### Returns

`string`

string

***

### \_getMemoryUsage()

> `protected` **\_getMemoryUsage**(): `number`

Defined in: [sys/ctr.ts:427](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L427)

获取截止当前内存的使用情况

#### Returns

`number`

***

### \_getRunTime()

> `protected` **\_getRunTime**(`ms?`): `number`

Defined in: [sys/ctr.ts:419](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L419)

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

Defined in: [sys/ctr.ts:1255](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1255)

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

###### maxFieldSize?

`number`

单个字段（非文件）最大字节数，默认 1 MB

###### maxFileSize?

`number`

单个文件最大字节数

###### maxHeaderSize?

`number`

单个 multipart 段头部最大字节数，默认 16 KB

###### maxParts?

`number`

multipart 字段与文件总数量，默认 1000

###### maxTotalSize?

`number`

整体请求最大字节数，不设置或设为 0 则不限制

###### timeout?

`number`

整体请求超时时间（毫秒），默认 5 分钟，设为 0 禁用超时

#### Returns

`Promise`\<`boolean`\>

***

### \_l()

> **\_l**(`key`, `data?`): `string`

Defined in: [sys/ctr.ts:1179](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1179)

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

> `protected` **\_loadData**\<`T`\>(`path`): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [sys/ctr.ts:1013](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1013)

获取 data JSON 数据

#### Type Parameters

##### T

`T`

#### Parameters

##### path

`string`

文件路径（不含扩展名）

#### Returns

`Promise`\<`false` \| `T` \| `null`\>

***

### \_loadLocale()

> `protected` **\_loadLocale**(`loc`, `pkg?`): `Promise`\<`boolean`\>

Defined in: [sys/ctr.ts:1066](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1066)

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

Defined in: [sys/ctr.ts:463](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L463)

加载 React 全页面进行 SSR 渲染，组件需渲染完整 HTML 文档（含 html/head/body），无需 EJS
框架自动注入 props：_urlBase/_urlFull/_urlStc/_staticVer/_staticPath/_staticPathFull
多语言：自动注入 _locale（当前语言名）和 _localeData（当前语种已载语言包的合并键值对）
组件内创建：const l = (key: string, ...args: string[]): string => { let i = 0; return (_localeData[key] ?? key).replace(/\?/g, () => args[i++] ?? ''); };

#### Parameters

##### path

`string`

页面组件路径（相对于 stc/ 目录，不含扩展名，tsx 编译后的 .js）

##### props?

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\> = `{}`

传入组件的 props，框架常量自动合并，整体序列化为内联 JSON 供客户端水合复用

##### opt?

[`IReactPageOptions`](../interfaces/IReactPageOptions.md) = `{}`

可选配置

#### Returns

`Promise`\<`string`\>

***

### \_loadView()

> `protected` **\_loadView**(`path`, `data?`): `Promise`\<`string`\>

Defined in: [sys/ctr.ts:436](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L436)

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

> `protected` **\_location**(`location`, `httpCode?`): `false`

Defined in: [sys/ctr.ts:1035](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1035)

跳转，支持相对本项目根路径的路径或绝对路径

#### Parameters

##### location

`string`

相对或绝对网址

##### httpCode?

[`TRedirectHttpCode`](../type-aliases/TRedirectHttpCode.md) = `302`

HTTP 重定向状态码，默认 302

#### Returns

`false`

***

### \_ping()

> `protected` **\_ping**(`data?`): `boolean`

Defined in: [sys/ctr.ts:1229](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1229)

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

Defined in: [sys/ctr.ts:1237](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1237)

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

Defined in: [sys/ctr.ts:1050](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1050)

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

### \_valibot()

> `protected` **\_valibot**\<`TSchema`\>(`schema`, `input`, `options?`): [`TValibotResult`](../type-aliases/TValibotResult.md)\<`TSchema`\>

Defined in: [sys/ctr.ts:639](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L639)

使用 Valibot schema 校验并解析输入，成功后 output 会自动推导类型

#### Type Parameters

##### TSchema

`TSchema` *extends* [`GenericSchema`](../../../lib/core/namespaces/v/type-aliases/GenericSchema.md)

#### Parameters

##### schema

`TSchema`

Valibot 同步 schema

##### input

`unknown`

待校验的输入

##### options?

[`IValibotOptions`](../interfaces/IValibotOptions.md)\<[`InferIssue`](../../../lib/core/namespaces/v/type-aliases/InferIssue.md)\<`TSchema`\>\>

Valibot 配置和自定义客户端返回值

#### Returns

[`TValibotResult`](../type-aliases/TValibotResult.md)\<`TSchema`\>

可判别的校验结果

***

### \_valibotx()

> `protected` **\_valibotx**\<`TSchema`\>(`schema`, `input`, `options?`): [`TValibotResult`](../type-aliases/TValibotResult.md)\<`TSchema`, [`IValibotXsrfIssue`](../interfaces/IValibotXsrfIssue.md) \| [`InferIssue`](../../../lib/core/namespaces/v/type-aliases/InferIssue.md)\<`TSchema`\>\>

Defined in: [sys/ctr.ts:663](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L663)

使用 Valibot schema 校验并解析输入，同时检测 XSRF

#### Type Parameters

##### TSchema

`TSchema` *extends* [`GenericSchema`](../../../lib/core/namespaces/v/type-aliases/GenericSchema.md)

#### Parameters

##### schema

`TSchema`

Valibot 同步 schema

##### input

`unknown`

待校验的输入

##### options?

[`IValibotXOptions`](../interfaces/IValibotXOptions.md)\<[`InferIssue`](../../../lib/core/namespaces/v/type-aliases/InferIssue.md)\<`TSchema`\>\>

Valibot 配置、自定义客户端返回值和 XSRF 选项

#### Returns

[`TValibotResult`](../type-aliases/TValibotResult.md)\<`TSchema`, [`IValibotXsrfIssue`](../interfaces/IValibotXsrfIssue.md) \| [`InferIssue`](../../../lib/core/namespaces/v/type-aliases/InferIssue.md)\<`TSchema`\>\>

可判别的校验结果

***

### \_writeBinary()

> `protected` **\_writeBinary**(`data`): `boolean`

Defined in: [sys/ctr.ts:1221](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1221)

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

Defined in: [sys/ctr.ts:1213](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1213)

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

Defined in: [sys/ctr.ts:1205](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L1205)

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

Defined in: [sys/ctr.ts:965](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L965)

通过 header 或 _auth 获取鉴权信息，支持 Basic Auth 和 Bearer Token

#### Returns

`false` \| \{ `pwd`: `string`; `type`: `"basic"`; `user`: `string`; \} \| \{ `token`: `string`; `type`: `"bearer"`; \}

***

### getPrototype()

#### Call Signature

> **getPrototype**(`name`): [`IConfig`](../../../index/interfaces/IConfig.md)

Defined in: [sys/ctr.ts:301](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L301)

获取类内部的 prototype

##### Parameters

###### name

`"_config"`

##### Returns

[`IConfig`](../../../index/interfaces/IConfig.md)

#### Call Signature

> **getPrototype**(`name`): [`Session`](../../../lib/session/classes/Session.md) \| `null`

Defined in: [sys/ctr.ts:302](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L302)

获取类内部的 prototype

##### Parameters

###### name

`"_sess"`

##### Returns

[`Session`](../../../lib/session/classes/Session.md) \| `null`

#### Call Signature

> **getPrototype**(`name`): `IncomingHttpHeaders`

Defined in: [sys/ctr.ts:303](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L303)

获取类内部的 prototype

##### Parameters

###### name

`"_headers"`

##### Returns

`IncomingHttpHeaders`

#### Call Signature

> **getPrototype**(`name`): `IncomingMessage` \| `Http2ServerRequest`

Defined in: [sys/ctr.ts:304](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L304)

获取类内部的 prototype

##### Parameters

###### name

`"_req"`

##### Returns

`IncomingMessage` \| `Http2ServerRequest`

#### Call Signature

> **getPrototype**(`name`): `Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

Defined in: [sys/ctr.ts:305](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L305)

获取类内部的 prototype

##### Parameters

###### name

`"_res"`

##### Returns

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### Call Signature

> **getPrototype**(`name`): [`Socket`](../../../lib/ws/classes/Socket.md)

Defined in: [sys/ctr.ts:306](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L306)

获取类内部的 prototype

##### Parameters

###### name

`"_socket"`

##### Returns

[`Socket`](../../../lib/ws/classes/Socket.md)

#### Call Signature

> **getPrototype**(`name`): `Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

Defined in: [sys/ctr.ts:307](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L307)

获取类内部的 prototype

##### Parameters

###### name

`"_get"` \| `"_rawPost"` \| `"_post"` \| `"_session"`

##### Returns

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

#### Call Signature

> **getPrototype**(`name`): `string`

Defined in: [sys/ctr.ts:308](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L308)

获取类内部的 prototype

##### Parameters

###### name

`"_input"`

##### Returns

`string`

#### Call Signature

> **getPrototype**(`name`): `any`

Defined in: [sys/ctr.ts:309](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L309)

获取类内部的 prototype

##### Parameters

###### name

`string`

##### Returns

`any`

***

### onClose()

> **onClose**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:403](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L403)

WebSocket 下连接被终止后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onData()

> **onData**(`data`, `opcode`): `any`

Defined in: [sys/ctr.ts:368](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L368)

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

Defined in: [sys/ctr.ts:389](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L389)

WebSocket 下连接恢复可写入状态后会调用此事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onEnd()

> **onEnd**(): `void` \| `Promise`\<`void`\>

Defined in: [sys/ctr.ts:396](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L396)

WebSocket 下连接被 end 后会自动被调用的事件，可重写此方法

#### Returns

`void` \| `Promise`\<`void`\>

***

### onLoad()

> **onLoad**(): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:327](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L327)

实例化后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

返回 true 或 undefined 则继续执行 onReady，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）

***

### onMessage()

> **onMessage**(`data`, `opcode`): `boolean` \| `Promise`\<`boolean` \| `undefined`\> \| `undefined`

Defined in: [sys/ctr.ts:380](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L380)

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

Defined in: [sys/ctr.ts:336](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L336)

onLoad 执行后会执行的方法，可重写此方法

#### Returns

`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

返回 true 或 undefined 则继续执行 action，否则中止且对应的返回值将作为输出结果（WebSocket 下中止将断开连接）

***

### onReqStart()

> **onReqStart**(): `number` \| `Promise`\<`number`\>

Defined in: [sys/ctr.ts:411](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L411)

请求发送开始时调用（仅会在 middle 内触发）

#### Returns

`number` \| `Promise`\<`number`\>

1-自动处理 POST (默认)，0-框架不自动处理 POST，-1-流程中断 (通常用于代理/反代场景)

***

### onUnload()

> **onUnload**(`rtn`): `string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[] \| `Promise`\<`string` \| `boolean` \| [`DbValue`](../../../index/type-aliases/DbValue.md)[]\>

Defined in: [sys/ctr.ts:346](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L346)

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

Defined in: [sys/ctr.ts:355](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L355)

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

Defined in: [sys/ctr.ts:315](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L315)

设置类内部的 prototype

#### Parameters

##### name

`string`

##### val

`string` \| `string`[] \| `Record`\<`string`, `any`\> \| `IncomingHttpHeaders` \| [`Session`](../../../lib/session/classes/Session.md) \| [`Socket`](../../../lib/ws/classes/Socket.md) \| `null`

#### Returns

`void`
