[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / Ai

# Class: Ai

Defined in: [lib/ai.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L75)

## Constructors

### Constructor

> **new Ai**(`ctrEtc`, `opt`): `Ai`

Defined in: [lib/ai.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L88)

#### Parameters

##### ctrEtc

[`IConfigAi`](../../../index/interfaces/IConfigAi.md) \| [`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Ai`

## Properties

### link

> `readonly` **link**: `OpenAI`

Defined in: [lib/ai.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L78)

openai 原生对象

## Accessors

### service

#### Get Signature

> **get** **service**(): [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:181](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L181)

获取当前服务商

##### Returns

[`ESERVICE`](../enumerations/ESERVICE.md)

## Methods

### chat()

创建对话

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

Defined in: [lib/ai.ts:197](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L197)

创建非流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsNonStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`ChatCompletion`\>\>

#### Call Signature

> **chat**(`body`): `Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

Defined in: [lib/ai.ts:201](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L201)

创建流式对话

##### Parameters

###### body

`ChatCompletionCreateParamsStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Stream`\<`ChatCompletionChunk`\>\>\>

***

### embedding()

> **embedding**(`body`): `Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

Defined in: [lib/ai.ts:250](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L250)

创建向量

#### Parameters

##### body

`EmbeddingCreateParams`

#### Returns

`Promise`\<`false` \| `APIPromise`\<`CreateEmbeddingResponse`\>\>

***

### image()

> **image**(`opt`): `Promise`\<`false` \| \{ `list`: `object`[]; `request`: `string`; `seed`: `number`; \}\>

Defined in: [lib/ai.ts:266](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L266)

生成图像，不支持 GEMINI、GROK 服务商

#### Parameters

##### opt

###### extend?

`boolean`

模型是否自动优化提示词，默认为 false，但有些服务商可能无效

###### imgs?

`string`[]

参考图，请注意模型是否支持，以及是否支持多张，仅支持 ALICN、ALIAS、ALINE、VOLCN、VOLAS 服务商

###### model

`string`

###### n?

`number`

生成图片的数量，默认为 1

###### negative?

`string`

负面提示词，用于引导模型避免生成某些内容

###### prompt

`string`

提示词

###### seed?

`number`

随机种子，默认为随机

###### size

`number`[]

长 x 宽，不同模型要求不同，如 [1664, 928]

#### Returns

`Promise`\<`false` \| \{ `list`: `object`[]; `request`: `string`; `seed`: `number`; \}\>

***

### poll()

> **poll**(`opt`): `Promise`\<`false` \| \{ `add?`: `number`; `end?`: `number`; `error?`: `string`; `start?`: `number`; `status`: `"FAILED"` \| `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; `url?`: `string`; \}\>

Defined in: [lib/ai.ts:631](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L631)

轮询任务

#### Parameters

##### opt

###### task

`string`

###### type

`"video"`

#### Returns

`Promise`\<`false` \| \{ `add?`: `number`; `end?`: `number`; `error?`: `string`; `start?`: `number`; `status`: `"FAILED"` \| `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; `url?`: `string`; \}\>

***

### response()

创建 Response

#### Call Signature

> **response**(`body`): `Promise`\<`false` \| `APIPromise`\<`Response`\>\>

Defined in: [lib/ai.ts:224](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L224)

创建非流式 Response

##### Parameters

###### body

`ResponseCreateParamsNonStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Response`\>\>

#### Call Signature

> **response**(`body`): `Promise`\<`false` \| `APIPromise`\<`Stream`\<`ResponseStreamEvent`\>\>\>

Defined in: [lib/ai.ts:228](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L228)

创建流式 Response

##### Parameters

###### body

`ResponseCreateParamsStreaming`

##### Returns

`Promise`\<`false` \| `APIPromise`\<`Stream`\<`ResponseStreamEvent`\>\>\>

***

### video()

> **video**(`opt`): `Promise`\<`false` \| \{ `request`: `string`; `seed`: `number`; `status`: `"FAILED"` \| `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; \}\>

Defined in: [lib/ai.ts:457](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L457)

异步生成视频，仅支持 ALICN、ALIAS、ALINE

#### Parameters

##### opt

###### audio?

`string` \| `boolean`

视频声音，默认 false，true 代表自动配音，字符串代表自定义音频网址

###### duration?

`number`

视频时长，默认 2 秒

###### extend?

`boolean`

模型是否自动优化提示词，默认为 false，但有些服务商可能无效

###### imgs?

`string`[]

参考图，1 张为首帧，2 张为首尾帧

###### mode?

`"frame"` \| `"text"` \| `"ref"`

文本(默认)、首尾帧、参考图

###### model

`string`

###### negative?

`string`

负面提示词，用于引导模型避免生成某些内容

###### prompt

`string`

提示词，参考类可用 [I1] 指代图片，如 `[I1] 看向 [I2]`

###### ratio?

`"16:9"` \| `"9:16"` \| `"4:3"` \| `"3:4"` \| `"1:1"` \| `"21:9"`

比例，默认 16:9

###### resolution?

`"480p"` \| `"720p"` \| `"1080p"`

分辨率，默认 720p

###### seed?

`number`

随机种子，默认为随机，范围 0 - 2147483647

###### shot?

`"single"` \| `"multi"`

镜头，默认单镜头 single

#### Returns

`Promise`\<`false` \| \{ `request`: `string`; `seed`: `number`; `status`: `"FAILED"` \| `"PENDING"` \| `"RUNNING"` \| `"SUCCEEDED"` \| `"CANCELED"` \| `"UNKNOWN"`; `task`: `string`; \}\>
