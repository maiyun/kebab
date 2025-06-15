# 更新日誌

## Languages

[简体中文](./CHANGELOG.sc.md) | [English](./CHANGELOG.md)

## 2.0.0

[\*] 重磅更新，全新起點。未來將不再更新 CHANGELOG，所有更新資訊將統一發布於 MAIYUN.NET 的 MAIYUN.NET 帳號下。

## 1.1.0

[+] Consistent 庫新增 getRange 方法。  
[+] Jwt 庫新增 clearCookie 方法。  
[+] sftp 庫新增 close 方法。  
[+] 新增 ind 機制，可獨立運行常駐代碼。  
[+] sql、db 庫支援 GIS、JSON 格式。  
[+] mod 類新增 oneArray、toArrayByRecord、firstArray、allArray 方法。  
[+] ctr 類新增 _cross 方法，可放開跨域限制。  
[+] 新增反代特性，使用 net 庫的 rproxy 方法輕鬆實現反代。  
[+] 生命週期新增 onUnload 事件，在頁面結束時會執行。  
[+] sql 庫部分方法新增 suf 表後綴參數。  
[+] mod 類新增 removeByWhereSql 方法。  
[+] mod 的各種 join 方法新增 index 參數。  
[\*] 優化了 core 庫的 purify 方法。  
[\*] 優化重寫規則，html 格式檔將直接顯示。  
[\*] 優化 SSL 的 X509 證書載入模式。  
[\*] 其他大量優化。

## 1.0.1

[+] 控制器新增 Buffer、stream. Readable、lResponse.Response 以及以上三種為 T 的組合 Array<T> 傳回類型。  
[+] Core 類新增 passThroughAppend 方法。  
[+] 控制器返回值輸出預設會進行壓縮，壓縮演算法根據使用者請求的頭部來自適應。  
[+] Net Response 新增 getStream 方法。

## 1.0.0

[\*] 大量優化。

## 0.2.0

[+] 增加 nlReplace 方法，Text 庫。  
[+] 增加 reload, restart, clearDataCache 的 RPC。  
[+] 增加 hmacMd5/hmacMd516/sha1/hmacSha1/hmacSha256 方法在 Crypto 庫。  
[+] 新增雲 Dns 庫，目前支援阿裡雲、騰訊雲的功能變數名稱 Dns 解析介面。  
[+] 增加 objectSort 方法在 Sys 庫。  
[+] 增加 getHost 方法在 Text 庫。  
[+] 增加 rmdirDeepEmpty 方法在 Sftp(Ssh) 庫。  
[+] 增加 insertSql 方法在 Mod 庫。  
[+] 增加 key 前置字串在 Redis 庫。  
[+] 增加 disconnect 方法在 Redis 庫。  
[+] 新增 DnsSys 庫用於獲取功能變數名稱的 Dns 解析值。  
[+] 增加 mail 方法無需 smtp 伺服器發郵件在 Net 庫。  
[+] 新增 Socket 庫。  
[+] 增加 getText 方法以獲取語言對應文本在 View 庫。  
[+] 增加 hset/hmset/hget/hmget/hgetall/hdel/hexists/hincr/hkeys 方法在 Redis 庫。  
[+] 增加 getIp 方法以獲取使用者真實 IP 在 Sys 庫。  
[+] 增加軟刪模式在 Mod 類。  
[+] 增加 lock 方法在 Sql 庫。  
[\*] 刪除原 md5WithSalt/md5WithSalt16 方法，請使用 hmacMd5/hmacMd516 來替代在 Crypto 庫。  
[\*] 當 key 小於必須的位數後，則自動進行 md5 補全，aesEncrypt/aesDecrypt 方法，Crypto 庫。  
[\*] 修復 readFile 的相關 bug，Ssh (Sftp) 庫。  
[\*] 優化 Mysql/Redis 庫的相關傳回值。  
[\*] 替換 Redis 核心庫為 LiteRT 組織的 redis 庫。  
[\*] pipe 方法新增 end 選項在 Sftp/Net/Fs 庫。  
[\*] 優化 WebSocket 互動通訊的相關代碼。  
[\*] 優化 View 庫輸出內容大小的設置。  
[\*] 修復檔上傳的 Bug。  
[\*] 修復 sync 方法在 Fs 庫。  
[\*] 更改 github raw 位址改到 jsdelivr。

## 0.1.0

[+] 新增 Ssh 庫，包含 Shell 和 Sftp 子庫。  
[+] Sys 庫新增 loadData、clearDataCache、realClearDataCache、location、redirect 方法。  
[+] Sql 類新增 format 方法。  
[+] Mod 類新增 getLastSqlString、getLastSqlData、getLastSqlFormat 方法。  
[\*] 修復 Sql 類 where 方法中當傳入的陣列裡的物件為空時依然進行處理的 BUG。  
[\*] 修復 CopyFiles 同步問題。  
[\*] 修復當沒有傳參給範本時無法讀取預設系統常量的 BUG。  
[\*] 修復 Mod 類繼承類使用靜態方法時無法讀取表名的 BUG。  
[\*] 部分代碼優化。

## 0.0.8

[+] 增加 STATIC_PATH、STATIC_VER 配置項。

## 0.0.7

[\*] 修復升級程式。

## 0.0.6

[+] 增加 Captcha 庫。

## 0.0.5

[+] 增加模型類。  
[+] 增加 Session 庫。  
[+] 增加 Time 庫。

## 0.0.4

[\*] 代碼優化。

## 0.0.3

[\*] 修復 WebSocket 監聽物件相關 BUG。

## 0.0.2

[\*] 修復 readContent() 無法識別傳回值為 Buffer 的 BUG。

## 0.0.1

- 整裝待發，全新起航。