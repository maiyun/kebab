[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / Zip

# Class: Zip

Defined in: [lib/zip.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L9)

本库主要用于读取 zip，请尽量不要用来写入 zip，尤其是大文件 zip

## Constructors

### Constructor

> **new Zip**(`zip`): `Zip`

Defined in: [lib/zip.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L17)

#### Parameters

##### zip

`JSZip`

#### Returns

`Zip`

## Methods

### cd()

> **cd**(`dir`): `string`

Defined in: [lib/zip.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L338)

进入一个目录（不存在也能进入，需要自行判断）
返回进入后的路径值

#### Parameters

##### dir

`string`

相对路径或绝对路径

#### Returns

`string`

***

### generate()

> **generate**\<`T`\>(`options`): `Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\]\>

Defined in: [lib/zip.ts:350](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L350)

打包 zip

#### Type Parameters

##### T

`T` *extends* keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

#### Parameters

##### options

选项

###### level?

`number`

###### onUpdate?

(`percent`, `currentFile`) => `void`

###### type?

`T`

#### Returns

`Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\]\>

***

### getContent()

读取完整文件

#### Param

文件路径

#### Param

返回类型

#### Call Signature

> **getContent**(`path`): `Promise`\<`string` \| `null`\>

Defined in: [lib/zip.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L22)

##### Parameters

###### path

`string`

##### Returns

`Promise`\<`string` \| `null`\>

#### Call Signature

> **getContent**\<`T`\>(`path`, `type`): `Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\] \| `null`\>

Defined in: [lib/zip.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L23)

##### Type Parameters

###### T

`T` *extends* keyof [`IZipOutputByType`](../interfaces/IZipOutputByType.md)

##### Parameters

###### path

`string`

###### type

`T`

##### Returns

`Promise`\<[`IZipOutputByType`](../interfaces/IZipOutputByType.md)\[`T`\] \| `null`\>

***

### getList()

> **getList**(): `Promise`\<`Record`\<`string`, `string` \| `Buffer`\<`ArrayBufferLike`\>\>\>

Defined in: [lib/zip.ts:375](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L375)

获取 path 和 string/Buffer 对应的文件列表

#### Returns

`Promise`\<`Record`\<`string`, `string` \| `Buffer`\<`ArrayBufferLike`\>\>\>

***

### isDir()

> **isDir**(`path`): `false` \| [`IZipStats`](../interfaces/IZipStats.md)

Defined in: [lib/zip.ts:134](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L134)

判断是否是目录或目录是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`false` \| [`IZipStats`](../interfaces/IZipStats.md)

***

### isFile()

> **isFile**(`path`): `false` \| [`IZipStats`](../interfaces/IZipStats.md)

Defined in: [lib/zip.ts:146](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L146)

判断是否是文件或文件是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`false` \| [`IZipStats`](../interfaces/IZipStats.md)

***

### putContent()

> **putContent**\<`T`\>(`path`, `data`, `options`): `void`

Defined in: [lib/zip.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L51)

写入文件内容

#### Type Parameters

##### T

`T` *extends* keyof [`IZipInputByType`](../interfaces/IZipInputByType.md)

#### Parameters

##### path

`string`

文件路径

##### data

[`IZipInputByType`](../interfaces/IZipInputByType.md)\[`T`\]

要写入的内容

##### options

选项

###### base64?

`boolean`

###### binary?

`boolean`

###### date?

`Date`

#### Returns

`void`

***

### pwd()

> **pwd**(): `string`

Defined in: [lib/zip.ts:329](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L329)

获取当前目录，末尾不带 /

#### Returns

`string`

string

***

### readDir()

获取文件夹下文件列表

#### Param

文件夹路径

#### Param

选项

#### Call Signature

> **readDir**(`path?`, `opt?`): [`IZipItem`](../interfaces/IZipItem.md)[]

Defined in: [lib/zip.ts:155](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L155)

读取目录，hasChildren: false, hasDir: true, pathAsKey: false

##### Parameters

###### path?

`string`

###### opt?

###### hasChildren?

`boolean`

###### hasDir?

`boolean`

###### pathAsKey?

`false`

##### Returns

[`IZipItem`](../interfaces/IZipItem.md)[]

#### Call Signature

> **readDir**(`path?`, `opt?`): `Record`\<`string`, [`IZipItem`](../interfaces/IZipItem.md)\>

Defined in: [lib/zip.ts:156](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L156)

读取目录，hasChildren: false, hasDir: true, pathAsKey: false

##### Parameters

###### path?

`string`

###### opt?

###### hasChildren?

`boolean`

###### hasDir?

`boolean`

###### pathAsKey

`true`

##### Returns

`Record`\<`string`, [`IZipItem`](../interfaces/IZipItem.md)\>

***

### stats()

> **stats**(`path`): [`IZipStats`](../interfaces/IZipStats.md) \| `null`

Defined in: [lib/zip.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L75)

获取对象是否存在，存在则返回 stats 对象，否则返回 null

#### Parameters

##### path

`string`

对象路径

#### Returns

[`IZipStats`](../interfaces/IZipStats.md) \| `null`

***

### unlink()

> **unlink**(`path`): `void`

Defined in: [lib/zip.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L65)

删除一个文件/文件夹（深度删除）

#### Parameters

##### path

`string`

要删除的文件路径

#### Returns

`void`
