/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-6-11
 * Last: 2025-6-11 21:50:31
 */
import * as tc from 'tencentcloud-sdk-nodejs';

// --- 库和定义 ---
import * as lNet from '#kebab/lib/net.js';
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

export async function verify(ctr: sCtr.Ctr, opt: {
    'factory': EFACTORY;
    'token': string;
    'ip': string;
}): Promise<boolean> {
    const config = ctr.getPrototype('_config');
    switch (opt.factory) {
        case EFACTORY.CLOUDFLARE: {
            // --- CloudFlare 验证 ---
            const res = await lNet.postJson('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                'secret': config.turnstile['CF'].skey,
                'response': opt.token,
                'remoteip': opt.ip,
            });
            const content = await res.getContent();
            if (!content) {
                return false;
            }
            const str = content.toString();
            const json = lText.parseJson(str);
            if (!json) {
                return false;
            }
            return json.success;
        }
        case EFACTORY.TENCENT: {
            // --- 腾讯云验证 ---
            const client = new tc.captcha.v20190722.Client({
                'credential': {
                    'secretId': config.turnstile['TENCENT'].sid,
                    'secretKey': config.turnstile['TENCENT'].skey,
                },
                'profile': {
                    'signMethod': 'HmacSHA256', // 签名方法
                    'httpProfile': {
                        'reqMethod': 'POST',    // 请求方法
                        'reqTimeout': 30,       // 请求超时时间，默认60s
                    }
                }
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
                'CaptchaAppId': parseInt(config.turnstile['TENCENT'].aid),  // --- 防止后期又不是 number 了还要改config，这样只需要更新代码无损升级 ---
                'AppSecretKey': config.turnstile['TENCENT'].akey,
            });
            return res.CaptchaCode === 1;
        }
    }
}
