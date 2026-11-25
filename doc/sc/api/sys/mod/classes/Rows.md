[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / Rows

# Class: Rows\<T\>

Defined in: [sys/mod.ts:51](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L51)

条数列表

## Type Parameters

### T

`T` *extends* [`default`](default.md)

## Implements

- [`IRows`](../interfaces/IRows.md)\<`T`\>

## Constructors

### Constructor

> **new Rows**\<`T`\>(`initialItems?`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:55](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L55)

#### Parameters

##### initialItems?

`T`[] = `[]`

#### Returns

`Rows`\<`T`\>

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [sys/mod.ts:60](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L60)

总行数

##### Returns

`number`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`length`](../interfaces/IRows.md#length)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`T`\>

Defined in: [sys/mod.ts:92](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L92)

for of

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

`IRows.[iterator]`

***

### filter()

> **filter**(`predicate`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:78](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L78)

根据规则筛掉项，predicate 返回 true 代表保留

#### Parameters

##### predicate

(`value`, `index`) => `boolean`

#### Returns

`Rows`\<`T`\>

***

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:65](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L65)

通过索引获取一个对象

#### Parameters

##### index

`number`

#### Returns

`T`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`item`](../interfaces/IRows.md#item)

***

### map()

> **map**\<`TU`\>(`callbackfn`): `TU`[]

Defined in: [sys/mod.ts:83](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L83)

重塑对象内容为数组

#### Type Parameters

##### TU

`TU`

#### Parameters

##### callbackfn

(`value`, `index`) => `TU`

#### Returns

`TU`[]

***

### toArray()

#### Call Signature

> **toArray**(): [`TModRow`](../type-aliases/TModRow.md)[]

Defined in: [sys/mod.ts:70](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L70)

将模型转换为普通对象数组

##### Returns

[`TModRow`](../type-aliases/TModRow.md)[]

##### Implementation of

[`IRows`](../interfaces/IRows.md).[`toArray`](../interfaces/IRows.md#toarray)

#### Call Signature

> **toArray**\<`TRow`\>(): `TRow`[]

Defined in: [sys/mod.ts:72](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L72)

将模型转换为指定行类型的普通对象数组

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Returns

`TRow`[]

##### Implementation of

`IRows.toArray`
