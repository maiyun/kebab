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
类型：sCtr.Ctr | IConfigAi
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

##### body

必选：是
类型：openai.default.Chat.Completions.ChatCompletionCreateParams
描述：主体

##### 返回值

```typescript
Promise<
    openai.APIPromise<openai.default.Chat.ChatCompletion> |
    openai.APIPromise<streaming.Stream<openai.default.Chat.ChatCompletionChunk>> | false
>
```

##### 示例

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

#### embedding(body)

##### body

必选：是
类型：openai.default.EmbeddingCreateParams
描述：主体

##### 返回值

```typescript
Promise<openai.APIPromise<openai.default.CreateEmbeddingResponse> | false>
```

##### 示例

```typescript
const emb = await ai.embedding({
    'model': 'text-embedding-v4',
    'input': this._post['content'],
    'dimensions': 768,
});
```

## Buffer

Buffer 库提供了二进制数据的读取和写入功能。

### getReader(buffer)

获取一个 Reader 对象，用于读取二进制数据。

#### buffer

必选：是
类型：Buffer
描述：要读取的缓冲区

#### 返回值

Reader

#### 示例

```typescript
const reader = lBuffer.getReader(b);
```

### getWriter(size)

获取一个 Writer 对象，用于写入二进制数据。

#### size

必选：是
类型：number
描述：缓冲区大小

#### 返回值

Writer

#### 示例

```typescript
const writer = lBuffer.getWriter(8);
```

### Reader

用于读取二进制数据的对象。

#### readUInt8()

读取一个无符号 8 位整数, BYTE。

##### 返回值

number

#### readUInt16BE()

读取一个无符号 16 位整数（大端模式），WORD。

##### 返回值

number

#### readUInt16LE()

读取一个无符号 16 位整数（小端模式）。

##### 返回值

number

#### readUInt32BE()

读取一个无符号 32 位整数（大端模式）, DWORD。

##### 返回值

number

#### readUInt32LE()

读取一个无符号 32 位整数（小端模式）。

##### 返回值

number

#### readBCDString(length?)

读取一个 BCD 编码的字符串（每个字节表示两个数字）。

##### length

必选：否
类型：number
描述：要读取的长度，默认读取剩余所有

#### readString(length?, encoding?)

读取普通的字符串

##### length

必选：否
类型：number
描述：要读取的长度，默认读取剩余所有

##### encoding

必选：否
类型：BufferEncoding
默认：utf8
描述：要读取的编码

##### 返回值

string

#### readBuffer(length?)

读取 Buffer。

#### length

必选：否
类型：number
描述：要读取的长度，默认读取剩余所有

#### 返回值

Buffer

#### length()

获取完整的 buffer 长度。

##### 返回值

number

### Writer

用于写入二进制数据的对象。

#### writeUInt8(value)

[1 字节] 写入一个无符号 8 位整数。

##### value

必选：是
类型：number
描述：要写入的值

#### writeUInt16BE(value)

[2 字节] 写入一个无符号 16 位整数（大端模式）。

##### value

必选：是
类型：number
描述：要写入的值

#### writeUInt32BE(value)

[4 字节] 写入一个无符号 32 位整数（大端模式）。

##### value

必选：是
类型：number
描述：要写入的值

#### writeBCDString(value)

[每字节 2 数字] 写入一个 BCD 编码的字符串（仅支持数字）。

##### value

必选：是
类型：string
描述：要写入的字符串

#### writeString(value, encoding?)

写入普通字符串，返回写入的长度。

##### value

必选：是
类型：string
描述：要写入的字符串

##### encoding

必选：否
类型：BufferEncoding
默认：utf8
描述：编码方式

##### 返回值

number

#### get()

返回 Buffer 对象。

##### 返回值

Buffer

## Captcha

Captcha 库提供了生成验证码的功能。

### get(width, height, length?)

获取一个 Captcha 对象，用于生成验证码。

#### width

必选：是
类型：number
描述：宽度

#### height

必选：是
类型：number
描述：高度

#### length

必选：否
类型：number
默认：4
描述：验证码字符数量

#### 返回值

Captcha

#### 示例

```typescript
const captcha = lCaptcha.get(400, 100);
```

### Captcha

验证码对象。

#### getBuffer()

获取验证码图片的 Buffer。

##### 返回值

Buffer

#### getBase64()

获取验证码图片的 base64 编码。

##### 返回值

string

#### getPhrase()

获取验证码的文本内容。

##### 返回值

string

## Consistent

Consistent 库提供了一致性哈希算法的实现。

### get(vcount?)

获取一个 Consistent 对象。

#### vcount

必选：否
类型：number
默认：300
描述：虚拟节点数量

#### 返回值

Consistent

#### 示例

```typescript
const cons = lConsistent.get();
```

### Consistent

