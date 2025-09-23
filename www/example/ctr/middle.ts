import * as kebab from '#kebab/index.js';
import * as sCtr from '#kebab/sys/ctr.js';

export default class extends sCtr.Ctr {

    public onLoad(): string | boolean {
        if (this._config.const.path !== 'test/middle') {
            return true;
        }
        return '_action: ' + this._action + "<br><br>In fact, the middle method does not exist in the test controller, which uses Kebab's middle structure to preprocess requests.";
    }

    public onUnload(rtn: string | boolean | kebab.DbValue[]): string | boolean | kebab.DbValue[] {
        if (!Array.isArray(rtn)) {
            return rtn;
        }
        if (rtn[0] !== -101) {
            return rtn;
        }
        rtn.push({
            'middle': 'unload'
        });
        return rtn;
    }

}
