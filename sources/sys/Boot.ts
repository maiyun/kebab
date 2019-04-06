import * as sni from "@litert/tls-sni";

import * as Fs from "../lib/Fs";
import * as c from "../const";
import * as abs from "../abstract";

/**
* --- 重新加载 vhost 以及证书 ---
* --- 需要所有线程同时重新加载 ---
*/
export async function reload(VHOSTS: abs.Vhost[], SNI_MANAGER: sni.certs.ICertificateManager) {
   // --- 重新加载 VHOST 信息 ---
   let files = await Fs.readDir(c.VHOST_PATH);
   VHOSTS = [];
   for (let file of files) {
       let list: abs.Vhost[] = JSON.parse(await Fs.readFile(c.VHOST_PATH + file));
       if (!Array.isArray(list)) {
           list = [list];
       }
       for (let vhost of list) {
           VHOSTS.push(vhost);
       }
   }
   // --- 重新加载证书 ---
   SNI_MANAGER.clear();
   for (let vhost of VHOSTS) {
       let cert = await Fs.readFile(c.CERT_PATH + vhost.cert);
       let key = await Fs.readFile(c.CERT_PATH + vhost.key);
       try {
           SNI_MANAGER.use(vhost.name, cert, key);
       } catch (e) {
           console.log("SNI: " + e);
       }
   }
}