# Changelog

## Languages

[简体中文](./CHANGELOG.sc.md) | [繁體中文](./CHANGELOG.tc.md)

## 1.0.1

[+] Added Buffer, stream.Readable, and lResponse.Response as T combination Array<T> return types in the controller.  
[+] Added passThroughAppend method in the Core class.  
[+] Controller return values are compressed by default, with the compression algorithm adapted to user-requested headers.  
[+] Added getStream method in the Net Response.

## 1.0.0

[\*] Numerous optimizations.

## 0.2.0

[+] Added nlReplace method in the Text library.  
[+] Added reload, restart, and clearDataCache RPCs.  
[+] Added hmacMd5/hmacMd516/sha1/hmacSha1/hmacSha256 methods in the Crypto library.  
[+] Added Cloud DNS library, currently supporting domain name DNS resolution interfaces for Alibaba Cloud and Tencent Cloud.  
[+] Added objectSort method in the Sys library.  
[+] Added getHost method in the Text library.  
[+] Added rmdirDeepEmpty method in the Sftp (Ssh) library.  
[+] Added insertSql method in the Mod library.  
[+] Added key prefix string in the Redis library.  
[+] Added disconnect method in the Redis library.  
[+] Added DnsSys library for obtaining domain name DNS resolution values.  
[+] Added mail method to send email without an SMTP server in the Net library.  
[+] Added Socket library.  
[+] Added getText method to obtain language-specific text in the View library.  
[+] Added hset/hmset/hget/hmget/hgetall/hdel/hexists/hincr/hkeys methods in the Redis library.  
[+] Added getIp method to obtain the user's real IP in the Sys library.  
[+] Added soft delete mode in the Mod class.  
[+] Added lock method in the Sql library.  
[\*] Deleted original md5WithSalt/md5WithSalt16 methods, replaced with hmacMd5/hmacMd516 in the Crypto library.  
[\*] When the key is less than the required length, automatic md5 padding is performed for aesEncrypt/aesDecrypt methods in the Crypto library.  
[\*] Fixed related bugs in the readFile method in the Ssh (Sftp) library.  
[\*] Optimized return values of Mysql/Redis libraries.  
[\*] Replaced the Redis core library with the redis library from LiteRT organization.  
[\*] Added end option to pipe method in the Sftp/Net/Fs libraries.  
[\*] Optimized related code for WebSocket interactive communication.  
[\*] Optimized output content size settings in the View library.  
[\*] Fixed file upload bugs.  
[\*] Fixed sync method in the Fs library.  
[\*] Changed github raw address to jsdelivr.

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