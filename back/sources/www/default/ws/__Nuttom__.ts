// --- 库和定义 ---
import * as WebSocket from "~/lib/WebSocket";
import * as Net from "~/lib/Net";
import * as Sys from "~/lib/Sys";
import * as Fs from "~/lib/Fs";
import * as abs from "~/abstract";
import * as c from "~/const";

// --- 自动升级 ---
export async function update(nus: abs.Nus) {
    let isPassword = false;
    let ver = "";
    WebSocket.on(nus, {
        onData: async function(data: string) {
            let json = JSON.parse(data);
            if (json.password !== undefined) {
                if (json.password !== nus.config.etc.__Nuttom__.pwd) {
                    return [0, "Password is incorrect."];
                }
                isPassword = true;
                ver = json.ver;
                return [1];
            } else {
                if (!isPassword) {
                    return [0, "Password is incorrect."];
                }
                if (json.files !== undefined) {
                    // --- 更新文件逻辑在此 ---
                    WebSocket.send(nus, [2, "Start updating..."]);
                    for (let file of <string[]>json.files) {
                        WebSocket.send(nus, [2, `Downloading file "${file}"...`]);
                        while (true) {
                            let res = await Net.get(`https://raw.githubusercontent.com/MaiyunNET/Nuttom/v${ver}/${file}`);
                            if (!res) {
                                WebSocket.send(nus, [2, `File "${file}" download failed, retry after 2 seconds.`]);
                                await Sys.sleep(2000);
                                continue;
                            }
                            WebSocket.send(nus, [2, `The download was successful and the file is being overwritten...`]);
                            let content = await res.readContent();
                            // --- 添加文件到本地 ---
                            let dpath = c.ROOT_PATH + file.slice(0, file.lastIndexOf("/") + 1);
                            await Fs.mkdirDeep(dpath);
                            await Fs.writeFile(c.ROOT_PATH + file, content);
                            WebSocket.send(nus, [2, `The file "${file}" update was successful.`]);
                            break;
                        }
                    }
                    WebSocket.send(nus, [3, "Update completed, please check the code and restart the service."]);
                    WebSocket.close(nus);
                }
            }
        }
    });
}