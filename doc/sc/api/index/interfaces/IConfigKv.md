[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigKv

# Interface: IConfigKv

Defined in: [index.ts:167](https://github.com/maiyunnet/kebab/blob/master/index.ts#L167)

kv

## Properties

### dbPre?

> `optional` **dbPre?**: `boolean`

Defined in: [index.ts:182](https://github.com/maiyunnet/kebab/blob/master/index.ts#L182)

为 true 时将非 0 的 index 折算为键名前缀（如 db1:），不再向服务端发 SELECT

***

### host

> **host**: `string`

Defined in: [index.ts:169](https://github.com/maiyunnet/kebab/blob/master/index.ts#L169)

服务端地址（IP 或域名）

***

### index

> **index**: `number`

Defined in: [index.ts:173](https://github.com/maiyunnet/kebab/blob/master/index.ts#L173)

数据库编号（0 起）

***

### port

> **port**: `number`

Defined in: [index.ts:171](https://github.com/maiyunnet/kebab/blob/master/index.ts#L171)

服务端端口

***

### pre

> **pre**: `string`

Defined in: [index.ts:175](https://github.com/maiyunnet/kebab/blob/master/index.ts#L175)

业务键名前缀

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:180](https://github.com/maiyunnet/kebab/blob/master/index.ts#L180)

认证密码或 Kvrocks namespace token

***

### tls?

> `optional` **tls?**: `boolean` \| `ConnectionOptions`

Defined in: [index.ts:184](https://github.com/maiyunnet/kebab/blob/master/index.ts#L184)

是否启用 TLS 连接；传入对象时自动启用 TLS 并透传证书/SNI 等参数（如 servername、ca）

***

### user

> **user**: `string`

Defined in: [index.ts:178](https://github.com/maiyunnet/kebab/blob/master/index.ts#L178)

ACL 用户名（留空则走传统单密码认证）
