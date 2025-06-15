/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-19
 * Last: 2022-09-12 20:58:07, 2024-2-21 17:55:54, 2025-6-13 19:08:56
 */

// --- 库和定义 ---
import * as net from '~/lib/net';
import * as core from '~/lib/core';
import * as text from '~/lib/text';
import * as crypto from '~/lib/crypto';
import * as response from '~/lib/net/response';
import * as ctr from '~/sys/ctr';

/**
 * 0.DNSPod：https://www.dnspod.cn/docs/index.html（腾讯云也请使用 DNSPod 的 API）
 * 1.阿里云：https://help.aliyun.com/document_detail/29745.html
 */

/** --- 服务商定义 --- */
export enum ESERVICE {
    'DNSPOD',
    'ALIBABA'
}

/** --- 选项 --- */
export interface IOptions {
    /** --- 服务商 ---- */
    'service': ESERVICE;
    /** --- 密钥键 --- */
    'secretId'?: string;
    /** --- 密钥值 --- */
    'secretKey'?: string;
}

/**
 * --- 获取域名列表的返回对象 ---
 */
export interface IDomainList {
    'total': number;
    'list': Array<{
        'id': string;
        'name': string;
        'count': number;
        'punyCode': string;
    }>;
}

/**
 * --- 添加记录的返回对象 ---
 */
export interface IAddDomainRecord {
    'success': boolean;
    'id': string;
}

/**
 * --- 记录值类型 ---
 */
export const RECORD_TYPE = {
    'A': 'A',
    'NS': 'NS',
    'MX': 'MX',
    'TXT': 'TXT',
    'CNAME': 'CNAME',
    'SRV': 'SRV',
    'AAAA': 'AAAA'
};

/**
 * --- 记录值线路 ---
 */
export enum ERecordLine {
    'DEFAULT',
    'TELECOM',
    'UNICOM',
    'MOBILE',
    'EDU',
    'OVERSEA'
}

const recordLine = {
    [ESERVICE.DNSPOD]: [
        '默认',
        '电信',
        '联通',
        '移动',
        '教育网',
        '境外'
    ],
    [ESERVICE.ALIBABA]: [
        'default',
        'telecom',
        'unicom',
        'mobile',
        'edu',
        'oversea'
    ]
};

export class Dns {

    /** --- 当前选项 --- */
    private readonly _opt: IOptions;

    public constructor(ctr: ctr.Ctr, opt: IOptions) {
        const config = ctr.getPrototype('_config');
        opt.secretId ??= config.dns?.[ESERVICE[opt.service]].sid;
        opt.secretKey ??= config.dns?.[ESERVICE[opt.service]].skey;
        this._opt = opt;
    }

