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

Defined in: [sys/ctr.ts:342](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L342)

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

Defined in: [sys/ctr.ts:611](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L611)

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

Defined in: [sys/ctr.ts:825](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L825)

开启跨域请求
返回 true 接续执行，返回 false 需要中断用户本次访问（options请求）

#### Returns

`boolean`

***

### \_device()

> `protected` **\_device**(): `"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

Defined in: [sys/ctr.ts:650](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L650)

根据用户 ua 获取当前用户的设备类型

#### Returns

`"unknown"` \| `"android"` \| `"linux"` \| `"windows"` \| `"macintosh"` \| `"ipad"`

***

### \_enabledXsrf()

> `protected` **\_enabledXsrf**(): `void`

Defined in: [sys/ctr.ts:622](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L622)

当前页面开启 XSRF 支持（主要检测 cookie 是否存在）
如果当前页面有 CDN，请不要使用

#### Returns

`void`

***

### \_end()

> `protected` **\_end**(): `void`

Defined in: [sys/ctr.ts:908](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L908)

主动关闭当前 socket 连接

#### Returns

`void`

***

### \_getBasicAuth()

> `protected` **\_getBasicAuth**(`user`, `pwd`): `string`

Defined in: [sys/ctr.ts:643](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L643)

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

Defined in: [sys/ctr.ts:817](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L817)

获取当前语言名

#### Returns

`string`

***

### \_getLocaleJsonString()

> `protected` **\_getLocaleJsonString**(): `string`

Defined in: [sys/ctr.ts:805](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L805)

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

Defined in: [sys/ctr.ts:916](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L916)

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

Defined in: [sys/ctr.ts:843](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L843)

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

Defined in: [sys/ctr.ts:708](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L708)

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

Defined in: [sys/ctr.ts:756](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L756)

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

Defined in: [sys/ctr.ts:726](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L726)

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

Defined in: [sys/ctr.ts:893](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L893)

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

Defined in: [sys/ctr.ts:901](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L901)

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

Defined in: [sys/ctr.ts:740](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L740)

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

Defined in: [sys/ctr.ts:885](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L885)

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

Defined in: [sys/ctr.ts:877](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L877)

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

Defined in: [sys/ctr.ts:869](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L869)

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

Defined in: [sys/ctr.ts:671](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L671)

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
