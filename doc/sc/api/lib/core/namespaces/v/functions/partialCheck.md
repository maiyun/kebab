[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / partialCheck

# Function: partialCheck()

## Call Signature

> **partialCheck**\<`TInput$1`, `TPaths`, `TSelection`\>(`paths`, `requirement`): [`PartialCheckAction`](../interfaces/PartialCheckAction.md)\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13667

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

(`input`) => `boolean`

The validation function.

### Returns

[`PartialCheckAction`](../interfaces/PartialCheckAction.md)\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

A partial check action.

## Call Signature

> **partialCheck**\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>(`paths`, `requirement`, `message`): [`PartialCheckAction`](../interfaces/PartialCheckAction.md)\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13677

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

(`input`) => `boolean`

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`PartialCheckAction`](../interfaces/PartialCheckAction.md)\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

A partial check action.
