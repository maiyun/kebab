/**
 * --- Kebab React 全页面示例组件 ---
 *
 * node ./source/main build -d source/www/example/stc/view
 *
 * 【使用方式】
 * 在 Ctr 方法中调用 _loadReactPage('view/react-page', { ...props })，
 * 框架自动注入 _importMapJson / _hydrateScript / _propsJson 三个内部 props，
 * 组件在 <head> 和 <body> 末尾渲染对应的 <script> 标签即可，其余部分与普通 React 组件无异。
 *
 * 【多页面 / 共用组件】
 * 将公共 UI（如 Label/Input/Checkbox）放在 stc/lib/ui/ 目录，各页面 import 进来。
 * 这和 shadcn/ui 推荐的 components/ui/ 目录结构完全一致。
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
 * 【第三方包 import map 自动解析】
 * 开发模式下，框架会自动扫描入口 JS 及其相对引用中的所有 bare specifier，
 * 并通过 esm.sh CDN 自动生成 import map 条目，无需手动配置。
 *
 * 【限制】
 * - 不能包含 Node.js 专属代码（fs/path/lDb 等），数据必须通过 props 传入。
 * - 等价于 Next.js 的 Client Component，而非 Server Component。
 */

// --- React / React Router ---
import { useState, useEffect, useId, type ReactNode } from 'react';
import { MemoryRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- shadcn/ui 控件（从 stc/lib/ui/ 引入，与行业标准 components/ui/ 目录结构一致）---
import { Label } from '../lib/ui/label.js';
import { Input } from '../lib/ui/input.js';
import { Checkbox } from '../lib/ui/checkbox.js';
import { Switch } from '../lib/ui/switch.js';

// --- 组件接收的 props 接口，_urlXxx/_staticVer 由框架自动注入 ---
interface IProps {
    'title': string;
    'serverTime': string;
    'node': string;
    '_urlBase': string;
    '_urlStc': string;
    '_urlFull': string;
    '_staticVer': string;
    '_importMapJson'?: string;
    '_hydrateScript'?: string;
    '_propsJson'?: string;
}

// ─── 页面内部组件（仅本页演示使用，无需提取到 lib/）────────────────────────────

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
            <p className="text-slate-700 text-sm font-medium mb-3">Current route: <code className="bg-slate-100 px-1 rounded">/</code></p>
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
            <p className="text-slate-700 text-sm font-medium mb-3">Current route: <code className="bg-slate-100 px-1 rounded">/about</code></p>
            <p className="text-slate-500 text-xs mb-3">useNavigate() programmatic navigation (without Link component):</p>
            <div className="flex gap-2">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                >
                    ← Back to /
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
                Current route: <code className="bg-slate-100 px-1 rounded">/user/:id</code>
            </p>
            <p className="text-slate-500 text-xs mb-3">
                useParams() dynamic segment: <code className="bg-slate-100 px-1 rounded">id = &quot;{id}&quot;</code>
            </p>
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
            >
                ← Back to /
            </button>
        </div>
    );
}

// ─── shadcn/ui 演示区 ────────────────────────────────────────────────────────

/**
 * --- 展示 Label/Input/Checkbox/Switch 组合使用 ---
 * 控件定义在 stc/lib/ui/ 目录，本组件只做 import + 组合。
 */
