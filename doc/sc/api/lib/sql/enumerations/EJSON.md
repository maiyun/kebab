[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / EJSON

# Enumeration: EJSON

Defined in: [lib/sql.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L21)

JSON 查询操作符

## Enumeration Members

### CONTAINED\_BY

> **CONTAINED\_BY**: `"json_in"`

Defined in: [lib/sql.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L25)

被包含 (MySQL: JSON_CONTAINS, PG: <@)

***

### CONTAINS

> **CONTAINS**: `"json"`

Defined in: [lib/sql.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L23)

包含 (MySQL: JSON_CONTAINS, PG: @>)

***

### HAS\_ALL\_KEYS

> **HAS\_ALL\_KEYS**: `"json_all"`

Defined in: [lib/sql.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L31)

存在所有 Key (MySQL: JSON_CONTAINS_PATH all, PG: ?&)

***

### HAS\_ANY\_KEYS

> **HAS\_ANY\_KEYS**: `"json_any"`

Defined in: [lib/sql.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L29)

存在任意 Key (MySQL: JSON_CONTAINS_PATH one, PG: ?|)

***

### HAS\_KEY

> **HAS\_KEY**: `"json_key"`

Defined in: [lib/sql.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L27)

存在 Key (MySQL: JSON_CONTAINS_PATH one, PG: ?)
