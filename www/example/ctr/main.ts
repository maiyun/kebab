import * as ctr from '~/sys/ctr.js';

export default class extends ctr.Ctr {

    public index(): string {
        return `<a href="${this._config.const.urlBase}test">Hello world! Click here to visit demo.</a>`;
    }

}
