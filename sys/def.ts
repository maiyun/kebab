/**
 * Project: Kebab, User: JianSuoQiYue
 * Date: 2019-3-30 12:46:41
 * Last: 2020-3-8 21:04:24, 2022-07-22 14:20:34, 2023-5-24 01:34:57
 * --- 本文件用来定义每个目录实体地址的常量 ---
 */

/** --- 当前系统版本号 --- */
export const VER = '1.0.1';

// --- 服务端用的路径 ---

/** /xxx/dist */
const dirname = __dirname.replace(/\\/g, '/');

export const ROOT_PATH = dirname.slice(0, -3);
export const CONF_PATH = ROOT_PATH + 'conf/';
export const CERT_PATH = CONF_PATH + 'cert/';
export const VHOST_PATH = CONF_PATH + 'vhost/';
export const LIB_PATH = ROOT_PATH + 'lib/';
export const LOG_PATH = ROOT_PATH + 'log/';
export const SYS_PATH = ROOT_PATH + 'sys/';
export const WWW_PATH = ROOT_PATH + 'www/';
export const IND_PATH = ROOT_PATH + 'ind/';
export const FTMP_PATH = ROOT_PATH + 'ftmp/';
