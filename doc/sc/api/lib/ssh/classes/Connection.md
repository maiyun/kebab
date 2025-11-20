[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ssh](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L23)

主连接对象

## Constructors

### Constructor

> **new Connection**(): `Connection`

Defined in: [lib/ssh.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L31)

#### Returns

`Connection`

## Methods

### connect()

> **connect**(`opt`): `Promise`\<`boolean`\>

Defined in: [lib/ssh.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L39)

发起连接

#### Parameters

##### opt

`ConnectConfig` & [`IExtOptions`](../interfaces/IExtOptions.md)

选项

#### Returns

`Promise`\<`boolean`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: [lib/ssh.ts:98](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L98)

断开此连接 socket

#### Returns

`void`

***

### exec()

> **exec**(`command`): `Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/ssh.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L106)

执行一个命令并获取返回值，请不要在此执行无尽命令，否则获取不到返回值

#### Parameters

##### command

`string`

命令内容

#### Returns

`Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

***

### getSftp()

> **getSftp**(): `Promise`\<[`Connection`](../sftp/classes/Connection.md) \| `null`\>

Defined in: [lib/ssh.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L143)

获取 Sftp 执行对象

#### Returns

`Promise`\<[`Connection`](../sftp/classes/Connection.md) \| `null`\>

***

### getShell()

> **getShell**(): `Promise`\<[`Connection`](../shell/classes/Connection.md) \| `null`\>

Defined in: [lib/ssh.ts:128](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L128)

获取 Shell 执行对象

#### Returns

`Promise`\<[`Connection`](../shell/classes/Connection.md) \| `null`\>

***

### getStream()

> **getStream**(): `Promise`\<`ClientChannel` \| `null`\>

Defined in: [lib/ssh.ts:170](https://github.com/maiyunnet/kebab/blob/master/lib/ssh.ts#L170)

直接获取原生 shell stream 对象

#### Returns

`Promise`\<`ClientChannel` \| `null`\>
