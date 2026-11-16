[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/session/login](../index.md) / IListLogin

# Interface: IListLogin

Defined in: [lib/session/login.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L39)

登录列表中的记录

## Extends

- [`ILoginRecord`](ILoginRecord.md)

## Properties

### current

> **current**: `boolean`

Defined in: [lib/session/login.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L41)

是否为当前登录

***

### data

> **data**: `Record`\<`string`, [`LoginValue`](../type-aliases/LoginValue.md)\>

Defined in: [lib/session/login.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L35)

登录时保存的附加信息

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`data`](ILoginRecord.md#data)

***

### scope

> **scope**: `string`

Defined in: [lib/session/login.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L27)

账号作用域

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`scope`](ILoginRecord.md#scope)

***

### subject

> **subject**: `string`

Defined in: [lib/session/login.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L25)

账号标识

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`subject`](ILoginRecord.md#subject)

***

### timeAdd

> **timeAdd**: `number`

Defined in: [lib/session/login.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L31)

登录时间，Redis 服务端 UTC Unix 秒，0 表示未记录

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`timeAdd`](ILoginRecord.md#timeadd)

***

### timeLast

> **timeLast**: `number`

Defined in: [lib/session/login.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L33)

最后访问时间，创建及成功 touch 时更新；Redis 服务端 UTC Unix 秒，0 表示未记录

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`timeLast`](ILoginRecord.md#timelast)

***

### uid

> **uid**: `string`

Defined in: [lib/session/login.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L23)

本次登录 UID，每次成功登录重新生成

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`uid`](ILoginRecord.md#uid)

***

### version

> **version**: `string`

Defined in: [lib/session/login.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L29)

业务授权版本，框架不查询业务数据验证此值

#### Inherited from

[`ILoginRecord`](ILoginRecord.md).[`version`](ILoginRecord.md#version)
