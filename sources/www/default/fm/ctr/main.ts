import * as abs from "../../../../abstract";

let C: abs.CtrConst;

export function __onLoad(con: any) {
    C = con;
}

export function __onOpen() {
    // --- None ---
}

export function main() {
    return `<a href="${C.HTTP_BASE}test/main">Hello world! Click here to visit demo.</a>`;
}