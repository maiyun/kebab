[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Reader

# Class: Reader

Defined in: [lib/buffer.ts:2](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L2)

读对象

## Constructors

### Constructor

> **new Reader**(`buffer`): `Reader`

Defined in: [lib/buffer.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L9)

#### Parameters

##### buffer

`Buffer`

#### Returns

`Reader`

## Methods

### length()

> **length**(): `number`

Defined in: [lib/buffer.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L76)

获取完整的 buffer 长度

#### Returns

`number`

***

### readBCDString()

> **readBCDString**(`length?`): `string`

Defined in: [lib/buffer.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L49)

读取一个 BCD 编码的字符串（每个字节表示两个数字）

#### Parameters

##### length?

`number`

#### Returns

`string`

***

### readBuffer()

> **readBuffer**(`length?`): `Buffer`

Defined in: [lib/buffer.ts:70](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L70)

读取 Buffer

#### Parameters

##### length?

`number`

#### Returns

`Buffer`

***

### readString()

> **readString**(`length?`, `encoding?`): `string`

Defined in: [lib/buffer.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L62)

读取普通 string

#### Parameters

##### length?

`number`

##### encoding?

`BufferEncoding` = `'utf8'`

#### Returns

`string`

***

### readUInt16BE()

> **readUInt16BE**(): `number`

Defined in: [lib/buffer.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L21)

读取一个无符号 16 位整数（大端模式），WORD

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [lib/buffer.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L28)

读取一个无符号 16 位整数（小端模式）

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [lib/buffer.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L35)

读取一个无符号 32 位整数（大端模式）, DWORD

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [lib/buffer.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L42)

读取一个无符号 32 位整数（小端模式）

#### Returns

`number`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [lib/buffer.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L14)

读取一个无符号 8 位整数, BYTE

#### Returns

`number`