一致性哈希对象。

#### getVcount()

获取虚拟节点数量。

##### 返回值

number

#### add(node)

添加节点。

##### node

必选：是
类型：string
描述：要添加的一个/多个节点

##### 返回值

void

#### remove(node)

移除节点。

##### node

必选：是
类型：string
描述：要移除的一个/多个节点

##### 返回值

void

#### find(key)

查找键对应的节点。

##### key

必选：是
类型：string
描述：要查找的键

##### 返回值

string | null

#### migration(keys, node)

计算迁移计划。

##### keys

必选：是
类型：string | number | Array<string | number>
描述：原节点的键

##### node

必选：是
类型：string | string[]
描述：新增的一个/多个节点

##### 返回值

```typescript
Record<string, {
    'old': string;
    'new': string;
}>
```

## Core

Core 库提供了框架的核心功能。

### globalConfig

类型：kebab.IConfig
描述：全局配置对象。

### ICookieOptions

Cookie 选项。

```typescript
interface ICookieOptions {
    'ttl'?: number;
    'path'?: string;
    'domain'?: string;
    'ssl'?: boolean;
    'httponly'?: boolean;
    'samesite'?: 'None' | 'Lax' | 'Strict';
}
```

### setCookie(ctr, name, value, opt)

设置 Cookie。

#### ctr

必选：是
类型：sCtr.Ctr
描述：控制器实例

#### name

必选：是
类型：string
描述：Cookie 名称

#### value

必选：是
类型：string
描述：Cookie 值

#### opt

必选：否
类型：ICookieOptions
描述：Cookie 选项

#### 返回值

void

### rand(min, max, prec?)

生成随机数。

#### min

必选：是
类型：number
描述：最小值 >=

#### max

必选：是
类型：number
描述：最大值 <=

#### prec

必选：否
类型：number
默认：0
描述：保留小数位数

#### 返回值

number

### RANDOM_N

类型：string
描述：常量数字字符集

### RANDOM_U

类型：string
描述：常量大写字母字符集

### RANDOM_L

类型：string
描述：常量小写字母字符集

### RANDOM_UN

类型：string
描述：常量大写字母 + 数字字符集

### RANDOM_LN

类型：string
描述：常量小写字母 + 数字字符集

### RANDOM_LU

类型：string
描述：常量小写字母 + 大写字母字符集

### RANDOM_LUN

类型：string
描述：常量小写字母 + 大写字母 + 数字字符集

### RANDOM_V

类型：string
描述：常量验证码字符集

### RANDOM_LUNS

类型：string
描述：常量小写字母 + 大写字母 + 数字字符集 + 特殊字符字符集

### random(length?, source?, block?)

生成随机字符串。

#### length

必选：否
类型：number
默认：8
描述：字符串长度

#### source

必选：否
类型：string
默认：RANDOM_LN
描述：字符集

#### block

必选：否
类型：string
默认：''
描述：排除的字符

#### 返回值

string

### convert62(n)

将 10 进制转换为 62 进制。

#### n

必选：是
类型：bigint | number | string
描述：要转换的数字

#### 返回值

string

### unconvert62(n)

将 62 进制字符串转换为 10 进制。

#### n

必选：是
类型：string
描述：要转换的字符串，最大 aZl8N0y58M7

#### 返回值

bigint

### purify(text)

去除 html 的空白符、换行以及注释。

#### text

必选：是
类型：string
描述：要净化的 html 字符串

#### 返回值

string

#### 示例

```typescript
const purified = lCore.purify('<div>Hello World</div>');
```

### checkType(val, type)

判断一个对象是否符合示例组，返回空字符串代表校验通过。

#### val

必选：是
类型：any
描述：要检查的值

#### type

必选：是
类型：any
描述：示例组

#### 返回值

类型：string
描述：成功通过校验返回空字符串，失败返回：应该的类型:位置:传入的类型

#### 示例

```typescript
const o4 = {
    'a': 'aaa',
    'b': 21424,
    'c': true,
    'd': {
        'e': 0,
        'f': false,
        'g': 'ok'
    }
};
const type1 = {
    'a': '1',
    'b': 0,
    'c': false,
    'd': {
        'e': 0,
        'f': false,
        'g': [
            {
                'h': 0
            }
        ]
    }
};
const res = lCore.checkType(o4, type1);
// --- 返回：array:root.d.g:string ---
```

### muid(ctr, opt?)

生成 MUID。

#### ctr

必选：是
类型：sCtr.Ctr
描述：控制器实例

#### opt

必选：否
类型：
```typescript
{
    /** --- 8 - 32, 默认 8 --- */
    'len'?: number;
    /** --- 是否含有大小写, 默认 true --- */
    'bin'?: boolean;
    /** --- 多样性混合, 默认空 --- */
    'key'?: string;
    /** --- 插入指定字符, 最好不超过 2 字符，默认空 --- */
    'insert'?: string;
    /** --- 是否含有数字, 默认 true --- */
    'num'?: boolean;
}
```
描述：参数

