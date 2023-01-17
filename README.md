<p align="center"><img src="./doc/icon.svg" width="68" height="68" alt="Kebab"></p>

[![License](https://img.shields.io/github/license/maiyun/kebab.svg)](https://github.com/maiyun/kebab/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/maiyun/kebab.svg)](https://github.com/maiyun/kebab/issues)
[![GitHub Releases](https://img.shields.io/github/release/maiyun/kebab.svg)](https://github.com/maiyun/kebab/releases "Stable Release")
[![GitHub Pre-Releases](https://img.shields.io/github/release/maiyun/kebab/all.svg)](https://github.com/maiyun/kebab/releases "Pre-Release")

Simple, easy to use, full functionality of the Node.js framework.

## Languages

[简体中文](doc/README.sc.md) | [繁體中文](doc/README.tc.md)

## Requirement

Node 16+

## Installation

Download the latest release package, unzip it, and start developing. Start TypeScript compilation and execute `node ./index` to run the website.

## Library

Captcha, Consistent, Crypto, Db (MySQL), Dns (DNSPod, Alibaba Cloud), Fs, Kv (Redis), Net, Scan, Session, Sql, Ssh (Shell, Sftp), Text, Time, Ws, Zlib.

## Some features

### Ready to eat

Commonly used class libraries that encapsulate a unified style, easy to use!

### Hot update

By calling the Core.sendRestart method, you can smoothly implement alternate hot updates of old and new code without interrupting any existing services and connections.

### Multi-process support

Create a multi-process model based on the number of CPU cores to fully improve the utilization of multi-core CPUs.

### Global connection pool

If different sites in the same process are connected to the same Db, Kv, etc. server, they will share the same connection pool, maximizing efficiency and reducing overhead.

### Super easy to use Net library

```typescript
const res = await lNet.open('https://xxx/test').post().data({ 'a': '1', 'b': '2' }).request();
```

It can also be used like this:

```typescript
const res = await lNet.get('https://xxx/test');
```

Custom parsing results can be set:

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

It also has a complete cookie manager, which can easily obtain cookies and store them anywhere. When sending a request, the system will also choose to send according to the domain name and path set by the cookie, and if Set-Cookie has illegal cross-domain settings, it will also Discarded will not be logged, just like real browsers:

```typescript
const res1 = await lNet.get('https://xxx1.xxx/test1', { 'cookie': cookie });
const res2 = await lNet.get('https://xxx2.xxx/test2', { 'cookie': cookie });
```

### Useful Db library

With a large number of useful interfaces, you can easily filter out the required data from the database:

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

### XSRF detection

Using the checkXInput method, XSRF detection can be performed to prevent malicious access.

### Scan code to log in

With the help of the Scan library, the scan code login function can be easily realized.

#### There are more features waiting for you to explore

## Demo

### Generate a 16-bit random number

```typescript
let str: string = Core.random(16, Core.RANDOM_N)
```

### Generate verification code image

```typescript
Captcha.get(400, 100).getBuffer();
```

### Get a list

```typescript
const userList = await User.where<User>(this, db, [
    ['state', '!=', '0'],
    {
        'type': ['1', '2', '3'],
        'is_lock': '0'
    }
]).all();
```

### The Sql library automatically increases the table prefix and the wrapping character "`"

```typescript
ssql.select(['SUM(user.age) age'], 'order').leftJoin('user', {'order.user_id': '#user.id'});
```

Will output:

```sql
SELECT SUM(`test_user`.`age`) AS `age` FROM `test_order` LEFT JOIN `test_user` ON `test_order`.`user_id` = `test_user`.`id`
```

It's so easy!

### Localization

```typescript
await this._loadLocale(this._get['lang'], 'test');
return this._l('copy');
```

Depending on the value of lang, it will output: Copy、复制、複製、コピー, etc., configured in the site directory /data/locale/.

### Data validation

According to the string, number, comparison size and even regularity, it is convenient to directly verify the submitted data!

```typescript
{
    'he': ['require', [0, 'The he param does not exist.']],
    'num': ['> 10', [0, 'The num param must > 10.']],
    'reg': ['/^[A-CX-Z5-7]+$/', [0, 'The reg param is incorrect.']],
    'arr': [['a', 'x', 'hehe'], [0, 'The arr param is incorrect.']]
}
```

See: /test/ctr-checkinput

### Other demos

You can visit /test/ to see more examples.

## Changelog

[Changelog](./doc/CHANGELOG.md)

## License

This library is published under [Apache-2.0](./LICENSE) license.