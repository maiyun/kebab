# 更新日志

## Languages

[繁體中文](./CHANGELOG.tc.md) | [English](./CHANGELOG.md)

## 1.0.0

[\*] 大量优化。

## 0.2.0

[+] 增加 nlReplace 方法，Text 库。  
[+] 增加 reload, restart, clearDataCache 的 RPC。  
[+] 增加 hmacMd5/hmacMd516/sha1/hmacSha1/hmacSha256 方法在 Crypto 库。  
[+] 新增云 Dns 库，目前支持阿里云、腾讯云的域名 Dns 解析接口。  
[+] 增加 objectSort 方法在 Sys 库。  
[+] 增加 getHost 方法在 Text 库。  
[+] 增加 rmdirDeepEmpty 方法在 Sftp(Ssh) 库。  
[+] 增加 insertSql 方法在 Mod 库。  
[+] 增加 key 前置字符串在 Redis 库。  
[+] 增加 disconnect 方法在 Redis 库。  
[+] 新增 DnsSys 库用于获取域名的 Dns 解析值。  
[+] 增加 mail 方法无需 smtp 服务器发邮件在 Net 库。  
[+] 新增 Socket 库。  
[+] 增加 getText 方法以获取语言对应文本在 View 库。  
[+] 增加 hset/hmset/hget/hmget/hgetall/hdel/hexists/hincr/hkeys 方法在 Redis 库。  
[+] 增加 getIp 方法以获取用户真实 IP 在 Sys 库。  
[+] 增加软删模式在 Mod 类。  
[+] 增加 lock 方法在 Sql 库。  
[\*] 删除原 md5WithSalt/md5WithSalt16 方法，请使用 hmacMd5/hmacMd516 来替代在 Crypto 库。  
[\*] 当 key 小于必须的位数后，则自动进行 md5 补全，aesEncrypt/aesDecrypt 方法，Crypto 库。  
[\*] 修复 readFile 的相关 bug，Ssh (Sftp) 库。  
[\*] 优化 Mysql/Redis 库的相关返回值。  
[\*] 替换 Redis 核心库为 LiteRT 组织的 redis 库。  
[\*] pipe 方法新增 end 选项在 Sftp/Net/Fs 库。  
[\*] 优化 WebSocket 互动通讯的相关代码。  
[\*] 优化 View 库输出内容大小的设置。  
[\*] 修复文件上传的 Bug。  
[\*] 修复 sync 方法在 Fs 库。  
[\*] 更改 github raw 地址改到 jsdelivr。

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