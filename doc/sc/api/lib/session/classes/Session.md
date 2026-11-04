[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / Session

# Class: Session

Defined in: [lib/session.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L56)

## Constructors

### Constructor

> **new Session**(): `Session`

#### Returns

`Session`

## Methods

### getName()

> **getName**(): `string`

Defined in: [lib/session.ts:249](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L249)

获取当前的 cookie 的 name 值

#### Returns

`string`

***

### getToken()

> **getToken**(): `string`

Defined in: [lib/session.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L242)

获取当前的 token 值

#### Returns

`string`

***

### init()

> **init**(`ctr`, `link`, `auth?`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/session.ts:84](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L84)

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

开启请求凭据读取，使用 opt.header 或 Authorization / GET、POST 的 _auth；提供无效凭据不回退 Cookie

##### opt?

[`IOptions`](../interfaces/IOptions.md) = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

false 表示系统错误

***

### update()

> **update**(): `Promise`\<`void`\>

Defined in: [lib/session.ts:256](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L256)

页面整体结束时，要写入到 Kv 或 数据库

#### Returns

`Promise`\<`void`\>
