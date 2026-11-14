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

Defined in: [lib/kv.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L123)

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

Defined in: [lib/kv.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L150)

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

Defined in: [lib/kv.ts:770](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L770)

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

Defined in: [lib/kv.ts:809](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L809)

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

Defined in: [lib/kv.ts:416](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L416)

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

Defined in: [lib/kv.ts:364](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L364)

删除已存在的值

#### Parameters

##### keys

`string` \| `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:202](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L202)

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

Defined in: [lib/kv.ts:444](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L444)

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

Defined in: [lib/kv.ts:511](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L511)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:226](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L226)

获取字符串

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）

***

### getDelJson()

> **getDelJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:343](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L343)

原子获取并删除 JSON 对象

#### Parameters

##### key

`string`

键

#### Returns

`Promise`\<`any`\>

***

### getJson()

> **getJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:330](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L330)

获取 json 对象

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`any`\>

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

Defined in: [lib/kv.ts:672](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L672)

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

Defined in: [lib/kv.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L690)

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

Defined in: [lib/kv.ts:602](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L602)

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

Defined in: [lib/kv.ts:654](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L654)

批量获取哈希键值对

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:620](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L620)

获取哈希 json 对象

#### Parameters

##### key

`string`

##### field

`string`

#### Returns

`Promise`\<`any`\>

***

### hIncr()

> **hIncr**(`key`, `field`, `increment`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:709](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L709)

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

Defined in: [lib/kv.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L731)

获取哈希所有字段

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:637](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L637)

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

Defined in: [lib/kv.ts:574](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L574)

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

Defined in: [lib/kv.ts:548](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L548)

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

Defined in: [lib/kv.ts:388](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L388)

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

Defined in: [lib/kv.ts:461](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L461)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:838](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L838)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:783](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L783)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:744](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L744)

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

Defined in: [lib/kv.ts:825](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L825)

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

Defined in: [lib/kv.ts:277](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L277)

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

Defined in: [lib/kv.ts:306](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L306)

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

Defined in: [lib/kv.ts:528](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L528)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### pipeline()

> **pipeline**(): `Promise`\<`false` \| `IPipelineClient`\>

Defined in: [lib/kv.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L76)

获取一个 pipeline 操作对象

#### Returns

`Promise`\<`false` \| `IPipelineClient`\>

失败则返回 false

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:168](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L168)

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

Defined in: [lib/kv.ts:260](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L260)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl?`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:137](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L137)

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

Defined in: [lib/kv.ts:796](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L796)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:757](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L757)

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

Defined in: [lib/kv.ts:487](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L487)

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

Defined in: [lib/kv.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L91)

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

Defined in: [lib/kv.ts:243](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L243)

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

Defined in: [lib/kv.ts:857](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L857)

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

Defined in: [lib/kv.ts:864](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L864)

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

Defined in: [lib/kv.ts:871](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L871)

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

Defined in: [lib/kv.ts:878](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L878)

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

Defined in: [lib/kv.ts:899](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L899)

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

Defined in: [lib/kv.ts:924](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L924)

#### Parameters

##### key

`string`

##### members

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>
