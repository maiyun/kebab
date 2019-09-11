# 更新日志

## 0.1.1

[+] 增加 nlReplace 方法，Text 库。  
[+] 增加 reload, restart, clearDataCache 的 RPC。  
[\*] 当 key 小于必须的位数后，则自动进行 md5 补全，aesEncrypt/aesDecrypt 方法，Crypto 库。  
[\*] 修复 readFile 的相关 bug，Ssh (Sftp) 库。  
[\*] 优化 Mysql/Redis 库的相关返回值。  
[\*] 替换 Redis 核心库为 LiteRT 组织的 redis 库。

## 0.1.0

[+] 新增 Ssh 库，包含 Shell 和 Sftp 子库。  
[+] Sys 库新增 loadData、clearDataCache、realClearDataCache、location、redirect 方法。  
[+] Sql 类新增 format 方法。  
[+] Mod 类新增 getLastSqlString、getLastSqlData、getLastSqlFormat 方法。  
[\*] 修复 Sql 类 where 方法中当传入的数组里的对象为空时依然进行处理的 BUG。  
[\*] 修复 CopyFiles 同步问题。  
[\*] 修复当没有传参给模板时无法读取默认系统常量的 BUG。  
[\*] 修复 Mod 类继承类使用静态方法时无法读取表名的 BUG。  
[\*] 部分代码优化。

## 0.0.8

[+] 增加 STATIC_PATH、STATIC_VER 配置项。

## 0.0.7

[\*] 修复升级程序。

## 0.0.6

[+] 增加 Captcha 库。

## 0.0.5

[+] 增加模型类。  
[+] 增加 Session 库。  
[+] 增加 Time 库。

## 0.0.4

[\*] 代码优化。

## 0.0.3

[\*] 修复 WebSocket 监听对象相关 BUG。

## 0.0.2

[\*] 修复 readContent() 无法识别返回值为 Buffer 的 BUG。

## 0.0.1

- 整装待发，全新起航。