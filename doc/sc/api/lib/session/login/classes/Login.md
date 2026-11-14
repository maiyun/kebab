[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/session/login](../index.md) / Login

# Class: Login

Defined in: [lib/session/login.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L63)

管理一个账号在多个客户端的登录授权
基于单节点 Redis；不会修改 Session 数据或 Cookie。业务每次请求须验证账号、权限和授权版本。
失败返回 false；通信失败不能证明写操作未执行，调用方应重新读取后判断。

## Constructors

### Constructor

> **new Login**(`kv`, `ctrToken`, `options?`): `Login`

Defined in: [lib/session/login.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L77)

创建可复用的登录管理器

#### Parameters

##### kv

[`Kv`](../../../kv/classes/Kv.md)

项目 Kv，自动使用其配置前缀

##### ctrToken

`string` \| [`Ctr`](../../../../sys/ctr/classes/Ctr.md)

已初始化 Session 的控制器或服务端验证过的 Session token；未初始化时操作返回 false

##### options?

[`ILoginOptions`](../interfaces/ILoginOptions.md) = `{}`

命名空间和有效期；无效选项使操作返回 false

#### Returns

`Login`

## Methods

### create()

> **create**(`identity`, `options?`): `Promise`\<`false` \| [`ILoginRecord`](../interfaces/ILoginRecord.md)\>

Defined in: [lib/session/login.ts:97](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L97)

创建登录授权并替换同一凭据原来绑定的身份
每次创建生成新 UID，包括同一账号在同一 Session 重复登录；旧 UID 随即失效。
single 开启时，同账号同作用域以最后执行成功的创建为准；所有登录入口须采用同一策略。

#### Parameters

##### identity

[`ILoginIdentity`](../interfaces/ILoginIdentity.md)

已由业务验证的账号和附加信息

##### options?

[`ILoginCreateOptions`](../interfaces/ILoginCreateOptions.md) = `{}`

是否仅保留本次登录

#### Returns

`Promise`\<`false` \| [`ILoginRecord`](../interfaces/ILoginRecord.md)\>

新授权；输入无效或存储失败返回 false

***

### get()

> **get**(): `Promise`\<`false` \| [`ILoginRecord`](../interfaces/ILoginRecord.md) \| `null`\>

Defined in: [lib/session/login.ts:105](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L105)

读取凭据当前绑定的登录授权，不延长有效期

#### Returns

`Promise`\<`false` \| [`ILoginRecord`](../interfaces/ILoginRecord.md) \| `null`\>

登录记录；null 表示未登录或已失效，false 表示输入无效或存储失败

***

### list()

> **list**(`uid`): `Promise`\<`false` \| [`IListLogin`](../interfaces/IListLogin.md)[] \| `null`\>

Defined in: [lib/session/login.ts:133](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L133)

列出当前账号、作用域及授权版本一致的有效登录
返回登录附加信息，业务响应前须筛选可展示字段；适合交互式账号的登录列表，不用于全站会话统计。

#### Parameters

##### uid

`string`

get 返回的当前登录 UID

#### Returns

`Promise`\<`false` \| [`IListLogin`](../interfaces/IListLogin.md)[] \| `null`\>

登录列表；null 当前登录失效或被替换，false 输入无效或存储失败

***

### remove()

> **remove**(`uid`): `Promise`\<`boolean` \| `null`\>

Defined in: [lib/session/login.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L123)

退出凭据仍绑定的指定登录，保留 Session 本身

#### Parameters

##### uid

`string`

get 返回的登录 UID

#### Returns

`Promise`\<`boolean` \| `null`\>

true 已退出，null 已失效或被替换，false 输入无效或存储失败

***

### revoke()

> **revoke**(`uid`, `target?`): `Promise`\<`boolean` \| `null`\>

Defined in: [lib/session/login.ts:144](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L144)

清退当前账号和作用域内的指定登录或其他全部登录
清退覆盖所有授权版本；可指定当前登录，不能撤销其他账号或作用域的登录。

#### Parameters

##### uid

`string`

get 返回的当前登录 UID

##### target?

`string` = `'others'`

目标登录 UID，默认 others 表示除当前登录以外的全部登录

#### Returns

`Promise`\<`boolean` \| `null`\>

true 已清退，null 当前或目标登录失效，false 输入无效或存储失败

***

### touch()

> **touch**(`uid`): `Promise`\<`boolean` \| `null`\>

Defined in: [lib/session/login.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/session/login.ts#L114)

延长仍与本次请求读取的登录 UID 匹配的授权

#### Parameters

##### uid

`string`

get 返回的登录 UID

#### Returns

`Promise`\<`boolean` \| `null`\>

true 成功，null 已失效或被替换，false 输入无效或存储失败
