[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/buffer](../index.md) / Reader

# Class: Reader

Defined in: [lib/buffer.ts:4](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L4)

读对象

## Constructors

### Constructor

> **new Reader**(`buffer`): `Reader`

Defined in: [lib/buffer.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L11)

#### Parameters

##### buffer

`Buffer`

#### Returns

`Reader`

## Methods

### length()

> **length**(): `number`

Defined in: [lib/buffer.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L78)

获取完整的 buffer 长度

#### Returns

`number`

***

### readBCDString()

> **readBCDString**(`length?`): `string`

Defined in: [lib/buffer.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L51)

读取一个 BCD 编码的字符串（每个字节表示两个数字）

#### Parameters

##### length?

`number`

#### Returns

`string`

***

### readBuffer()

> **readBuffer**(`length?`): `Buffer`

Defined in: [lib/buffer.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L72)

读取 Buffer

#### Parameters

##### length?

`number`

#### Returns

`Buffer`

***

### readString()

> **readString**(`length?`, `encoding?`): `string`

Defined in: [lib/buffer.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L64)

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

Defined in: [lib/buffer.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L23)

读取一个无符号 16 位整数（大端模式），WORD

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [lib/buffer.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L30)

读取一个无符号 16 位整数（小端模式）

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [lib/buffer.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L37)

读取一个无符号 32 位整数（大端模式）, DWORD

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [lib/buffer.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L44)

读取一个无符号 32 位整数（小端模式）

#### Returns

`number`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [lib/buffer.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/buffer.ts#L16)

读取一个无符号 8 位整数, BYTE

#### Returns

`number`
