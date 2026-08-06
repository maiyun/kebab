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

Defined in: [lib/scan.ts:171](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L171)

创建 token，直接应用到本类

#### Returns

`Promise`\<`boolean`\>

***

### getTimeLeft()

> **getTimeLeft**(): `number` \| `null`

Defined in: [lib/scan.ts:238](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L238)

获取当前 token 可扫剩余有效期

#### Returns

`number` \| `null`

***

### getToken()

> **getToken**(): `string` \| `null`

Defined in: [lib/scan.ts:216](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L216)

获取当前 token

#### Returns

`string` \| `null`

***

### getTTL()

> **getTTL**(): `number`

Defined in: [lib/scan.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L231)

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

Defined in: [lib/scan.ts:224](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L224)

设置有效期，设置后的新 token 被创建有效

#### Parameters

##### ttl

`number`

#### Returns

`void`
