export const VER = "0.0.1";

// --- 服务端用的路径 ---

let dirname = __dirname.replace(/\\/g, "/");

export const TOP_PATH = dirname.substr(0, dirname.lastIndexOf("/") + 1);
export const CONF_PATH = TOP_PATH + "conf/";
export const VHOST_PATH = CONF_PATH + "vhost/";
export const CERT_PATH = CONF_PATH + "cert/";

export const ROOT_PATH = __dirname + "/";
export const LIB_PATH = ROOT_PATH + "lib/";
export const WWW_PATH = ROOT_PATH + "www/";