"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readFile(path, options = "utf-8") {
    return new Promise(async (resolve, reject) => {
        fs.readFile(path, options, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.readFile = readFile;
