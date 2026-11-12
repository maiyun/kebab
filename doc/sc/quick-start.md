# 快速开始

## 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

也可以使用 pm2 启动项目，执行 `pm2 start npx --name "kebab" -- kebab` 即可。

内置示例仅在全局 `conf/config.json` 的 `debug` 为布尔值 `true` 时开放。为 `false` 或未设置时，示例的 HTTP 请求返回 403，WebSocket 连接关闭；检查早于示例中间件、代理及静态资源处理。普通业务项目不受此限制。

初始化命令默认设置 `debug: true`。生产环境应改为 `false` 并重载配置；开发环境开启示例时，仍应通过本机或受控开发网络访问，Host 限制不能替代身份认证。

## 目录

项目初始化后，会生成一些基础文件和目录，介绍如下：

- `conf/`: 配置
  - `cert/`: 证书
  - `vhost/`: 虚拟主机配置
  - `cert.json`: 框架自动引入的证书配置
  - `config.json`: 框架的所有配置内容（如 db、kv 等连接信息也在本文件）
- `ftmp/`: 上传文件的临时存放
- `ind/`: 独立应用，可用 npx kebab --ind xxx 启动
- `lib/`: 用户编写的库
- `log/`: 日志
- `mod/`: 用户定义的模型
- `www/`: 网站根目录
  - `站点名或网址` - 例如 example.com、example，可多层
    - `ctr/`: 控制器目录
    - `data/`: 数据目录，存放语言文件等
      - `locale/`: 语言文件目录
    - `stc/`: 静态资源目录
    - `view/`: 视图目录，存放 ejs 文件
    - `ws/`: WebSocket 目录

## RPC 管理通信

管理端和被管理节点须使用相同的当前 RPC 协议；旧版 ECB 请求不再接受，升级时需同时更新两端。`rpcSecret` 至少 32 个字符，拒绝空白、占位值和明显重复值。初始化缺省值由 32 个随机字节生成，已有配置不会自动替换；各管理节点使用约定的密钥。

命令使用 AES-256-GCM 认证加密，绑定 HTTP 方法及完整请求体的 SHA-256 摘要。接收端在执行动作前验证正文；时间戳允许前后 5 秒，同一 master 进程内的 nonce 在有效期内只接受一次。认证失败统一返回 401，按直连 IP 限制失败尝试并限制审计输出频率。

`updateCode()` 保留公开参数，通过独立文件流向各节点发送 ZIP，压缩包上限 512 MiB；上传先保存到受限临时文件，摘要校验通过后部署，失败或处理结束后清理。`sendVhost()` 的 JSON 正文上限为 50 MiB。

RPC 仍使用 HTTP，正文和响应不提供传输保密，nonce 缓存不跨 master 完全重启或共享密钥的其他节点。管理端口应处于受控网络，或经 VPN/TLS 隧道访问；认证协议不替代网络隔离。

`lCore.ls()` 的路径相对运行根目录，首尾 `/` 可省略；接收端校验真实文件路径，拒绝越界的 `..` 和指向根目录外的软链接。根目录内的软链接仍可使用。

## 全量更新虚拟主机配置

`lCore.sendVhost(files, hosts?)` 全量替换目标节点的 `conf/vhost/`，未提交的旧文件及子目录会被移除。`files` 是文件名到 JSON 原文的非空集合，仅接受直接 `.json` 文件名，不允许路径及大小写重名；每份 JSON 为 `IVhost` 或 `IVhost[]`。文件原文会被保留。

```ts
import * as lCore from '@maiyunnet/kebab/lib/core.js';

const results = await lCore.sendVhost({
    'default.json': '{"domains":["*"],"root":"default/"}',
    'sites.json': '[{"domains":["example.com"],"root":"example.com/"}]',
}, 'config');
```

省略 `hosts` 或传入空列表时更新本机；传入 `'config'` 使用全局 `hosts`，也可指定节点列表。各节点独立返回 `{ result, return }`，失败节点可单独重试。接收端复用 RPC 鉴权，通过 POST body 接收配置，不传输证书或全局配置。

