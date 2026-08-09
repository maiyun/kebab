[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / EJSON

# Enumeration: EJSON

Defined in: [lib/sql.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L22)

JSON 查询操作符

## Enumeration Members

### CONTAINED\_BY

> **CONTAINED\_BY**: `"json_in"`

Defined in: [lib/sql.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L26)

被包含值 (MySQL: JSON_CONTAINS, PG: <@)

***

### CONTAINS

> **CONTAINS**: `"json"`

Defined in: [lib/sql.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L24)

包含值 (MySQL: JSON_CONTAINS, PG: @>)

***

### HAS\_ALL\_KEYS

> **HAS\_ALL\_KEYS**: `"json_all"`

Defined in: [lib/sql.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L32)

存在所有 Key 不含值 (MySQL: JSON_CONTAINS_PATH all, PG: ?&)

***

### HAS\_ANY\_KEYS

> **HAS\_ANY\_KEYS**: `"json_any"`

Defined in: [lib/sql.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L30)

存在任意 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?|)

***

### HAS\_KEY

> **HAS\_KEY**: `"json_key"`

Defined in: [lib/sql.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L28)

存在 Key 不含值 (MySQL: JSON_CONTAINS_PATH one, PG: ?)

***

### OVERLAPS

> **OVERLAPS**: `"json_overlaps"`

Defined in: [lib/sql.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L34)

简单数组重叠 (MySQL: JSON_OVERLAPS, PG: &&)
