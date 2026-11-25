[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigConst

# Interface: IConfigConst

Defined in: [index.ts:194](https://github.com/maiyunnet/kebab/blob/master/index.ts#L194)

常量

## Properties

### ctrPath

> **ctrPath**: `string`

Defined in: [index.ts:230](https://github.com/maiyunnet/kebab/blob/master/index.ts#L230)

***

### dataPath

> **dataPath**: `string`

Defined in: [index.ts:232](https://github.com/maiyunnet/kebab/blob/master/index.ts#L232)

***

### host

> **host**: `string`

Defined in: [index.ts:212](https://github.com/maiyunnet/kebab/blob/master/index.ts#L212)

请求头中的主机地址，如 example.com、example.com:8443 或 [::1]:8080；不额外补端口

***

### hostCanonical

> **hostCanonical**: `string`

Defined in: [index.ts:218](https://github.com/maiyunnet/kebab/blob/master/index.ts#L218)

用于生成网址的主机地址，仅省略 HTTPS 的 443 和 HTTP 的 80 端口，如 example.com:443 → example.com；保留其他端口和 IPv6 方括号

***

### hostname

> **hostname**: `string`

Defined in: [index.ts:214](https://github.com/maiyunnet/kebab/blob/master/index.ts#L214)

主机名，如 example.com 或 ::1，不含端口或 IPv6 方括号

***

### hostport

> **hostport**: `number`

Defined in: [index.ts:216](https://github.com/maiyunnet/kebab/blob/master/index.ts#L216)

请求地址中的端口，如 8443；未指定时 HTTPS 为 443、HTTP 为 80，不取本机监听端口

***

### https

> **https**: `boolean`

Defined in: [index.ts:210](https://github.com/maiyunnet/kebab/blob/master/index.ts#L210)

请求到达 Kebab 时是否使用 HTTPS；通过 HTTP 回源时为 false

***

### miniprogram

> **miniprogram**: `""` \| `"wechat"`

Defined in: [index.ts:208](https://github.com/maiyunnet/kebab/blob/master/index.ts#L208)

***

### mobile

> **mobile**: `boolean`

Defined in: [index.ts:206](https://github.com/maiyunnet/kebab/blob/master/index.ts#L206)

***

### modPath

> **modPath**: `string`

Defined in: [index.ts:229](https://github.com/maiyunnet/kebab/blob/master/index.ts#L229)

***

### path

> **path**: `string`

Defined in: [index.ts:196](https://github.com/maiyunnet/kebab/blob/master/index.ts#L196)

不以 / 开头，不含 qs

***

### qs

> **qs**: `string`

Defined in: [index.ts:198](https://github.com/maiyunnet/kebab/blob/master/index.ts#L198)

不含 ? 开头

***

### qss

> **qss**: `string`

Defined in: [index.ts:200](https://github.com/maiyunnet/kebab/blob/master/index.ts#L200)

含 ? 开头

***

### rootPath

> **rootPath**: `string`

Defined in: [index.ts:228](https://github.com/maiyunnet/kebab/blob/master/index.ts#L228)

***

### startMemory

> **startMemory**: `number`

Defined in: [index.ts:202](https://github.com/maiyunnet/kebab/blob/master/index.ts#L202)

***

### startTime

> **startTime**: `bigint`

Defined in: [index.ts:201](https://github.com/maiyunnet/kebab/blob/master/index.ts#L201)

***

### uri

> **uri**: [`IUrlParse`](IUrlParse.md)

Defined in: [index.ts:224](https://github.com/maiyunnet/kebab/blob/master/index.ts#L224)

***

### urlBase

> **urlBase**: `string`

Defined in: [index.ts:237](https://github.com/maiyunnet/kebab/blob/master/index.ts#L237)

***

### urlFull

> **urlFull**: `string`

Defined in: [index.ts:239](https://github.com/maiyunnet/kebab/blob/master/index.ts#L239)

***

### urlOrigin

> **urlOrigin**: `string`

Defined in: [index.ts:223](https://github.com/maiyunnet/kebab/blob/master/index.ts#L223)

网址的协议与 hostCanonical，如 https://example.com:8443
协议可取自 X-Forwarded-Proto，无有效值时使用实际连接协议；不能用它判断实际 TLS 状态。

***

### urlStc

> **urlStc**: `string`

Defined in: [index.ts:238](https://github.com/maiyunnet/kebab/blob/master/index.ts#L238)

***

### urlStcFull

> **urlStcFull**: `string`

Defined in: [index.ts:240](https://github.com/maiyunnet/kebab/blob/master/index.ts#L240)

***

### viewPath

> **viewPath**: `string`

Defined in: [index.ts:231](https://github.com/maiyunnet/kebab/blob/master/index.ts#L231)

***

### wechat

> **wechat**: `boolean`

Defined in: [index.ts:207](https://github.com/maiyunnet/kebab/blob/master/index.ts#L207)

***

### wsPath

> **wsPath**: `string`

Defined in: [index.ts:233](https://github.com/maiyunnet/kebab/blob/master/index.ts#L233)
