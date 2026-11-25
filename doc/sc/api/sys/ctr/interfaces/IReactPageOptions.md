[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / IReactPageOptions

# Interface: IReactPageOptions

Defined in: [sys/ctr.ts:141](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L141)

React SSR 页面选项

## Properties

### hydrate?

> `optional` **hydrate?**: `boolean`

Defined in: [sys/ctr.ts:143](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L143)

是否注入客户端水合 bundle，默认 true；设为 false 时仅输出服务端渲染的 HTML

***

### router?

> `optional` **router?**: `"browser"`

Defined in: [sys/ctr.ts:149](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L149)

路由模式，不传则不注入任何 Router，组件自行管理路由（如 MemoryRouter）或无路由
'browser'：服务端用 StaticRouter，客户端用 BrowserRouter，地址栏与路由联动
组件本身只需使用 Routes/Route/Link 等，不要包含任何 Router 包裹层

***

### routerBase?

> `optional` **routerBase?**: `string`

Defined in: [sys/ctr.ts:151](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L151)

BrowserRouter 的 basename，相对于 urlBase，默认空字符串

***

### staticPath?

> `optional` **staticPath?**: `string`

Defined in: [sys/ctr.ts:153](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L153)

静态资源基础路径，覆盖 config.set.staticPath（支持 CDN）
