/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2025-6-11
 */
// --- 库和定义 ---
import * as lCore from '#kebab/lib/core.js';
import * as lUndici from '#kebab/lib/undici.js';
import * as lText from '#kebab/lib/text.js';
import * as sCtr from '#kebab/sys/ctr.js';
import { signTencentCaptcha } from '#kebab/abox/turnstile-tencent.js';

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
 * @returns 票据通过返回 true，校验未通过或请求失败返回 false
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
            const separator = opt.token.indexOf('|');
            if (separator === -1) {
                return false;
            }
            const tencent = config.turnstile.TENCENT;
            const body = lText.stringifyJson({
                'CaptchaType': 9,
                'Ticket': opt.token.slice(0, separator),
                'UserIp': opt.ip,
                'Randstr': opt.token.slice(separator + 1),
                'CaptchaAppId': parseInt(tencent.aid),
                'AppSecretKey': tencent.akey,
            });
            const request = signTencentCaptcha(body, tencent.sid, tencent.skey);
            const res = await lUndici.post(request.url, body, {
                'headers': request.headers,
                'signal': AbortSignal.timeout(30_000),
                'log': false,
            });
            const json = await res.getJson<{
                'Response'?: {
                    'CaptchaCode'?: number;
                    'RequestId'?: string;
                    'Error'?: { 'Code'?: string; };
                };
            }>();
            const response = json ? json.Response : undefined;
            const status = res.headers?.['http-code'];
            if (status !== 200 || !response || response.Error) {
                const code = response?.Error?.Code ?? res.error?.name ?? 'InvalidResponse';
                const requestId = response?.RequestId ?? '-';
                lCore.log({}, `[TURNSTILE][TENCENT] ${code} (HTTP ${status ?? '-'}, RequestId ${requestId})`, '-error');
                return false;
            }
            return response.CaptchaCode === 1;
        }
    }
}
