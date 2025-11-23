[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/dns](../index.md) / Dns

# Class: Dns

Defined in: [lib/dns.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L101)

## Constructors

### Constructor

> **new Dns**(`ctr`, `opt`): `Dns`

Defined in: [lib/dns.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L106)

#### Parameters

##### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

##### opt

[`IOptions`](../interfaces/IOptions.md)

#### Returns

`Dns`

## Methods

### addDomainRecord()

> **addDomainRecord**(`opt`): `Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

Defined in: [lib/dns.ts:224](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L224)

添加记录

#### Parameters

##### opt

参数

###### domain

`string`

###### line?

[`ERECORDLINE`](../enumerations/ERECORDLINE.md)

###### mx?

`number`

###### sub

`string`

###### ttl?

`number`

###### type

`string`

###### value

`string`

#### Returns

`Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

***

### deleteDomainRecord()

> **deleteDomainRecord**(`opt`): `Promise`\<\{ `success`: `boolean`; \} \| `null`\>

Defined in: [lib/dns.ts:359](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L359)

删除记录

#### Parameters

##### opt

参数

###### domain

`string`

###### id

`string`

#### Returns

`Promise`\<\{ `success`: `boolean`; \} \| `null`\>

***

### getDomainList()

> **getDomainList**(`opt`): `Promise`\<[`IDomainList`](../interfaces/IDomainList.md) \| `null`\>

Defined in: [lib/dns.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L158)

获取域名列表

#### Parameters

##### opt

参数

###### length?

`number`

###### offset?

`number`

#### Returns

`Promise`\<[`IDomainList`](../interfaces/IDomainList.md) \| `null`\>

***

### updateDomainRecord()

> **updateDomainRecord**(`opt`): `Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>

Defined in: [lib/dns.ts:290](https://github.com/maiyunnet/kebab/blob/master/lib/dns.ts#L290)

修改记录

#### Parameters

##### opt

参数

###### domain

`string`

###### line?

[`ERECORDLINE`](../enumerations/ERECORDLINE.md)

###### mx?

`number`

###### record

`string`

###### sub

`string`

###### ttl?

`number`

###### type

`string`

###### value

`string`

#### Returns

`Promise`\<[`IAddDomainRecord`](../interfaces/IAddDomainRecord.md) \| `null`\>
