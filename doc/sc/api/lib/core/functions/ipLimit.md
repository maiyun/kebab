[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ipLimit

# Function: ipLimit()

> **ipLimit**(`ip`, `mask?`): `string`

Defined in: [lib/core.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L446)

截取 IP 的限速段
IPv4 原样返回；IPv6 截取前 mask 位（默认 /64），防止同一人使用大量 IPv6 地址绕过限速

## Parameters

### ip

`string`

IP 地址

### mask?

`number` = `64`

IPv6 前缀长度，0-128 的整数，默认 64

## Returns

`string`

限速段，如 192.168.1.1、2001:db8:1234:5678::
