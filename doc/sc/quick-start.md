# 快速开始

## 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

也可以使用 pm2 启动项目，执行 `pm2 start npx --name "kebab" -- kebab` 即可。

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
