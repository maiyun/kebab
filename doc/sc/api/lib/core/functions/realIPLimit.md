[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / realIPLimit

# Function: realIPLimit()

> **realIPLimit**(`ctr`, `name?`, `mask?`): `string`

Defined in: [lib/core.ts:466](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L466)

获取安全 IP 的限速段（用于 ratelimit 库的 key）
IPv4 原样返回；IPv6 截取前 mask 位（默认 /64）

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

Ctr 实例

### name?

`string` = `''`

输入安全的 header

### mask?

`number` = `64`

IPv6 前缀长度，0-128 的整数，默认 64

## Returns

`string`

限速段，如 192.168.1.1、2001:db8:1234:5678::