同一节点串行执行替换。全部文件校验、写入临时目录成功后，才备份旧目录并切换；切换失败会恢复旧目录。若恢复也失败，返回信息会给出保留的备份目录，需人工恢复；目标 `vhost` 本身是软链接或普通文件时拒绝更新。替换包含两次目录重命名，过程中不要同时执行 reload 或手动修改该目录。

此方法不自动 reload，成功仅表示磁盘目录替换完成。确认各节点结果后，自行调用 `sendReload()`；部分节点失败时只向成功节点发送 reload。现有 reload 返回成功表示通知已发送，不代表所有 worker 已加载完成。

## 请求主机与完整 URL

控制器通过 `this._config.const.hostCanonical` 获取用于 URL 的主机地址：HTTPS 的 443 和 HTTP 的 80 端口会省略，其余端口及 IPv6 方括号保留。`host`、`hostname` 和 `hostport` 保留原有含义。`urlOrigin`、`urlFull` 和 `urlStcFull` 使用 `hostCanonical` 生成，SSR 注入的 `_urlFull`、默认 `_staticPathFull` 同步省略默认端口。

`lText.urlAtom()` 按完整路径段处理 `.` 和 `..`，保留普通文件名、查询串和片段中的文本；相对路径中无法抵消的 `..` 会保留。`urlResolve(from, to, true)` 将 `from` 视为目录，越界时返回基准目录；文件系统访问仍须校验真实路径及软链接。

查询串和表单解析中的 `+` 表示空格，需要传递字面加号时使用 `%2B`；重复参数仍返回字符串数组。

## 访问日志

HTTP 和 WebSocket 请求匹配有效 vhost 后即写入一条 `-visit` 日志，覆盖反代、静态文件、404 和中间件提前响应。记录发生在路由和控制器执行前；`onReqStart()` 返回 `-1` 不影响记录，控制器与 `rproxy()` 不再额外记录。

访问 URL 使用本次连接的协议、请求 Host（HTTP/2 为 `:authority`）及原始路径、查询串；UA 和来源 IP 直接从请求头与连接获取，无需解析请求体。此记录表示请求到达，不包含最终响应状态或耗时。

`Core.log` 不采集 Cookie、Session 或请求体。JSONL 和 CSV 均不包含 Cookie、Session 字段。旧日志内容不变。

## React 页面与浏览器资源

控制器负责业务数据与权限判断，再将可公开的 props 传入 `_loadReactPage()`。`stc/` 中的 React 页面及组件用于 SSR 和浏览器水合；Node 加载 TypeScript 生成的 `.page.js`，浏览器加载构建生成的 `.page.bundle.js`、共享 chunk 和 CSS。静态资源仍可公开访问，不应在这些组件或水合 props 中放置服务端秘密。

水合数据以 JSON 嵌入页面，框架会转义 `<`，浏览器解析后恢复原始值。`hydrate: false` 仅输出渲染后的 HTML。

## 代理请求头模式

HTTP `rproxy` 会校验拼接后的目标 URL；协议必须为 HTTP 或 HTTPS，且 origin 必须与配置的上游一致，否则返回 `false`。

`lib/undici` 和 `lib/ws` 的 `rproxy` 支持三种 `proxyMode`，`mproxy` 支持 `passthrough` 和 `request`：

| 值 | 请求头行为 |
|---|---|
| `passthrough`（默认） | 使用目标 Host，其余通过基础过滤的头继续透传，包括已有代理及 CDN 来源头，不自动生成来源头 |
| `request` | 使用目标 Host，清理已有代理来源头，不主动提供原始访问的主机、协议或 IP |
| `reverse` | 使用外部 Host（HTTP/2 优先 `:authority`），设置 `X-Forwarded-Host`、`X-Forwarded-Proto`、`X-Forwarded-For`、`X-Real-IP` |

不传 `proxyMode` 等同于 `passthrough`，保留既有行为。透传仍经过基础过滤及业务 `filter`，连接控制头和 HTTP/2 伪头不直接转发。