function ShadcnDemo() {
    // --- 表单受控状态 ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState<boolean | 'indeterminate'>(false);
    const [newsletter, setNewsletter] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // --- useId 生成无障碍访问用的稳定 id（SSR + 水合均确保一致）---
    const nameId = useId();
    const emailId = useId();
    const agreeId = useId();
    const newsletterId = useId();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className="space-y-4">

            {/* ── 说明 ── */}
            <Card>
                <h2 className="font-semibold text-slate-900 mb-2">shadcn/ui Components</h2>
                <p className="text-slate-500 text-xs leading-relaxed">
                    All components below are imported from <code className="bg-slate-100 px-1 rounded">stc/lib/ui/</code>,
                    following the same <code className="bg-slate-100 px-1 rounded">components/ui/</code> structure recommended by shadcn/ui.
                    Built on Radix UI primitives, styled with Tailwind CSS.
                    In dev mode, the framework auto-scans all bare imports and generates the import map automatically.
                </p>
            </Card>

            {/* ── Label + Input 演示 ── */}
            <Card>
                <h2 className="font-semibold text-slate-900 mb-4">Label + Input</h2>
                {/* Label 使用 @radix-ui/react-label，htmlFor 关联 Input 的 id，点击 Label 可聚焦 Input */}
                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor={nameId}>Username</Label>
                        <Input
                            id={nameId}
                            type="text"
                            placeholder="Enter your username"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor={emailId}>Email</Label>
                        <Input
                            id={emailId}
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Click the Label text to focus the corresponding input (Radix UI a11y semantics)</p>
            </Card>

            {/* ── Checkbox 演示 ── */}
            <Card>
                <h2 className="font-semibold text-slate-900 mb-4">Checkbox</h2>
                {/* Checkbox 使用 @radix-ui/react-checkbox，支持 checked / indeterminate 三态 */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={agreeId}
                        checked={agree}
                        onCheckedChange={setAgree}
                    />
                    <Label htmlFor={agreeId}>I have read and agree to the Terms of Service</Label>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                    Value: <code className="bg-slate-100 px-1 rounded">{String(agree)}</code>
                    &nbsp;(supports <code className="bg-slate-100 px-1 rounded">true | false | &apos;indeterminate&apos;</code> tri-state)
                </p>
            </Card>

            {/* ── Switch 演示 ── */}
            <Card>
                <h2 className="font-semibold text-slate-900 mb-4">Switch</h2>
                {/* Switch 使用 @radix-ui/react-switch，onCheckedChange 接收 boolean */}
                <div className="flex items-center gap-2">
                    <Switch
                        id={newsletterId}
                        checked={newsletter}
                        onCheckedChange={setNewsletter}
                    />
                    <Label htmlFor={newsletterId}>Subscribe to product updates</Label>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                    Value: <code className="bg-slate-100 px-1 rounded">{newsletter ? 'true' : 'false'}</code>
                </p>
            </Card>

            {/* ── 综合表单提交 ── */}
            <Card>
                <h2 className="font-semibold text-slate-900 mb-4">Combined Form (Submit Demo)</h2>
                {submitted ? (
                    <div className="space-y-2 text-sm">
                        <p className="text-green-700 font-medium">✓ Submitted! Received data:</p>
                        <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 overflow-auto">{JSON.stringify(
                            { name, email, agree: Boolean(agree), newsletter },
                            null,
                            2
                        )}</pre>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-xs text-blue-500 hover:underline cursor-pointer"
                        >Reset</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor={`${nameId}-form`}>Username <span className="text-red-500">*</span></Label>
                            <Input
                                id={`${nameId}-form`}
                                required
                                placeholder="At least 2 characters"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor={`${emailId}-form`}>Email <span className="text-red-500">*</span></Label>
                            <Input
                                id={`${emailId}-form`}
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id={`${agreeId}-form`}
                                checked={agree}
                                onCheckedChange={setAgree}
                                required
                            />
                            <Label htmlFor={`${agreeId}-form`}>Agree to terms</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                id={`${newsletterId}-form`}
                                checked={newsletter}
                                onCheckedChange={setNewsletter}
                            />
                            <Label htmlFor={`${newsletterId}-form`}>Subscribe</Label>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </Card>

        </div>
    );
}

// ─── 页面主组件 ────────────────────────────────────────────────────────────────

