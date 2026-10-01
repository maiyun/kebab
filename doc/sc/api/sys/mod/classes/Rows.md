[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / Rows

# Class: Rows\<T\>

Defined in: [sys/mod.ts:28](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L28)

条数列表

## Type Parameters

### T

`T` *extends* [`default`](default.md)

## Implements

- [`IRows`](../interfaces/IRows.md)\<`T`\>

## Constructors

### Constructor

> **new Rows**\<`T`\>(`initialItems?`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:32](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L32)

#### Parameters

##### initialItems?

`T`[] = `[]`

#### Returns

`Rows`\<`T`\>

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [sys/mod.ts:37](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L37)

总行数

##### Returns

`number`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`length`](../interfaces/IRows.md#length)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`T`\>

Defined in: [sys/mod.ts:66](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L66)

for of

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

`IRows.[iterator]`

***

### filter()

> **filter**(`predicate`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:52](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L52)

根据规则筛掉项，predicate 返回 true 代表保留

#### Parameters

##### predicate

(`value`, `index`) => `boolean`

#### Returns

`Rows`\<`T`\>

***

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:42](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L42)

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

Defined in: [sys/mod.ts:57](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L57)

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

> **toArray**(): `Record`\<`string`, `any`\>[]

Defined in: [sys/mod.ts:47](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L47)

转换为数组对象，获取的是新创建的数组

#### Returns

`Record`\<`string`, `any`\>[]

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`toArray`](../interfaces/IRows.md#toarray)
