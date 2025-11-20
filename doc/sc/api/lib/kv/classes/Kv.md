[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / Kv

# Class: Kv

Defined in: [lib/kv.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L18)

## Constructors

### Constructor

> **new Kv**(`etc`): `Kv`

Defined in: [lib/kv.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L23)

#### Parameters

##### etc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md)

#### Returns

`Kv`

## Methods

### add()

> **add**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L66)

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

Defined in: [lib/kv.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L93)

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

Defined in: [lib/kv.ts:692](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L692)

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

Defined in: [lib/kv.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L731)

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

Defined in: [lib/kv.ts:338](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L338)

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

Defined in: [lib/kv.ts:286](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L286)

删除已存在的值

#### Parameters

##### keys

`string` | `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### exists()

> **exists**(`keys`): `Promise`\<`number`\>

Defined in: [lib/kv.ts:145](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L145)

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

Defined in: [lib/kv.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L366)

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

Defined in: [lib/kv.ts:433](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L433)

清除当前所选数据库的所有内容

#### Returns

`Promise`\<`boolean`\>

***

### get()

> **get**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L169)

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

Defined in: [lib/kv.ts:273](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L273)

获取 json 对象

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`any`\>

***

### hDel()

> **hDel**(`key`, `fields`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:594](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L594)

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

Defined in: [lib/kv.ts:612](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L612)

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

Defined in: [lib/kv.ts:524](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L524)

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

Defined in: [lib/kv.ts:576](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L576)

批量获取哈希键值对

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

***

### hGetJson()

> **hGetJson**(`key`, `field`): `Promise`\<`any`\>

Defined in: [lib/kv.ts:542](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L542)

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

Defined in: [lib/kv.ts:631](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L631)

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

Defined in: [lib/kv.ts:653](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L653)

获取哈希所有字段

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### hMGet()

> **hMGet**(`key`, `fields`): `Promise`\<`false` \| `Record`\<`string`, `string` \| `null`\>\>

Defined in: [lib/kv.ts:559](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L559)

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

Defined in: [lib/kv.ts:496](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L496)

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

Defined in: [lib/kv.ts:470](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L470)

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

Defined in: [lib/kv.ts:310](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L310)

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

Defined in: [lib/kv.ts:383](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L383)

获取服务器上的所有 key 列表

#### Parameters

##### pattern

`string`

#### Returns

`Promise`\<`false` \| `string`[]\>

***

### lLen()

> **lLen**(`key`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:760](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L760)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `false`\>

***

### lPop()

> **lPop**(`key`): `Promise`\<`string` \| `false` \| `null`\>

Defined in: [lib/kv.ts:705](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L705)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### lPush()

> **lPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:666](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L666)

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

Defined in: [lib/kv.ts:747](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L747)

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

Defined in: [lib/kv.ts:220](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L220)

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

Defined in: [lib/kv.ts:249](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L249)

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

Defined in: [lib/kv.ts:450](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L450)

发送 ping

#### Returns

`Promise`\<`string` \| `false`\>

***

### prepend()

> **prepend**(`key`, `val`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L111)

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

Defined in: [lib/kv.ts:203](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L203)

获取相应的剩余有效期毫秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>

***

### replace()

> **replace**(`key`, `val`, `ttl`): `Promise`\<`boolean`\>

Defined in: [lib/kv.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L80)

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

Defined in: [lib/kv.ts:718](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L718)

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `false` \| `null`\>

***

### rPush()

> **rPush**(`key`, `values`): `Promise`\<`number` \| `false`\>

Defined in: [lib/kv.ts:679](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L679)

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

Defined in: [lib/kv.ts:409](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L409)

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

Defined in: [lib/kv.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L34)

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

Defined in: [lib/kv.ts:186](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L186)

获取相应的剩余有效期秒数

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`number` \| `null`\>
