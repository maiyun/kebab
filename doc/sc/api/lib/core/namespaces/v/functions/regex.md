[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / regex

# Function: regex()

## Call Signature

> **regex**\<`TInput$1`\>(`requirement`): [`RegexAction`](../interfaces/RegexAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14369

Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.

Hint: Be careful with the global flag `g` in your regex pattern, as it can lead to unexpected results. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag) for more information.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Parameters

#### requirement

`RegExp`

The regex pattern.

### Returns

[`RegexAction`](../interfaces/RegexAction.md)\<`TInput$1`, `undefined`\>

A regex action.

## Call Signature

> **regex**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`RegexAction`](../interfaces/RegexAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14380

Creates a [regex](https://en.wikipedia.org/wiki/Regular_expression) validation action.

Hint: Be careful with the global flag `g` in your regex pattern, as it can lead to unexpected results. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag) for more information.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RegexIssue`](../interfaces/RegexIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

`RegExp`

The regex pattern.

#### message

`TMessage`

The error message.

### Returns

[`RegexAction`](../interfaces/RegexAction.md)\<`TInput$1`, `TMessage`\>

A regex action.