/** --- Kebab React 全页面演示 --- */
export default function ReactPage({ title, serverTime, node, _urlBase, _urlStc, _staticVer, _importMapJson, _hydrateScript, _propsJson }: IProps) {

    // --- useState 在 SSR 阶段使用初始值渲染，客户端水合后变为可交互状态 ---
    const [count, setCount] = useState(0);
    const [tab, setTab] = useState<'overview' | 'routing' | 'fetch' | 'shadcn'>('overview');
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
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                {/* import map：框架自动注入，bare import 通过 esm.sh 解析 */}
                {_importMapJson && (
                    <script type="importmap" dangerouslySetInnerHTML={{ '__html': _importMapJson }} />
                )}
                {/*
                  * dev mode (_importMapJson present): load Tailwind Play CDN — no build step needed.
                  * bundle mode (_importMapJson absent): load the compiled react-page.css produced by
                  *   `kebab build`, so the CDN never runs and never injects extra <style> nodes into
                  *   <head> before React's hydrateRoot, which would cause hydration error #418.
                  */}
                {_importMapJson
                    ? <script src="https://cdn.tailwindcss.com"></script>
                    : <link rel="stylesheet" href={`${_urlStc}view/react-page.css?v=${_staticVer}`} />
                }
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
                        {(['overview', 'routing', 'fetch', 'shadcn'] as const).map(t => (
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
                                    SSR renders with initial value 0; props are serialized as inline JSON.
                                    After hydration the state becomes interactive — click the buttons to test:
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
                                <h2 className="font-semibold text-slate-900 mb-3">Server Props (from Ctr method)</h2>
                                <p className="text-slate-500 text-xs mb-3">
                                    Passed via{' '}
                                    <code className="bg-slate-100 px-1 rounded">_loadReactPage(path, props)</code>.
                                    The framework auto-injects constants like _urlBase and serializes
                                    all props as inline JSON, reused directly during client hydration — no extra request needed.
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

                            {/* 项目结构说明 */}
                            <Card>
                                <h2 className="font-semibold text-slate-900 mb-2">Recommended Directory Structure</h2>
                                <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs leading-relaxed text-slate-700">{`stc/
  lib/
    utils.ts            # cn() utility
    ui/
      label.tsx         # shadcn Label
      input.tsx         # shadcn Input
      checkbox.tsx      # shadcn Checkbox
      switch.tsx        # shadcn Switch
  view/
    react-page.tsx      # Page component (import + compose)`}
                                </pre>
                                <p className="text-slate-500 text-xs mt-3">
                                    Mirrors the shadcn/ui <code className="bg-slate-100 px-1 rounded">components/ui/</code> convention.
                                    In dev mode, the framework auto-scans imports — no manual import map configuration needed.
                                </p>
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
                                <h2 className="font-semibold text-slate-900 mb-1">React Router Demo</h2>
                                <p className="text-slate-500 text-xs mb-4">
                                    Uses <code className="bg-slate-100 px-1 rounded">MemoryRouter</code>
                                    {' '}to demonstrate route navigation, dynamic params (useParams), and programmatic navigation (useNavigate).
                                    Works on both server SSR and client hydration with no extra server configuration.
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
                                <h2 className="font-semibold text-slate-900 mb-2">Full-Page BrowserRouter Setup</h2>
                                <p className="text-slate-500 text-xs mb-3">
                                    To let React Router manage the real URL (e.g. /app, /app/about),
                                    replace MemoryRouter with BrowserRouter and route all sub-paths to the same Ctr method on the server:
                                </p>
                                <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs overflow-auto leading-relaxed text-slate-700">{`// 1. route.json: route all sub-paths to the same Ctr method
{
  "app":   "ctr/app@reactPage",
  "app\\/.*": "ctr/app@reactPage"
}

// 2. Client (browser): BrowserRouter reads the current URL automatically
import { BrowserRouter } from 'react-router-dom';
hydrateRoot(document,
  createElement(BrowserRouter, { basename: '/app' },
    createElement(App, props)));

// 3. Server SSR: StaticRouter uses the request URL to avoid hydration mismatch
import { StaticRouter } from 'react-router-dom/server';
renderToString(
  createElement(StaticRouter, { location: reqPath },
    createElement(App, props)));`}
                                </pre>
                            </Card>
                        </MemoryRouter>
                    )}

                    {/* ══ shadcn/ui Tab ══ */}
                    {tab === 'shadcn' && (
                        <ShadcnDemo />
                    )}

                    {/* ══ Fetch Tab ══ */}
                    {tab === 'fetch' && (
                        <Card>
                            <h2 className="font-semibold text-slate-900 mb-3">Client Fetch Demo</h2>
                            <p className="text-slate-500 text-xs mb-4">
                                After hydration, click a button to send a GET request. setState triggers a partial re-render — no page refresh.
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
                {/* props JSON：供客户端水合脚本读取 */}
                <script
                    id="__kebab_props__"
                    type="application/json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ '__html': _propsJson ?? '' }}
                />
                {/* 水合脚本：hydrateRoot 接管 document */}
                {_hydrateScript && (
                    <script type="module" dangerouslySetInnerHTML={{ '__html': _hydrateScript }} />
                )}
            </body>
        </html>
    );
}