`reverse` 的协议和 IP 默认来自实际连接；`request` 和 `reverse` 均清理已有来源头，避免把来路自报的信息当成可信代理信息。清理范围见 [getProxyHeaders](api/lib/undici/proxy/variables/getProxyHeaders.md)。原 Host 的非默认端口和 IPv6 方括号原样保留，目标 URL 仍决定连接地址和 TLS 目标名称。

`mproxy` 的入站 Host 是代理入口，目标地址来自 `url` 参数，因此不支持 `reverse`。在提供 `mproxy` 服务的控制器中设置 `proxyMode`；它不属于客户端 `request` 或 `connect` 的 `mproxy` 连接配置。

```ts
await lUndici.rproxy(this, {
    '': 'http://origin.example.test/',
}, {
    'proxyMode': 'reverse',
});
```

`headers` 是业务显式覆盖，优先于模式结果，头名不区分大小写。经过可信 CDN 时，先验证 CDN 身份，再通过 `headers` 提供已验证的外部协议和客户端 IP；不能直接信任公网传入的 `X-Forwarded-*`。Gitea 等应用仍须正确设置自身对外 URL。

`filter` 继续负责来路及响应头过滤；模式仅处理发往上游的请求头，不改变响应头。Cookie、Authorization、Origin、Referer 保留原有业务语义，业务可显式过滤或覆盖。`request` 不保证无法识别代理；旧调用迁入此模式前应确认没有依赖 CDN 来源头。

`lib/undici/proxy.getProxyHeaders(req, opt)` 统一完成请求头的基础过滤、业务 `filter`、模式处理和 `headers` 覆盖。`lib/undici.filterProxyHeaders(headers, res?, filter?)` 仅做基础过滤，也可直接设置响应头；它不处理请求来源模式。

## 集成 JSON Schema

控制器的 `_checkInput` 方法已集成 JSON Schema（ajv、ajv-formats），可通过 `schema` 参数使用，例如：

```ts
const retur: kebab.Json[] = [];
if (!this._checkInput(this._post, {
  'sdata': [{
    'schema': {
      'type': 'object',
      'properties': {
        'foo': { 'type': 'integer' },
        'bar': { 'type': 'string' }
      },
      'required': ['foo']
    }
  }, [0, 'The sdata param is incorrect.']],
}, retur)) {
  return retur;
}
```

## 使用 Valibot 进行类型安全校验

新接口推荐使用 `_valibot`；修改数据的接口使用带 XSRF 检测的 `_valibotx`。schema 应定义在模块级，避免每次请求重复创建。校验结果是以 `success` 区分的联合类型：成功时 `output` 会自动推导为 schema 的输出类型，失败时可读取完整 `issues`，并通过 `response` 直接返回自定义内容。

```ts
import * as lCore from '@maiyunnet/kebab/lib/core.js';

const v = lCore.v;
const createSchema = v.strictObject({
    'title': v.pipe(v.string(), v.nonEmpty()),
    'count': v.pipe(v.string(), v.toNumber(), v.integer()),
});

public create(): kebab.Json[] {
    const parsed = this._valibotx(createSchema, this._post, {
        'translate': key => this._l(key),
        'response': issues => [0, issues[0].message, {
            'issues': v.flatten(issues),
        }],
    });
    if (!parsed.success) {
        return parsed.response;
    }

    // parsed.output 的类型为 { title: string; count: number }
    return [1, {
        'title': parsed.output.title,
        'count': parsed.output.count,
    }];
}
```

多语言接口必须在校验前加载当前请求的语言包。上例会根据字段路径和 Valibot issue 类型读取语言键，例如 `validation.title.non_empty`、`validation.count.to_number` 和 `validation._xsrf.xsrf`：

```json
{
  "validation": {
    "strict_object": "提交内容格式不正确或包含不支持的字段。",
    "_xsrf": {
      "xsrf": "请求无效或无权限。"
    },
    "title": {
      "strict_object": "缺少标题。",
      "string": "标题必须是字符串。",
      "non_empty": "请输入标题。"
    },
    "count": {
      "strict_object": "缺少数量。",
      "string": "数量必须是字符串。",
      "to_number": "数量必须是数字。",
      "integer": "数量必须是整数。"
    }
  }
}
```

