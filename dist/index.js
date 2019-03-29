"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2 = require("http2");
const os = require("os");
const cluster = require("cluster");
let cpuLen = os.cpus().length;
if (cluster.isMaster) {
    console.log("Master start...");
    for (let i = 0; i < cpuLen; ++i) {
        cluster.fork();
    }
    cluster.on("listening", function (worker, address) {
        console.log("Listening: worker " + worker.process.pid + ", Address: " + address.address + ":" + address.port + ".");
    });
    cluster.on("exit", function (worker, code, signal) {
        console.log("Worker " + worker.process.pid + " died.");
    });
}
else {
    let server = http2.createSecureServer({});
}
