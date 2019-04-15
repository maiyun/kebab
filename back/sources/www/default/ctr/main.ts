import * as abs from "../../../abstract";

let Global: abs.GlobalConst;

console.log("1");

export function __onOpen(gs: abs.GlobalConst) {
    Global = gs;
}

export function main() {
    return `<a href="${Global.HTTP_BASE}test/main">Hello world! Click here to visit demo.</a>`;
}