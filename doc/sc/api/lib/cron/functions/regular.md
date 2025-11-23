[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cron](../index.md) / regular

# Function: regular()

> **regular**(`task`, `immediate`): `Promise`\<`boolean`\>

Defined in: [lib/cron.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/cron.ts#L26)

创建定时执行的计划任务

## Parameters

### task

[`IRegular`](../interfaces/IRegular.md)

计划任务对象

### immediate

`string` = `''`

如果传入的时间小于当前时间且[没有执行过]则立即执行一次（格式：YmdHi，系统时区）

## Returns

`Promise`\<`boolean`\>
