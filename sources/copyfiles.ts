import * as Fs from "./lib/Fs";
import * as c from "./const";

(async () => {
    let from = c.TOP_PATH + "sources/";
    let to = c.ROOT_PATH;

    console.log("Processing...");
    await Fs.sync(from, to);
    console.log("Done.");
})();
