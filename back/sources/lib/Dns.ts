import * as querystring from "querystring";
// --- 库和定义 ---
import * as Net from "./Net";
import * as Sys from "./Sys";
import * as Time from "./Time";
import * as Text from "./Text";
import * as Crypto from "./Crypto";

/**
 * 0.腾讯云：https://cloud.tencent.com/document/api/302/4031
 * 1.阿里云：https://help.aliyun.com/document_detail/29740.html
 */

/** 供应商定义 */
export const SUPPLIER = {
    TENCENTCLOUD: 0,
    ALIBABACLOUD: 1
};

/** 选项 */
export interface Options {
    /** 供应商 */
    supplier: number;
    secretId: string;
    secretKey: string;
    region?: string;
}

/**
 * --- 获取域名列表的返回对象 ---
 */
export interface DomainListObject {
    "total": number;
    "list": {
        "id": string;
        "name": string;
        "count": number;
        "punyCode": string;
    }[];
}

/**
 * --- 添加记录的返回对象 ---
 */
export interface AddDomainRecordObject {
    "success": boolean;
    "id": string;
}

/**
 * --- 记录值类型 ---
 */
export const RecordType = {
    "A": "A",
    "NS": "NS",
    "MX": "MX",
    "TXT": "TXT",
    "CNAME": "CNAME",
    "SRV": "SRV",
    "AAAA": "AAAA"
};

/**
 * --- 记录值线路 ---
 */
export enum RecordLine {
    "default",
    "telecom",
    "unicom",
    "mobile",
    "oversea",
    "edu"
}
const _RecordLine = {
    [SUPPLIER.TENCENTCLOUD]: [
        "默认",
        "电信",
        "联通",
        "移动",
        "境外",
        "教育网"
    ],
    [SUPPLIER.ALIBABACLOUD]: [
        "default",
        "telecom",
        "unicom",
        "mobile",
        "oversea",
        "edu"
    ]
};

export class Dns {
    private _opt!: Options;
    constructor(opt: Options) {
        this._opt = opt;
    }

    private async _send(obj: any) {
        for (let key in obj) {
            if (!obj[key]) {
                delete(obj[key]);
            }
        }
        let url = "";
        switch (this._opt.supplier) {
            // --- 腾讯云 ---
            case SUPPLIER.TENCENTCLOUD: {
                let stamp = Time.stamp();
                let getData = Sys.objectSort(Object.assign({
                    "SecretId": this._opt.secretId,
                    "Region": this._opt.region || "",
                    "Timestamp": stamp,
                    "Nonce": Text.rand(10000, 99999),
                    "SignatureMethod": "HmacSHA256"
                }, obj));
                // --- 对腾讯云的 key 下划线必须替换为 . 做处理 ---
                let sigData: string[] = [];
                for (let key in getData) {
                    if (getData[key] === undefined) {
                        continue;
                    }
                    sigData.push(key.replace(/_/g, ".") + "=" + getData[key]);
                }
                let urlRight = `cns.api.qcloud.com/v2/index.php?`;
                let signature = Crypto.hmacSha256(`GET${urlRight + sigData.join("&")}`, this._opt.secretKey, {format: "base64"});
                url = `https://${urlRight + querystring.stringify(getData)}&Signature=${encodeURIComponent(signature)}`;
                break;
            }
            // --- 阿里云 ---
            case SUPPLIER.ALIBABACLOUD: {
                let getData = Sys.objectSort(Object.assign({
                    "Format": "JSON",
                    "Version": "2015-01-09",
                    "AccessKeyId": this._opt.secretId,
                    "SignatureMethod": "HMAC-SHA1",
                    "Timestamp": (new Date()).toISOString(),
                    "SignatureVersion": "1.0",
                    "SignatureNonce": Text.rand(1000000000, 9999999999)
                }, obj));
                let urlRight = querystring.stringify(getData);
                let signature = Crypto.hmacSha1(`GET&${encodeURIComponent("/")}&${encodeURIComponent(urlRight)}`, this._opt.secretKey + "&", {format: "base64"});
                url = `https://alidns.aliyuncs.com/?${urlRight}&Signature=${encodeURIComponent(signature)}`;
                break;
            }
        }
        return await Net.get(url);
    }

