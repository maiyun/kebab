[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IConnectionInfo

# Interface: IConnectionInfo

Defined in: [lib/kv.ts:1468](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1468)

Redis 连接缓存项

## Properties

### host

> **host**: `string`

Defined in: [lib/kv.ts:1470](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1470)

服务端地址（IP 或域名）

***

### index

> **index**: `number`

Defined in: [lib/kv.ts:1474](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1474)

实际选择的数据库编号

***

### port

> **port**: `number`

Defined in: [lib/kv.ts:1472](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1472)

服务端端口

***

### pwd

> **pwd**: `string`

Defined in: [lib/kv.ts:1478](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1478)

认证密码或 Kvrocks namespace token

***

### ready

> **ready**: `Promise`\<[`TRedisClient`](../type-aliases/TRedisClient.md) \| `null`\>

Defined in: [lib/kv.ts:1482](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1482)

并发请求等待同一次建连，成功返回客户端，失败返回 null

***

### tls

> **tls**: `string`

Defined in: [lib/kv.ts:1480](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1480)

TLS 配置区分键（空串表示明文，'1' 表示默认 TLS，其余为对象序列化键）

***

### user

> **user**: `string`

Defined in: [lib/kv.ts:1476](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1476)

ACL 用户名
