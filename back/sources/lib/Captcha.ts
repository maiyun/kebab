// --- 第三方 ---
import * as svgCaptcha from "svg-captcha";
import * as mime from "@litert/mime-types";
// --- 库和定义 ---
import * as Text from "~/lib/Text";
import * as Const from "~/const";
import * as abs from "~/abstract";

export interface CaptchaOptions {
    width: number;
    height: number;
    length: number;
}

svgCaptcha.loadFont(Const.LIB_PATH + "Captcha/johanna-italic.ttf");

export class Captcha {

    private _link!: svgCaptcha.CaptchaObj;

    constructor(opt: CaptchaOptions) {
        this._link = svgCaptcha.create({
            width: opt.width,
            height: opt.height,
            size: opt.length,
            noise: 15,
            background: "#eee",
            charPreset: Text.RANDOM_V
        });
    }

    /**
     * --- 直接输出图片到浏览器并返回验证码字符 ---
     * @param nu Nu 对象
     */
    public output(nu: abs.Nu): string {
        nu.res.setHeader("Content-Type", mime.get("svg"));
        nu.res.setHeader("Content-Length", Buffer.byteLength(this._link.data));
        nu.res.end(this._link.data);
        return this._link.text.toLowerCase();
    }

    /**
     * --- 获取 base64 格式图片 ---
     */
    public getBase64(): string {
        return `data:${mime.get("svg")};base64,` + Buffer.from(this._link.data).toString("base64");
    }

    /**
     * --- 获取生成的随机码 ---
     */
    public getPhrase(): string {
        return this._link.text.toLowerCase();
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
        width: width,
        height: height,
        length: length
    });
}