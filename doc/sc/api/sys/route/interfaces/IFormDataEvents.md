[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataEvents

# Interface: IFormDataEvents

Defined in: [sys/route.ts:1043](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1043)

multipart 文件处理及失败通知

## Properties

### onerror?

> `optional` **onerror?**: (`error`) => `void`

Defined in: [sys/route.ts:1051](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1051)

首次失败时通知一次；原有 false 返回值不变，连接中断时响应可能无法送达

#### Parameters

##### error

[`IFormDataError`](IFormDataError.md)

#### Returns

`void`

***

### onfiledata?

> `optional` **onfiledata?**: (`chunk`) => `void`

Defined in: [sys/route.ts:1047](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1047)

文件上传时触发，仅 start 返回 true 时触发

#### Parameters

##### chunk

`Buffer`

#### Returns

`void`

***

### onfileend?

> `optional` **onfileend?**: () => `void`

Defined in: [sys/route.ts:1049](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1049)

文件上传结束时触发，仅 start 返回 true 时触发

#### Returns

`void`

***

### onfilestart?

> `optional` **onfilestart?**: (`name`) => `boolean` \| `undefined`

Defined in: [sys/route.ts:1045](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1045)

文件开始上传时触发，返回 true 则跳过该文件的保存

#### Parameters

##### name

`string`

#### Returns

`boolean` \| `undefined`
