window.onerror = (msg, uri, line, col, err) => {
    if (err) {
        alert("Error:\n" + err.message + "\n" + err.stack + "\nLine: " + line + "\nColumn: " + col);
    } else {
        console.log(msg);
    }
};

/** head 标签 */
let headElement: HTMLHeadElement;
document.addEventListener("DOMContentLoaded", async function() {
    headElement = document.getElementsByTagName("head")[0];
    if (typeof fetch !== "function") {
        await loadScript(["https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/fetch.min.js"]);
    }
    // --- 组件注册 ---
    // --- Button ---
    Vue.component("mu-button", {
        template: `<div class="button" tabindex="0"><div class="button__in"><div class="button__txt"><slot></div></div></div>`
    });
    // --- Line ---
    Vue.component("mu-line", {
        template: `<div class="line"></div>`
    });
    // --- List ---
    Vue.component("mu-list", {
        model: {
            prop: "value",
            event: "change"
        },
        data: function () {
            return {
                selectedIndex: 0
            };
        },
        props: {
            list: {
                default: []
            },
            height: {
                default: "200px"
            },
            value: {
                default: 0
            }
        },
        watch: {
            value: function (this: any) {
                this.selectedIndex = this.value;
            }
        },
        methods: {
            click: function(this: any, index: number) {
                this.selectedIndex = index;
                this.$emit("change", index);
            }
        },
        template: `<div class="list" tabindex="0">` +
            `<div class="list__in" :style="{\'height\': height}">` +
                `<div v-for="(val, index) of list" class="list__item" :class="{\'selected\': selectedIndex === index}" @click="click(index)">{{val.label || val}}</div>` +
            `</div>` +
        `</div>`
    });
    new Vue({
        el: "#vue",
        data: {
            mask: false,
            alert: "",
            tab: tab,
            // --- Password ---
            password: "",
            // --- Check ---
            mindex: 0,
            mlist: [],
            list: [],
            // --- System ---
            latestVer: "0",
            updateList: [],
            updateing: false,
            updateIndex: 0,
            // --- Config ---
            configTxt: `"etc": {\n    "__Nuttom__": {\n        "pwd": "Your password"\n    }\n}`
        },
        methods: {
            // --- Check ---
            refresh: async function (this: any) {
                this.mask = true;
                let j = await post(HTTP_BASE + "__Nuttom__/apiCheckRefresh", {password: this.password});
                this.mask = false;
                if (j.result <= 0) {
                    this.alert = j.msg;
                }
                this.mlist = j.list;
            },
            check: async function (this: any) {
                if (!this.mlist[this.mindex]) {
                    this.alert = "Please select version.";
                    return;
                }
                this.mask = true;
                let j = await post(HTTP_BASE + "__Nuttom__/apiCheck", {password: this.password, ver: this.mlist[this.mindex].value});
                this.mask = false;
                if (j.result <= 0) {
                    this.alert = j.msg;
                    return;
                }
                let list = [];
                for (let v of j.files) {
                    list.push(`Cannot match "${v}".`);
                }
                this.list = list;
                if (list.length === 0) {
                    this.alert = "All content is normal.";
                }
            },
            // --- System ---
            getLatestVer: async function (this: any) {
                this.mask = true;
                let j = await post(HTTP_BASE + "__Nuttom__/apiGetLatestVer", {password: this.password});
                this.mask = false;
                if (j.result <= 0) {
                    this.alert = j.msg;
                    return;
                }
                this.latestVer = j.version;
            },
            build: async function (this: any) {
                this.mask = true;
                let j = await post(HTTP_BASE + "__Nuttom__/apiBuild", {password: this.password});
                this.mask = false;
                if (j.result <= 0) {
                    this.alert = j.msg;
                    return;
                }
                this.alert = "Successful.";
            },
            // --- 自动升级 ---
            update: async function (this: any) {
                if (this.updateing) {
                    this.alert = "Upgrade running...";
                    return;
                }
                if (!this.mlist[this.updateIndex]) {
                    this.alert = "Please select version.";
                    return;
                }
                this.updateing = true;
                this.mask = true;
                let version: string = this.mlist[this.updateIndex].value;
                // --- 获取差异列表 ---
                this.mask = true;
                this.updateList = [];
                let j = await post(HTTP_BASE + "__Nuttom__/apiCheck", {password: this.password, ver: version});
                this.mask = false;
                if (j.result <= 0) {
                    this.alert = j.msg;
                    this.updateing = false;
                    return;
                }
                // --- 建立 WebSocket ---
                let ws = new WebSocket(WS_PATH + HTTP_BASE + "__Nuttom__/update");
                ws.addEventListener("open", () => {
                    // --- 先进行 password 认证 ---
                    ws.send(JSON.stringify({password: this.password, ver: version}));
                });
                ws.addEventListener("message", (ev: MessageEvent) => {
                    let json = JSON.parse(ev.data);
                    if (json.result <= 0) {
                        this.alert = json.msg;
                        this.updateing = false;
                        return;
                    } else if (json.result === 1) {
                        // --- 发送要更新的列表 ---
                        ws.send(JSON.stringify({files: j.files}));
                    } else if (json.result === 2) {
                        this.updateList.unshift(json.msg);
                    } else {
                        this.updateList.unshift(json.msg);
                        this.alert = json.msg;
                    }
                });
                ws.addEventListener("close", () => {
                    // --- 结束 ---
                    if (this.updateing === true) {
                        this.updateing = false;
                    }
                });
            }
        }
    });
});
document.addEventListener("touchstart", function() {});

/**
 * --- 顺序加载 js ---
 * @param paths 要加载文件的路径数组
 */
function loadScript(paths: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            if (paths.length > 0) {
                for (let path of paths) {
                    let pathLio = path.lastIndexOf("?");
                    if (pathLio !== -1) {
                        path = path.slice(0, pathLio);
                    }
                    if (headElement.querySelector(`[data-res="${path}"]`)) {
                        continue;
                    }
                    await _loadScript(path);
                }
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}
/**
 * 加载 script 标签并等待返回成功（无视是否已经加载过）
 */
function _loadScript(path: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let script = document.createElement("script");
        script.setAttribute("data-res", path);
        script.addEventListener("load", () => {
            resolve();
        });
        script.addEventListener("error", (e) => {
            reject(e);
        });
        script.src = path;
        headElement.appendChild(script);
    });
}

/**
 * --- 发起 post 请求 ---
 * @param url 要请求的 URL 地址
 * @param data 发送的数据
 */
function post(url: string, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let header = new Headers();
            let body = new FormData();
            for (let k in data) {
                if (data[k] !== undefined) {
                    body.append(k, data[k]);
                }
            }
            let res = await fetch(url, {
                method: "POST",
                headers: header,
                credentials: "include",
                body: body
            });
            let text;
            let ct = res.headers.get("Content-Type") || "";
            if (ct.indexOf("json") !== -1) {
                text = await res.json();
            } else {
                text = await res.text();
            }
            resolve(text);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * --- 休眠一段时间 ---
 * @param timeout 休眠时间
 */
function sleep(timeout: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}