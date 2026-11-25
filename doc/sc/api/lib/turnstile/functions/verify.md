[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/turnstile](../index.md) / verify

# Function: verify()

> **verify**(`ctr`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/turnstile.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/turnstile.ts#L30)

校验人机验证令牌

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

控制器实例

### opt

厂家、前端令牌与客户端 IP

#### factory

[`EFACTORY`](../enumerations/EFACTORY.md)

#### ip

`string`

#### token

`string`

## Returns

`Promise`\<`boolean`\>

是否通过验证
