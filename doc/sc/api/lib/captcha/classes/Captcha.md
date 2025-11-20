[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/captcha](../index.md) / Captcha

# Class: Captcha

Defined in: [lib/captcha.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L13)

## Constructors

### Constructor

> **new Captcha**(`opt`): `Captcha`

Defined in: [lib/captcha.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L17)

#### Parameters

##### opt

###### height

`number`

###### length

`number`

###### width

`number`

#### Returns

`Captcha`

## Methods

### getBase64()

> **getBase64**(): `string`

Defined in: [lib/captcha.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L38)

获取 base64 格式图片

#### Returns

`string`

***

### getBuffer()

> **getBuffer**(): `string`

Defined in: [lib/captcha.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L31)

获取图片 Buffer

#### Returns

`string`

***

### getPhrase()

> **getPhrase**(): `string`

Defined in: [lib/captcha.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/captcha.ts#L45)

获取当前随机码

#### Returns

`string`
