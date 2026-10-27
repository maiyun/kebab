[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataEvents

# Interface: IFormDataEvents

Defined in: [sys/route.ts:1069](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1069)

multipart 文件处理及失败通知

## Properties

### onerror?

> `optional` **onerror?**: (`error`) => `void`

Defined in: [sys/route.ts:1077](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1077)

首次失败时调用一次，getFormData 返回 false；若连接已断开，可能无法回复客户端

#### Parameters

##### error

[`IFormDataError`](IFormDataError.md)

#### Returns

`void`

***

### onfiledata?

> `optional` **onfiledata?**: (`chunk`) => `void`

Defined in: [sys/route.ts:1073](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1073)

文件上传时触发，仅 start 返回 true 时触发

#### Parameters

##### chunk

`Buffer`

#### Returns

`void`

***

### onfileend?

> `optional` **onfileend?**: () => `void`

Defined in: [sys/route.ts:1075](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1075)

文件上传结束时触发，仅 start 返回 true 时触发

#### Returns

`void`

***

### onfilestart?

> `optional` **onfilestart?**: (`name`) => `boolean` \| `undefined`

Defined in: [sys/route.ts:1071](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1071)

文件开始上传时触发，返回 true 则跳过该文件的保存

#### Parameters

##### name

`string`

#### Returns

`boolean` \| `undefined`
