[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / FormData

# Class: FormData

Defined in: [lib/net/formdata.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L37)

## Extends

- `Readable`

## Constructors

### Constructor

> **new FormData**(`options?`): `FormData`

Defined in: node\_modules/@types/node/stream.d.ts:98

#### Parameters

##### options?

`ReadableOptions`\<`Readable`\>

#### Returns

`FormData`

#### Inherited from

`stream.Readable.constructor`

## Methods

### \_read()

> **\_read**(): `void`

Defined in: [lib/net/formdata.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L146)

间隔读取（on data 或 pipe 触发）

#### Returns

`void`

#### Overrides

`stream.Readable._read`

***

### getBoundary()

> **getBoundary**(): `string`

Defined in: [lib/net/formdata.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L124)

获取 boundary

#### Returns

`string`

***

### getLength()

> **getLength**(): `number`

Defined in: [lib/net/formdata.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L131)

获取总字节长度

#### Returns

`number`

***

### getSent()

> **getSent**(): `number`

Defined in: [lib/net/formdata.ts:138](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L138)

获取已发送的字节长度

#### Returns

`number`

***

### putBuffer()

> **putBuffer**(`key`, `buffer`, `fname`): `void`

Defined in: [lib/net/formdata.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L109)

添加 Buffer 数据

#### Parameters

##### key

`string`

键

##### buffer

`Buffer`

Buffer 数据

##### fname

`string`

文件名

#### Returns

`void`

***

### putFile()

> **putFile**(`key`, `path`, `fname?`): `Promise`\<`boolean`\>

Defined in: [lib/net/formdata.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L81)

添加文件

#### Parameters

##### key

`string`

键

##### path

`string`

路径

##### fname?

`string`

可选，文件名

#### Returns

`Promise`\<`boolean`\>

***

### putString()

> **putString**(`key`, `val`): `void`

Defined in: [lib/net/formdata.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L65)

添加字符串

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`void`