    /**
     * --- 获取域名列表 ---
     * @param opt 参数
     */
    public async getDomainList(opt: {
        offset?: number;
        length?: number;
    }): Promise<DomainListObject | undefined> {
        switch (this._opt.supplier) {
            // --- 腾讯云 ---
            case SUPPLIER.TENCENTCLOUD: {
                let rtn = await this._send({
                    "Action": "DomainList",
                    "offset": opt.offset || 0,
                    "length": opt.length || 20
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                let r: DomainListObject = {
                    "total": json.data.info.domain_total,
                    "list": []
                };
                for (let item of json.data.domains) {
                    r.list.push({
                        "id": item.id.toString(),
                        "name": item.name,
                        "count": parseInt(item.records),
                        "punyCode": item.punycode
                    });
                }
                return r;
            }
            // --- 阿里云 ---
            case SUPPLIER.ALIBABACLOUD: {
                let length = opt.length || 20;
                let rtn = await this._send({
                    "Action": "DescribeDomains",
                    "PageNumber": opt.offset !== undefined ? opt.offset / length + 1 : 1,
                    "PageSize": length
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                let r: DomainListObject = {
                    "total": json.TotalCount,
                    "list": []
                };
                for (let item of json.Domains.Domain) {
                    r.list.push({
                        "id": item.DomainId,
                        "name": item.DomainName,
                        "count": item.RecordCount,
                        "punyCode": item.PunyCode
                    });
                }
                return r;
            }
        }
    }

    /**
     * --- 添加记录 ---
     * @param opt 参数
     */
    public async addDomainRecord(opt: {
        domain: string,
        sub: string;
        type: string;
        value: string,
        line?: number;
        ttl?: number;
        mx?: number;
    }) {
        let line = opt.line || RecordLine.default;
        let ttl = opt.ttl || 600;
        switch (this._opt.supplier) {
            // --- 腾讯云 ---
            case SUPPLIER.TENCENTCLOUD: {
                let rtn = await this._send({
                    "Action": "RecordCreate",
                    "domain": opt.domain,
                    "subDomain": opt.sub,
                    "recordType": opt.type,
                    "recordLine": _RecordLine[SUPPLIER.TENCENTCLOUD][line],
                    "value": opt.value,
                    "ttl": ttl,
                    "mx": opt.mx
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                let r: AddDomainRecordObject = {
                    "success": json.data && json.data.record.id ? true : false,
                    "id": json.data && json.data.record.id || ""
                };
                return r;
            }
            // --- 阿里云 ---
            case SUPPLIER.ALIBABACLOUD: {
                let rtn = await this._send({
                    "Action": "AddDomainRecord",
                    "DomainName": opt.domain,
                    "RR": opt.sub,
                    "Type": opt.type,
                    "Line": _RecordLine[SUPPLIER.ALIBABACLOUD][line],
                    "Value": opt.value,
                    "TTL": ttl,
                    "Priority": opt.mx
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                let r: AddDomainRecordObject = {
                    "success": json.RecordId !== undefined ? true : false,
                    "id": json.RecordId || ""
                };
                return r;
            }
        }
    }

    /**
     * --- 删除记录 ---
     * @param opt 参数
     */
    public async deleteDomainRecord(opt: {
        domain: string;
        id: string;
    }) {
        switch (this._opt.supplier) {
            // --- 腾讯云 ---
            case SUPPLIER.TENCENTCLOUD: {
                let rtn = await this._send({
                    "Action": "RecordDelete",
                    "domain": opt.domain,
                    "recordId": opt.id
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                return {
                    "success": json.code === 0 ? true : false
                };
            }
            // --- 阿里云 ---
            case SUPPLIER.ALIBABACLOUD: {
                let rtn = await this._send({
                    "Action": "DeleteDomainRecord",
                    "RecordId": opt.id
                });
                if (!rtn) {
                    return undefined;
                }
                let json = JSON.parse((await rtn.readContent()).toString());
                return {
                    "success": json.Code === undefined ? true : false
                };
            }
        }
    }
}

/**
 * --- 创建一个供应商 Dns 对象 ---
 * @param opt 选项
 */
export function get(opt: Options) {
    return new Dns(opt);
}