#### 返回值

string

### ip(ctr, req?)

获取非安全 IP。

#### ctr

必选：是
类型：sCtr.Ctr | http.IncomingHttpHeaders
描述：控制器实例或请求头对象

#### req

必选：否
类型：http.IncomingMessage | http2.Http2ServerRequest
描述：请求对象

#### 返回值

string

### REAL_IP_X

类型：string
描述：常量使用 X-Forwarded-For 的 CDN 厂商

### REAL_IP_CF

类型：string
描述：常量使用的是 Cloudflare

### realIP(ctr, name?)

获取直连安全 IP。

#### ctr

必选：是
类型：sCtr.Ctr
描述：控制器实例

#### name

必选：否
类型：string
默认：''
描述：安全的 header 名称，使用 REAL_IP_X 或 REAL_IP_CF 常量或可信的 header 名称

#### 返回值

string

### sleep(ms)

间隔一段时间。

#### ms

必选：是
类型：number
描述：毫秒数

#### 返回值

```typescript
Promise<void>
```

### objectSort(obj)

对象升序排列。

#### obj

必选：是
类型：T extends Record<string, any>
描述：要排序的对象

#### 返回值

```typescript
T
```

### emptyObject(obj)

清除对象属性但不破坏引用关系。

#### obj

必选：是
类型：Record<string, any>
描述：要清除的对象

#### 返回值

void

### passThroughAppend(passThrough, data, end?)

将数据写入传递流对象，调用前自行创建 passThrough，并且调用 pipe 绑定到应该绑定的对象，然后再调用本函数。

#### passThrough

必选：是
类型：stream.PassThrough
描述：传递流对象

#### data

必选：是
类型：Array<stream.Readable | lResponse.Response | string | Buffer>
描述：要写入的数据

#### end

必选：否
类型：boolean
默认：true
描述：是否结束写入

#### 返回值

void

### exec(command)

执行 shell 命令。

#### command

必选：是
类型：string
描述：要执行的 shell 命令

#### 返回值

```typescript
Promise<string | false>
```

### sendReload(hosts?)

发送 reload 信号到本地/指定的局域网主机，用于配置文件重载。

#### hosts

必选：否
类型：string[] | 'config' | underfind
默认：underfind
描述：主机列表或从配置文件中读取的主机列表，默认为只给本地发送

#### 返回值

类型:
```typescript
Promise<string[]>
```
描述：本地模式只会返回空数组

### sendRestart(hosts?)

发送 restart 信号到本地/指定的局域网主机，用于热重启（代码热更新）。

#### hosts

必选：否
类型：string[] | 'config' | underfind
默认：underfind
描述：主机列表或从配置文件中读取的主机列表，默认为只给本地发送

#### 返回值

类型:
```typescript
Promise<string[]>
```
描述：本地模式只会返回空数组

### setGlobal(key, data, hosts?)

设置跨线程/指定的局域网主机的全局变量，即设置后所有 Kebab 线程/主机都可以访问到该变量。

#### key

必选：是
类型：string
描述：变量名

#### data

必选：是
类型：any
描述：变量值

#### hosts

必选：否
类型：string[] | 'config' | underfind
默认：underfind
描述：主机列表或从配置文件中读取的主机列表，默认为只给本地主机的所有线程设置

#### 返回值

类型:
```typescript
Promise<string[]>
```
描述：本地模式只会返回空数组

### removeGlobal(key, hosts?)

移除跨线程/指定的局域网主机的全局变量。

#### key

必选：是
类型：string
描述：变量名

#### hosts

必选：否
类型：string[] | 'config' | underfind
默认：underfind
描述：主机列表或从配置文件中读取的主机列表，默认为只给本地主机的所有线程移除

#### 返回值

类型:
```typescript
Promise<string[]>
```
描述：本地模式只会返回空数组

### updateCode(sourcePath, path, hosts?, config?, strict?: boolean)

上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新建。

#### sourcePath

必选：是
类型：string
描述：要更新的 zip 代码文件路径

#### path

必选：是
类型：string
描述：要更新的目标路径，无所谓是否 / 开头 / 结尾，是对方 kebab 的根据路径开始算起

#### hosts

必选：否
类型：string[] | 'config' | underfind
默认：underfind
描述：主机列表或从配置文件中读取的主机列表，默认为只给本地主机的所有线程更新

#### config

必选：否
类型：boolean
默认：true
描述：是否自动更新 config 的 set.staticVer 为最新，默认更新

#### strict

必选：否
类型：boolean
默认：true
描述：是否严格模式，只有存在的文件才会被覆盖，不存在则中途直接报错，默认为 true

