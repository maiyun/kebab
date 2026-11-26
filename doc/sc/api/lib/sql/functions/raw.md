[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / raw

# Function: raw()

> **raw**(`sql`, `params?`): [`IRawValue`](../interfaces/IRawValue.md)

Defined in: [lib/sql.ts:1908](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1908)

创建显式 SQL 表达式值，用于 INSERT / UPDATE 写入原生 SQL 函数或 CASE 表达式
使用内部私有 Symbol 标记，外部 JSON 无法伪造；普通数组不再自动识别为 SQL 表达式

## Parameters

### sql

`string`

原生 SQL 表达式，参数位置使用 ? 占位

### params?

[`DbValue`](../../../index/type-aliases/DbValue.md)[] = `[]`

绑定参数列表

## Returns

[`IRawValue`](../interfaces/IRawValue.md)

SQL 表达式包装对象
