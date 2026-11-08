[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/proxy](../index.md) / IProxyHeaderOptions

# Interface: IProxyHeaderOptions

Defined in: [lib/undici/proxy.ts:7](https://github.com/maiyunnet/kebab/blob/master/lib/undici/proxy.ts#L7)

undici 和 ws 共用请求头模式，mproxy 仅支持 passthrough 和 request

## Extended by

- [`IRproxyOptions`](../../interfaces/IRproxyOptions.md)
- [`IRproxyOptions`](../../../ws/interfaces/IRproxyOptions.md)

## Properties

### proxyMode?

> `optional` **proxyMode?**: `"reverse"` \| `"request"` \| `"passthrough"`

Defined in: [lib/undici/proxy.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/undici/proxy.ts#L14)

默认 passthrough 透传；request 使用目标 Host 并清理代理来源头；reverse 保留外部 Host 并生成来源头
passthrough 使用目标 Host，保留通过基础过滤的来路头，不自动生成来源头。
request/reverse 均清理传入的 Forwarded、X-Forwarded-*、Via、X-Real-IP 及 CDN 来源头。
reverse 的协议和 IP 仅取实际连接，不信任来路代理头；可信代理信息由业务验证后通过 headers 覆盖。
