[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IScanResult

# Interface: IScanResult\<T\>

Defined in: [lib/kv.ts:1380](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1380)

SCAN 分页结果

## Type Parameters

### T

`T` = `string`

## Properties

### cursor

> **cursor**: `string`

Defined in: [lib/kv.ts:1382](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1382)

下一页游标（'0' 表示结束；兼容 Redis 数字串与 Kvrocks 原生字符串游标）

***

### items

> **items**: `T`[]

Defined in: [lib/kv.ts:1384](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1384)

当前页匹配到的键名列表（已去除项目前缀）