#### 返回值

类型:
```typescript
Promise<string[]>
```
描述：本地模式会返回 ['127.0.0.1']

#### 示例

```typescript
const zip = `${this._config.const.dataPath}test.zip`;
const to = '';
const list = await lCore.updateCode(zip, to);
```

### ILogOptions

日志选项。

```typescript
interface ILogOptions {
    'path'?: string;
    'urlFull'?: string;
    'hostname'?: string;
    'req'?: http2.Http2ServerRequest | http.IncomingMessage | null;
    'get'?: Record<string, any>;
    'cookie'?: Record<string, string>;
    'jwt'?: Record<string, any>;
    'session'?: Record<string, any>;
    'headers'?: http.IncomingHttpHeaders;
}
```

### log(opt, msg, fend?)

写入文件日志

#### opt

必选：是
类型：sCtr.Ctr | ILogOptions
描述：控制器实例或日志选项

#### msg

必选：是
类型：string
描述：日志消息

#### fend

必选：否
类型：string
默认：''
描述：文件名追加

#### 返回值

void

### getLog(opt)

获取日志内容为一个数组

#### opt

必选：是
类型：
```typescript
{
    /** --- 要查询的头，如 127.0.0.1、system、www.maiyun.net 等 --- */
    'hostname': string;
    /** --- 如 2024/08/01/22 --- */
    'path': string;
    /** --- 如 -error --- */
    'fend'?: string;
    /** --- 仅显示被搜索到的行 --- */
    'search'?: string;
    /** --- 跳过的字节数，默认不跳过 --- */
    'start'?: number;
    /** --- 跳过条数 --- */
    'offset'?: number;
    /** --- 最大限制，默认 100 --- */
    'limit'?: number;
    /** --- 获取局域网服务器的日志，为空代表获取本机的 --- */
    'host'?: string;
}
```
描述：参数

#### 返回值

```typescript
Promise<string[][] | null | false>
```
#### 示例

```typescript
const list = await lCore.getLog({
    'hostname': this._config.const.hostname,
    'path': path,
    'fend': '-visit',
});
```

返回值：

```typescript
[
    [
        "13:17:42",
        "1763443062",
        "http://127.0.0.1:8081/test/core-getlog",
        "XSRF-TOKEN=OZHwYTsqameYC8o2",
        "{}",
        "{}",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        "::ffff:127.0.0.1",
        "::ffff:127.0.0.1",
        "255.93GB",
        "106.93MB",
        ""
    ]
]
```

## ls(opt)

获取目录内文件/文件夹列表

#### opt

必选：是
类型：
```typescript
{
    /** --- 如 2024/08/01/22，无所谓开头结尾 --- */
    'path': string;
    'encoding'?: BufferEncoding;
    /** --- 获取局域网服务器的目录列表，为空代表获取本机的 --- */
    'host'?: string;
}
```
描述：参数

#### 返回值

```typescript
Promise<Array<{
    'isFile': boolean;
    'isDirectory': boolean;
    'isSymbolicLink': boolean;
    'name': string;
}>>
```

## Cron

Cron 库提供了定时任务功能。

### getRegulars()

获取定时任务列表

#### 返回值

```typescript
IRegularData[]
```

### regular(task, immediate?)

创建定时执行的计划任务。

#### task

必选：是
类型：IRegular
描述：任务规则

#### immediate

必选：否
类型：string
描述：如果传入的时间小于当前时间且（没有执行过）则立即执行一次（格式：YmdHi，系统时区）

#### 返回值

```typescript
Promise<boolean>
```

#### 示例

```typescript
let rtn = await lCron.regular({
    'name': 'test',
    // --- 每分钟的第 40 秒执行一次 ---
    'rule': '40 * * * *',
    'callback': (date, immediate) => {
        lCore.debug(`[${date}] test task run, immediate: ${immediate}`);
    },
}, '202511062305');
```

### IRegular

任务规则。

```typescript
interface IRegular {
    /** --- 任务名称，只能小写字母、数字、短横线、下划线，长度 1-32 --- */
    'name': string;
    /** --- 规则，分、时、日、月、星期，与 linux 的 cron 相同（不支持秒） --- */
    'rule': string;
    /** --- 任务函数 --- */
    callback: (date: string, immediate: boolean) => void | Promise<void>;
}
```

### IRegularData

计划任务数据。

```typescript
interface IRegularData extends IRegular {
    /** --- 上次执行时间字符串，格式：YmdHi（系统时区） --- */
    'last': string;
    /** --- 总执行次数 --- */
    'count': number;
    /** --- 定时任务重启后的执行次数 --- */
    'rcount': number;
}
```

## Crypto

Crypto 库提供了加密/解密相关的功能。

### generateKeyPair(type, options?)

生成密钥对。

#### type

