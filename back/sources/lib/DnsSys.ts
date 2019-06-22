import * as dns from "dns";

/**
 * --- 获取 MX 记录
 * @param hostname 域名
 */
export function getMx(hostname: string): Promise<dns.MxRecord[] | undefined> {
    return new Promise((resolve, reject) => {
        dns.resolveMx(hostname, function(err, addresses) {
            if (err) {
                resolve(undefined);
            } else {
                resolve(addresses);
            }
        });
    });
}