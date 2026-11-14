[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/session/login](../index.md) / ILoginOptions

# Interface: ILoginOptions

Defined in: lib/session/login.ts:49

Redis 登录管理选项

## Properties

### name?

> `optional` **name?**: `string`

Defined in: lib/session/login.ts:51

Session 名称；传 token 时必填，传控制器时使用已初始化 Session 的实际名称

***

### pre?

> `optional` **pre?**: `string`

Defined in: lib/session/login.ts:53

Session 名称之后的键名前缀，默认 login:；可进一步隔离授权用途

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: lib/session/login.ts:55

有效期秒数，默认 172800；整数 0～2147483647，0 表示永久；与业务 Session 有效期一致
