[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / Kv

# Class: Kv

Defined in: [lib/kv.ts:126](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L126)

键值存储操作类（兼容 Redis 与 Kvrocks）

## Example

```ts
import * as lKv from '@maiyunnet/kebab/lib/kv.js';
const kv = lKv.get(this);
await kv.ping();
const v = await kv.get('test');
const res = await kv.replace('test', 111);
```

## Constructors

### Constructor

> **new Kv**(`etc`): `Kv`

Defined in: [lib/kv.ts:137](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L137)

#### Parameters

##### etc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

#### Returns

`Kv`

## Methods

### add()

> **add**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:250](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L250)

添加一个值，存在则不变

#### Parameters

##### key

`string`

键

##### val

`string` \| `number` \| `object`

值

##### ttl?

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### append()

> **append**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:277](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L277)

向已存在的值后追加数据

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`Promise`\<`boolean`\>

***

### bLMove()

> **bLMove**(`sourceKey`, `destKey`, `soo`, `deo`, `timeout`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:943](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L943)

阻塞式在两个列表间移动元素（使用独立连接，避免阻塞共享连接）

#### Parameters

##### sourceKey

`string`

源列表键

##### destKey

`string`

目标列表键

##### soo

`"LEFT"` \| `"RIGHT"`

源端方向

##### deo

`"LEFT"` \| `"RIGHT"`

目标端方向

##### timeout

`number`

超时秒数，0 为无限等待

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### bRPop()

> **bRPop**(`key`, `timeout`): `Promise`\<`false` \| `Record`\<`string`, `string`\>\>

Defined in: [lib/kv.ts:994](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L994)

阻塞式从列表右侧弹出元素（使用独立连接，避免阻塞共享连接）

#### Parameters

##### key

`string` \| `string`[]

单个或序列键

##### timeout

`number`

