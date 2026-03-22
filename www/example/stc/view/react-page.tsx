/**
 * --- Kebab React 全页面示例组件 ---
 *
 * 【使用方式】
 * 在 Ctr 方法中调用 _loadReactPage('view/react-page', { ...props })，
 * 框架自动注入 _importMapJson / _hydrateScript / _propsJson 三个内部 props，
 * 组件在 <head> 和 <body> 末尾渲染对应的 <script> 标签即可，其余部分与普通 React 组件无异。
 *
 * 【多页面 / 共用组件】
 * 将公共 UI（如 Button/Card/Badge）放在 stc/lib/ 目录，各页面 import 进来。
 * tsc watch 会自动将所有 .tsx 编译为同路径的 .js，无需打包工具。
 *
 * 【编译方式】
 * 本文件 (.tsx) 已集成到 source/tsconfig.json 的 include 中，
 * 开启 `tsc: watch - source/tsconfig.json` 即可自动编译，无需额外命令。
 * 编译输出：stc/view/react-page.js（由 tsc 覆盖写入，勿手动编辑 .js 文件）
 *
 * 【运行时机】
 * - 服务端（Node.js）：_loadReactPage() 调用 renderToString()，产出完整 HTML 字符串。
 * - 客户端（浏览器）：import map 将 bare import 解析到 esm.sh，hydrateRoot 接管 document。
 * - 两端使用同一份 JS 文件：服务端从磁盘读，浏览器从静态 URL 下载。
 *
 * 【限制】
 * - 不能包含 Node.js 专属代码（fs/path/lDb 等），数据必须通过 props 传入。
 * - 等价于 Next.js 的 Client Component，而非 Server Component。
 */

import { useState, useEffect, type ReactNode } from 'react';
import { MemoryRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- 组件接收的 props 接口，_urlXxx/_staticVer 由框架自动注入 ---
interface IProps {
    'title': string;
    'serverTime': string;
    'node': string;
    '_urlBase': string;
    '_urlStc': string;
    '_urlFull': string;
    '_staticVer': string;
    /** --- 框架注入：import map JSON 字符串，<head> 中以 type="importmap" <script> 渲染 --- */
    '_importMapJson'?: string;
    /**
     * --- 框架注入：水合 JS 代码字符串，</body> 前以 type="module" <script> 渲染 ---
     * --- 内容：import hydrateRoot + import App + hydrateRoot(document, createElement(App, p)) ---
     */
    '_hydrateScript'?: string;
    /**
     * --- 框架注入：fullProps 的 JSON 序列化（不含 _propsJson 本身）---
     * --- 客户端水合脚本读取此值重建 props，suppressHydrationWarning 处理服务端/客户端内容差异 ---
     */
    '_propsJson'?: string;
}

// ─── shadcn/ui 风格基础控件 ───────────────────────────────────────────────────
// 以下组件是 Tailwind + React 的轻量实现，与 shadcn/ui 源码结构完全一致。
// 生产环境可直接替换为 shadcn/ui 官方组件，import map 会通过 esm.sh 自动
// 解析 Radix UI 等所有依赖，无需本地 npm install 也无需打包工具。

/** --- 卡片容器 --- */
function Card({ children, className = '' }: { 'children': ReactNode; 'className'?: string }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
            {children}
        </div>
    );
}

/** --- 标签徽章 --- */
function Badge({ children, variant = 'default' }: {
    'children': string;
    'variant'?: 'default' | 'success' | 'warn';
}) {
    const styles = {
        'default': 'bg-blue-100 text-blue-700',
        'success': 'bg-green-100 text-green-700',
        'warn':    'bg-amber-100 text-amber-700',
    };
    return (
        <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold ${styles[variant]}`}>
            {children}
        </span>
    );
}

/** --- 按钮 --- */
function Btn({ children, onClick, disabled = false, outline = false }: {
    'children': string;
    'onClick'?: () => void;
    'disabled'?: boolean;
    'outline'?: boolean;
}) {
    /** --- 填充/轮廓两种样式 --- */
    const style = outline
        ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
        : 'bg-blue-500 hover:bg-blue-600 text-white';
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer ${style}`}
        >
            {children}
        </button>
    );
}

