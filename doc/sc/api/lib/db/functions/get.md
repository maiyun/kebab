[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / get

# Function: get()

> **get**(`ctrEtc`, `opt`): [`Pool`](../pool/classes/Pool.md)

Defined in: [lib/db.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L68)

获取 Db Pool 对象

## Parameters

### ctrEtc

控制器对象或数据库配置信息

[`IConfigDb`](../../../index/interfaces/IConfigDb.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

### opt

选项

#### service?

[`ESERVICE`](../enumerations/ESERVICE.md)

服务商，默认 PGSQL

## Returns

[`Pool`](../pool/classes/Pool.md)

Db Pool 对象
