[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/ssh/sftp](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh/sftp.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L12)

## Constructors

### Constructor

> **new Connection**(`sftp`, `path`): `Connection`

Defined in: [lib/ssh/sftp.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L20)

#### Parameters

##### sftp

`SFTPWrapper`

##### path

`string`

#### Returns

`Connection`

## Methods

### cd()

> **cd**(`dir`): `string`

Defined in: [lib/ssh/sftp.ts:489](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L489)

进入一个目录（不存在也能进入，需要自行判断）
返回进入后的路径值

#### Parameters

##### dir

`string`

相对路径或绝对路径

#### Returns

`string`

***

### chmod()

> **chmod**(`path`, `mode`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:333](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L333)

修改权限

#### Parameters

##### path

`string`

要修改的路径

##### mode

权限

`string` | `number`

#### Returns

`Promise`\<`boolean`\>

***

### close()

> **close**(): `void`

Defined in: [lib/ssh/sftp.ts:500](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L500)

关闭当前频道

#### Returns

`void`

***

### createReadStream()

> **createReadStream**(`path`, `options?`): `Readable`

Defined in: [lib/ssh/sftp.ts:389](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L389)

读取文件流

#### Parameters

##### path

`string`

文件地址

##### options?

`ReadStreamOptions`

#### Returns

`Readable`

***

### createWriteStream()

> **createWriteStream**(`path`, `options?`): `Writable`

Defined in: [lib/ssh/sftp.ts:418](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L418)

创建写入文件的流

#### Parameters

##### path

`string`

文件地址

##### options?

编码或配置

`BufferEncoding` | `WriteStreamOptions`

#### Returns

`Writable`

***

### downloadFile()

> **downloadFile**(`remoteFile`, `localFile`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:442](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L442)

下载文件到本地

#### Parameters

##### remoteFile

`string`

远程路径

##### localFile

`string`

本地路径

##### options

`TransferOptions` = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

***

### getContent()

读取完整文件或一段

#### Param

文件路径

#### Param

编码或选项

#### Call Signature

> **getContent**(`path`, `options?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/ssh/sftp.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L25)

##### Parameters

###### path

`string`

###### options?

###### end?

`number`

###### start?

`number`

##### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

#### Call Signature

> **getContent**(`path`, `options`): `Promise`\<`string` \| `null`\>

Defined in: [lib/ssh/sftp.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L29)

##### Parameters

###### path

`string`

###### options

`BufferEncoding` | \{ `encoding`: `BufferEncoding`; `end?`: `number`; `start?`: `number`; \}

##### Returns

`Promise`\<`string` \| `null`\>

***

### isDir()

> **isDir**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/ssh/sftp.ts:217](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L217)

判断是否是目录或目录是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`Promise`\<`false` \| `Stats`\>

***

### isFile()

> **isFile**(`path`): `Promise`\<`false` \| `Stats`\>

Defined in: [lib/ssh/sftp.ts:229](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L229)

判断是否是文件或文件是否存在，是的话返回 stats

#### Parameters

##### path

`string`

判断路径

#### Returns

`Promise`\<`false` \| `Stats`\>

***

### mkdir()

> **mkdir**(`path`, `mode`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L242)

深度创建目录，如果最末目录存在，则自动创建成功

#### Parameters

##### path

`string`

要创建的路径，如 /a/b/c/

##### mode

`number` = `0o755`

权限

#### Returns

`Promise`\<`boolean`\>

***

### pipe()

> **pipe**\<`T`\>(`path`, `destination`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:400](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L400)

读取文件写入到流，并等待写入完成

#### Type Parameters

##### T

`T` *extends* `WritableStream`

#### Parameters

##### path

`string`

文件地址

##### destination

`T`

要写入的流

##### options

写入后是否终止写入流，默认终止

###### end?

`boolean`

#### Returns

`Promise`\<`boolean`\>

***

### putContent()

> **putContent**(`path`, `data`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L109)

写入文件内容

#### Parameters

##### path

`string`

文件路径

##### data

要写入的内容

`string` | `Buffer`\<`ArrayBufferLike`\>

##### options

`WriteFileOptions` = `{}`

选项

#### Returns

`Promise`\<`boolean`\>

***

### pwd()

> **pwd**(): `string`

Defined in: [lib/ssh/sftp.ts:432](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L432)

获取当前目录，末尾不带 /

#### Returns

`string`

string

***

### readDir()

> **readDir**(`path`): `Promise`\<`FileEntry`[]\>

Defined in: [lib/ssh/sftp.ts:371](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L371)

获取文件夹下文件列表

#### Parameters

##### path

`string`

文件夹路径

#### Returns

`Promise`\<`FileEntry`[]\>

***

### readLink()

> **readLink**(`path`): `Promise`\<`string` \| `null`\>

Defined in: [lib/ssh/sftp.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L131)

读取链接的 target

#### Parameters

##### path

`string`

要读取的路径

#### Returns

`Promise`\<`string` \| `null`\>

***

### rename()

> **rename**(`oldPath`, `newPath`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:352](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L352)

重命名/移动 文件文件夹

#### Parameters

##### oldPath

`string`

老名

##### newPath

`string`

新名

#### Returns

`Promise`\<`boolean`\>

***

### rmdir()

> **rmdir**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:275](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L275)

删除一个空目录

#### Parameters

##### path

`string`

要删除的目录路径

#### Returns

`Promise`\<`boolean`\>

***

### rmdirDeep()

> **rmdirDeep**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:297](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L297)

Danger 危险：危险函数，尽量不要使用
This f**king is a dangerous function, please don't use it
删除一个非空目录

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`boolean`\>

***

### stats()

> **stats**(`path`): `Promise`\<`Stats` \| `null`\>

Defined in: [lib/ssh/sftp.ts:199](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L199)

获取对象是否存在，存在则返回 stats 对象，否则返回 null

#### Parameters

##### path

`string`

对象路径

#### Returns

`Promise`\<`Stats` \| `null`\>

***

### symlink()

> **symlink**(`filePath`, `linkPath`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L150)

把源文件创建一个 link

#### Parameters

##### filePath

`string`

源文件

##### linkPath

`string`

连接路径

#### Returns

`Promise`\<`boolean`\>

***

### unlink()

> **unlink**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L169)

删除一个文件

#### Parameters

##### path

`string`

要删除的文件路径

#### Returns

`Promise`\<`boolean`\>

***

### uploadFile()

> **uploadFile**(`localFile`, `remoteFile`, `options`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/sftp.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/sftp.ts#L466)

上传本地文件到远程

#### Parameters

##### localFile

`string`

本地绝对路径

##### remoteFile

`string`

##### options

`TransferOptions` = `{}`

#### Returns

`Promise`\<`boolean`\>

bool
