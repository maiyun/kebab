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
