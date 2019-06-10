# Changelog

## Languages

[简体中文](./CHANGELOG.zh-CN.md) | [繁體中文](./CHANGELOG.zh-TW.md)

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