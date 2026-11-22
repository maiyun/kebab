import { parseJson } from '#kebab/lib/text.js';

interface IJsonUser {
    'uid': string;
}

export function checkParseJsonTypes(input: string): void {
    const untyped = parseJson(input);
    void untyped.uid;
    const contextual: IJsonUser = parseJson(input);
    void contextual.uid;

    const typed = parseJson<IJsonUser>(input);
    // @ts-expect-error 显式指定结果类型时必须处理解析失败。
    void typed.uid;
    if (typed !== false) {
        typed.uid.toUpperCase();
        // @ts-expect-error 未声明的字段不能通过类型检查。
        void typed.name;
    }
}
