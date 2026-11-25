[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `oetc?`): [`Kv`](../classes/Kv.md)

Defined in: [lib/kv.ts:1404](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1404)

获取 Kv 对象

## Parameters

### ctrEtc

[`IConfigKv`](../../../index/interfaces/IConfigKv.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器或配置信息

### oetc?

可用来覆盖 ctr 的部分连接选项

#### dbPre?

`boolean`

为 true 时将非 0 的 index 折算为键名前缀（如 db1:），不再发 SELECT

#### index?

`number`

数据库编号（0 起）

#### pre?

`string`

业务键名前缀

#### pwd?

`string`

认证密码或 Kvrocks namespace token

#### tls?

`boolean` \| `ConnectionOptions`

启用 TLS；传对象时自动开启 TLS 并透传 servername、ca 等参数

#### user?

`string`

ACL 用户名（留空则走传统单密码认证）

## Returns

[`Kv`](../classes/Kv.md)
