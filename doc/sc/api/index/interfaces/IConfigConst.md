[**Documents for @maiyunnet/kebab**](../../index.md)

***

[Documents for @maiyunnet/kebab](../../index.md) / [index](../index.md) / IConfigConst

# Interface: IConfigConst

Defined in: [index.ts:193](https://github.com/maiyunnet/kebab/blob/master/index.ts#L193)

常量

## Properties

### ctrPath

> **ctrPath**: `string`

Defined in: [index.ts:229](https://github.com/maiyunnet/kebab/blob/master/index.ts#L229)

***

### dataPath

> **dataPath**: `string`

Defined in: [index.ts:231](https://github.com/maiyunnet/kebab/blob/master/index.ts#L231)

***

### host

> **host**: `string`

Defined in: [index.ts:211](https://github.com/maiyunnet/kebab/blob/master/index.ts#L211)

请求头中的主机地址，如 example.com、example.com:8443 或 [::1]:8080；不额外补端口

***

### hostCanonical

> **hostCanonical**: `string`

Defined in: [index.ts:217](https://github.com/maiyunnet/kebab/blob/master/index.ts#L217)

用于生成网址的主机地址，仅省略 HTTPS 的 443 和 HTTP 的 80 端口，如 example.com:443 → example.com；保留其他端口和 IPv6 方括号

***

### hostname

> **hostname**: `string`

Defined in: [index.ts:213](https://github.com/maiyunnet/kebab/blob/master/index.ts#L213)

主机名，如 example.com 或 ::1，不含端口或 IPv6 方括号

***

### hostport

> **hostport**: `number`

Defined in: [index.ts:215](https://github.com/maiyunnet/kebab/blob/master/index.ts#L215)

请求地址中的端口，如 8443；未指定时 HTTPS 为 443、HTTP 为 80，不取本机监听端口

***

### https

> **https**: `boolean`

Defined in: [index.ts:209](https://github.com/maiyunnet/kebab/blob/master/index.ts#L209)

请求到达 Kebab 时是否使用 HTTPS；通过 HTTP 回源时为 false

***

### miniprogram

> **miniprogram**: `""` \| `"wechat"`

Defined in: [index.ts:207](https://github.com/maiyunnet/kebab/blob/master/index.ts#L207)

***

### mobile

> **mobile**: `boolean`

Defined in: [index.ts:205](https://github.com/maiyunnet/kebab/blob/master/index.ts#L205)

***

### modPath

> **modPath**: `string`

Defined in: [index.ts:228](https://github.com/maiyunnet/kebab/blob/master/index.ts#L228)

***

### path

> **path**: `string`

Defined in: [index.ts:195](https://github.com/maiyunnet/kebab/blob/master/index.ts#L195)

不以 / 开头，不含 qs

***

### qs

> **qs**: `string`

Defined in: [index.ts:197](https://github.com/maiyunnet/kebab/blob/master/index.ts#L197)

不含 ? 开头

***

### qss

> **qss**: `string`

Defined in: [index.ts:199](https://github.com/maiyunnet/kebab/blob/master/index.ts#L199)

含 ? 开头

***

### rootPath

> **rootPath**: `string`

Defined in: [index.ts:227](https://github.com/maiyunnet/kebab/blob/master/index.ts#L227)

***

### startMemory

> **startMemory**: `number`

Defined in: [index.ts:201](https://github.com/maiyunnet/kebab/blob/master/index.ts#L201)

***

### startTime

> **startTime**: `bigint`

Defined in: [index.ts:200](https://github.com/maiyunnet/kebab/blob/master/index.ts#L200)

***

### uri

> **uri**: [`IUrlParse`](IUrlParse.md)

Defined in: [index.ts:223](https://github.com/maiyunnet/kebab/blob/master/index.ts#L223)

***

### urlBase

> **urlBase**: `string`

Defined in: [index.ts:236](https://github.com/maiyunnet/kebab/blob/master/index.ts#L236)

***

### urlFull

> **urlFull**: `string`

Defined in: [index.ts:238](https://github.com/maiyunnet/kebab/blob/master/index.ts#L238)

***

### urlOrigin

> **urlOrigin**: `string`

Defined in: [index.ts:222](https://github.com/maiyunnet/kebab/blob/master/index.ts#L222)

网址的协议与 hostCanonical，如 https://example.com:8443
协议可取自 X-Forwarded-Proto，无有效值时使用实际连接协议；不能用它判断实际 TLS 状态。

***

### urlStc

> **urlStc**: `string`

Defined in: [index.ts:237](https://github.com/maiyunnet/kebab/blob/master/index.ts#L237)

***

### urlStcFull

> **urlStcFull**: `string`

Defined in: [index.ts:239](https://github.com/maiyunnet/kebab/blob/master/index.ts#L239)

***

### viewPath

> **viewPath**: `string`

Defined in: [index.ts:230](https://github.com/maiyunnet/kebab/blob/master/index.ts#L230)

***

### wechat

> **wechat**: `boolean`

Defined in: [index.ts:206](https://github.com/maiyunnet/kebab/blob/master/index.ts#L206)

***

### wsPath

> **wsPath**: `string`

Defined in: [index.ts:232](https://github.com/maiyunnet/kebab/blob/master/index.ts#L232)
