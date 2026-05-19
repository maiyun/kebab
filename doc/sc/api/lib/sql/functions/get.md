[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / get

# Function: get()

> **get**(`opt`): [`Sql`](../classes/Sql.md)

Defined in: [lib/sql.ts:1310](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1310)

创建 sql 对象

## Parameters

### opt

参数

#### alias?

`string`[]

#### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

#### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### pre?

`string`

MySQL 时作为表前缀（如 prefix_），PostgreSQL 时作为 Schema 名。MySQL 会自动补充末尾下划线

#### service

[`ESERVICE`](../enumerations/ESERVICE.md)

#### sql?

`string`[]

## Returns

[`Sql`](../classes/Sql.md)
