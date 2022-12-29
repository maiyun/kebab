# Nuttom

[![License](https://img.shields.io/github/license/maiyun/kebab.svg)](https://github.com/maiyun/kebab/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/maiyun/kebab.svg)](https://github.com/maiyun/kebab/issues)
[![GitHub Releases](https://img.shields.io/github/release/maiyun/kebab.svg)](https://github.com/maiyun/kebab/releases "Stable Release")
[![GitHub Pre-Releases](https://img.shields.io/github/release/maiyun/kebab/all.svg)](https://github.com/maiyun/kebab/releases "Pre-Release")

Simple, easy to use, full functionality of the Node.js framework.

## Languages

[简体中文](doc/README.sc.md) | [繁體中文](doc/README.tc.md)

## Installation

Download the latest release and put it to directory, then to start development.

## Environment

Node 16+

## Library

Captcha, Crypto (md5, sha1, aes...), Fs, Mysql, Net (http2, https and http auto selection), Redis, Session, Sql, Ssh (Shell, Sftp), Sys, Text, Time, View, WebSocket, Zlib.

## Features

### No brains

Based on the idea of not using the brain, the commonly used and uniform style of the library has been encapsulated.

### Hot update

By calling the Sys.restart method, you can smooth the implementation of hot updates without interrupting any existing business and connections.

### Multi-process

Create a multi-process model based on the number of CPUS to fully improve CPU utilization.

### Global Connection Pool

Different sites within the same process if connected to the same MYSQL, Redis, etc., then share a connection pool, maximize efficiency and reduce overhead.

### UI Console

A console that contains a UI interface that automatically pairs the latest version of Nuttom to detect which files have been modified or need to be upgraded.

### Net Library contains full Cookie implementation

Cookies can be obtained directly as an array of variables, which can exist anywhere, such as databases, memory, and so on.

#### And more...

## Demonstrate

### Generate 16-bit random numbers

```typescript
let str: string = Text.random(16, Text.RANDOM_N)
```

### Generate a verification code picture

```typescript
Captcha.get(400, 100).output(nu);
```

### Sql

```typescript
let s = sql.update("user", [["age", "+", "1"], {"name": "Serene"}]).where([{"name": "Ah"}]);
```

> UPDATE mu_user SET \`age\` = \`age\` + '1', \`name\` = 'Serene' WHERE \`name\` = 'Ah'

## Other demos

You can download and view the code (back/sources/www/default/ctr/test.ts) to see more examples.

## Changelog

[Changelog](doc/CHANGELOG.md)

## License

This library is published under [Apache-2.0](./LICENSE) license.

## Name meaning

Mirror image of Mutton.