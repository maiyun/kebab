/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-6-11
 * Last: 2025-6-11 21:50:31
 */
// --- 第三方 ---
import * as tcc from 'tencentcloud-sdk-nodejs';
// --- 库和定义 ---
import * as lUndici from '#kebab/lib/undici.js';
import * as lText from '#kebab/lib/text.js';
import * as sCtr from '#kebab/sys/ctr.js';

/**
 * 0. CloudFlare：https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 * 1. 腾讯云：https://cloud.tencent.com/document/product/1110/36926
 */

/** --- 厂家 --- */
export enum EFACTORY {
    'CLOUDFLARE',
    'TENCENT',
}

/**
 * --- 校验人机验证令牌 ---
 * @param ctr 控制器实例
 * @param opt 厂家、前端令牌与客户端 IP
 * @returns 是否通过验证
 */
export async function verify(ctr: sCtr.Ctr, opt: {
    'factory': EFACTORY;
    'token': string;
    'ip': string;
}): Promise<boolean> {
    const config = ctr.getPrototype('_config');
    switch (opt.factory) {
        case EFACTORY.CLOUDFLARE: {
            // --- CloudFlare 验证 ---
            const res = await lUndici.postJson('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                'secret': config.turnstile['CF'].skey,
                'response': opt.token,
                'remoteip': opt.ip,
            });
            const content = await res.getContent();
            if (!content) {
                return false;
            }
            const json = lText.parseJson<{ 'success'?: boolean; }>(content.toString());
            if (!json) {
                return false;
            }
            return !!json.success;
        }
        case EFACTORY.TENCENT: {
            // --- 腾讯云验证 ---
            const client = new tcc.captcha.v20190722.Client({
                'credential': {
                    'secretId': config.turnstile['TENCENT'].sid,
                    'secretKey': config.turnstile['TENCENT'].skey,
                },
                'profile': {
                    'signMethod': 'HmacSHA256',
                    'httpProfile': {
                        'reqMethod': 'POST',
                        'reqTimeout': 30,
                    },
                },
            });
            const io = opt.token.indexOf('|');
            if (io === -1) {
                return false;
            }
            const res = await client.DescribeCaptchaResult({
                'CaptchaType': 9,
                'Ticket': opt.token.slice(0, io),
                'UserIp': opt.ip,
                'Randstr': opt.token.slice(io + 1),
                // --- 兼容 config 中 aid 为字符串的情况，无损转整数 ---
                'CaptchaAppId': parseInt(config.turnstile['TENCENT'].aid),
                'AppSecretKey': config.turnstile['TENCENT'].akey,
            });
            return res.CaptchaCode === 1;
        }
    }
}
