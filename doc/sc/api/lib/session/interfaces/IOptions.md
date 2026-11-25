[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/session](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/session.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L42)

## Properties

### cookie?

> `optional` **cookie?**: `boolean`

Defined in: [lib/session.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L58)

是否读取和写入 Cookie，默认 true；false 时也不会发送 Set-Cookie

***

### domain?

> `optional` **domain?**: `string`

Defined in: [lib/session.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L50)

Cookie 生效域名

***

### header?

> `optional` **header?**: `string`

Defined in: [lib/session.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L56)

auth 开启时读取的专用头名，值为原始 Session ID；未设置则读取 Authorization / _auth

***

### name?

> `optional` **name?**: `string`

Defined in: [lib/session.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L44)

Session 名称，默认取配置

***

### sqlPre?

> `optional` **sqlPre?**: `string`

Defined in: [lib/session.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L52)

数据库存储时的表名前缀

***

### ssl?

> `optional` **ssl?**: `boolean`

Defined in: [lib/session.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L48)

Cookie 是否仅 HTTPS 发送

***

### token?

> `optional` **token?**: `string`

Defined in: [lib/session.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L54)

显式指定 Session ID，优先于请求凭据；空字符串表示新建匿名会话

***

### ttl?

> `optional` **ttl?**: `number`

Defined in: [lib/session.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/session.ts#L46)

有效期秒数，默认 172800
