[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / IValibotOptions

# Interface: IValibotOptions\<TIssue\>

Defined in: [sys/ctr.ts:53](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L53)

Valibot 同步校验选项

## Type Parameters

### TIssue

`TIssue` *extends* [`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\>

## Properties

### config?

> `optional` **config?**: [`Config`](../../../lib/core/namespaces/v/interfaces/Config.md)\<`TIssue`\>

Defined in: [sys/ctr.ts:55](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L55)

传给 Valibot 的校验配置

***

### response?

> `optional` **response?**: [`TValibotResponse`](../type-aliases/TValibotResponse.md)\<`TIssue`\>

Defined in: [sys/ctr.ts:57](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L57)

校验失败时返回给客户端的内容，默认使用首个 issue 的消息

***

### translate?

> `optional` **translate?**: [`TValibotTranslate`](../type-aliases/TValibotTranslate.md)

Defined in: [sys/ctr.ts:59](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L59)

使用完整 issue 路径翻译消息
