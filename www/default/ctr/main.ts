import * as ctr from '~/sys/ctr';

export class Main extends ctr.Ctr {

    public index(): string {
        return `<a href="${this._config.const.urlBase}test">Hello world! Click here to visit demo.</a>`;
    }

}