必选：是
类型：string
描述：密钥类型，如 rsa/ec

#### options

必选：否
类型：
```typescript
{
    'modulusLength'?: number;
    'namedCurve'?: string;
    'publicKeyEncoding'?: {
        'type'?: 'pkcs1' | 'spki';
        'format'?: 'pem' | 'der';
    };
    'privateKeyEncoding'?: {
        'type'?: 'pkcs1' | 'pkcs8' | 'sec1';
        'format'?: 'pem' | 'der';
    };
}
```
描述：选项

#### 返回值

```typescript
Promise<{
    'public': string | Buffer;
    'private': string | Buffer;
}>
```

### sign(data, privateKey, format?, format?)

非对称加签。

#### data

必选：是
类型：crypto.BinaryLike
描述：要签名的数据

#### privateKey

必选：是
类型：crypto.KeyLike | crypto.SignKeyObjectInput | crypto.SignPrivateKeyInput | crypto.SignJsonWebKeyInput
描述：私钥

#### format

必选：否
类型：'hex' | 'base64' | 'buffer' | 'binary'
默认：'buffer'
描述：输出格式

#### algorithm

必选：否
类型：string
默认：'sha256'
描述：哈希方式

#### 返回值

string | Buffer

#### 示例

```typescript
const sign = lCrypto.sign('Hello MAIYUN.NET', res.private, 'base64', 'sm3');
```

### verify(data, object, signature, algorithm?)

非对称验签。

#### data

必选：是
类型：crypto.BinaryLike
描述：要验证的数据

#### object

必选：是
类型：crypto.KeyLike | crypto.VerifyKeyObjectInput | crypto.VerifyPublicKeyInput | crypto.VerifyJsonWebKeyInput
描述：证书

#### signature

必选：是
类型：NodeJS.ArrayBufferView
描述：签名

#### algorithm

必选：否
类型：string
默认：'sha256'
描述：哈希方式

#### 返回值

boolean

#### 示例

```typescript
const r = lCrypto.verify('Hello MAIYUN.NET', res.public, Buffer.from(sign, 'base64'), 'sm3');
```

### publicEncrypt(key, buffer)

非对称公钥加密。

#### key

必选：是
类型：crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike
描述：公钥

#### buffer

必选：是
类型：NodeJS.ArrayBufferView | string
描述：数据

#### 返回值

Buffer

### privateEncrypt(key, buffer)

非对称私钥加密。

#### key

必选：是
类型：crypto.RsaPrivateKey | crypto.KeyLike
描述：私钥

#### buffer

必选：是
类型：NodeJS.ArrayBufferView | string
描述：数据

#### 返回值

Buffer

### publicDecrypt(key, buffer)

非对称公钥解密。

#### key

必选：是
类型：crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike
描述：公钥

#### buffer

必选：是
类型：NodeJS.ArrayBufferView | string
描述：数据

#### 返回值

Buffer

### privateDecrypt(key, buffer)

非对称私钥解密。

#### key

必选：是
类型：crypto.RsaPrivateKey | crypto.KeyLike
描述：私钥

#### buffer

必选：是
类型：NodeJS.ArrayBufferView | string
描述：数据

#### 返回值

Buffer

### AES_256_ECB

常量，勿使用，无 iv 默认，但勿使用

### AES_256_CBC

常量，一般不用，兼容性场景下用

### AES_256_CTR

常量，设置 iv 会自动切换为 CTR，流式下使用，非流直接使用 GCM

### AES_256_GCM

常量，非流直接使用 GCM

### SM4_ECB

常量，SM4 如果未设置 iv，则默认这个

### SM4_CBC

常量

### SM4_CFB

常量，SM4 一般用这个，设置 iv，自动就切换成了这个

### cipherEncrypt(original, key, iv?, method?, output?)

加密数据。

#### original

必选：是
类型：string | Buffer
描述：要加密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### iv

必选：否
类型：string
默认：''
描述：向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

必选：否
类型：string
默认：AES_256_ECB
描述：加密方法

#### output

必选：否
类型：'base64' | 'buffer'
默认：'base64'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
const encrypted = lCrypto.cipherEncrypt('Original text', 'testkeyatestkeyatestkeyatestkeya', '', lCrypto.AES_256_ECB, 'base64');
```

### aesEncrypt(original, key, iv?, method?, output?)

AES 加密。

#### original

必选：是
类型：string | Buffer
描述：要加密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥，尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### iv

必选：否
类型：string
默认：''
描述：向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

必选：否
类型：string
默认：AES_256_ECB
描述：加密方法

#### output

必选：否
类型：'base64' | 'buffer'
默认：'base64'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
const key = 'testkeyatestkeyatestkeyatestkeya';
const text = lCrypto.aesEncrypt('Original text', key);

// --- 使用向量 ---
const iv = 'iloveuiloveuilov';
const textWithIv = lCrypto.aesEncrypt('Original text', key, iv);

// --- 指定加密方法 ---
const textWithMethod = lCrypto.aesEncrypt('Original text', key, iv, lCrypto.AES_256_CBC);
```

