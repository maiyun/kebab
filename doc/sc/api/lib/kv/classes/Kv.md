[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / Kv

# Class: Kv

Defined in: [lib/kv.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L30)

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

Defined in: [lib/kv.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L35)

#### Parameters

##### etc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

#### Returns

`Kv`

## Methods

### add()

> **add**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:90](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L90)

添加一个值，存在则不变

#### Parameters

##### key

`string`

##### val

`string` | `number` | `object`

##### ttl

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### append()

> **append**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:117](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L117)

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

Defined in: [lib/kv.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L716)

#### Parameters

##### sourceKey

`string`

##### destKey

`string`

##### soo

`"LEFT"` | `"RIGHT"`

##### deo

`"LEFT"` | `"RIGHT"`

##### timeout

`number`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### bRPop()

> **bRPop**(`key`, `timeout`): `Promise`\<`false` \| `Record`\<`string`, `string`\>\>

Defined in: [lib/kv.ts:755](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L755)

#### Parameters

##### key

`string` | `string`[]

##### timeout

`number`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string`\>\>

***

### decr()

> **decr**(`key`, `num`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:362](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L362)

自减

#### Parameters

##### key

`string`

##### num

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### del()

> **del**(`keys`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:310](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L310)

删除已存在的值

#### Parameters

##### keys

`string` | `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L169)

检测 key 是否存在

#### Parameters

##### keys

单个或序列

`string` | `string`[]

#### Returns

`Promise`\<`number`\>

***

### expire()

> **expire**(`key`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:390](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L390)

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

Defined in: [lib/kv.ts:457](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L457)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:193](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L193)

获取字符串

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

字符串 / false / null（即使存入时是 number，这个方法也只会返回字符串）

***

### getJson()

> **getJson**(`key`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:297](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L297)

获取 json 对象

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`any`\>

***

### hDel()

> **hDel**(`key`, `fields`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:618](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L618)

删除哈希键

#### Parameters

##### key

`string`

##### fields

值序列

`string` | `string`[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### hExists()

> **hExists**(`key`, `field`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:636](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L636)

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

Defined in: [lib/kv.ts:548](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L548)

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

Defined in: [lib/kv.ts:600](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L600)

批量获取哈希键值对

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:566](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L566)

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

Defined in: [lib/kv.ts:655](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L655)

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

Defined in: [lib/kv.ts:677](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L677)

获取哈希所有字段

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:583](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L583)

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

Defined in: [lib/kv.ts:520](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L520)

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

> **hSet**(`key`, `field`, `val`, `mod`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:494](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L494)

设置哈希表值

#### Parameters

##### key

`string`

key 名

##### field

`string`

字段名

##### val

值

`string` | `number` | `object`

##### mod

空,nx(key不存在才建立)

`""` | `"nx"`

#### Returns

`Promise`\<`boolean`\>

***

### incr()

> **incr**(`key`, `num`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:334](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L334)

自增

#### Parameters

##### key

`string`

##### num

`number` = `1`

整数或浮点正数

#### Returns

`Promise`\<`number` \| `false`\>

***

### keys()

> **keys**(`pattern`): `Promise`\<`false` \| `string`[]\>

Defined in: [lib/kv.ts:407](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L407)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:784](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L784)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L729)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L690)

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

Defined in: [lib/kv.ts:771](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L771)

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

Defined in: [lib/kv.ts:244](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L244)

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

Defined in: [lib/kv.ts:273](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L273)

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

Defined in: [lib/kv.ts:474](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L474)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### pipeline()

> **pipeline**(): `Promise`\<`false` \| `IPipelineClient`\>

Defined in: [lib/kv.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L43)

获取一个 pipeline 操作对象

#### Returns

`Promise`\<`false` \| `IPipelineClient`\>

失败则返回 false

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L135)

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

Defined in: [lib/kv.ts:227](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L227)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L104)

替换一个存在的值

#### Parameters

##### key

`string`

键

##### val

值

`string` | `number` | `object`

##### ttl

`number` = `0`

秒，0 为不限制

#### Returns

`Promise`\<`boolean`\>

***

### rPop()

> **rPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:742](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L742)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L703)

#### Parameters

##### key

`string`

##### values

(`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`Promise`\<`number` \| `false`\>

***

### scan()

> **scan**(`cursor`, `pattern`, `count`): `Promise`\<`false` \| `IScanResult`\<`string`\>\>

Defined in: [lib/kv.ts:433](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L433)

根据条件获取服务器上的 keys

#### Parameters

##### cursor

`number` = `0`

##### pattern

`string` = `'*'`

例如 *

##### count

`number` = `10`

获取的条数

#### Returns

`Promise`\<`false` \| `IScanResult`\<`string`\>\>

***

### set()

> **set**(`key`, `val`, `ttl`, `mod`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L58)

设定一个值

#### Parameters

##### key

`string`

##### val

`string` | `number` | `object`

##### ttl

`number` = `0`

秒，0 为不限制

##### mod

设置模式: 空,nx（key不存在才建立）,xx（key存在才修改）

`""` | `"nx"` | `"xx"`

#### Returns

`Promise`\<`boolean`\>

***

### ttl()

> **ttl**(`key`): `Promise`\<`number` \| `null`\>

Defined in: [lib/kv.ts:210](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L210)

获取相应的剩余有效期秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>