    /**
     * --- 最终发送 ---
     * @param obj 要发送的信息
     */
    private async _send(obj: Record<string, string | number | undefined>): Promise<response.Response> {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
        }
        switch (this._opt.service) {
            // --- DNSPod ---
            case ESERVICE.DNSPOD: {
                const data = Object.assign({
                    'login_token': (this._opt.secretId ?? '') + '.' + (this._opt.secretKey ?? ''),
                    'format': 'json'
                }, obj);
                const path = data['_path'] as string;
                delete data['_path'];
                return net.post('https://dnsapi.cn/' + path, data); // 境外 api 会自动调度到香港服务器
            }
            // --- 阿里云 ---
            case ESERVICE.ALIBABA: {
                const getData = core.objectSort(Object.assign({
                    'Format': 'JSON',
                    'Version': '2015-01-09',
                    'AccessKeyId': this._opt.secretId,
                    'SignatureMethod': 'HMAC-SHA1',
                    'Timestamp': (new Date()).toISOString(),
                    'SignatureVersion': '1.0',
                    'SignatureNonce': core.rand(1000000000, 9999999999)
                }, obj));
                const urlRight = text.queryStringify(getData);
                const signature = crypto.hashHmac('sha1', `GET&${encodeURIComponent('/')}&${encodeURIComponent(urlRight)}`, (this._opt.secretKey ?? '') + '&', 'base64');
                return net.get(`https://alidns.aliyuncs.com/?${urlRight}&Signature=${encodeURIComponent(signature)}`); // 境外 api 会自动调度到新加坡服务器
            }
        }
        return new response.Response(null);
    }

    /**
     * --- 获取域名列表 ---
     * @param opt 参数
     */
    public async getDomainList(opt: {
        'offset'?: number;
        'length'?: number;
    }): Promise<IDomainList | null> {
        switch (this._opt.service) {
            // --- DNSPod ---
            case ESERVICE.DNSPOD: {
                const rtn = await this._send({
                    '_path': 'Domain.List',
                    'offset': opt.offset ?? 0,
                    'length': opt.length ?? 20
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IDomainList = {
                    'total': json.info.domain_total,
                    'list': []
                };
                for (const item of json.domains) {
                    r.list.push({
                        'id': item.id.toString(),
                        'name': item.name,
                        'count': parseInt(item.records),
                        'punyCode': item.punycode
                    });
                }
                return r;
            }
            // --- 阿里云 ---
            case ESERVICE.ALIBABA: {
                const length = opt.length ?? 20;
                const rtn = await this._send({
                    'Action': 'DescribeDomains',
                    'PageNumber': opt.offset !== undefined ? opt.offset / length + 1 : 1,
                    'PageSize': length
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IDomainList = {
                    'total': json.TotalCount,
                    'list': []
                };
                for (const item of json.Domains.Domain) {
                    r.list.push({
                        'id': item.DomainId,
                        'name': item.DomainName,
                        'count': item.RecordCount,
                        'punyCode': item.PunyCode
                    });
                }
                return r;
            }
        }
        return null;
    }

    /**
     * --- 添加记录 ---
     * @param opt 参数
     */
    public async addDomainRecord(opt: {
        'domain': string;
        'sub': string;
        'type': string;
        'value': string;
        'line'?: number;
        'ttl'?: number;
        'mx'?: number;
    }): Promise<IAddDomainRecord | null> {
        const line = opt.line ?? ERecordLine.DEFAULT;
        const ttl = opt.ttl ?? 600;
        switch (this._opt.service) {
            // --- DNSPod ---
            case ESERVICE.DNSPOD: {
                const rtn = await this._send({
                    '_path': 'Record.Create',
                    'domain': opt.domain,
                    'sub_domain': opt.sub,
                    'record_type': opt.type,
                    'record_line': recordLine[ESERVICE.DNSPOD][line],
                    'value': opt.value,
                    'ttl': ttl,
                    'mx': opt.mx
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IAddDomainRecord = {
                    'success': json.record?.id ? true : false,
                    'id': json.record?.id ?? ''
                };
                return r;
            }
            // --- 阿里云 ---
            case ESERVICE.ALIBABA: {
                const rtn = await this._send({
                    'Action': 'AddDomainRecord',
                    'DomainName': opt.domain,
                    'RR': opt.sub,
                    'Type': opt.type,
                    'Line': recordLine[ESERVICE.ALIBABA][line],
                    'Value': opt.value,
                    'TTL': ttl,
                    'Priority': opt.mx
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IAddDomainRecord = {
                    'success': json.RecordId !== undefined ? true : false,
                    'id': json.RecordId ?? ''
                };
                return r;
            }
        }
        return null;
    }

    /**
     * --- 修改记录 ---
     * @param opt 参数
     */
    public async updateDomainRecord(opt: {
        'domain': string;
        'record': string;
        'sub': string;
        'type': string;
        'value': string;
        'line'?: number;
        'ttl'?: number;
        'mx'?: number;
    }): Promise<IAddDomainRecord | null> {
        const line = opt.line ?? ERecordLine.DEFAULT;
        const ttl = opt.ttl ?? 600;
        switch (this._opt.service) {
            // --- DNSPod ---
            case ESERVICE.DNSPOD: {
                // --- DNSPod 必须传 domain ---
                const rtn = await this._send({
                    '_path': 'Record.Modify',
                    'domain': opt.domain,
                    'record_id': opt.record,
                    'sub_domain': opt.sub,
                    'record_type': opt.type,
                    'record_line': recordLine[ESERVICE.DNSPOD][line],
                    'value': opt.value,
                    'ttl': ttl,
                    'mx': opt.mx
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IAddDomainRecord = {
                    'success': json.record?.id ? true : false,
                    'id': json.record?.id ?? ''
                };
                return r;
            }
            // --- 阿里云 ---
            case ESERVICE.ALIBABA: {
                const rtn = await this._send({
                    'Action': 'UpdateDomainRecord',
                    'RecordId': opt.record,
                    'RR': opt.sub,
                    'Type': opt.type,
                    'Line': recordLine[ESERVICE.ALIBABA][line],
                    'Value': opt.value,
                    'TTL': ttl,
                    'Priority': opt.mx
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                const r: IAddDomainRecord = {
                    'success': json.RecordId !== undefined ? true : false,
                    'id': json.RecordId ?? ''
                };
                return r;
            }
        }
        return null;
    }

    /**
     * --- 删除记录 ---
     * @param opt 参数
     */
    public async deleteDomainRecord(opt: {
        'domain': string;
        'id': string;
    }): Promise<{ 'success': boolean; } | null> {
        switch (this._opt.service) {
            // --- DNSPod ---
            case ESERVICE.DNSPOD: {
                const rtn = await this._send({
                    '_path': 'Record.Remove',
                    'domain': opt.domain,
                    'record_id': opt.id
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                return {
                    'success': json.status.code === '1' ? true : false
                };
            }
            // --- 阿里云 ---
            case ESERVICE.ALIBABA: {
                const rtn = await this._send({
                    'Action': 'DeleteDomainRecord',
                    'RecordId': opt.id
                });
                const res = await rtn.getContent();
                if (!res) {
                    return res;
                }
                const json = text.parseJson(res.toString());
                return {
                    'success': json.Code === undefined ? true : false
                };
            }
        }
        return null;
    }
}

/**
 * --- 创建一个第三方 Dns 对象 ---
 * @param opt 选项
 */
export function get(ctr: ctr.Ctr, opt: IOptions): Dns {
    return new Dns(ctr, opt);
}