// ─── Router 演示子页面 ─────────────────────────────────────────────────────────

/** --- 路由 Home 页 --- */
function RouterHome() {
    return (
        <div>
            <p className="text-slate-700 text-sm font-medium mb-3">当前路由：<code className="bg-slate-100 px-1 rounded">/</code></p>
            <div className="flex gap-2 flex-wrap">
                <Link to="/about" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium">
                    → /about
                </Link>
                <Link to="/user/42" className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium">
                    → /user/42
                </Link>
                <Link to="/user/hello" className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium">
                    → /user/hello
                </Link>
            </div>
        </div>
    );
}

/** --- 路由 About 页 --- */
function RouterAbout() {
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-slate-700 text-sm font-medium mb-3">当前路由：<code className="bg-slate-100 px-1 rounded">/about</code></p>
            <p className="text-slate-500 text-xs mb-3">useNavigate() 演示编程导航（不使用 Link 组件）：</p>
            <div className="flex gap-2">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                >
                    ← 返回 /
                </button>
                <button
                    onClick={() => navigate('/user/99')}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium cursor-pointer"
                >
                    → /user/99
                </button>
            </div>
        </div>
    );
}

/** --- 路由 User 动态参数页 --- */
function RouterUser() {
    const { id } = useParams<{ 'id': string }>();
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-slate-700 text-sm font-medium mb-1">
                当前路由：<code className="bg-slate-100 px-1 rounded">/user/:id</code>
            </p>
            <p className="text-slate-500 text-xs mb-3">
                useParams() 读取动态段：<code className="bg-slate-100 px-1 rounded">id = &quot;{id}&quot;</code>
            </p>
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
            >
                ← 返回 /
            </button>
        </div>
    );
}

// ─── 页面主组件 ────────────────────────────────────────────────────────────────

