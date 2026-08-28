[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / TValibotResponse

# Type Alias: TValibotResponse\<TIssue\>

> **TValibotResponse**\<`TIssue`\> = [`Json`](../../../index/type-aliases/Json.md)[] \| ((`issues`) => [`Json`](../../../index/type-aliases/Json.md)[])

Defined in: [sys/ctr.ts:46](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L46)

Valibot 校验失败时可直接返回给客户端的内容或生成函数

## Type Parameters

### TIssue

`TIssue` *extends* [`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\>
