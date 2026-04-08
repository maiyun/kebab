/**
 * --- Kebab React 最简页面示例 ---
 *
 * 【写一个 React 页面最少需要什么】
 * 1. 这个 .page.tsx 文件（组件 + IProps）
 * 2. 一个 <link> 标签引入 CSS（如果不需要样式可省略）
 * 3. 在 Ctr 方法里调用 _loadReactPage('view/hello', props)
 * 其他一切由框架自动处理：SSR 渲染、import map、props 注入、客户端水合。
 */
import { useState, type ReactElement } from 'react';

// --- 框架自动注入的常量 props，业务 props 按需加在后面 ---
interface IProps {
    '_urlStc': string;
    '_staticVer': string;
    'greeting': string;
}

export default function HelloPage({ _urlStc, _staticVer, greeting }: IProps): ReactElement {
    const [count, setCount] = useState(0);
    return (
        <html lang="zh-CN">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Hello - Kebab</title>
                {/* 如不需要 Tailwind 可去掉此行 */}
                <link href={`${_urlStc}view/hello.page.css?v=${_staticVer}`} rel="stylesheet" />
            </head>
            <body>
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">{greeting}</h1>
                    <p className="text-slate-500 mb-4">点击按钮测试客户端水合是否正常工作：</p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCount(c => c - 1)}
                            className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-xl cursor-pointer"
                        >-</button>
                        <span className="w-10 text-center tabular-nums text-lg">{count}</span>
                        <button
                            onClick={() => setCount(c => c + 1)}
                            className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl cursor-pointer"
                        >+</button>
                    </div>
                </div>
            </body>
        </html>
    );
}
