[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataError

# Interface: IFormDataError

Defined in: [sys/route.ts:1047](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1047)

multipart 解析首次失败的安全诊断，不包含临时路径或异常对象

## Properties

### code

> **code**: `"INVALID_BOUNDARY"` \| `"FILE_TOO_LARGE"` \| `"TOTAL_TOO_LARGE"` \| `"FIELD_TOO_LARGE"` \| `"HEADER_TOO_LARGE"` \| `"TOO_MANY_PARTS"` \| `"FILE_TYPE"` \| `"TIMEOUT"` \| `"TEMP_FILE_ERROR"` \| `"REQUEST_ERROR"` \| `"REQUEST_ABORTED"`

Defined in: [sys/route.ts:1048](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1048)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [sys/route.ts:1052](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1052)

触发的限制值；大小按字节，超时按毫秒，段数按个
