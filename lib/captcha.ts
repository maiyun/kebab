/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-6-7 12:14:31
 * Last: 2020-3-11 23:33:19, 2022-09-12 10:38:24, 2022-12-29 01:16:26
 */
import * as svgCaptcha from 'svg-captcha';
import * as mime from '@litert/mime';
import * as core from '~/lib/core';
import * as def from '~/sys/def';

svgCaptcha.loadFont(def.LIB_PATH + 'captcha/zcool-addict-italic.ttf');

export class Captcha {

    private readonly _link: svgCaptcha.CaptchaObj;

    public constructor(opt: { 'width': number; 'height': number; 'length': number; }) {
        this._link = svgCaptcha.create({
            width: opt.width,
            height: opt.height,
            size: opt.length,
            noise: 15,
            background: '#eee',
            charPreset: core.RANDOM_V
        });
    }

    /**
     * --- 获取图片 Buffer ---
     */
    public getBuffer(): string {
        return this._link.data;
    }

    /**
     * --- 获取 base64 格式图片 ---
     */
    public getBase64(): string {
        return `data:${mime.getMime('svg')};base64,` + Buffer.from(this._link.data).toString('base64');
    }

    /**
     * --- 获取当前随机码 ---
     */
    public getPhrase(): string {
        return this._link.text;
    }

}

/**
 * --- 获取验证码对象 ---
 * @param width 宽度
 * @param height 高度
 * @param length 字符个数
 */
export function get(width: number, height: number, length: number = 4): Captcha {
    return new Captcha({
        'width': width,
        'height': height,
        'length': length
    });
}
