/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2020-4-9 20:02:39
 * Last: 2020-4-9 20:47:58, 2022-09-10 01:35:34
 */
import * as stream from 'stream';
import * as net from '~/lib/net.js';
import * as response from './response.js';
import * as types from '~/types/index.js';

export class Request {

    /** --- get 或 post 的数据 --- */
    private _data: Record<string, any> | Buffer | string | stream.Readable | undefined = undefined;

    /** --- 访问的 URL --- */
    private readonly _url: string = '';

    /** --- 要传递的参数 --- */
    private _opt: net.IRequestOptions = {};

    public constructor(url: string) {
        this._url = url;
    }

    /**
     * --- 设置 get 或 post 的数据 ---
     * @param data 数据
     */
    public data(data: Record<string, any> | Buffer | string | stream.Readable): this {
        this._data = data;
        return this;
    }

    /**
     * --- 设置 get 或 post 请求 ---
     * @param method
     */
    public method(method: 'GET' | 'POST'): this {
        this._opt['method'] = method;
        return this;
    }

    /**
     * --- method get 方法别名 ---
     */
    public get(): this {
        return this.method('GET');
    }

    /**
     * --- method post 方法别名 ---
     */
    public post(): this {
        return this.method('POST');
    }

    /**
     * --- 设置提交模式，json 还是普通 form ---
     * @param type
     */
    public type(type: 'form' | 'json'): this {
        this._opt['type'] = type;
        return this;
    }

    /**
     * --- type json 方法别名 ---
     */
    public json(): this {
        return this.type('json');
    }

    /**
     * --- 设置请求有效期 ---
     * @param timeout 秒
     */
    public timeout(timeout: number): this {
        this._opt['timeout'] = timeout;
        return this;
    }

    /**
     * --- 设置是否跟随请求方的 location，留空为跟随，不设置为不跟随 ---
     * @param follow
     */
    public follow(follow: number = 5): this {
        this._opt['follow'] = follow;
        return this;
    }

    /**
     * --- 设置域名 -> ip的对应键值，就像电脑里的 hosts 一样 ---
     * @param hosts
     */
    public hosts(hosts: Record<string, string>): this {
        this._opt['hosts'] = hosts;
        return this;
    }

    /**
     * --- 设置后将直接保存到本地文件，不会返回，save 为本地实体路径 ---
     * @param save
     */
    public save(save: string): this {
        this._opt['save'] = save;
        return this;
    }

    /**
     * --- 设置使用的本地网卡 IP ---
     * @param addr
     */
    public local(addr: string): this {
        this._opt['local'] = addr;
        return this;
    }

    /**
     * --- 批量设置提交的 headers ---
     * @param headers
     */
    public headers(headers: types.THttpHeaders): this {
        this._opt['headers'] = headers;
        return this;
    }

    /**
     * --- 设置单条 header ---
     * @param name
     * @param val
     */
    public setHeader(name: string, val: string): this {
        this._opt['headers'] ??= {};
        this._opt['headers'][name] = val;
        return this;
    }

    /**
     * --- 发起请求 ---
     * @param cookie
     */
    public async request(cookie?: Record<string, types.ICookie>): Promise<response.Response> {
        this._opt.cookie = cookie;
        return net.request(this._url, this._data, this._opt);
    }

}
