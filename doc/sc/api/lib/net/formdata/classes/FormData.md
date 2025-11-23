[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / FormData

# Class: FormData

Defined in: [lib/net/formdata.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L22)

## Extends

- `Readable`

## Constructors

### Constructor

> **new FormData**(`opts?`): `FormData`

Defined in: node\_modules/@types/node/stream.d.ts:163

#### Parameters

##### opts?

`ReadableOptions`\<`Readable`\>

#### Returns

`FormData`

#### Inherited from

`stream.Readable.constructor`

## Methods

### \_read()

> **\_read**(): `void`

Defined in: [lib/net/formdata.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L115)

间隔读取（on data 或 pipe 触发）

#### Returns

`void`

#### Overrides

`stream.Readable._read`

***

### getBoundary()

> **getBoundary**(): `string`

Defined in: [lib/net/formdata.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L93)

获取 boundary

#### Returns

`string`

***

### getLength()

> **getLength**(): `number`

Defined in: [lib/net/formdata.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L100)

获取总字节长度

#### Returns

`number`

***

### getSent()

> **getSent**(): `number`

Defined in: [lib/net/formdata.ts:107](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L107)

获取已发送的字节长度

#### Returns

`number`

***

### putFile()

> **putFile**(`key`, `path`, `fname?`): `Promise`\<`boolean`\>

Defined in: [lib/net/formdata.ts:67](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L67)

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

Defined in: [lib/net/formdata.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L50)

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
