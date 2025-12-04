[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / waitCtr

# Function: waitCtr()

> **waitCtr**(`cctr`): `Promise`\<`void`\>

Defined in: [sys/route.ts:845](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L845)

等待异步任务结束，并删除临时文件，如果结束后还有事务没关闭，则会在本函数中打印控制台并且写入 log 文件
此时其实已经给客户端返回了，此处等待不消耗客户端的等待时间

## Parameters

### cctr

[`Ctr`](../../ctr/classes/Ctr.md)

要等待的控制器

## Returns

`Promise`\<`void`\>
