/**
 * Project: Kebab, User: JianSuoQiYue
 * --- SQL 特殊参数的运行时包装与序列化 ---
 */
import * as kebab from '#kebab/index.js';
import * as lText from '#kebab/lib/text.js';

/** --- JSON 参数的内部标记，不污染原始对象，也不会参与 JSON 序列化 --- */
const jsonValueSymbol: unique symbol = Symbol('kebab.sql.json');

/** --- 延迟到数据库边界序列化的 JSON 参数 --- */
export interface IJsonValue<T> {
    readonly [jsonValueSymbol]: true;
    readonly 'value': T;
}

/**
 * --- 创建延迟序列化的 JSON 参数 ---
 * @param value 原始 JSON 值
 * @returns JSON 包装值
 */
export function json<T>(value: T): IJsonValue<T> {
    return {
        [jsonValueSymbol]: true,
        'value': value,
    };
}

/**
 * --- 判断是否为 JSON 包装值 ---
 * @param value 待判断的值
 * @returns 是否为 JSON 包装值
 */
export function isJson(value: unknown): value is IJsonValue<unknown> {
    return value !== null && typeof value === 'object' &&
        !!(value as IJsonValue<unknown>)[jsonValueSymbol];
}

/**
 * --- 获取 JSON 包装值内的原始值；普通值保持不变 ---
 * @param value 待解包的值
 * @returns 原始值
 */
export function unwrapJson<T>(value: T): T {
    return (isJson(value) ? value.value : value) as T;
}

/**
 * --- 将单个 SQL 参数转换为数据库驱动可识别的值 ---
 * @param value SQL 参数
 * @returns 序列化后的数据库参数
 */
export function serialize(value: kebab.Json): kebab.Json {
    return isJson(value) ? lText.stringifyJson(value.value) : value;
}

/**
 * --- 在进入数据库驱动前序列化特殊参数，不修改调用方数组 ---
 * @param values SQL 参数列表
 * @returns 可直接交给数据库驱动的参数列表
 */
export function serializeList(values?: kebab.DbValue[]): kebab.DbValue[] | undefined {
    if (!values) {
        return undefined;
    }
    let serialized: kebab.DbValue[] | undefined;
    for (let i = 0; i < values.length; ++i) {
        const value = values[i];
        if (!isJson(value)) {
            continue;
        }
        serialized ??= [...values];
        serialized[i] = lText.stringifyJson(value.value);
    }
    return serialized ?? values;
}
