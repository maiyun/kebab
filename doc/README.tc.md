<p align="center"><img src="./icon.svg" width="68" height="68" alt="Kebab"></p>

[![License](https://img.shields.io/github/license/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/issues)
[![GitHub Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom.svg)](https://github.com/MaiyunNET/Nuttom/releases "Stable Release")
[![GitHub Pre-Releases](https://img.shields.io/github/release/MaiyunNET/Nuttom/all.svg)](https://github.com/MaiyunNET/Nuttom/releases "Pre-Release")

簡單，易用，功能完整開袋即食的 Node.js 框架。

## 語言

[简体中文](README.sc.md) | [English](../README.md)

## 環境

Node 16+

## 安装

下載最新的發行包，解壓后即可開始開發，開啟 TypeScript 編譯並執行 `node ./index` 可運行網站。

## 庫

Captcha, Consistent, Crypto, Db (MySQL), Dns (DNSPod, Alibaba Cloud), Fs, Kv (Redis), Net, Scan, Session, Sql, Ssh (Shell, Sftp), Text, Time, Ws, Zlib.

## 部分特性

### 開袋即食

秉承開袋即食的原則，封裝統一風格的常用類庫。

### 熱更新

透過調用 Sys.restart 方法，您可以在不中斷任何現有業務和連接的情況下平滑的實現新舊代碼交替熱更新。

### 多進程支援

創建基於 CPU 核心數量的多進程模型，充分提高多核 CPU 的利用率。

### 全域連接池

同一進程中的不同站點如果連接到同一個 Db、Kv 等伺服器，則共用同一個連接池，最大限度地提高效率並減少開銷。

### 超好用 Net 庫

可以這樣用：

```typescript
const res = await lNet.open('https://xxx/test').post().data({ 'a': '1', 'b': '2' }).request();
```

也可以這樣用：

```typescript
const res = await lNet.get('https://xxx/test');
```

可以設置自訂的解析結果：

```typescript
const res = await lNet.get('https://xxx/test', {
    'hosts': {
        'xxx': '111.111.111.111'
    }
});
```

也可以選擇本地的其他網卡來訪問：

```typescript
const res = await lNet.get('https://xxx/test', {
    'local': '123.123.123.123'
});
```

更擁有完整的 Cookie 管理器，可以輕鬆將 Cookie 獲取並存在任何地方，發送請求時，系統也會根據 Cookie 設置的功能變數名稱、路徑等來選擇發送，並且 Set-Cookie 如果有非法跨域設置，也會被捨棄不會被記錄，就像真正的瀏覽器一樣：

```typescript
const res1 = await lNet.get('https://xxx1.xxx/test1', { 'cookie': cookie });
const res2 = await lNet.get('https://xxx2.xxx/test2', { 'cookie': cookie });
```

### 好用的 Db 庫

擁有大量好用的介面，可以輕鬆的從資料庫篩選出需要的資料：

```typescript
const ls = Order.where<Order>(this, db, {
    'state': '1'
}).by('id', 'DESC').page(10, 1);
const list = await ls.all();
const count = await ls.count();
const total = await ls.total();
```

獲取一個使用者：

```typescript
const user = await User.select<User>(this, db, ['id', 'user']).filter([
    ['time_add', '>=', '1583405134']
]).first();
```

### XSRF 檢測

使用 checkXInput 方法，可以進行 XSRF 檢測，防止惡意訪問。

### 扫码登录

借助 Scan 庫可以輕鬆實現掃碼登入的功能。

#### 還有更多特性等你探索

## 代碼演示

### 生成 16 位亂數

```typescript
let str: string = Core.random(16, Core.RANDOM_N)
```

### 生成驗證碼圖片

```typescript
Captcha.get(400, 100).getBuffer();
```

### 獲取一個清單

```typescript
const userList = await User.where<User>(this, db, [
    ['state', '!=', '0'],
    {
        'type': ['1', '2', '3'],
        'is_lock': '0'
    }
]).all();
```

### Sql 庫自動增加表前綴和包裹字元「`」”

```typescript
ssql.select(['SUM(user.age) age'], 'order').leftJoin('user', {'order.user_id': '#user.id'});
```

將輸出：

```sql
SELECT SUM(`test_user`.`age`) AS `age` FROM `test_order` LEFT JOIN `test_user` ON `test_order`.`user_id` = `test_user`.`id`
```

寫起來好輕鬆！

### 本地化

```typescript
await this._loadLocale(this._get['lang'], 'test');
return this._l('copy');
```

根據 lang 值不同，將輸出：Copy、复制、複製、コピー等，在網站目錄 /data/locale/ 中配置。

### 数据校验

根據字串、數位、比對大小甚至是正則，對提交的數據進行直接校驗，方便！

```typescript
{
    'he': ['require', [0, 'The he param does not exist.']],
    'num': ['> 10', [0, 'The num param must > 10.']],
    'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
    'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']]
}
```

參見：/test/ctr-checkinput

### 其他演示

你可以訪問 /test/ 來查看更多示例。

## 更新日誌

[更新日誌](CHANGELOG.tc.md)

## 許可

本框架基於 [Apache-2.0](../LICENSE) 許可。

## 參與翻譯

我們工作基於中文語言環境，若對本專案感興趣並對除中文簡體、中文繁體之外語種熟悉的朋友，歡迎一起參與翻譯工作，感興趣的朋友可以加入以下群組。

Telegram 群：[https://t.me/maiyunlocale](https://t.me/maiyunlocale)  
QQ 群：24158113