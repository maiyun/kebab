[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/consistent](../index.md) / findInCircle

# Function: findInCircle()

> **findInCircle**(`circle`, `key`, `keys?`): `string` \| `null`

Defined in: [lib/consistent.ts:188](https://github.com/maiyunnet/kebab/blob/master/lib/consistent.ts#L188)

获得一个最近的顺时针节点

## Parameters

### circle

`Record`\<`string`, `string`\>

圆环

### key

为给定键取 Hash，取得顺时针方向上最近的一个虚拟节点对应的实际节点

`string` | `number`

### keys?

`string`[] = `[]`

keys，留空则自动从 circle 上取

## Returns

`string` \| `null`
