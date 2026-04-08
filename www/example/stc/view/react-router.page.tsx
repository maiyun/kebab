/**
 * --- Kebab React BrowserRouter 全页面示例组件 ---
 * 
 * node ./source/main build -d source/www/example/stc
 *
 * 【特性】
 * 本组件演示 _loadReactPage 的 router: 'browser' 模式，实现地址栏与路由联动：
 * - 服务端：框架自动用 StaticRouter 包裹，按当前请求 URL 渲染对应路由
 * - 客户端：框架水合脚本用 BrowserRouter 包裹，Link/NavLink 导航会修改真实地址栏
 * - 直接访问深链接（如 /test/react-router-page/user/42）开箱即用，无需前端 fallback
 *
 * 【要点】
 * 1. 组件本身不包含任何 Router 包裹层，只使用 Routes/Route/Link/NavLink/useParams 等
 * 2. BrowserRouter 的 basename 由框架通过 _routerBase prop 传入
 * 3. 嵌套路由通过 Outlet 渲染子路由内容
 *
 * 【编译方式】
 * tsc watch 会自动编译本文件为同路径的 .js，无需额外命令。
 * 如需打包为 .bundle.js，执行：node ./source/main build
 *
 * 【Tailwind CSS 构建】
 * bundle 模式下不再加载 CDN，需提前构建 CSS 产物。
 * 执行 node ./source/main build 时会自动构建同名 .css，无需单独执行。
 * 框架通过 _urlStc 和 _staticVer 自动拼接正确的带版本号 URL。
 */

import { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';

// --- 用户数据接口 ---
interface IUser {
    'id': string;
    'name': string;
    'email': string;
}

// --- 组件接收的 props 接口 ---
interface IProps {
    'title': string;
    'serverTime': string;
    'node': string;
    /** --- 用户列表数据，SSR 时由后端提供，SPA 导航时前端 fetch --- */
    'users'?: IUser[];
    /** --- 单个用户数据，SSR 时由后端提供，SPA 导航时前端 fetch --- */
    'user'?: IUser;
    '_urlBase': string;
    '_urlStc': string;
    '_urlFull': string;
    '_staticVer': string;
    /** --- 框架注入：BrowserRouter 的 basename，如 /test/react-router-page --- */
    '_routerBase'?: string;
    /** --- 框架注入：import map JSON 字符串 --- */
    '_importMapJson'?: string;
    /** --- 框架注入：水合脚本 --- */
    '_hydrateScript'?: string;
    /** --- 框架注入：fullProps 序列化 JSON --- */
    '_propsJson'?: string;
}

// --- 基础控件 ---

/** --- 卡片容器 --- */
function Card({ children, className = '' }: { 'children': React.ReactNode; 'className'?: string }) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
            {children}
        </div>
    );
}

