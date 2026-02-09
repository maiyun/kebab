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

> **follow**(`follow?`): `this`

Defined in: [lib/net/request.ts:86](https://github.com/maiyunnet/kebab/blob/master/lib/net/request.ts#L86)

设置是否跟随请求方的 location，留空为跟随，不设置为不跟随

#### Parameters

##### follow?

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
