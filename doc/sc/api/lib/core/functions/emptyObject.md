[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / emptyObject

# Function: emptyObject()

> **emptyObject**(`obj`, `deep`): `void`

Defined in: [lib/core.ts:409](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L409)

将对象的所有属性清除包括键，不会破坏引用关系，对象变量依然保证是引用状态

## Parameters

### obj

`Record`\<`string`, `any`\>

要清除的对象

### deep

`boolean` = `false`

也将子项都清空，如果子项有独立引用的话也要清空的话则要设置为 true

## Returns

`void`
