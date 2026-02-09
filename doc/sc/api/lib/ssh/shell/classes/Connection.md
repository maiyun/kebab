[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/ssh/shell](../index.md) / Connection

# Class: Connection

Defined in: [lib/ssh/shell.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L9)

## Constructors

### Constructor

> **new Connection**(`stream`): `Connection`

Defined in: [lib/ssh/shell.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L14)

#### Parameters

##### stream

`ClientChannel`

#### Returns

`Connection`

## Methods

### close()

> **close**(`cmd?`, `encoding?`): `Promise`\<`void`\>

Defined in: [lib/ssh/shell.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L77)

关闭 shell

#### Parameters

##### cmd?

命令

`string` | `Buffer`\<`ArrayBufferLike`\>

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`void`\>

***

### getContent()

> **getContent**(`tryCount?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/ssh/shell.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L96)

获取返回值

#### Parameters

##### tryCount?

`number` = `10`

如果无知重试次数，1 次为 10 毫秒

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

***

### getStream()

> **getStream**(): `ClientChannel`

Defined in: [lib/ssh/shell.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L119)

获取响应读取流对象

#### Returns

`ClientChannel`

***

### send()

> **send**(`cmd`, `encoding?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L23)

发送指令

#### Parameters

##### cmd

指令

`string` | `Buffer`\<`ArrayBufferLike`\>

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`boolean`\>

***

### sendCtrlC()

> **sendCtrlC**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L68)

发送中断

#### Returns

`Promise`\<`boolean`\>

***

### sendEnter()

> **sendEnter**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L54)

发送 Enter 键

#### Returns

`Promise`\<`boolean`\>

***

### sendLine()

> **sendLine**(`cmd`, `encoding?`): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L47)

发送带换行的内容（发送并执行）

#### Parameters

##### cmd

`string`

指令

##### encoding?

`BufferEncoding`

编码

#### Returns

`Promise`\<`boolean`\>

***

### sendTab()

> **sendTab**(): `Promise`\<`boolean`\>

Defined in: [lib/ssh/shell.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/ssh/shell.ts#L61)

发送 Tab 键

#### Returns

`Promise`\<`boolean`\>
