[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/session.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L42)

## Properties

### cookie?

> `optional` **cookie?**: `boolean`

Defined in: [lib/session.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L53)

是否读取和写入 Cookie，默认 true；false 时也不会发送 Set-Cookie

***

### domain?

> `optional` **domain?**: `string`

Defined in: [lib/session.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L46)

***

### header?

> `optional` **header?**: `string`

Defined in: [lib/session.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L51)

auth 开启时读取的专用头名，值为原始 Session ID；未设置则读取 Authorization / _auth

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/session.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L43)

***

### sqlPre?

> `optional` **sqlPre?**: `string`

Defined in: [lib/session.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L47)

***

### ssl?

> `optional` **ssl?**: `boolean`

Defined in: [lib/session.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L45)

***

### token?

> `optional` **token?**: `string`

Defined in: [lib/session.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L49)

显式指定 Session ID，优先于请求凭据；空字符串表示新建匿名会话

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/session.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L44)