`lCore.v` 是 Kebab 核心库提供的 Valibot 对象，业务项目不需要再直接导入或声明 `valibot` 依赖。既可以像上例赋给局部变量，也可以用 `import { v } from '@maiyunnet/kebab/lib/core.js'` 直接取得具名导出，或在少量调用时直接写 `lCore.v.safeParse(...)`。Kebab 会在 Valibot 完成父级路径组装后生成语言键，再调用 `translate`；因此 `non_empty` 可以得到完整的 `validation.title.non_empty`，XSRF 可以得到 `validation._xsrf.xsrf`。

当 `translate` 返回精确的 `[LocaleError]语言键`（例如 `_l()` 找不到该键）时，框架会自动回退为 `[语言键] Valibot 原始英文原因`，例如 `[validation.title.non_empty] Invalid length: Expected !0 but received 0`。这样语言包漏配不会把 `[LocaleError]` 直接返回给前端，同时仍能看出缺少的键和具体校验原因。

模块级 schema 不得写入已经翻译的固定消息，例如 `v.nonEmpty('请输入标题。')`。规则留在模块级，翻译放在每次调用的 `translate` 中，只会创建很小的回调，不会重复创建整棵 schema，也不会使用可能在并发请求间互相覆盖的全局语言状态。Valibot 原生的 `config.message` 仍可用于不依赖字段路径的通用消息；基于 Kebab 语言包的路径翻译应使用 `translate`。

不传 `response` 时，失败响应默认为 `[0, issues[0].message]`。也可以传固定数组，例如 `{ 'response': [0, '提交参数有误。'] }`。`issues` 含输入上下文，只应在服务端按需记录；返回前端时建议使用 `v.flatten(issues)` 等方式仅提取路径和消息，不要直接回传完整问题对象。

`_valibotx` 默认先校验 `_xsrf`，通过后才运行 schema，且 `_xsrf` 不会被自动加入 schema 输出。仅在已有等效安全机制时才可使用 `{ 'ignoreXsrf': true }`。只读请求使用 `_valibot`。


## 原生分区表模型

模型通过 `_$partition` 声明数据库原生分区字段，RANGE、HASH、LIST 采用相同写法；支持多个字段。数据库仍负责根据字段值选择分区，框架不查询分区目录，也不自动创建分区。

```ts
export default class Order extends sMod {
    protected static _$table = 'order';
    protected static _$primary = 'id';
    protected static _$partition = ['time_push'];
}
```

读取模型后，`save()`、`remove()`、`refresh()` 的默认条件自动包含主键与分区字段。例如上面的模型使用 `id = ? AND time_push = ?`。`set()` 仍用于指定待写数据，调用方不必反复填写分区条件。

- 查询时须选出主键及全部分区字段。读取记录后不要修改这些字段，包括通过 `set()` 赋值或直接修改 Date、Buffer 等对象；框架直接使用模型中的当前值构造 WHERE，不保存旧值，也不检查这些字段是否被改动。
- 创建记录时设置分区字段，主键使用数据库返回的自增 ID；使用数据库默认值、生成列、触发器或 SQL 表达式赋值时，须重新查询取得实际字段值后再使用默认实例操作。`upsert()` 用于更新已有记录时，同样不能改变其分区字段。
- 缺少主键或分区字段时，默认实例操作返回 `false`。`save()` 没有待写字段时仍直接返回 `true`。
- 显式 `save(where)` 完整采用调用方提供的条件，不自动附加分区或业务条件。
- 未声明 `_$partition` 的模型保持仅按主键定位的原行为。静态查询、批量更新、删除等方法仍使用显式条件；租户、软删除和业务状态约束由应用负责。

`_$partition` 用于数据库原生分区，与 `index` 选项按表名后缀访问分表的机制不同。事务提交、回滚及连接生命周期保持原约定。
