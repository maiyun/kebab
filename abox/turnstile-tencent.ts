import { randomUUID } from 'node:crypto';
import { hashHmac } from '#kebab/lib/crypto.js';

/** --- 为腾讯云验证码请求签名。发送时须使用传入的原始 JSON 字符串 --- */
export function signTencentCaptcha(body: string, secretId: string, secretKey: string, timestamp = Math.floor(Date.now() / 1000)) {
    const host = 'captcha.tencentcloudapi.com';
    const contentType = 'application/json; charset=utf-8';
    const signedHeaders = 'content-type;host';
    const algorithm = 'TC3-HMAC-SHA256';
    const date = new Date(timestamp * 1_000).toISOString().slice(0, 10);
    const service = 'captcha';
    const scope = `${date}/${service}/tc3_request`;
    const bodyHash = hashHmac('sha256', body);
    const request = `POST\n/\n\ncontent-type:${contentType}\nhost:${host}\n\n${signedHeaders}\n${bodyHash}`;
    const toSign = `${algorithm}\n${timestamp}\n${scope}\n${hashHmac('sha256', request)}`;
    const dateKey = hashHmac('sha256', date, `TC3${secretKey}`, 'buffer');
    const serviceKey = hashHmac('sha256', service, dateKey, 'buffer');
    const signingKey = hashHmac('sha256', 'tc3_request', serviceKey, 'buffer');
    const signature = hashHmac('sha256', toSign, signingKey);
    return {
        url: `https://${host}/`,
        headers: {
            'Authorization': `${algorithm} Credential=${secretId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
            'Content-Type': contentType,
            'X-TC-Action': 'DescribeCaptchaResult',
            'X-TC-Timestamp': String(timestamp),
            'X-TC-TraceId': randomUUID(),
            'X-TC-Version': '2019-07-22',
        },
    };
}
