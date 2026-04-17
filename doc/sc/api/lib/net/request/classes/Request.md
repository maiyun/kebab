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
