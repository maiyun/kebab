[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / Rows

# Class: Rows\<T\>

Defined in: [sys/mod.ts:20](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L20)

条数列表

## Type Parameters

### T

`T` *extends* [`default`](default.md)

## Implements

- [`IRows`](../interfaces/IRows.md)\<`T`\>

## Constructors

### Constructor

> **new Rows**\<`T`\>(`initialItems?`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:24](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L24)

#### Parameters

##### initialItems?

`T`[] = `[]`

#### Returns

`Rows`\<`T`\>

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [sys/mod.ts:29](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L29)

总行数

##### Returns

`number`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`length`](../interfaces/IRows.md#length)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`T`\>

Defined in: [sys/mod.ts:58](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L58)

for of

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

`IRows.[iterator]`

***

### filter()

> **filter**(`predicate`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:44](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L44)

根据规则筛掉项，predicate 返回 true 代表保留

#### Parameters

##### predicate

(`value`, `index`) => `boolean`

#### Returns

`Rows`\<`T`\>

***

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:34](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L34)

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

Defined in: [sys/mod.ts:49](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L49)

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

Defined in: [sys/mod.ts:39](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L39)

转换为数组对象，获取的是新创建的数组

#### Returns

`Record`\<`string`, `any`\>[]

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`toArray`](../interfaces/IRows.md#toarray)
