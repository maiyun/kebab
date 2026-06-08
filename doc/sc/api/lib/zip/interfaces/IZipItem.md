[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zip](../index.md) / IZipItem

# Interface: IZipItem

Defined in: [lib/zip.ts:443](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L443)

## Properties

### compressedSize

> **compressedSize**: `number`

Defined in: [lib/zip.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L446)

***

### date

> **date**: `Date`

Defined in: [lib/zip.ts:448](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L448)

***

### isDirectory

> **isDirectory**: `boolean`

Defined in: [lib/zip.ts:450](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L450)

***

### isFile

> **isFile**: `boolean`

Defined in: [lib/zip.ts:449](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L449)

***

### name

> **name**: `string`

Defined in: [lib/zip.ts:445](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L445)

文件/目录名（不含路径，不含前后斜杠）

***

### path

> **path**: `string`

Defined in: [lib/zip.ts:452](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L452)

父目录路径（以 / 开头和结尾，如 /stc/ 或根目录 /），完整路径 = path + name

***

### uncompressedSize

> **uncompressedSize**: `number`

Defined in: [lib/zip.ts:447](https://github.com/maiyunnet/kebab/blob/master/lib/zip.ts#L447)
