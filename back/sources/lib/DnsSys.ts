import * as dns from "dns";
// --- 库和定义 ---
import * as Time from "~/lib/Time";

/**
 * --- 获取 MX 记录
 * @param hostname 域名
 */
let _mxCache: {
    [key: string]: {
        value: dns.MxRecord[];
        timeAdd: number;
    };
} = {};
export function getMx(hostname: string): Promise<dns.MxRecord[] | undefined> {
    return new Promise(function(resolve, reject) {
        let stamp = Time.stamp();
        if (_mxCache[hostname] !== undefined && _mxCache[hostname].timeAdd + 1800 > stamp) {
            resolve(_mxCache[hostname].value);
            return;
        }
        dns.resolveMx(hostname, function(err, addresses) {
            if (err) {
                resolve(undefined);
            } else {
                _mxCache[hostname] = {
                    value: addresses,
                    timeAdd: Time.stamp()
                };
                resolve(addresses);
            }
        });
    });
}