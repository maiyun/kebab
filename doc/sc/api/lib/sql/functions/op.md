[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / op

# Function: op()

> **op**(`operator`, `value`): [`IWhereValue`](../interfaces/IWhereValue.md)

Defined in: [lib/sql.ts:1893](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1893)

创建对象筛选条件的显式操作符值，如 { 'price': op('<', 0) }

## Parameters

### operator

[`TWhereOperator`](../type-aliases/TWhereOperator.md)

SQL 或 JSON 查询操作符

### value

`unknown`

比较右值，必须提供，可传 null

## Returns

[`IWhereValue`](../interfaces/IWhereValue.md)

条件值。构建 SQL 时，操作符无效或缺少右值会记录构建错误
