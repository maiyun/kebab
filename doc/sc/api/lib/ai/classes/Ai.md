[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / Ai

# Class: Ai

Defined in: [lib/ai.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L49)

## Constructors

### Constructor

> **new Ai**(`ctrEtc`, `opt`): `Ai`

Defined in: [lib/ai.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L56)

#### Parameters

##### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) | [`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Ai`

## Properties

### link

> `readonly` **link**: `OpenAI`

Defined in: [lib/ai.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L52)

openai 原生对象，建议只读

## Methods

### chat()

创建对话

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

Defined in: [lib/ai.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L111)

创建非流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsNonStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

Defined in: [lib/ai.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L115)

创建流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

***

### embedding()

> **embedding**(`body`): `Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

Defined in: [lib/ai.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L135)

创建向量

#### Parameters

##### body

`EmbeddingCreateParams`

#### Returns

`Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>