### gcmEncrypt(original, key, output?)

AES GCM 托管加密。

#### original

必选：是
类型：string | Buffer
描述：要加密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥，尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### output

必选：否
类型：'base64' | 'buffer'
默认：'base64'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
// --- 文本加密 ---
const text = lCrypto.gcmEncrypt('Original text', key);

// --- Buffer 加密 ---
const buffer = lCrypto.gcmEncrypt(Buffer.from('Original text'), key, 'buffer');
```

### sm4Encrypt(original, key, iv?, method?, output?)

SM4 加密。

#### original

必选：是
类型：string | Buffer
描述：要加密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### iv

必选：否
类型：string
默认：''
描述：向量 16 个英文字母和数字

#### method

必选：否
类型：string
默认：SM4_ECB
描述：加密方法

#### output

必选：否
类型：'base64' | 'buffer'
默认：'base64'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
const sm4Encrypted = lCrypto.sm4Encrypt('Original text', 'testkeyatestkeyatestkeyatestkeya');

// --- 使用向量 ---
const sm4EncryptedWithIv = lCrypto.sm4Encrypt('Original text', 'testkeyatestkeyatestkeyatestkeya', 'iloveuiloveuilov');
```

### cipherDecrypt(encrypt, key, iv?, method?, output?)

解密数据。

#### encrypt

必选：是
类型：string | Buffer
描述：需解密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### iv

必选：否
类型：string
默认：''
描述：向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

必选：否
类型：string
默认：AES_256_ECB
描述：加密方法

#### output

必选：否
类型：'binary' | 'buffer'
默认：'binary'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
const decrypted = lCrypto.cipherDecrypt(encrypted, 'testkeyatestkeyatestkeyatestkeya', '', lCrypto.AES_256_ECB, 'binary');
```

### aesDecrypt(encrypt, key, iv?, method?, output?)

AES 解密。

#### encrypt

必选：是
类型：string | Buffer
描述：需解密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### iv

必选：否
类型：string
默认：''
描述：向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

必选：否
类型：string
默认：AES_256_ECB
描述：加密方法

#### output

必选：否
类型：'binary' | 'buffer'
默认：'binary'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
// --- 基本解密 ---
let orig = lCrypto.aesDecrypt(text, key);

// --- 使用向量解密 ---
orig = lCrypto.aesDecrypt(textWithIv, key, iv);

// --- 指定加密方法解密 --- 
orig = lCrypto.aesDecrypt(textWithMethod, key, iv, lCrypto.AES_256_CBC);
```

### gcmDecrypt(encrypt, key, output?)

AES GCM 托管解密。

#### encrypt

必选：是
类型：string | Buffer
描述：需解密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### output

必选：否
类型：'binary' | 'buffer'
默认：'binary'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
// --- 文本解密 ---
orig = lCrypto.gcmDecrypt(text, key);

// --- Buffer 解密 ---
const origBuffer = lCrypto.gcmDecrypt(buffer, key, 'buffer');
```

### sm4Decrypt(encrypt, key, iv?, method?, output?)

SM4 解密。

#### encrypt

必选：是
类型：string | Buffer
描述：需解密的数据

#### key

必选：是
类型：crypto.CipherKey
描述：密钥 32 个英文字母和数字

#### iv

必选：否
类型：string
默认：''
描述：向量 16 个英文字母和数字

#### method

必选：否
类型：string
默认：SM4_ECB
描述：加密方法

#### output

必选：否
类型：'binary' | 'buffer'
默认：'binary'
描述：输出格式

#### 返回值

string | Buffer | false

#### 示例

```typescript
// --- 基本解密 ---
const sm4Decrypted = lCrypto.sm4Decrypt(sm4Encrypted, 'testkeyatestkeyatestkeyatestkeya');

// --- 使用向量解密 ---
const sm4DecryptedWithIv = lCrypto.sm4Decrypt(sm4EncryptedWithIv, 'testkeyatestkeyatestkeyatestkeya', 'iloveuiloveuilov');
```

### hashHmac(algorithm, data, key?, format?)

hash 或 hmac 加密。

#### algorithm

必选：是
类型：string
描述：哈希方式

#### data

必选：是
类型：Buffer | string
描述：源数据

#### key

必选：否
类型：crypto.CipherKey
描述：设置则采用 hmac 加密

#### format

必选：否
类型：'hex' | 'base64' | 'buffer'
默认：'hex'
描述：输出格式

#### 返回值

string | Buffer

#### 示例

```typescript
// --- Hash 加密 ---
const hash = lCrypto.hashHmac('md5', 'test data');

