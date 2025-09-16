<p align="center"><img src="./icon.png" width="64" height="64" alt="Kebab"></p>
<p align="center">
    <a href="https://github.com/maiyun/kebab/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/kebab?color=blue" />
    </a>
    <a href="https://github.com/maiyun/kebab/releases">
        <img alt="GitHub releases" src="https://img.shields.io/github/v/release/maiyun/kebab?color=brightgreen&logo=github" />
        <img alt="GitHub pre-releases" src="https://img.shields.io/github/v/release/maiyun/kebab?color=yellow&logo=github&include_prereleases" />
    </a>
    <a href="https://github.com/maiyun/kebab/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/maiyun/kebab?color=blue&logo=github" />
    </a>
</p>

简单，易用，功能完整开袋即食的 Node.js 框架。

## 语言

[繁體中文](README.tc.md) | [English](../README.md)

## 环境

Node 22 +

## 安装

执行 `npm i @maiyunnet/kebab` 安装最新版，安装后，执行 `npx kebab init` 进行初始化，然后执行 `npx kebab` 启动项目。

## 库

Buffer, Captcha, Consistent, Core, Crypto, Db (MySQL), Dns (DNSPod, Alibaba Cloud), Fs, Jwt, Kv (Redis), Lan, Net, S3, Scan, Session, Sql, Ssh (Shell, Sftp), Text, Time, Ws, Zip, Zlib.

## 部分特性

### 开袋即食

秉承开袋即食的原则，封装统一风格的常用类库。

### 热更新

通过调用 Core.sendRestart 方法, 您可以在不中断任何现有业务和连接的情况下平滑的实现新旧代码交替热更新。

### 多进程支持

创建基于 CPU 核心数量的多进程模型, 充分提高多核 CPU 的利用率。

### 全局连接池

同一进程中的不同站点如果连接到同一个 Db、Kv 等服务器, 则共享同一个连接池, 最大限度地提高效率并减少开销。

### 超好用 Net 库

```typescript
const res = await lNet.open('https://xxx/test').post().data({ 'a': '1', 'b': '2' }).request();
```

也可以这样用：

```typescript
const res = await lNet.get('https://xxx/test');
```

可以设置自定义的解析结果：

```typescript
const res = await lNet.get('https://xxx/test', {
    'hosts': {
        'xxx': '111.111.111.111'
    }
});
```

也可以选择本地的其他网卡来访问：

```typescript
const res = await lNet.get('https://xxx/test', {
    'local': '123.123.123.123'
});
```

更拥有完整的 Cookie 管理器，可以轻松将 Cookie 获取并存在任何地方，发送请求时，系统也会根据 Cookie 设置的域名、路径等来选择发送，并且 Set-Cookie 如果有非法跨域设置，也会被舍弃不会被记录，就像真正的浏览器一样：

```typescript
const res1 = await lNet.get('https://xxx1.xxx/test1', { 'cookie': cookie });
const res2 = await lNet.get('https://xxx2.xxx/test2', { 'cookie': cookie });
```

> 提示：Net 库同时支持传入 options 和 open 链式操作，如 await lNet.open('xxx').follow().timeout(60).save(this._config.const.rootPath + 'doc/test.txt').request();

### 好用的 Db 库

拥有大量好用的接口，可以轻松的从数据库筛选出需要的数据：

```typescript
const ls = Order.where<Order>(this, db, {
    'state': '1'
}).by('id', 'DESC').page(10, 1);
const list = await ls.all();
const count = await ls.count();
const total = await ls.total();
```

获取一个用户：

```typescript
const user = await User.select<User>(this, db, ['id', 'user']).filter([
    ['time_add', '>=', '1583405134']
]).first();
```

### XSRF 检测

使用 checkXInput 方法，可以进行 XSRF 检测，防止恶意访问。

### 扫码登录

借助 Scan 库可以轻松实现扫码登录的功能。

### 反向代理

使用 net 库的 rproxy 方法，配合路由参数，可轻松实现反向代理功能。

#### 还有更多特性等你探索

## 代码演示

### 生成 16 位随机数

```typescript
let str: string = Core.random(16, Core.RANDOM_N)
```

### 生成验证码图片

```typescript
Captcha.get(400, 100).getBuffer();
```

### 获取一个列表

```typescript
const userList = await User.where<User>(this, db, [
    ['state', '!=', '0'],
    {
        'type': ['1', '2', '3'],
        'is_lock': '0'
    }
]).all();
```

> 提示：所有数据库操作都已经做了安全防注入处理。

### Sql 库自动增加表前缀和包裹字符“`”

```typescript
sql.select(['SUM(user.age) age'], 'order').leftJoin('user', {'order.user_id': lSql.column('user.id')});
```

将输出：

```sql
SELECT SUM(`test_user`.`age`) AS `age` FROM `test_order` LEFT JOIN `test_user` ON `test_order`.`user_id` = `test_user`.`id`
```

写起来好轻松！

### 本地化

```typescript
await this._loadLocale(this._get['lang'], 'test');
return this._l('copy');
```

根据 lang 值不同，将输出：Copy、复制、複製、コピー等，在站点目录 /data/locale/ 中配置。

### 数据校验

根据字符串、数字、比对大小甚至是正则，对提交的数据进行直接校验，方便！

```typescript
{
    'he': ['require', [0, 'The he param does not exist.']],
    'num': ['> 10', [0, 'The num param must > 10.']],
    'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
    'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']]
}
```

参见：/test/ctr-checkinput

### 其他演示

你可以访问 /test/ 来查看更多示例。

## 许可

本框架基于 [Apache-2.0](../LICENSE) 许可。