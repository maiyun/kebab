[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / updateCode

# Function: updateCode()

> **updateCode**(`sourcePath`, `path`, `hosts?`, `config?`, `strict?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:708](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L708)

上传并覆盖代码文件，config.json、kebab.json、.js.map、.ts, .gitignore 不会被覆盖和新创建

## Parameters

### sourcePath

`string`

zip 文件

### path

`string`

要更新的目标路径，无所谓是否 / 开头 / 结尾，是对方 kebab 的根据路径开始算起

### hosts?

局域网多机部署，不设置默认本机部署

`string`[] | `"config"`

### config?

`boolean` = `true`

是否自动更新 config 的 set.staticVer 为最新，默认更新

### strict?

`boolean` = `true`

严格模式，只有存在的文件才会被覆盖，不存在则中途直接报错，默认为 true

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>
