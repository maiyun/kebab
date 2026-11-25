[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / IFormDataError

# Interface: IFormDataError

Defined in: [sys/route.ts:1101](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1101)

解析上传数据时的失败原因，只提供错误码和限制值，不带临时路径或异常对象

## Properties

### code

> **code**: `"TIMEOUT"` \| `"INVALID_BOUNDARY"` \| `"FILE_TOO_LARGE"` \| `"TOTAL_TOO_LARGE"` \| `"FIELD_TOO_LARGE"` \| `"HEADER_TOO_LARGE"` \| `"TOO_MANY_PARTS"` \| `"FILE_TYPE"` \| `"TEMP_FILE_ERROR"` \| `"REQUEST_ERROR"` \| `"REQUEST_ABORTED"`

Defined in: [sys/route.ts:1102](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1102)

***

### limit?

> `optional` **limit?**: `number`

Defined in: [sys/route.ts:1106](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L1106)

超出的限制值：大小用字节，超时用毫秒，字段和文件数量用个
