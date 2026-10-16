/** --- 支持的语言缩写列表 --- */
export const codes: string[] = [
    'sc', 'tc', 'ja', 'ko', 'th', 'vi', 'ar', 'id',
    'en', 'es', 'de', 'fr', 'pt', 'ru', 'it', 'tr',
];

export const names: string[] = [
    '简体中文', '繁體中文', '日本語', '한국어', 'ไทย', 'Tiếng việt', 'العربية', 'Bahasa Indonesia',
    'English', 'Español', 'Deutsch', 'Français', 'Português', 'Русский', 'Italiano', 'Türkçe',
];

/** --- 浏览器常用映射为本语言 --- */
export const map: Record<string, string> = {
    'cn': 'sc',
    'zh': 'tc',
    'ja': 'ja',
    'ko': 'ko',
    'th': 'th',
    'vi': 'vi',
    'ar': 'ar',
    'id': 'id',
    'en': 'en',
    'es': 'es',
    'de': 'de',
    'fr': 'fr',
    'pt': 'pt',
    'ru': 'ru',
    'it': 'it',
    'tr': 'tr',
};

/**
 * --- 根据常用语言字符串获取语言 code ---
 * @param accept 常用字符串，如 zh-cn，或包含 zh-cn 的字符串
 */
export function getCodeByAccept(accept?: string): string {
    if (accept === '*') {
        return 'sc';
    }
    const ulang = accept?.toLowerCase() ?? 'en';
    for (const l in map) {
        if (!ulang.includes(l)) {
            continue;
        }
        return map[l];
    }
    return 'en';
}

/**
 * --- 根据框架语言 code 获取浏览器标准语言标识,可用于 HTML lang 和 Intl ---
 * @param code 框架语言 code,不区分大小写；未传或不支持时回退 en
 * @returns sc 返回 zh-CN,tc 返回 zh-TW,其余支持的语言返回原 code
 */
export function getAcceptByCode(code?: string): string {
    const lang = code?.toLowerCase() ?? 'en';
    if (lang === 'sc') {
        return 'zh-CN';
    }
    if (lang === 'tc') {
        return 'zh-TW';
    }
    return codes.includes(lang) ? lang : 'en';
}
