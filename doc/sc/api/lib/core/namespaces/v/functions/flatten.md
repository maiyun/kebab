[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / flatten

# Function: flatten()

## Call Signature

> **flatten**(`issues`): `object`

Defined in: node\_modules/valibot/dist/index.d.mts:291

Flatten the error messages of issues.

### Parameters

#### issues

readonly \[[`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\]

The list of issues.

### Returns

A flat error object.

#### nested?

> `readonly` `optional` **nested?**: `object`

The nested errors.

Hint: The error messages of issues with a path that belong to the nested
parts of the schema and can be converted to a dot path are added to this
key.

##### Index Signature

\[`key`: `string`\]: \[`string`, `...string[]`\] \| `undefined`

#### other?

> `readonly` `optional` **other?**: \[`string`, `...string[]`\]

The other errors.

Hint: Some issue paths, for example for complex data types like `Set` and
`Map`, have no key or a key that cannot be converted to a dot path. These
error messages are added to this key.

#### root?

> `readonly` `optional` **root?**: \[`string`, `...string[]`\]

The root errors.

Hint: The error messages of issues without a path that belong to the root
of the schema are added to this key.

## Call Signature

> **flatten**\<`TSchema`\>(`issues`): `object`

Defined in: node\_modules/valibot/dist/index.d.mts:299

Flatten the error messages of issues.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### issues

readonly \[[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\]

The list of issues.

### Returns

A flat error object.

#### nested?

> `readonly` `optional` **nested?**: \{ \[TKey in string\]: Readonly\<Partial\<Record\<TSchema extends BaseSchema\<unknown, unknown, BaseIssue\<(...)\>\> \| BaseSchemaAsync\<unknown, unknown, BaseIssue\<(...)\>\> ? IssueDotPath\<TSchema\> : string, \[string, ...string\[\]\]\>\>\>\[TKey\] \}

The nested errors.

Hint: The error messages of issues with a path that belong to the nested
parts of the schema and can be converted to a dot path are added to this
key.

#### other?

> `readonly` `optional` **other?**: \[`string`, `...string[]`\]

The other errors.

Hint: Some issue paths, for example for complex data types like `Set` and
`Map`, have no key or a key that cannot be converted to a dot path. These
error messages are added to this key.

#### root?

> `readonly` `optional` **root?**: \[`string`, `...string[]`\]

The root errors.

Hint: The error messages of issues without a path that belong to the root
of the schema are added to this key.
