[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / compareVersion

# Function: compareVersion()

> **compareVersion**(`version`, `target`): `0` \| `1` \| `-1` \| `null`

Defined in: [lib/text.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L35)

逐段比较三段正式发行版本 X.Y.Z，不按字符串或浮点数比较

## Parameters

### version

`unknown`

待比较的版本

### target

`unknown`

目标版本

## Returns

`0` \| `1` \| `-1` \| `null`

小于返回 -1，等于返回 0，大于返回 1；任一版本无效时返回 null