超时秒数，0 为无限等待

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string`\>\>

***

### decr()

> **decr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:534](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L534)

自减

#### Parameters

##### key

`string`

键

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### del()

> **del**(`keys`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:484](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L484)

删除已存在的值

#### Parameters

##### keys

`string` \| `string`[]

单个或序列

#### Returns

`Promise`\<`boolean`\>

***

### eval()

> **eval**(`script`, `keys`, `args`): `Promise`\<`unknown`\>

Defined in: [lib/kv.ts:185](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L185)

在共享连接上执行一个 Redis Lua 脚本

#### Parameters

##### script

`string`

Lua 源码

##### keys

`string`[]

传给 KEYS 的完整键名，调用方需自行添加项目前缀

##### args

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

传给 ARGV 的参数

#### Returns

`Promise`\<`unknown`\>

Redis 原始结果，nil 返回 null，连接或执行失败返回 false

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:309](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L309)

检测 key 是否存在

#### Parameters

##### keys

`string` \| `string`[]

单个或序列

#### Returns

`Promise`\<`number`\>

***

### expire()

> **expire**(`key`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:562](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L562)

仅修改过期时间不修改值

#### Parameters

##### key

`string`

键

##### ttl

`number`

秒

#### Returns

`Promise`\<`boolean`\>

***

### flushDb()

> **flushDb**(): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:632](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L632)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:331](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L331)

获取字符串

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）

***

### getClient()

> **getClient**(): `Promise`\<[`TRedisClient`](../type-aliases/TRedisClient.md) \| `null`\>

Defined in: [lib/kv.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L157)

获取底层官方 redis 客户端实例（用于执行原生扩展命令）

#### Returns

`Promise`\<[`TRedisClient`](../type-aliases/TRedisClient.md) \| `null`\>

连接失败返回 null

***

### getDelJson()

#### Call Signature

> **getDelJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:455](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L455)

原子读取并删除键，再解析 JSON

##### Parameters

###### key

`string`

键

##### Returns

`Promise`\<`any`\>

解析结果，键不存在返回 null，Redis 操作或解析失败返回 false

#### Call Signature

> **getDelJson**\<`T`\>(`key`): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [lib/kv.ts:462](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L462)

原子读取并删除键，再解析 JSON

##### Type Parameters

###### T

`T`

预期的结果类型，解析时只检查 JSON 语法

##### Parameters

###### key

`string`

键

##### Returns

`Promise`\<`false` \| `T` \| `null`\>

解析结果，键不存在返回 null，Redis 操作或解析失败返回 false

***

### getJson()

#### Call Signature

> **getJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:434](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L434)

读取并解析键中的 JSON

##### Parameters

###### key

`string`

键

##### Returns

`Promise`\<`any`\>

解析结果，键不存在或未取得连接返回 null，读取异常或解析失败返回 false

#### Call Signature

> **getJson**\<`T`\>(`key`): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [lib/kv.ts:441](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L441)

读取并解析键中的 JSON

##### Type Parameters

###### T

`T`

预期的结果类型，解析时只检查 JSON 语法

##### Parameters

###### key

`string`

键

##### Returns

`Promise`\<`false` \| `T` \| `null`\>

解析结果，键不存在或未取得连接返回 null，读取异常或解析失败返回 false

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/kv.ts:149](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L149)

获取当前 Kv 实际生效的键名前缀

#### Returns

`string`

原生 pipeline / eval 不会自动添加的项目前缀

***

### hDel()

> **hDel**(`key`, `fields`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:818](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L818)

删除哈希键

#### Parameters

##### key

`string`

键

##### fields

`string` \| `string`[]

字段序列

#### Returns

`Promise`\<`number` \| `false`\>

***

### hExists()

> **hExists**(`key`, `field`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:839](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L839)

判断哈希字段是否存在

#### Parameters

##### key

`string`

键

##### field

`string`

字段

#### Returns

`Promise`\<`boolean`\>

***

### hGet()

> **hGet**(`key`, `field`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L729)

获取哈希值

#### Parameters

##### key

`string`

键

##### field

`string`

字段

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### hGetAll()

> **hGetAll**(`key`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:800](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L800)

批量获取哈希键值对

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

#### Call Signature

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:749](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L749)

读取并解析哈希字段中的 JSON

##### Parameters

###### key

`string`

键

###### field

`string`

哈希字段

##### Returns

`Promise`\<`any`\>

解析结果，字段不存在、JSON 无效或值为 JSON false 时返回 null；读取失败返回 false

#### Call Signature

> **hGetJson**\<`T`\>(`key`, `field`): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [lib/kv.ts:757](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L757)

读取并解析哈希字段中的 JSON

##### Type Parameters

###### T

`T`

预期的结果类型，解析时只检查 JSON 语法

##### Parameters

###### key

`string`

键

###### field

`string`

哈希字段

##### Returns

`Promise`\<`false` \| `T` \| `null`\>

解析结果，字段不存在、JSON 无效或值为 JSON false 时返回 null；读取失败返回 false

***

### hIncr()

> **hIncr**(`key`, `field`, `increment`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:858](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L858)

设置哈希自增自减

#### Parameters

##### key

`string`

key

##### field

`string`

字段

##### increment

`number`

正数或负数，整数或浮点

#### Returns

`Promise`\<`number` \| `false`\>

***

### hKeys()

> **hKeys**(`key`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:880](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L880)

获取哈希所有字段

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:775](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L775)

批量获取哈希值

#### Parameters

##### key

`string`

键

##### fields

`string`[]

字段列表

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hMSet()

> **hMSet**(`key`, `rows`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:699](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L699)

批量设置哈希值

#### Parameters

##### key

`string`

key 名

##### rows

`Record`\<`string`, `object` \| `string` \| `number`\>

field / val 对象

#### Returns

`Promise`\<`boolean`\>

***

### hSet()

> **hSet**(`key`, `field`, `val`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:669](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L669)

设置哈希表值

#### Parameters

##### key

`string`

key 名

##### field

`string`

字段名

##### val

`string` \| `number` \| `object`

值

##### mod?

`""` \| `"nx"` = `''`

空,nx(field不存在才建立)

#### Returns

`Promise`\<`boolean`\>

***

### incr()

> **incr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:506](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L506)

自增

#### Parameters

##### key

`string`

键

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### keys()

> **keys**(`pattern`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:579](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L579)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

匹配模式

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:1035](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1035)

获取列表长度

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:959](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L959)

从列表左侧弹出元素

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:898](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L898)

从列表左侧推入元素

#### Parameters

##### key

`string`

键

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

元素数组

#### Returns

`Promise`\<`number` \| `false`\>

***

### lRange()

> **lRange**(`key`, `start`, `stop`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:1018](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1018)

获取列表指定区间元素

#### Parameters

##### key

`string`

键

##### start

`number`

起始位置

##### stop

`number`

结束位置

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### mGet()

> **mGet**(`keys`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:382](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L382)

批量获取值

#### Parameters

##### keys

`string`[]

key 序列

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### mSet()

> **mSet**(`rows`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:408](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L408)

批量设置键值

#### Parameters

##### rows

`Record`\<`string`, `string` \| `Buffer`\>

key / val 对象

#### Returns

`Promise`\<`boolean`\>

***

### ping()

> **ping**(): `Promise`\<`string` \| `false`\>

Defined in: [lib/kv.ts:649](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L649)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### pipeline()

> **pipeline**(): `Promise`\<`any`\>

Defined in: [lib/kv.ts:165](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L165)

获取一个绑定在共享连接上的原生 multi / pipeline 对象（通过 execAsPipeline() 或 exec() 执行，无需关闭）

#### Returns

`Promise`\<`any`\>

失败则返回 false

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:295](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L295)

向已存在的值之前追加数据

#### Parameters

##### key

`string`

键

##### val

`string`

值

#### Returns

`Promise`\<`boolean`\>

***

### pttl()

> **pttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:365](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L365)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:264](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L264)

替换一个存在的值

#### Parameters

##### key

`string`

键

##### val

`string` \| `number` \| `object`

值

##### ttl?

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### rPop()

> **rPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:976](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L976)

从列表右侧弹出元素

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:919](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L919)

从列表右侧推入元素

#### Parameters

##### key

`string`

键

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

元素数组

#### Returns

`Promise`\<`number` \| `false`\>

***

### scan()

> **scan**(`cursor?`, `pattern?`, `count?`): `Promise`\<`false` \| [`IScanResult`](../interfaces/IScanResult.md)\<`string`\>\>

Defined in: [lib/kv.ts:603](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L603)

根据条件获取服务器上的 keys（兼容 Redis 数字串游标与 Kvrocks 字符串游标）

#### Parameters

##### cursor?

`string` \| `number` = `'0'`

游标，首次传 '0'（或 0）

##### pattern?

`string` = `'*'`

例如 *

##### count?

`number` = `10`

获取的条数

#### Returns

`Promise`\<`false` \| [`IScanResult`](../interfaces/IScanResult.md)\<`string`\>\>

***

### set()

> **set**(`key`, `val`, `ttl?`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:208](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L208)

设定一个值

#### Parameters

##### key

`string`

键

##### val

`string` \| `number` \| `object`

值

##### ttl?

`number` = `0`

秒，0 为不限制

##### mod?

`""` \| `"nx"` \| `"xx"` = `''`

设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）

#### Returns

`Promise`\<`boolean`\>

***

### ttl()

> **ttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:348](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L348)

获取相应的剩余有效期秒数

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`number` \| `null`\>

***

### zAdd()

添加有序集合元素

#### Call Signature

> **zAdd**(`key`, `score`, `member`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:1054](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1054)

添加有序集合元素（单个元素）

##### Parameters

###### key

`string`

key 名

###### score

`number`

分数

###### member

`string` \| `Buffer`\<`ArrayBufferLike`\>

成员

##### Returns

`Promise`\<`boolean`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [lib/kv.ts:1061](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1061)

添加有序集合元素（多个元素，含 INCR 选项）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options

[`IZAddOptions`](../interfaces/IZAddOptions.md) & `object`

选项（INCR 为 true 时返回新分数，条件未满足时返回 null）

##### Returns

`Promise`\<`number` \| `false` \| `null`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:1072](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1072)

添加有序集合元素（多个元素）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options?

[`IZAddOptions`](../interfaces/IZAddOptions.md)

选项

##### Returns

`Promise`\<`number` \| `false`\>

***

### zRangeWithScores()

> **zRangeWithScores**(`key`, `start`, `stop`, `options?`): `Promise`\<`false` \| `object`[]\>

Defined in: [lib/kv.ts:1136](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1136)

查询有序集合成员及分数

#### Parameters

##### key

`string`

键

##### start

`string` \| `number`

起点

##### stop

`string` \| `number`

终点

##### options?

[`IZRangeOptions`](../interfaces/IZRangeOptions.md)

范围与分页选项

#### Returns

`Promise`\<`false` \| `object`[]\>

***

### zRem()

> **zRem**(`key`, `members`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:1183](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1183)

移除有序集合成员

#### Parameters

##### key

`string`

键

##### members

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

成员列表

#### Returns

`Promise`\<`number` \| `false`\>
