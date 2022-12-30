import * as ctr from '~/sys/ctr';

export default class extends ctr.Ctr {

    public onLoad(): any {
        if (this._config.const.path !== 'test/middle') {
            return true;
        }
        return '_action: ' + this._action + "<br><br>In fact, the middle method does not exist in the test controller, which uses Kebab's middle structure to preprocess requests.";
    }

}
