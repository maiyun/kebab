[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / IValibotXOptions

# Interface: IValibotXOptions\<TIssue\>

Defined in: [sys/ctr.ts:69](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L69)

带 XSRF 检测的 Valibot 同步校验选项

## Type Parameters

### TIssue

`TIssue` *extends* [`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\>

## Properties

### config?

> `optional` **config?**: [`Config`](../../../lib/core/namespaces/v/interfaces/Config.md)\<`TIssue`\>

Defined in: [sys/ctr.ts:71](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L71)

传给 Valibot 的校验配置

***

### ignoreXsrf?

> `optional` **ignoreXsrf?**: `boolean`

Defined in: [sys/ctr.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L77)

是否忽略 XSRF 检测

***

### response?

> `optional` **response?**: [`TValibotResponse`](../type-aliases/TValibotResponse.md)\<[`IValibotXsrfIssue`](IValibotXsrfIssue.md) \| `TIssue`\>

Defined in: [sys/ctr.ts:73](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L73)

校验失败时返回给客户端的内容，回调同时可能收到 XSRF issue

***

### translate?

> `optional` **translate?**: [`TValibotTranslate`](../type-aliases/TValibotTranslate.md)

Defined in: [sys/ctr.ts:75](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L75)

使用完整 issue 路径翻译消息，包括 XSRF issue
