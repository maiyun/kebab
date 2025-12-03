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