/** --- 标签徽章 --- */
function Badge({ children, variant = 'default' }: {
    'children': string;
    'variant'?: 'default' | 'success' | 'info';
}) {
    const styles = {
        'default': 'bg-slate-100 text-slate-600',
        'success': 'bg-green-100 text-green-700',
        'info': 'bg-blue-100 text-blue-700',
    };
    return (
        <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold ${styles[variant]}`}>
            {children}
        </span>
    );
}

// --- 导航栏 ---

/** --- 顶部导航栏，NavLink 自动高亮当前路由 --- */
function NavBar() {
    /** --- NavLink className 回调：激活时高亮 --- */
    const cls = ({ isActive }: { 'isActive': boolean }): string =>
        isActive
            ? 'px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium transition-colors'
            : 'px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors';
    return (
        <nav className="flex items-center gap-2 flex-wrap">
            <NavLink to="/" end className={cls}>Home</NavLink>
            <NavLink to="/about" className={cls}>About</NavLink>
            <NavLink to="/user" className={cls}>Users</NavLink>
        </nav>
    );
}

// --- 路由页面 ---

/** --- 首页 --- */
function PageHome({ serverTime, node }: { 'serverTime': string; 'node': string }) {
    const location = useLocation();
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return (
        <div className="space-y-4">
            <p className="text-slate-600 text-sm">Home page demonstrating SSR + BrowserRouter integration.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-1">Server Render Time</div>
                    <div className="font-mono text-slate-800">{serverTime}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-1">Node.js Version</div>
                    <div className="font-mono text-slate-800">{node}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-1">Current pathname (useLocation)</div>
                    <div className="font-mono text-slate-800">{location.pathname}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-slate-500 text-xs mb-1">Hydration Status</div>
                    <div suppressHydrationWarning>
                        {hydrated
                            ? <Badge variant="success">Hydrated</Badge>
                            : <Badge>SSR</Badge>}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
                <Link
                    to="/about"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors"
                >
                    Go to About
                </Link>
                <Link
                    to="/user"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                >
                    Go to Users
                </Link>
            </div>
        </div>
    );
}

/** --- 关于页 --- */
function PageAbout() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="space-y-4">
            <p className="text-slate-600 text-sm">About page: demonstrates <code className="bg-slate-100 px-1 rounded">useNavigate()</code> programmatic navigation.</p>
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
                <div className="text-slate-500 text-xs mb-1">Current pathname</div>
                <div className="font-mono text-slate-800">{location.pathname}</div>
            </div>
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
                >
                    Back to Home
                </button>
                <button
                    onClick={() => navigate('/user/42')}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium cursor-pointer transition-colors"
                >
                    Go to User #42
                </button>
            </div>
        </div>
    );
}

/** --- 用户列表页 --- */
function PageUsers({ users: initialUsers, urlBase }: { 'users'?: IUser[]; 'urlBase': string }) {
    const location = useLocation();
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // --- SSR 已提供数据则跳过 fetch ---
        if (users) {
            return;
        }
        setLoading(true);
        fetch(`${urlBase}test/react-router-page-data?path=/user`)
            .then(r => r.json())
            .then((res) => {
                if (res.result > 0 && res.users) {
                    setUsers(res.users);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);
    return (
        <div className="space-y-4">
            <p className="text-slate-600 text-sm">User list — click to view details (with nested /profile route).</p>
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
                <div className="text-slate-500 text-xs mb-1">Current pathname</div>
                <div className="font-mono text-slate-800">{location.pathname}</div>
            </div>
            {loading && <p className="text-slate-400 text-sm">Loading...</p>}
            {users && (
                <ul className="space-y-2">
                    {users.map(u => (
                        <li key={u.id} className="flex items-center gap-3">
                            <Link
                                to={`/user/${u.id}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                            >
                                {u.name} (id={u.id}) — /user/{u.id}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/**
 * --- 用户详情页（含嵌套路由 Outlet） ---
 * 子路由 /profile 通过 <Outlet /> 渲染在此处
 */
function PageUserDetail({ user: initialUser, urlBase }: { 'user'?: IUser; 'urlBase': string }) {
    const { id } = useParams<{ 'id': string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<IUser | undefined>(
        (initialUser?.id === id) ? initialUser : undefined
    );
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // --- SSR 数据匹配当前 id 则跳过 fetch ---
        if (user?.id === id) {
            return;
        }
        setLoading(true);
        fetch(`${urlBase}test/react-router-page-data?path=/user/${encodeURIComponent(id ?? '')}`)
            .then(r => r.json())
            .then((res) => {
                if (res.result > 0 && res.user) {
                    setUser(res.user);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);
    return (
        <div className="space-y-4">
            {loading && <p className="text-slate-400 text-sm">Loading...</p>}
            {user && (
                <p className="text-slate-700 text-sm font-medium">
                    User Detail: <code className="bg-slate-100 px-1.5 rounded font-mono">{user.name}</code>
                    &nbsp;<span className="text-slate-400 text-xs">(id=&quot;{id}&quot;, email={user.email})</span>
                </p>
            )}
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
                <div className="text-slate-500 text-xs mb-1">Current pathname</div>
                <div className="font-mono text-slate-800">{location.pathname}</div>
            </div>
            {/* --- 嵌套路由区域：/user/:id/profile --- */}
            <div className="border border-dashed border-slate-300 rounded-lg p-4">
                <p className="text-slate-500 text-xs mb-3">
                    Nested route <code className="bg-slate-100 px-1 rounded">/user/:id/profile</code> (rendered via Outlet):
                </p>
                <Outlet />
                {location.pathname === `/user/${id}` && (
                    <Link
                        to={`/user/${id}/profile`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors"
                    >
                        View Profile
                    </Link>
                )}
            </div>
            <button
                onClick={() => navigate('/user')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
                Back to Users
            </button>
        </div>
    );
}

/** --- 嵌套子路由：用户 Profile --- */
function PageUserProfile() {
    const { id } = useParams<{ 'id': string }>();
    const location = useLocation();
    return (
        <div className="bg-blue-50 rounded-lg p-3 mb-3 space-y-2 text-sm">
            <Badge variant="info">Nested Route Active</Badge>
            <div className="text-slate-700">
                Profile of user <strong>{id}</strong> (rendered via Outlet)
            </div>
            <div className="font-mono text-slate-500 text-xs">{location.pathname}</div>
        </div>
    );
}

/** --- 404 兜底页 --- */
function PageNotFound() {
    const location = useLocation();
    return (
        <div className="space-y-3">
            <p className="text-red-600 font-medium">Page Not Found</p>
            <div className="text-slate-500 text-xs font-mono">{location.pathname}</div>
            <Link to="/" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium transition-colors hover:bg-blue-600">
                Back to Home
            </Link>
        </div>
    );
}

// --- 页面主组件 ---

/**
 * --- Kebab React BrowserRouter 全页面演示 ---
 * 框架负责用 StaticRouter（服务端）/ BrowserRouter（客户端）包裹本组件，
 * 组件内部只需使用 Routes/Route/Link 等，无需自行包裹 Router。
 */
export default function ReactRouterPage({
    title, serverTime, node, users, user, _urlBase, _urlStc, _staticVer, _importMapJson, _hydrateScript, _propsJson,
}: IProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
                <title suppressHydrationWarning>{title}</title>
                {/* --- CSS：dev 模式（无 bundle）用 Tailwind CDN；bundle 模式加载本地构建产物 --- */}
                {_importMapJson
                    ? <script src="https://cdn.tailwindcss.com" />
                    : <link rel="stylesheet" href={`${_urlStc}view/react-router-page.css?v=${_staticVer}`} />}
                {/* --- import map：让浏览器识别 bare import，esm.sh 自动解析依赖 --- */}
                {_importMapJson && (
                    <script type="importmap" dangerouslySetInnerHTML={{ '__html': _importMapJson }} />
                )}
            </head>
            <body className="bg-slate-50 min-h-screen">
                <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
                    {/* --- 页头 --- */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Kebab React Router</h1>
                            <p className="text-slate-500 mt-1 text-sm">
                                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">router: &apos;browser&apos;</code>
                                &nbsp;mode — URL synced with routes
                            </p>
                        </div>
                        <a
                            href={`${_urlBase}`}
                            className="text-xs text-slate-400 hover:text-slate-600 transition-colors mt-1"
                        >
                            Back to Index
                        </a>
                    </div>

                    {/* --- 导航卡片 --- */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3">
                        <NavBar />
                    </div>

                    {/* --- 路由内容区 --- */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <Routes>
                            <Route
                                path="/"
                                element={<PageHome serverTime={serverTime} node={node} />}
                            />
                            <Route path="/about" element={<PageAbout />} />
                            <Route path="/user" element={<PageUsers users={users} urlBase={_urlBase} />} />
                            <Route path="/user/:id" element={<PageUserDetail user={user} urlBase={_urlBase} />}>
                                {/* --- 嵌套路由，对应 /user/:id/profile --- */}
                                <Route path="profile" element={<PageUserProfile />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>

                    {/* --- 说明卡片 --- */}
                    <Card className="text-xs text-slate-500 space-y-1.5">
                        <p className="font-semibold text-slate-700 text-sm">How It Works</p>
                        <p>• Server: framework wraps with <code className="bg-slate-100 px-1 rounded">StaticRouter</code> to SSR the matching route</p>
                        <p>• Client: hydration script wraps with <code className="bg-slate-100 px-1 rounded">BrowserRouter</code> for URL-synced navigation</p>
                        <p>• Data: one backend method (<code className="bg-slate-100 px-1 rounded">_getRouteData</code>) serves both SSR props and SPA API</p>
                        <p>• Deep links like <code className="bg-slate-100 px-1 rounded">/test/react-router-page/user/42</code> work out of the box</p>
                    </Card>
                </div>

                {/* --- 框架注入：props JSON，供客户端水合读取 --- */}
                {_propsJson && (
                    <script
                        id="__kebab_props__"
                        type="application/json"
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{ '__html': _propsJson }}
                    />
                )}
                {/* --- 框架注入：水合脚本 --- */}
                {_hydrateScript && (
                    <script
                        type="module"
                        suppressHydrationWarning
                        dangerouslySetInnerHTML={{ '__html': _hydrateScript }}
                    />
                )}
            </body>
        </html>
    );
}
