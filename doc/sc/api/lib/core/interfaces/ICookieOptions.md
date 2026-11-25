[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ICookieOptions

# Interface: ICookieOptions

Defined in: [lib/core.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L56)

Cookie 设置的选项

## Properties

### domain?

> `optional` **domain?**: `string`

Defined in: [lib/core.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L62)

生效域名

***

### httponly?

> `optional` **httponly?**: `boolean`

Defined in: [lib/core.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L66)

是否禁止前端脚本读取

***

### path?

> `optional` **path?**: `string`

Defined in: [lib/core.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L60)

生效路径，默认 /

***

### samesite?

> `optional` **samesite?**: `"Strict"` \| `"Lax"` \| `"None"`

Defined in: [lib/core.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L68)

跨站发送策略

***

### ssl?

> `optional` **ssl?**: `boolean`

Defined in: [lib/core.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L64)

是否仅 HTTPS 发送

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/core.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L58)

有效期秒数，不设或 undefined 表示关闭浏览器失效