// --- Hmac 加密 ---
const hmac = lCrypto.hashHmac('sha256', 'test data', 'secretKey');

// --- 输出 base64 格式 ---
const base64Hash = lCrypto.hashHmac('sha256', 'test data', undefined, 'base64');
```

### hashHmacFile(algorithm, path, key?, encoding?)

hash 或 hmac 加密文件。

#### algorithm

必选：是
类型：string
描述：加密方式，如 md5、sha256、sm3 等

#### path

必选：是
类型：string
描述：文件路径

#### key

必选：否
类型：crypto.CipherKey
描述：设置则采用 hmac 加密

#### encoding

必选：否
类型：'hex' | 'base64' | 'base64url' | 'buffer'
默认：'hex'
描述：输出编码

#### 返回值

```typescript
Promise<string | Buffer | false>
```

#### 示例

```typescript
// --- 文件哈希 ---
const fileHash = await lCrypto.hashHmacFile('md5', '/path/to/file.txt');

// --- 文件 Hmac ---
const fileHmac = await lCrypto.hashHmacFile('sha256', '/path/to/file.txt', 'secretKey');
```

### base64Encode(data)

base64 编码。

#### data

必选：是
类型：string | Buffer
描述：要编码的数据

#### 返回值

string

#### 示例

```typescript
const encoded = lCrypto.base64Encode('Hello World');
```

### base64Decode(data, encoding?)

base64 解码。

#### data

必选：是
类型：string
描述：base64 编码的字符串

#### encoding

必选：否
类型：'utf8' | 'buffer'
默认：'utf8'
描述：输出格式

#### 返回值

string | Buffer

#### 示例

```typescript
// --- 解码为字符串 ---
const decodedString = lCrypto.base64Decode('SGVsbG8gV29ybGQ=');

// --- 解码为 Buffer ---
const decodedBuffer = lCrypto.base64Decode('SGVsbG8gV29ybGQ=', 'buffer');
```

### uuid(options?)

生成 uuid。

#### options

必选：否
类型：crypto.RandomUUIDOptions
描述：选项

#### 返回值

string

#### 示例

```typescript
const uuid = lCrypto.uuid();
```

## Db

数据库操作相关的库。

### ESERVICE

数据库服务商枚举。

#### 枚举值

- `MYSQL`: MySQL 数据库
- `PGSQL`: PostgreSQL 数据库

### IData

query 返回的数据结构。

#### 结构

```typescript
{
    /** --- 查询结果数据行，null 表示查询失败或无结果 --- */
    'rows': Array<Record<string, any>> | null;
    /** --- 字段信息数组，包含 name（字段名）和 length（字段格式长度） --- */
    'fields': Array<{
        'name': string;
        'length': number;
    }>;
    /** --- 错误信息，null 表示无错误 --- */
    'error': {
        'message': string;
        'errno': number;
    } | null;
    /** --- 结果状态码，1 表示正常，-500 表示服务器错误 --- */
    'result': number;
}
```

### IPacket

execute 返回的数据包结构。

#### 结构

```typescript
{
    /** --- 数据包，null 表示执行失败 --- */
    'packet': {
        /** --- 受影响的行数 --- */
        'affected': number;
        /** --- 插入的 ID --- */
        'insert': number;
    } | null;
    /** --- 字段信息数组，包含 name（字段名）和 length（字段格式长度） --- */
    'fields': Array<{
        'name': string;
        'length': number;
    }>;
    /** --- 错误信息，null 表示无错误 --- */
    'error': {
        'message': string;
        'errno': number;
        [key: string]: any;
    } | null;
    /** --- 结果状态码，1 表示正常，-500 表示服务器错误 --- */
    'result': number;
}
```

### get(ctrEtc, opt?)

获取 Db Pool 对象。

#### ctrEtc

必选：是
类型：sCtr.Ctr | IConfigDb
描述：控制器对象或数据库配置信息

#### opt

必选：否
类型：object
默认：
```typescript
{
    /** --- 服务商，默认 ESERVICE.PGSQL --- */
    'service'?: ESERVICE;
}
```
描述：配置选项

#### 返回值

Pool

#### 示例

```typescript
// --- 使用控制器获取数据库连接池 ---
const pool = lDb.get(this);
// --- 指定服务商类型 ---
const mysqlPool = lDb.get(this, {
    'service': lDb.ESERVICE.MYSQL,
});

