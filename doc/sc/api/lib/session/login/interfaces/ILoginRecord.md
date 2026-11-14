[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/session/login](../index.md) / ILoginRecord

# Interface: ILoginRecord

Defined in: lib/session/login.ts:21

已保存的登录授权，不包含 Session 凭据

## Extended by

- [`IListLogin`](IListLogin.md)

## Properties

### data

> **data**: `Record`\<`string`, [`LoginValue`](../type-aliases/LoginValue.md)\>

Defined in: lib/session/login.ts:33

登录时保存的附加信息

***

### scope

> **scope**: `string`

Defined in: lib/session/login.ts:27

账号作用域

***

### subject

> **subject**: `string`

Defined in: lib/session/login.ts:25

账号标识

***

### timeAdd

> **timeAdd**: `number`

Defined in: lib/session/login.ts:31

登录时间，Redis 服务端 UTC Unix 秒

***

### uid

> **uid**: `string`

Defined in: lib/session/login.ts:23

本次登录 UID，每次成功登录重新生成

***

### version

> **version**: `string`

Defined in: lib/session/login.ts:29

业务授权版本，框架不查询业务数据验证此值
