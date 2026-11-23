[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IConnectionInfo

# Interface: IConnectionInfo

Defined in: [lib/kv.ts:1045](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1045)

Redis 连接缓存项

## Properties

### host

> **host**: `string`

Defined in: [lib/kv.ts:1046](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1046)

***

### index

> **index**: `number`

Defined in: [lib/kv.ts:1048](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1048)

***

### port

> **port**: `number`

Defined in: [lib/kv.ts:1047](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1047)

***

### pwd

> **pwd**: `string`

Defined in: [lib/kv.ts:1050](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1050)

***

### ready

> **ready**: `Promise`\<`ICommandClient` \| `null`\>

Defined in: [lib/kv.ts:1052](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1052)

并发请求等待同一次建连，成功返回客户端，失败返回 null

***

### user

> **user**: `string`

Defined in: [lib/kv.ts:1049](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1049)
