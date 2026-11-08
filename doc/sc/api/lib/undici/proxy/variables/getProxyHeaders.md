[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/proxy](../index.md) / getProxyHeaders

# Variable: getProxyHeaders

> `const` **getProxyHeaders**: (`req`, `opt?`) => `http.IncomingHttpHeaders` = `buildProxyHeaders`

Defined in: lib/undici/proxy.ts:41

构造上游请求头，依次执行基础过滤、业务 filter、模式处理及 headers 覆盖
保留 Cookie、Authorization、Origin、Referer 的业务语义，不保证请求无法被识别为代理。
来源头包括 Forwarded、Via、X-Real-IP、X-Forwarded-*、CF-*、EO-*、True-Client-IP、Client-IP、
X-Client-IP、Fastly-Client-IP、X-Cluster-Client-IP、X-Envoy-External-Address、X-Original-Forwarded-For、
X-Original-Host、X-Original-URL、X-Rewrite-URL；业务可通过 filter 补充过滤，headers 覆盖优先级最高。
reverse 输出 Host、X-Forwarded-Host、X-Forwarded-Proto、X-Forwarded-For、X-Real-IP。

## Parameters

### req

`http.IncomingMessage` \| `http2.Http2ServerRequest`

原始 HTTP 或 WebSocket 握手请求

### opt?

[`IProxyHeaderOptions`](../interfaces/IProxyHeaderOptions.md) & `object`

模式、业务过滤及显式覆盖的头部

## Returns

`http.IncomingHttpHeaders`

独立的上游请求头对象，不修改输入
