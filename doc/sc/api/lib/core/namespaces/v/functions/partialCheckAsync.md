[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / partialCheckAsync

# Function: partialCheckAsync()

## Call Signature

> **partialCheckAsync**\<`TInput$1`, `TPaths`, `TSelection`\>(`paths`, `requirement`): [`PartialCheckActionAsync`](../interfaces/PartialCheckActionAsync.md)\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13717

Creates a partial check validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `PartialInput`

#### TPaths

`TPaths` *extends* `RequiredPaths`

#### TSelection

`TSelection` *extends* \{\[`key`: `string`\]: `never`; \} \| `never`[] \| \{\[`key`: `number`\]: `never`;
\[`key`: `string`\]: `unknown`; \}

### Parameters

#### paths

`ValidPaths`\<`TInput$1`, `TPaths`\>

The selected paths.

#### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

### Returns

[`PartialCheckActionAsync`](../interfaces/PartialCheckActionAsync.md)\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

A partial check action.

## Call Signature

> **partialCheckAsync**\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>(`paths`, `requirement`, `message`): [`PartialCheckActionAsync`](../interfaces/PartialCheckActionAsync.md)\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13727

Creates a partial check validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `PartialInput`

#### TPaths

`TPaths` *extends* `RequiredPaths`

#### TSelection

`TSelection` *extends* \{\[`key`: `string`\]: `never`; \} \| `never`[] \| \{\[`key`: `number`\]: `never`;
\[`key`: `string`\]: `unknown`; \}

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PartialCheckIssue`](../interfaces/PartialCheckIssue.md)\<`TSelection`\>\> \| `undefined`

### Parameters

#### paths

`ValidPaths`\<`TInput$1`, `TPaths`\>

The selected paths.

#### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`PartialCheckActionAsync`](../interfaces/PartialCheckActionAsync.md)\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

A partial check action.
