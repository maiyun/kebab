# 更新日誌

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