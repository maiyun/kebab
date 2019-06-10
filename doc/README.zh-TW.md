# Mutton

[![License](https://img.shields.io/github/license/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/issues)
[![GitHub Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/releases "Stable Release")
[![GitHub Pre-Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom/all.svg)](https://github.com/MaiyunNET/Nuttom/releases "Pre-Release")

簡單，易用，功能完整開袋即食的 Node.js 框架。

## 安裝

下載最新的 release 版，隨即開始做你想做的。

## 環境

Node 10+

## 庫

Captcha, Crypto (md5, sha1, aes...), Fs, Mysql, Net (http2, https and http auto selection), Redis, Session, Sql, Ssh (Shell, Sftp), Sys, Text, Time, View, WebSocket, Zlib.

## 部分特性

### 兩眼發黑

基於兩眼發黑的原則，無需動腦子，官方封裝了擁有統一代碼風格常用庫，可直接食用。

### 熱更新

透過調用 Sys.restart 方法，您可以在不中斷任何現有業務和連接的情況下平滑的實現新舊代碼交替熱更新。

### 多進程支援

創建基於 CPU 核心數量的多進程模型，充分提高多核 CPU 的利用率。

### 全域連接池

同一進程中的不同站點如果連接到同一個 Mysql、Redis 等伺服器，則共用同一個連接池，最大限度地提高效率並減少開銷。

### UI 主控台

包含了一個 UI 介面的主控台，可對 Nuttom 的最新版本進行自動比對，檢測哪些檔案被修改或需要更新。

### Net 類庫包含完整 Cookie 實現

可將 Cookie 直接獲取為一個變數陣列，可存在資料庫、記憶體等任何地方。

## 代碼演示

### 生成 16 位亂數

```typescript
let str: string = Text.random(16, Text.RANDOM_N)
```

### 生成驗證碼圖片

```typescript
Captcha.get(400, 100).output(nu);
```

### Sql

```typescript
let s = sql.update("user", [["age", "+", "1"], {"name": "Serene"}]).where([{"name": "Ah"}]);
```

> UPDATE mu_user SET \`age\` = \`age\` + '1', \`name\` = 'Serene' WHERE \`name\` = 'Ah'

### 其他演示

可以下載後訪問首頁和查看代碼（back/sources/www/default/ctr/test.ts）看更多示例。

## 更新日誌

[更新日誌](CHANGELOG.zh-TW.md)

## 許可

本框架基於 [Apache-2.0](../LICENSE) 許可。

## 名字含義

羊肉真香 XD，Mutton 的 M 和 N 的調換。