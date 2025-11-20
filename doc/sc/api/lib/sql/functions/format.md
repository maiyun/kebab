[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / format

# Function: format()

> **format**(`sql`, `data`, `service`): `string`

Defined in: [lib/sql.ts:1162](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1162)

返回代入后的完整 SQL 字符串，这并不安全不能直接执行，只是用来调试打印 sql 语句

## Parameters

### sql

`string`

SQL 字符串

### data

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

DATA 数据

### service

[`ESERVICE`](../enumerations/ESERVICE.md) = `ESERVICE.MYSQL`

服务商，默认 MySQL

## Returns

`string`
