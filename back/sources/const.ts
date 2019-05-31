export const VER = "0.0.1";

// --- 服务端用的路径 ---

let dirname = __dirname.replace(/\\/g, "/");

export const BACK_PATH = dirname.slice(0, dirname.lastIndexOf("/") + 1);
export const ROOT_PATH = BACK_PATH.slice(0, BACK_PATH.slice(0, -1).lastIndexOf("/") + 1);
export const SOURCES_PATH = BACK_PATH + "sources/";
export const FRONT_PATH = BACK_PATH.slice(0, -5) + "front/";
export const CONF_PATH = BACK_PATH + "conf/";
export const VHOST_PATH = CONF_PATH + "vhost/";
export const CERT_PATH = CONF_PATH + "cert/";

export const DIST_PATH = dirname + "/";
export const FTMP_PATH = DIST_PATH + "ftmp/";
export const LIB_PATH = DIST_PATH + "lib/";
export const WWW_PATH = DIST_PATH + "www/";