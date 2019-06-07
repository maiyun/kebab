# Mutton

[![License](https://img.shields.io/github/license/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/issues)
[![GitHub Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/releases "Stable Release")
[![GitHub Pre-Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom/all.svg)](https://github.com/MaiyunNET/Nuttom/releases "Pre-Release")

简单，易用，功能完整开袋即食的 Node.js 框架。

## 安装

下载最新的 release 版，放在网站目录下，即可开始开发。

## 环境

Node 10+

## 库

Captcha, Crypto (md5, sha1, aes...), Fs, Mysql, Net (http2, https and http auto selection), Redis, Session, Sql, Sys, Text, Time, View, WebSocket, Zlib.

## 部分特性

### 开袋即食

秉承开袋即食的原则，封装统一风格的常用类库。

### 热更新

通过调用 Sys.restart 方法, 您可以在不中断任何现有业务和连接的情况下平滑的实现新旧代码交替热更新。

### 多进程支持

创建基于 CPU 核心数量的多进程模型, 充分提高多核 CPU 的利用率。

### 全局连接池

同一进程中的不同站点如果连接到同一个 Mysql、Redis 等服务器, 则共享同一个连接池, 最大限度地提高效率并减少开销。

### UI 控制台

包含了一个 UI 界面的控制台，可对 Nuttom 的最新版本进行自动比对，检测哪些文件被修改或需要升级。

### Net 类库包含完整 Cookie 实现

可将 Cookie 直接获取为一个变量数组，可存在数据库、内存等任何地方。

## 代码演示

### 生成 16 位随机数

```typescript
let str: string = Text.random(16, Text.RANDOM_N)
```

### 生成验证码图片

```typescript
Captcha.get(400, 100).output(nu);
```

### Sql

```typescript
let s = sql.update("user", [["age", "+", "1"], {"name": "Serene"}]).where([{"name": "Ah"}]);
```

> UPDATE mu_user SET \`age\` = \`age\` + '1', \`name\` = 'Serene' WHERE \`name\` = 'Ah'

### 其他演示

可以下载后访问首页和查看代码（back/sources/www/default/ctr/test.ts）看更多示例。

## 更新日志

[更新日志](CHANGELOG.zh-CN.md)

## 许可

本框架基于 [Apache-2.0](../LICENSE) 许可。

## 名字含义

Mutton 的镜像名字。