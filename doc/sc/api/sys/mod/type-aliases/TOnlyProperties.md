[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / TOnlyProperties

# Type Alias: TOnlyProperties\<T\>

> **TOnlyProperties**\<`T`\> = `{ [K in keyof T as T[K] extends (args: any[]) => any ? never : K]: T[K] }`

Defined in: [sys/mod.ts:14](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L14)

只获取变量

## Type Parameters

### T

`T`
