[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/session/login](../index.md) / ILoginIdentity

# Interface: ILoginIdentity

Defined in: [lib/session/login.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L9)

业务验证通过后交给框架保存的登录身份

## Properties

### data?

> `optional` **data?**: `Record`\<`string`, [`LoginValue`](../type-aliases/LoginValue.md)\>

Defined in: [lib/session/login.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L17)

客户端等附加信息，默认空对象；JSON 编码最多 16 KiB，不保存密码或凭据

***

### scope?

> `optional` **scope?**: `string`

Defined in: [lib/session/login.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L13)

账号作用域，如租户或账号体系；默认空字符串，最多 256 个字符

***

### subject

> **subject**: `string`

Defined in: [lib/session/login.ts:11](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L11)

账号标识，非空，最多 256 个字符

***

### version?

> `optional` **version?**: `string`

Defined in: [lib/session/login.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L15)

授权版本，如密码指纹；默认空字符串，最多 1024 个字符，由业务与当前数据比较
