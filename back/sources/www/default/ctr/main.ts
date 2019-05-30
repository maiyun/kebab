import * as abs from "~/abstract";

export function index(nu: abs.Nu) {
    return `<a href="${nu.const.HTTP_BASE}test">Hello world! Click here to visit demo.</a>`;
}