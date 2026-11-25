[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `opt?`): [`Pool`](../pool/classes/Pool.md)

Defined in: [lib/db.ts:105](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L105)

获取 Db Pool 对象（单 Pool 内同时管理主库和可选只读从库）

## Parameters

### ctrEtc

[`IConfigDb`](../../../index/interfaces/IConfigDb.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器对象或主库连接配置

### opt?

选项

#### read?

`Partial`\<[`IConfigDb`](../../../index/interfaces/IConfigDb.md)\> \| `Partial`\<[`IConfigDb`](../../../index/interfaces/IConfigDb.md)\>[]

可选只读从库配置，传入时覆盖控制器配置中的 read

#### service?

[`ESERVICE`](../enumerations/ESERVICE.md)

服务商，未传时从控制器配置读取，直接传配置时默认 PGSQL

## Returns

[`Pool`](../pool/classes/Pool.md)

Db Pool 对象
