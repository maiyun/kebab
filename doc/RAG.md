本文件为 Kebab 项目的完整文档，包含项目的安装、库等内容。

# 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

也可以使用 pm2 启动项目，执行 `pm2 start npx --name "kebab" -- kebab` 即可。

# 目录介绍

项目初始化后，会生成一些基础文件和目录，介绍如下：

conf/ - 配置
├─ cert/ - 证书
├─ vhost/ - 虚拟主机配置
├─ cert.json - 框架自动引入的证书配置
└─ config.json - 框架的所有配置内容（如 db、kv 等连接信息也在本文件）
ftmp/ - 上传文件的临时存放
ind/ - 独立应用，可用 npx kebab --ind xxx 启动
lib/ - 用户编写的库
log/ - 日志
mod/ - 用户定义的模型
www/ - 网站根目录

# 库

## Ai

Ai 库提供了 OpenAI 兼容的模型调用方法。

### get(ctrEtc, opt)

获取一个 Ai 对象

#### ctrEtc

必选：是
类型：sCtr.Ctr | kebab.IConfigAi
描述：控制器对象或 AI 配置对象

#### opt

必选：是
类型：IOptions
描述：选项

#### 返回值

Ai

#### 示例

```typescript
const ai = lAi.get(this, {
    'service': lAi.ESERVICE.ALICN,
});
```

### IOptions

获取 AI 对象的选项

#### service

必选：是
类型：ESERVICE
描述：服务类型

#### endpoint

必选：否
类型：string
描述：接入点

#### secretKey

必选：否
类型：string
描述：密钥

#### fetch

必选：否
类型：(input: string | URL | Request, init?: RequestInit) => Promise<Response>;
描述：自定义 fetch 函数

### ESERVICE

ALICN - 阿里中国大陆区
ALIAS - 阿里国际区
AZURE - 微软 Azure
AZURE2 - 微软 Azure 2
AZURE3 - 微软 Azure 3

### Ai

Ai 对象

#### chat(body)

创建对话

#### body

必选：是
类型：openai.default.Chat.Completions.ChatCompletionCreateParams
描述：主体

#### 返回值

```typescript
Promise<
    openai.APIPromise<openai.default.Chat.ChatCompletion> |
    openai.APIPromise<streaming.Stream<openai.default.Chat.ChatCompletionChunk>> | false
>
```

#### 示例

```typescript
const stream = await ai.chat({
    'model': 'qwen-plus',
    'stream': true,
    'messages': [
        { 'role': 'system', 'content': '你是机器人' },
        { 'role': 'user', 'content': '你好' },
    ],
});
```

### embedding(body)

#### body

必选：是
类型：openai.default.EmbeddingCreateParams
描述：主体

#### 返回值

```typescript
Promise<openai.APIPromise<openai.default.CreateEmbeddingResponse> | false>
```

#### 示例

```typescript
const emb = await ai.embedding({
    'model': 'text-embedding-v4',
    'input': this._post['content'],
    'dimensions': 768,
});
```

# 系统

## 控制器

通过继承控制器来写控制器代码，例如：

```typescript
import * as sCtr from '@maiyunnet/kebab/sys/ctr.js';

export default class extends sCtr.Ctr {

    public onLoad(): boolean {
        return true;
    }

    public onReady(): boolean {
        return true;
    }

    public onUnload(rtn: string | boolean | kebab.DbValue[]): string | boolean | kebab.DbValue[] {
        if (!Array.isArray(rtn)) {
            return rtn;
        }
        if (rtn[0] !== -102) {
            return rtn;
        }
        rtn.push({
            'test': 'unload'
        });
        return rtn;
    }
    
    public index(): string {
        return 'Hello, Kebab!';
    }

}
```

## 模型

通过继承模型来写模型定义，例如：

```typescript
import sMod from '@maiyunnet/kebab/sys/mod.js';

export default class extends sMod {

    ...

}
```