/** --- Kebab React 全页面演示 --- */
export default function ReactPage({ title, serverTime, node, _urlBase, _urlStc, _importMapJson, _hydrateScript, _propsJson }: IProps) {

    // --- useState 在 SSR 阶段使用初始值渲染，客户端水合后变为可交互状态 ---
    const [count, setCount] = useState(0);
    const [tab, setTab] = useState<'overview' | 'routing' | 'fetch'>('overview');
    const [fetchResult, setFetchResult] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    /** --- 仅客户端为 true，用于展示水合已完成 --- */
    const [hydrated, setHydrated] = useState(false);

    // --- useEffect 在 SSR 阶段不执行，只在浏览器端水合完成后触发 ---
    useEffect(() => {
        setHydrated(true);
    }, []);

    /**
     * --- 发起 fetch 请求并更新结果状态 ---
     * @param url 请求地址
     */
    function doFetch(url: string): void {
        setIsFetching(true);
        setFetchResult(null);
        fetch(url)
            .then(r => r.json())
            .then((data: unknown) => {
                setFetchResult(JSON.stringify(data, null, 2));
                setIsFetching(false);
            })
            .catch((e: Error) => {
                setFetchResult(`Error: ${e.message}`);
                setIsFetching(false);
            });
    }

    return (
        // --- 组件渲染完整 HTML 文档，无需外部 EJS 模板 ---
        <html lang="en">
            <head>
                {/*
                  meta/title 放在 <head> 最前，与 renderToString 实际输出顺序保持一致，
                  避免客户端水合时虚拟 DOM 与浏览器 DOM 的顺序不匹配（#418）。
                */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                {/*
                  import map 由 _loadReactPage 通过 props 传入，使 bare import 在浏览器端通过
                  esm.sh 自动解析。必须在所有 <script type="module"> 之前出现。
                  服务端：_importMapJson 有值 → 正常渲染。
                  客户端：同一值读自 __kebab_props__ → 渲染相同 → 水合匹配。
                */}
                {_importMapJson && (
                    <script type="importmap" dangerouslySetInnerHTML={{ '__html': _importMapJson }} />
                )}
                {/*
                  Tailwind CSS CDN：开发和演示可直接使用。
                  生产环境建议用 `npx tailwindcss build` 输出 purged CSS，
                  然后改为：<link rel="stylesheet" href="/stc/css/app.css" />
                */}
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body className="bg-slate-50 min-h-screen font-sans">
                <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                    {/* ── 标题区（展示 SSR/水合状态） ── */}
                    <div>
                        <div className="flex gap-2 mb-2">
                            <Badge>SSR · Kebab</Badge>
                            {/* hydrated 在 SSR 阶段为 false，水合完成后 useEffect 将其设为 true */}
                            <Badge variant={hydrated ? 'success' : 'warn'}>
                                {hydrated ? 'Hydrated ✓' : 'Rendering...'}
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                        <p className="text-slate-500 text-sm mt-1">{serverTime} · {node}</p>
                    </div>

                    {/* ── Tab 导航（客户端状态路由，无页面刷新） ── */}
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                        {(['overview', 'routing', 'fetch'] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={[
                                    'px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
                                    tab === t ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900',
                                ].join(' ')}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* ══ Overview Tab ══ */}
                    {tab === 'overview' && (
                        <div className="space-y-4">

                            {/* useState 计数器 */}
                            <Card>
                                <h2 className="font-semibold text-slate-900 mb-1">Counter（useState + hydration）</h2>
                                <p className="text-slate-500 text-xs mb-4">
                                    SSR 渲染初始值 0，props 序列化为内联 JSON。
                                    水合完成后 state 变为可交互，点击按钮测试：
                                </p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setCount(c => c - 1)}
                                        className="w-10 h-10 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-slate-700 text-xl cursor-pointer"
                                    >−</button>
                                    <span className="text-3xl font-bold text-slate-900 w-10 text-center tabular-nums">{count}</span>
                                    <button
                                        onClick={() => setCount(c => c + 1)}
                                        className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl cursor-pointer"
                                    >+</button>
                                </div>
                            </Card>

                            {/* Server Props 展示 */}
                            <Card>
                                <h2 className="font-semibold text-slate-900 mb-3">Server Props（来自 Ctr 方法）</h2>
                                <p className="text-slate-500 text-xs mb-3">
                                    通过{' '}
                                    <code className="bg-slate-100 px-1 rounded">_loadReactPage(path, props)</code>{' '}
                                    传入，框架自动注入 _urlBase 等常量，
                                    整体序列化为内联 JSON，客户端水合时直接复用，无需二次请求。
                                </p>
                                <div className="space-y-2">
                                    {([
                                        ['serverTime', serverTime],
                                        ['node', node],
                                        ['_urlBase', _urlBase],
                                        ['_urlStc', _urlStc],
                                    ] as const).map(([k, v]) => (
                                        <div key={k} className="flex text-xs gap-4">
                                            <span className="text-slate-400 font-mono w-28 shrink-0">{k}</span>
                                            <span className="font-mono text-slate-700 truncate">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* shadcn/ui 兼容说明 */}
                            <Card>
                                <h2 className="font-semibold text-slate-900 mb-2">shadcn/ui 兼容性</h2>
                                <p className="text-slate-500 text-xs mb-3">
                                    shadcn/ui = Tailwind + Radix UI。本页的 Card/Badge/Btn 是等效的轻量实现。
                                    使用官方 shadcn/ui 组件时，其 Radix UI 依赖由 esm.sh 递归解析，
                                    与打包工具的处理结果完全等价，无需本地 npm install。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="success">Card ✓</Badge>
                                    <Badge variant="success">Badge ✓</Badge>
                                    <Badge variant="success">Btn ✓</Badge>
                                    <Badge>Radix UI Dialog 同样支持</Badge>
                                </div>
                            </Card>

                        </div>
                    )}

                    {/* ══ Routing Tab ══ */}
                    {tab === 'routing' && (
                        /*
                          MemoryRouter：路由状态保存在内存中，服务端 SSR 和客户端水合均可运行，
                          无需服务端配置 catch-all 路由，适合在页面内嵌入独立的路由演示。
                          若要整页接管 URL，改用 BrowserRouter（需服务端对所有子路径返回同一页面）。
                        */
                        <MemoryRouter>
                            <Card>
                                <h2 className="font-semibold text-slate-900 mb-1">React Router 演示</h2>
                                <p className="text-slate-500 text-xs mb-4">
                                    使用 <code className="bg-slate-100 px-1 rounded">MemoryRouter</code>
                                    {' '}演示路由跳转、动态参数（useParams）和编程导航（useNavigate），
                                    服务端 SSR 与客户端水合均可运行，无需额外服务端配置。
                                </p>
                                {/* ── 路由定义 ── */}
                                <Routes>
                                    <Route path="/" element={<RouterHome />} />
                                    <Route path="/about" element={<RouterAbout />} />
                                    <Route path="/user/:id" element={<RouterUser />} />
                                </Routes>
                            </Card>

                            {/* 整页 BrowserRouter 配置说明 */}
                            <Card className="mt-4">
                                <h2 className="font-semibold text-slate-900 mb-2">整页 BrowserRouter 配置</h2>
                                <p className="text-slate-500 text-xs mb-3">
                                    若要让 React Router 接管整个页面的真实 URL（如 /app、/app/about），
                                    将 MemoryRouter 替换为 BrowserRouter，并在服务端将所有子路径路由到同一 Ctr 方法：
                                </p>
                                <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs overflow-auto leading-relaxed text-slate-700">{`// 1. route.json：将所有子路径指向同一 Ctr 方法
{
  "app":   "ctr/app@reactPage",
  "app\\/.*": "ctr/app@reactPage"
}

// 2. 客户端（浏览器）：BrowserRouter 自动读取当前 URL
import { BrowserRouter } from 'react-router-dom';
hydrateRoot(document,
  createElement(BrowserRouter, { basename: '/app' },
    createElement(App, props)));

// 3. 服务端 SSR：StaticRouter 使用请求 URL，避免水合差异
import { StaticRouter } from 'react-router-dom/server';
renderToString(
  createElement(StaticRouter, { location: reqPath },
    createElement(App, props)));`}
                                </pre>
                            </Card>
                        </MemoryRouter>
                    )}

                    {/* ══ Fetch Tab ══ */}
                    {tab === 'fetch' && (
                        <Card>
                            <h2 className="font-semibold text-slate-900 mb-3">Client Fetch Demo</h2>
                            <p className="text-slate-500 text-xs mb-4">
                                水合完成后，点击按钮发起 GET 请求。setState 触发局部重渲染，无页面刷新。
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <Btn
                                    onClick={() => doFetch(`${_urlBase}test/json?type=4`)}
                                    disabled={isFetching}
                                >
                                    {isFetching ? 'Fetching...' : 'GET /test/json?type=4'}
                                </Btn>
                                <Btn
                                    outline
                                    onClick={() => doFetch(`${_urlBase}test/json?type=2`)}
                                    disabled={isFetching}
                                >
                                    GET type=2 (error resp)
                                </Btn>
                            </div>
                            {fetchResult !== null ? (
                                <pre className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs overflow-auto leading-relaxed text-slate-700">
                                    {fetchResult}
                                </pre>
                            ) : (
                                <p className="mt-3 text-slate-400 text-xs">Click a button above to see the response</p>
                            )}
                        </Card>
                    )}

                </div>
                {/*
                  __kebab_props__：存储 fullProps JSON 供水合脚本读取。放在 <body> 末尾以确保
                  JSX 树结构与 renderToString 输出、浏览器 DOM 三者一致，避免水合错误 #418。
                  服务端：_propsJson 有值（fullProps 的完整 JSON）。
                  客户端：_propsJson 为 undefined（本身不在 JSON 中），渲染空串。
                  suppressHydrationWarning：跳过此元素的文本内容比对。
                */}
                <script
                    id="__kebab_props__"
                    type="application/json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ '__html': _propsJson ?? '' }}
                />
                {/*
                  水合脚本：读取 __kebab_props__ → hydrateRoot(document, createElement(App, p))。
                  服务端：_hydrateScript 有值 → 渲染此 script 元素。
                  客户端：同一值读自 __kebab_props__ → 渲染相同 → 水合匹配。
                */}
                {_hydrateScript && (
                    <script type="module" dangerouslySetInnerHTML={{ '__html': _hydrateScript }} />
                )}
            </body>
        </html>
    );
}
