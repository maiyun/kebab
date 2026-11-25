[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IConnectionInfo

# Interface: IConnectionInfo

Defined in: [lib/kv.ts:1412](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1412)

Redis 连接缓存项

## Properties

### host

> **host**: `string`

Defined in: [lib/kv.ts:1414](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1414)

服务端地址（IP 或域名）

***

### index

> **index**: `number`

Defined in: [lib/kv.ts:1418](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1418)

实际选择的数据库编号

***

### port

> **port**: `number`

Defined in: [lib/kv.ts:1416](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1416)

服务端端口

***

### pwd

> **pwd**: `string`

Defined in: [lib/kv.ts:1422](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1422)

认证密码或 Kvrocks namespace token

***

### ready

> **ready**: `Promise`\<[`TRedisClient`](../type-aliases/TRedisClient.md) \| `null`\>

Defined in: [lib/kv.ts:1426](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1426)

并发请求等待同一次建连，成功返回客户端，失败返回 null

***

### tls

> **tls**: `string`

Defined in: [lib/kv.ts:1424](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1424)

TLS 配置区分键（空串表示明文，'1' 表示默认 TLS，其余为对象序列化键）

***

### user

> **user**: `string`

Defined in: [lib/kv.ts:1420](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1420)

ACL 用户名
