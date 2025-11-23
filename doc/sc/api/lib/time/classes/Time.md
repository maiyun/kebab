[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/time](../index.md) / Time

# Class: Time

Defined in: [lib/time.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L33)

## Constructors

### Constructor

> **new Time**(`ctr`, `opt`): `Time`

Defined in: [lib/time.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L45)

构造函数

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Time`

## Methods

### format()

> **format**(`f`, `zone?`): `string`

Defined in: [lib/time.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L97)

获取格式化的字符串

#### Parameters

##### f

`string`

格式化字符串

##### zone?

`number`

时区小时，如 8

#### Returns

`string`

***

### getZone()

> **getZone**(): `number`

Defined in: [lib/time.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L81)

获取时区

#### Returns

`number`

***

### setZone()

> **setZone**(`zone`): `void`

Defined in: [lib/time.ts:74](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L74)

设置时区

#### Parameters

##### zone

`number`

北京时间如 8

#### Returns

`void`

***

### stamp()

> **stamp**(): `number`

Defined in: [lib/time.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L104)

获取秒级时间戳

#### Returns

`number`

***

### toUTCString()

> **toUTCString**(): `string`

Defined in: [lib/time.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/time.ts#L88)

获取 UTC 字符串

#### Returns

`string`
