[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigKv

# Interface: IConfigKv

Defined in: [index.ts:168](https://github.com/maiyunnet/kebab/blob/master/index.ts#L168)

kv

## Properties

### dbPre?

> `optional` **dbPre?**: `boolean`

Defined in: [index.ts:183](https://github.com/maiyunnet/kebab/blob/master/index.ts#L183)

为 true 时将非 0 的 index 折算为键名前缀（如 db1:），不再向服务端发 SELECT

***

### host

> **host**: `string`

Defined in: [index.ts:170](https://github.com/maiyunnet/kebab/blob/master/index.ts#L170)

服务端地址（IP 或域名）

***

### index

> **index**: `number`

Defined in: [index.ts:174](https://github.com/maiyunnet/kebab/blob/master/index.ts#L174)

数据库编号（0 起）

***

### port

> **port**: `number`

Defined in: [index.ts:172](https://github.com/maiyunnet/kebab/blob/master/index.ts#L172)

服务端端口

***

### pre

> **pre**: `string`

Defined in: [index.ts:176](https://github.com/maiyunnet/kebab/blob/master/index.ts#L176)

业务键名前缀

***

### pwd

> **pwd**: `string`

Defined in: [index.ts:181](https://github.com/maiyunnet/kebab/blob/master/index.ts#L181)

认证密码或 Kvrocks namespace token

***

### tls?

> `optional` **tls?**: `boolean` \| `ConnectionOptions`

Defined in: [index.ts:185](https://github.com/maiyunnet/kebab/blob/master/index.ts#L185)

是否启用 TLS 连接；传入对象时自动启用 TLS 并透传证书/SNI 等参数（如 servername、ca）

***

### user

> **user**: `string`

Defined in: [index.ts:179](https://github.com/maiyunnet/kebab/blob/master/index.ts#L179)

ACL 用户名（留空则走传统单密码认证）
