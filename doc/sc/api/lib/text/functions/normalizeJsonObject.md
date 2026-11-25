[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / normalizeJsonObject

# Function: normalizeJsonObject()

> **normalizeJsonObject**(`value`): `false` \| [`IJsonObject`](../interfaces/IJsonObject.md)

Defined in: [lib/text.ts:696](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L696)

复制严格 JSON 对象，统一各层对象的键序，保留数组元素顺序

## Parameters

### value

`unknown`

普通对象或无原型对象，各层只接受可枚举的自有字符串数据属性，数组须连续

## Returns

`false` \| [`IJsonObject`](../interfaces/IJsonObject.md)

无原型的对象副本；循环引用、非有限数字、访问器或其他非 JSON 值返回 false
