[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / Kv

# Class: Kv

Defined in: [lib/kv.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L55)

键值存储操作类

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

Defined in: [lib/kv.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L60)

#### Parameters

##### etc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

#### Returns

`Kv`

## Methods

### add()

> **add**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L143)

添加一个值，存在则不变

#### Parameters

##### key

`string`

##### val

`string` \| `number` \| `object`

##### ttl?

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### append()

> **append**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:170](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L170)

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

Defined in: [lib/kv.ts:817](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L817)

#### Parameters

##### sourceKey

`string`

##### destKey

`string`

##### soo

`"LEFT"` \| `"RIGHT"`

##### deo

`"LEFT"` \| `"RIGHT"`

##### timeout

`number`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### bRPop()

> **bRPop**(`key`, `timeout`): `Promise`\<`false` \| `Record`\<`string`, `string`\>\>

Defined in: [lib/kv.ts:856](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L856)

#### Parameters

##### key

`string` \| `string`[]

##### timeout

`number`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string`\>\>

***

### decr()

> **decr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:453](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L453)

自减

#### Parameters

##### key

`string`

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### del()

> **del**(`keys`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:401](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L401)

删除已存在的值

#### Parameters

##### keys

`string` \| `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### eval()

> **eval**(`script`, `keys`, `args`): `Promise`\<`unknown`\>

Defined in: [lib/kv.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L91)

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

Defined in: [lib/kv.ts:222](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L222)

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

Defined in: [lib/kv.ts:481](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L481)

仅修改过期时间不修改值

#### Parameters

##### key

`string`

##### ttl

`number`

#### Returns

`Promise`\<`boolean`\>

***

### flushDb()

> **flushDb**(): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:548](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L548)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:246](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L246)

获取字符串

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）

***

### getDelJson()

#### Call Signature

> **getDelJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:372](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L372)

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

Defined in: [lib/kv.ts:379](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L379)

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

Defined in: [lib/kv.ts:351](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L351)

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

Defined in: [lib/kv.ts:358](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L358)

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

Defined in: [lib/kv.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L68)

获取当前 Kv 配置的键名前缀

#### Returns

`string`

原生 pipeline 不会自动添加的项目前缀

***

### hDel()

> **hDel**(`key`, `fields`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L719)

删除哈希键

#### Parameters

##### key

`string`

##### fields

`string` \| `string`[]

值序列

#### Returns

`Promise`\<`number` \| `false`\>

***

### hExists()

> **hExists**(`key`, `field`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:737](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L737)

判断哈希字段是否存在

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`boolean`\>

***

### hGet()

> **hGet**(`key`, `field`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:639](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L639)

获取哈希值

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### hGetAll()

> **hGetAll**(`key`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:701](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L701)

批量获取哈希键值对

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

#### Call Signature

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:658](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L658)

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

Defined in: [lib/kv.ts:666](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L666)

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

Defined in: [lib/kv.ts:756](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L756)

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

Defined in: [lib/kv.ts:778](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L778)

获取哈希所有字段

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:684](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L684)

批量获取哈希值

#### Parameters

##### key

`string`

##### fields

`string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hMSet()

> **hMSet**(`key`, `rows`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:611](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L611)

批量设置哈希值

#### Parameters

##### key

`string`

key 名

##### rows

`Record`\<`string`, `object` \| `string` \| `number`\>

key / val 数组

#### Returns

`Promise`\<`boolean`\>

***

### hSet()

> **hSet**(`key`, `field`, `val`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:585](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L585)

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

空,nx(key不存在才建立)

#### Returns

`Promise`\<`boolean`\>

***

### incr()

> **incr**(`key`, `num?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:425](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L425)

自增

#### Parameters

##### key

`string`

##### num?

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### keys()

> **keys**(`pattern`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:498](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L498)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L885)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:830](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L830)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:791](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L791)

#### Parameters

##### key

`string`

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### lRange()

> **lRange**(`key`, `start`, `stop`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:872](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L872)

#### Parameters

##### key

`string`

##### start

`number`

##### stop

`number`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### mGet()

> **mGet**(`keys`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:297](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L297)

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

Defined in: [lib/kv.ts:326](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L326)

批量设置哈希值

#### Parameters

##### rows

`Record`\<`string`, `string` \| `Buffer`\>

key / val 数组

#### Returns

`Promise`\<`boolean`\>

***

### ping()

> **ping**(): `Promise`\<`string` \| `false`\>

Defined in: [lib/kv.ts:565](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L565)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### pipeline()

> **pipeline**(): `Promise`\<`false` \| `IPipelineClient`\>

Defined in: [lib/kv.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L76)

获取一个使用独立连接的 pipeline，调用方须在 finally 中调用 close()

#### Returns

`Promise`\<`false` \| `IPipelineClient`\>

失败则返回 false

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:188](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L188)

向已存在的值之前追加数据

#### Parameters

##### key

`string`

##### val

`string`

#### Returns

`Promise`\<`boolean`\>

***

### pttl()

> **pttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:280](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L280)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:157](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L157)

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

Defined in: [lib/kv.ts:843](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L843)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:804](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L804)

#### Parameters

##### key

`string`

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### scan()

> **scan**(`cursor?`, `pattern?`, `count?`): `Promise`\<`false` \| `IScanResult`\<`string`\>\>

Defined in: [lib/kv.ts:524](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L524)

根据条件获取服务器上的 keys

#### Parameters

##### cursor?

`number` = `0`

##### pattern?

`string` = `'*'`

例如 *

##### count?

`number` = `10`

获取的条数

#### Returns

`Promise`\<`false` \| `IScanResult`\<`string`\>\>

***

### set()

> **set**(`key`, `val`, `ttl?`, `mod?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L111)

设定一个值

#### Parameters

##### key

`string`

##### val

`string` \| `number` \| `object`

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

Defined in: [lib/kv.ts:263](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L263)

获取相应的剩余有效期秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### zAdd()

添加有序集合元素

#### Call Signature

> **zAdd**(`key`, `score`, `member`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L904)

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

> **zAdd**(`key`, `elements`, `options`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:911](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L911)

添加有序集合元素（多个元素，含 INCR 选项）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options

`IZAddOptionsIncr`

选项，需要 INCR

##### Returns

`Promise`\<`number` \| `false`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [lib/kv.ts:918](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L918)

添加有序集合元素（多个元素，含 INCR 选项，可空）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options

`IZAddOptionsIncrNullable`

选项，需要 INCR Nullable

##### Returns

`Promise`\<`number` \| `false` \| `null`\>

#### Call Signature

> **zAdd**(`key`, `elements`, `options?`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:925](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L925)

添加有序集合元素（多个元素）

##### Parameters

###### key

`string`

key 名

###### elements

`object`[]

元素数组

###### options?

`IZAddOptions`

选项

##### Returns

`Promise`\<`number` \| `false`\>

***

### zRangeWithScores()

> **zRangeWithScores**(`key`, `start`, `stop`, `options?`): `Promise`\<`false` \| `object`[]\>

Defined in: [lib/kv.ts:946](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L946)

#### Parameters

##### key

`string`

##### start

`number`

##### stop

`number`

##### options?

[`IZRangeOptions`](../interfaces/IZRangeOptions.md)

#### Returns

`Promise`\<`false` \| `object`[]\>

***

### zRem()

> **zRem**(`key`, `members`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:971](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L971)

#### Parameters

##### key

`string`

##### members

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>
