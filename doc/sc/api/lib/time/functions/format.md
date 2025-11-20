[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / format

# Function: format()

> **format**(`zone`, `f`, `date?`): `string`

Defined in: [lib/time.ts:161](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L161)

将时间对象转换为时间字符串

## Parameters

### zone

时区小时或 ctr 对象，如 8，设置 null 则以系统时区为准

`number` | [`Ctr`](../../../sys/ctr/classes/Ctr.md) | `null`

### f

`string`

转换格式

### date?

时间对象秒/毫秒级数字均可

`number` | `Date`

## Returns

`string`
