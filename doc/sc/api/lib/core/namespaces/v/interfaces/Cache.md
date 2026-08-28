[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / Cache

# Interface: Cache\<TValue$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:17

**`Beta`**

Cache interface type.

## Type Parameters

### TValue$1

`TValue$1`

## Methods

### clear()

> **clear**(): `void`

Defined in: node\_modules/valibot/dist/index.d.mts:36

**`Beta`**

Clears all entries from the cache.

#### Returns

`void`

***

### get()

> **get**(`key`): `TValue$1` \| `undefined`

Defined in: node\_modules/valibot/dist/index.d.mts:28

**`Beta`**

Gets a value from the cache by key.

#### Parameters

##### key

`string`

#### Returns

`TValue$1` \| `undefined`

***

### key()

> **key**(`input`, `config?`): `string`

Defined in: node\_modules/valibot/dist/index.d.mts:24

**`Beta`**

Creates a cache key from input and config.

Hint: Primitive inputs are keyed by value. Object and function inputs are
keyed by reference identity.

#### Parameters

##### input

`unknown`

##### config?

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Returns

`string`

***

### set()

> **set**(`key`, `value`): `void`

Defined in: node\_modules/valibot/dist/index.d.mts:32

**`Beta`**

Sets a value in the cache by key.

#### Parameters

##### key

`string`

##### value

`TValue$1`

#### Returns

`void`
