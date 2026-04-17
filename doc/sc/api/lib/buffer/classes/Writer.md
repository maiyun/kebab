[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Writer

# Class: Writer

Defined in: [lib/buffer.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L85)

写对象

## Constructors

### Constructor

> **new Writer**(`size`): `Writer`

Defined in: [lib/buffer.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L92)

#### Parameters

##### size

`number`

#### Returns

`Writer`

## Methods

### get()

> **get**(): `Buffer`

Defined in: [lib/buffer.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L135)

返回 Buffer 对象

#### Returns

`Buffer`

***

### writeBCDString()

> **writeBCDString**(`value`): `void`

Defined in: [lib/buffer.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L115)

[每字节 2 数字] 写入一个 BCD 编码的字符串（仅支持数字）

#### Parameters

##### value

`string`

#### Returns

`void`

***

### writeString()

> **writeString**(`value`, `encoding?`): `number`

Defined in: [lib/buffer.ts:128](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L128)

写入普通字符串，返回写入的长度

#### Parameters

##### value

`string`

##### encoding?

`BufferEncoding` = `'utf8'`

#### Returns

`number`

***

### writeUInt16BE()

> **writeUInt16BE**(`value`): `void`

Defined in: [lib/buffer.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L103)

[2 字节] 写入一个无符号 16 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt32BE()

> **writeUInt32BE**(`value`): `void`

Defined in: [lib/buffer.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L109)

[4 字节] 写入一个无符号 32 位整数（大端模式）

#### Parameters

##### value

`number`

#### Returns

`void`

***

### writeUInt8()

> **writeUInt8**(`value`): `void`

Defined in: [lib/buffer.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L97)

[1 字节] 写入一个无符号 8 位整数

#### Parameters

##### value

`number`

#### Returns

`void`
