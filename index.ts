/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-30 12:46:41
 * Last: 2020-3-8 21:04:24, 2022-07-22 14:20:34, 2023-5-24 01:34:57, 2025-6-13 14:49:27
 * --- 本文件用来定义每个目录实体地址的常量 ---
 * ------------------------
 * --- npx tsc-alias -w ---
 * ------------------------
 */

/** --- 当前系统版本号 --- */
export const VER = '2.0.15';

// --- 服务端用的路径 ---

/** --- /xxx/xxx --- */
const dirname = __dirname.replace(/\\/g, '/');

/** --- 框架根目录，以 / 结尾  --- */
export const ROOT_PATH = dirname + '/';
export const LIB_PATH = ROOT_PATH + 'lib/';
export const SYS_PATH = ROOT_PATH + 'sys/';

const cwd = process.cwd().replace(/\\/g, '/');

/** --- 执行根目录，以 / 结尾 --- */
export const ROOT_CWD = cwd + '/';
export const CONF_CWD = ROOT_CWD + 'conf/';
export const CERT_CWD = CONF_CWD + 'cert/';
export const VHOST_CWD = CONF_CWD + 'vhost/';
export const LIB_CWD = ROOT_CWD + 'lib/';
export const LOG_CWD = ROOT_CWD + 'log/';
export const WWW_CWD = ROOT_CWD + 'www/';
export const IND_CWD = ROOT_CWD + 'ind/';
export const FTMP_CWD = ROOT_CWD + 'ftmp/';
export const MOD_CWD = ROOT_CWD + 'mod/';
