<p align="center"><img src="./doc/icon.svg" width="68" height="68" alt="Kebab"></p>
<p align="center">
    <a href="https://github.com/maiyun/kebab/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/kebab?color=blue" />
    </a>
    <a href="https://github.com/maiyun/kebab/releases">
        <img alt="GitHub releases" src="https://img.shields.io/github/v/release/maiyun/kebab?color=brightgreen&logo=github" />
        <img alt="GitHub pre-releases" src="https://img.shields.io/github/v/release/maiyun/kebab?color=yellow&logo=github&include_prereleases" />
    </a>
    <a href="https://github.com/maiyun/kebab/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/maiyun/kebab?color=blue&logo=github" />
    </a>
</p>

Simple, easy-to-use, and fully-featured Node.js framework that is ready-to-use out of the box.

## Languages

[简体中文](doc/README.sc.md) | [繁體中文](doc/README.tc.md)

## Requirement

Node 16+

## Installation

Download the latest release package, extract it, and start developing. To run the website, enable TypeScript compilation and execute `node ./index`.

## Library

Captcha, Consistent, Crypto, Db (MySQL), Dns (DNSPod, Alibaba Cloud), Fs, Kv (Redis), Net, Scan, Session, Sql, Ssh (Shell, Sftp), Text, Time, Ws, Zlib.

## Partial Features

### Ready-to-use

Following the principle of "ready-to-use", this package includes commonly used libraries in a unified style.

### Hot update

By calling the Core.sendRestart method, you can smoothly achieve alternating hot updates between old and new code without interrupting any existing business or connections.

### Multi-process support

Create a multi-process model based on the number of CPU cores to fully utilize the multi-core CPU.

### Global connection pool

If different sites in the same process connect to the same server, such as db, kv, etc., they share the same connection pool, maximizing efficiency and reducing overhead.

### Super Easy-to-use net Library

```typescript
const res = await lNet.open('https://xxx/test').post().data({ 'a': '1', 'b': '2' }).request();
```

It can also be used like this:

```typescript
const res = await lNet.get('https://xxx/test');
```

You can set custom parsing results:

```typescript
const res = await lNet.get('https://xxx/test', {
    'hosts': {
        'xxx': '111.111.111.111'
    }
});
```

You can also choose other local network cards to access:

```typescript
const res = await lNet.get('https://xxx/test', {
    'local': '123.123.123.123'
});
```

It also has a complete cookie manager, which can easily obtain and store cookies anywhere. When sending a request, the system will select the domain and path based on the cookie settings. If Set-Cookie has an illegal cross-domain setting, it will be discarded and not recorded, just like a real browser.

```typescript
const res1 = await lNet.get('https://xxx1.xxx/test1', { 'cookie': cookie });
const res2 = await lNet.get('https://xxx2.xxx/test2', { 'cookie': cookie });
```

> Note: The net library supports both options and open chain operations. For example, await lNet.open('xxx').follow().timeout(60).save(this._config.const.rootPath + 'doc/test.txt').request();

### Easy-to-Use Db Library

With a large number of useful interfaces, you can easily filter the data you need from the database:

```typescript
const ls = Order.where<Order>(this, db, {
    'state': '1'
}).by('id', 'DESC').page(10, 1);
const list = await ls.all();
const count = await ls.count();
const total = await ls.total();
```

Get a user:

```typescript
const user = await User.select<User>(this, db, ['id', 'user']).filter([
    ['time_add', '>=', '1583405134']
]).first();
```

### XSRF Detection

Use the _checkXInput method to perform XSRF detection and prevent malicious access.

### Scan Login

With the help of the Scan library, it's easy to implement scan login.

### Reverse Proxy

Achieve reverse proxy functionality effortlessly by utilizing the rproxy method from the net library, combined with route parameters.

#### There are more features waiting for you to explore

## Examples

### Creating a 16-bit random number

```typescript
let str: string = Core.random(16, Core.RANDOM_N)
```

### Creating a verification code

```typescript
Captcha.get(400, 100).getBuffer();
```

### Getting a list

```typescript
const userList = await User.where<User>(this, db, [
    ['state', '!=', '0'],
    {
        'type': ['1', '2', '3'],
        'is_lock': '0'
    }
]).all();
```

> Note: All database operations have been protected against injection attacks.

### Sql Library Automatically Adds Table Prefixes and Wrapping Characters "`"

```typescript
sql.select(['SUM(user.age) age'], 'order').leftJoin('user', {'order.user_id': lSql.column('user.id')});
```

The output will be:

```sql
SELECT SUM(`test_user`.`age`) AS `age` FROM `test_order` LEFT JOIN `test_user` ON `test_order`.`user_id` = `test_user`.`id`
```

It's so easy to write!

### Localization

```typescript
await this._loadLocale(this._get['lang'], 'test');
return this._l('copy');
```

Based on the different values of lang, the output will be: Copy, 复制, 複製, コピー, etc., configured in the /data/locale/ directory.

### Data Validation

Directly validate submitted data based on strings, numbers, comparisons, and even regular expressions. It's convenient!

```typescript
{
    'he': ['require', [0, 'The he param does not exist.']],
    'num': ['> 10', [0, 'The num param must > 10.']],
    'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
    'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']]
}
```

See: /test/ctr-checkinput

### Other Examples

You can visit /test/ to see more examples.

## Changelog

[Changelog](./doc/CHANGELOG.md)

## License

This library is published under [Apache-2.0](./LICENSE) license.