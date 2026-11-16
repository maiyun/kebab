[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigConst

# Interface: IConfigConst

Defined in: [index.ts:181](https://github.com/maiyunnet/kebab/blob/master/index.ts#L181)

常量

## Properties

### ctrPath

> **ctrPath**: `string`

Defined in: [index.ts:217](https://github.com/maiyunnet/kebab/blob/master/index.ts#L217)

***

### dataPath

> **dataPath**: `string`

Defined in: [index.ts:219](https://github.com/maiyunnet/kebab/blob/master/index.ts#L219)

***

### host

> **host**: `string`

Defined in: [index.ts:199](https://github.com/maiyunnet/kebab/blob/master/index.ts#L199)

请求头中的主机地址，如 example.com、example.com:8443 或 [::1]:8080；不额外补端口

***

### hostCanonical

> **hostCanonical**: `string`

Defined in: [index.ts:205](https://github.com/maiyunnet/kebab/blob/master/index.ts#L205)

用于生成网址的主机地址，仅省略 HTTPS 的 443 和 HTTP 的 80 端口，如 example.com:443 → example.com；保留其他端口和 IPv6 方括号

***

### hostname

> **hostname**: `string`

Defined in: [index.ts:201](https://github.com/maiyunnet/kebab/blob/master/index.ts#L201)

主机名，如 example.com 或 ::1，不含端口或 IPv6 方括号

***

### hostport

> **hostport**: `number`

Defined in: [index.ts:203](https://github.com/maiyunnet/kebab/blob/master/index.ts#L203)

请求地址中的端口，如 8443；未指定时 HTTPS 为 443、HTTP 为 80，不取本机监听端口

***

### https

> **https**: `boolean`

Defined in: [index.ts:197](https://github.com/maiyunnet/kebab/blob/master/index.ts#L197)

请求到达 Kebab 时是否使用 HTTPS；通过 HTTP 回源时为 false

***

### miniprogram

> **miniprogram**: `""` \| `"wechat"`

Defined in: [index.ts:195](https://github.com/maiyunnet/kebab/blob/master/index.ts#L195)

***

### mobile

> **mobile**: `boolean`

Defined in: [index.ts:193](https://github.com/maiyunnet/kebab/blob/master/index.ts#L193)

***

### modPath

> **modPath**: `string`

Defined in: [index.ts:216](https://github.com/maiyunnet/kebab/blob/master/index.ts#L216)

***

### path

> **path**: `string`

Defined in: [index.ts:183](https://github.com/maiyunnet/kebab/blob/master/index.ts#L183)

不以 / 开头，不含 qs

***

### qs

> **qs**: `string`

Defined in: [index.ts:185](https://github.com/maiyunnet/kebab/blob/master/index.ts#L185)

不含 ? 开头

***

### qss

> **qss**: `string`

Defined in: [index.ts:187](https://github.com/maiyunnet/kebab/blob/master/index.ts#L187)

含 ? 开头

***

### rootPath

> **rootPath**: `string`

Defined in: [index.ts:215](https://github.com/maiyunnet/kebab/blob/master/index.ts#L215)

***

### startMemory

> **startMemory**: `number`

Defined in: [index.ts:189](https://github.com/maiyunnet/kebab/blob/master/index.ts#L189)

***

### startTime

> **startTime**: `bigint`

Defined in: [index.ts:188](https://github.com/maiyunnet/kebab/blob/master/index.ts#L188)

***

### uri

> **uri**: [`IUrlParse`](IUrlParse.md)

Defined in: [index.ts:211](https://github.com/maiyunnet/kebab/blob/master/index.ts#L211)

***

### urlBase

> **urlBase**: `string`

Defined in: [index.ts:224](https://github.com/maiyunnet/kebab/blob/master/index.ts#L224)

***

### urlFull

> **urlFull**: `string`

Defined in: [index.ts:226](https://github.com/maiyunnet/kebab/blob/master/index.ts#L226)

***

### urlOrigin

> **urlOrigin**: `string`

Defined in: [index.ts:210](https://github.com/maiyunnet/kebab/blob/master/index.ts#L210)

网址的协议与 hostCanonical，如 https://example.com:8443
协议可取自 X-Forwarded-Proto，无有效值时使用实际连接协议；不能用它判断实际 TLS 状态。

***

### urlStc

> **urlStc**: `string`

Defined in: [index.ts:225](https://github.com/maiyunnet/kebab/blob/master/index.ts#L225)

***

### urlStcFull

> **urlStcFull**: `string`

Defined in: [index.ts:227](https://github.com/maiyunnet/kebab/blob/master/index.ts#L227)

***

### viewPath

> **viewPath**: `string`

Defined in: [index.ts:218](https://github.com/maiyunnet/kebab/blob/master/index.ts#L218)

***

### wechat

> **wechat**: `boolean`

Defined in: [index.ts:194](https://github.com/maiyunnet/kebab/blob/master/index.ts#L194)

***

### wsPath

> **wsPath**: `string`

Defined in: [index.ts:220](https://github.com/maiyunnet/kebab/blob/master/index.ts#L220)
