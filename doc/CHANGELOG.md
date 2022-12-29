# Changelog

## Languages

[简体中文](./CHANGELOG.sc.md) | [繁體中文](./CHANGELOG.tc.md)

## 0.2.0

[+] Add the nlReplace method, the Text library.  
[+] Add the RPC of reload, restart, clearDataCache.  
[+] Add hmacMd5/hmacMd516/sha1/hmacSha1/hmacSha256 method in the Crypto library.  
[+] New Cloud Dns library, currently supports Alibaba Cloud, Tencent Cloud's domain name Dns resolution interface.  
[+] Add the objectSort method in the Sys library.  
[+] Add the getHost method in the Text library.  
[+] Add the rmdirDeepEmpty method in the Sftp (Ssh) library.  
[+] Add the insertSql method in the Mod library.  
[+] Add the key pre string in the Redis library.  
[+] Add the disconnect method in the Redis library.  
[+] New DnsSys library is used to get the Dns resolution value of the domain name.  
[+] Adding the mail method does not require the smtp server to send mail in the Net library.  
[+] New Socket library.  
[+] Add the getText method to get the language correspondence text in the View library.  
[+] Add hset/hmset/hget/hmget/hget/hget/hgetall/hexists/hincr/hkeys method in the Redis library.  
[+] Add the getIp method to get the user's real IP in the Sys library.  
[+] Add softened mode in the Mod class.  
[+] Add the lock method in the Sql library.  
[\*] Remove the original md5WithSalt/md5WithSalt16 method, please use hmacMd5/hmacMd516 instead of the Crypto library.  
[\*] When the key is less than the required number of digits, the md5 complement is automatically performed, the aesEncrypt/aesDecrypt method, the Crypto library.  
[\*] Fix the bug related to readFile, ssh (Sftp) library.  
[\*] Optimize the relevant return value of the Mysql/Redis library.  
[\*] Replace the Redis core library as the redis library of the LiteRT organization.  
[\*] The pipe method adds the end option in the Sftp/Net/Fs library.  
[\*] Optimize the code for WebSocket interactions.  
[\*] Optimize the setting sq. size of the Output of the View Library.  
[\*] Fix the bug that the file uploaded.  
[\*] Fix the sync method in the Fs library. Change the github raw address to jsdelivr.

## 0.1.0

[+] Added Ssh library, including Shell and Sftp library.  
[+] Sys Library added loadData, clearDataCache, realClearDataCache, location, redirect methods.  
[+] The SQL class add format method.  
[+] Mod class added getLastSqlString, getLastSqlData, getLastSqlFormat method.  
[\*] Fixes a BUG in the Sql class where method that is still processed when the object in the incoming array is empty.  
[\*] Fixes CopyFiles synchronization issues.  
[\*] Fixes a BUG where the default system constants cannot be read when no reference is made to the template.  
[\*] Fixes a BUG where the Mod class inheritance class cannot read the table name when using static methods.  
[\*] Part of the code optimization.

## 0.0.8

[+] Add STATIC_PATH, STATIC_VER configuration items.

## 0.0.7

[\*] Fix the upgrade program.

## 0.0.6

[+] Add the Captcha library.

## 0.0.5

[+] Add a model class.  
[+] Add the Session library.  
[+] Add the Time library.

## 0.0.4

[\*] Code optimization.

## 0.0.3

[\*] Fixes BUGS related to WebSocket listening objects.

## 0.0.2

[\*] Fix readContent() a BUG with a return value of Buffer is not recognized.

## 0.0.1

- A new beginning, I'm ready.