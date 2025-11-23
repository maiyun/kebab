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