// --- 直接使用配置信息 ---
const customPool = lDb.get({
    'host': 'localhost',
    'port': 5432,
    'name': 'test',
    'user': 'admin',
    'pwd': 'password',
}, {
    'service': ESERVICE.PGSQL,
});
```

### Connection

数据库连接对象类。

#### getEtc()

获取连接的配置信息。

##### 返回值

IConfigDb

#### getService()

获取数据库服务类型。

##### 返回值

ESERVICE

#### getLast()

获取最后一次获取连接的时间。

##### 返回值

number

#### getLastSql()

获取最后两次执行的 SQL 字符串。

##### 返回值

```typescript
Array<{ 'sql': string; 'values'?: DbValue[]; }>
```

#### setLost()

将连接设置为不可用。

##### 返回值

void

#### isLost()

检查连接是否已经丢失。

##### 返回值

boolean

#### isTransaction()

检查连接是否正在执行事务。

##### 返回值

boolean

#### isUsing()

检查连接是否正在被使用中。

##### 返回值

boolean

#### using()

尝试占用连接。

##### 返回值

类型：boolean
描述：true 表示获取成功并自动刷新最后时间

#### used()

取消占用连接。

#### refreshLast()

更新最后使用时间。

#### isAvailable(last?)

通过执行一条语句判断当前连接是否可用。

##### last

必选：否
类型：boolean
默认：true
描述：是否刷新最后使用时间

##### 返回值

```typescript
Promise<boolean>
```

#### query(sql, values?)

执行一条 SQL 并获得返回数据。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：kebab.DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IData>
```

#### execute(sql, values?)

执行一条 SQL 并获得影响行数对象。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：kebab.DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IPacket>
```

#### end()

关闭连接，一般情况下不使用。

##### 返回值

```typescript
Promise<boolean>
```

#### beginTransaction()

开始事务，只能在独占连接中使用，pool 创建事务返回独占连接，commit 或 rollback 释放连接回连接池。

##### 返回值

```typescript
Promise<boolean>
```

#### commit()

提交事务。

##### 返回值

```typescript
Promise<boolean>
```

#### rollback()

回滚事务。

##### 返回值

```typescript
Promise<boolean>
```

### IConnectionInfo

连接信息。

```typescript
{
    /** --- 连接 ID --- */
    'id': number;
    /** --- 连接服务商 --- */
    'service': ESERVICE;
    /** --- 连接最后使用时间 --- */
    'last': number;
    /** --- 连接主机地址 --- */
    'host': string;
    /** --- 连接端口号 --- */
    'port': number;
    /** --- 连接数据库名 --- */
    'name': string;
    /** --- 连接用户名 --- */
    'user': string;

    /** --- 连接是否已丢失 --- */
    'lost': boolean;
    /** --- 连接是否正在被使用中 --- */
    'using': boolean;
    /** --- 连接是否正在执行事务 --- */
    'transaction': boolean;
}
```

### getConnectionList()

获取当前连接池中所有连接的信息。

#### 返回值

IConnectionInfo[]

#### 示例
```typescript
const connections = lDb.getConnectionList();
```

### Pool

数据库连接池对象类。

#### getService()

获取当前连接的服务商。

##### 返回值

ESERVICE

#### query(sql, values?)

执行一条 SQL，无视顺序和相同连接，随用随取。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：kebab.DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IData>
```

##### 示例
```typescript
const res = await pool.query('SELECT * FROM users WHERE id = ?', [1]);
```

#### execute(sql, values?)

执行一条 SQL 并获得影响行数对象。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：kebab.DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IPacket>
```

##### 示例

```typescript
const res = await pool.execute('UPDATE users SET name = ? WHERE id = ?', ['New Name', 1]);
console.log('影响行数', res.packet?.affected);
```

#### beginTransaction(ctr)

开启事务，返回事务对象并锁定连接，别人不可用。

##### ctr

必选：是
类型：sCtr.Ctr | null
描述：控制器对象，独立执行时可传 null

##### 返回值

```typescript
Promise<Transaction | null>
```

##### 示例

```typescript
const tran = await pool.beginTransaction(this);
if (tran) {
    await tran.query('UPDATE account SET balance = balance - ? WHERE id = ?', [100, 1]);
    await tran.query('UPDATE account SET balance = balance + ? WHERE id = ?', [100, 2]);
    await tran.commit();
}
```

#### getQueries()

获取 SQL 执行次数。

##### 返回值

number

### Transaction

事务连接对象，commit 和 rollback 后将无法使用。

#### getService()

获取当前连接的服务商。

##### 返回值

ESERVICE | null

#### query(sql, values?)

在事务连接中执行一条 SQL。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：kebab.DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IData>
```

#### execute(sql, values?)

执行一条 SQL 并获得影响行数对象。

##### sql

必选：是
类型：string
描述：执行的 SQL 字符串

##### values

必选：否
类型：DbValue[]
描述：要替换的数据

##### 返回值

```typescript
Promise<IPacket>
```

#### commit()

提交事务。

##### 返回值

```typescript
Promise<boolean>
```

#### rollback()

回滚事务。

##### 返回值

```typescript
Promise<boolean>
```

