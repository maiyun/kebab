[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZAddOptions

# Interface: IZAddOptions

Defined in: [lib/kv.ts:1400](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1400)

ZADD 选项

## Properties

### CH?

> `optional` **CH?**: `boolean`

Defined in: [lib/kv.ts:1406](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1406)

返回值改为受影响总数（新增 + 分数变化的成员数），默认仅返回新增成员数

***

### comparison?

> `optional` **comparison?**: `"GT"` \| `"LT"`

Defined in: [lib/kv.ts:1404](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1404)

分数比较条件：GT 仅新分数大于旧分数时更新，LT 仅新分数小于旧分数时更新（不影响新增成员）

***

### condition?

> `optional` **condition?**: `"NX"` \| `"XX"`

Defined in: [lib/kv.ts:1402](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1402)

写入条件：NX 仅添加不存在的成员，XX 仅更新已存在的成员

***

### INCR?

> `optional` **INCR?**: `boolean`

Defined in: [lib/kv.ts:1408](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1408)

改为在原分数上累加（类似 ZINCRBY，仅支持单个成员），返回更新后的新分数
