[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / setCookie

# Function: setCookie()

> **setCookie**(`cookie`, `name`, `value`, `domain`, `opt`): `void`

Defined in: [lib/net.ts:331](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L331)

对 cookie 对象进行操作

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

要操作的对象

### name

`string`

名

### value

`string`

值

### domain

`string`

应用网址，如 .xxx.com

### opt

选项 ttl, path, ssl, httponly

#### httponly?

`boolean`

#### path?

`string`

#### ssl?

`boolean`

#### ttl?

`number`

## Returns

`void`
