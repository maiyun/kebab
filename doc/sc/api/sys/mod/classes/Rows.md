[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / Rows

# Class: Rows\<T\>

Defined in: [sys/mod.ts:49](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L49)

条数列表

## Type Parameters

### T

`T` *extends* [`default`](default.md)

## Implements

- [`IRows`](../interfaces/IRows.md)\<`T`\>

## Constructors

### Constructor

> **new Rows**\<`T`\>(`initialItems?`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:53](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L53)

#### Parameters

##### initialItems?

`T`[] = `[]`

#### Returns

`Rows`\<`T`\>

## Accessors

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [sys/mod.ts:58](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L58)

总行数

##### Returns

`number`

#### Implementation of

[`IRows`](../interfaces/IRows.md).[`length`](../interfaces/IRows.md#length)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`T`\>

Defined in: [sys/mod.ts:90](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L90)

for of

#### Returns

`IterableIterator`\<`T`\>

#### Implementation of

`IRows.[iterator]`

***

### filter()

> **filter**(`predicate`): `Rows`\<`T`\>

Defined in: [sys/mod.ts:76](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L76)

根据规则筛掉项，predicate 返回 true 代表保留

#### Parameters

##### predicate

(`value`, `index`) => `boolean`

#### Returns

`Rows`\<`T`\>

***

### item()

> **item**(`index`): `T`

Defined in: [sys/mod.ts:63](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L63)

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

Defined in: [sys/mod.ts:81](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L81)

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

Defined in: [sys/mod.ts:68](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L68)

将模型转换为普通对象数组

##### Returns

[`TModRow`](../type-aliases/TModRow.md)[]

##### Implementation of

[`IRows`](../interfaces/IRows.md).[`toArray`](../interfaces/IRows.md#toarray)

#### Call Signature

> **toArray**\<`TRow`\>(): `TRow`[]

Defined in: [sys/mod.ts:70](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L70)

将模型转换为指定行类型的普通对象数组

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Returns

`TRow`[]

##### Implementation of

`IRows.toArray`
