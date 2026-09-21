import * as sCtr from '../../../../sys/ctr.js';

export default class extends sCtr.Ctr {

    public onReqStart(): number {
        return 0;
    }

    public onLoad(): false {
        if (this._req.url === '/permanent') {
            return this._location('/target', 301);
        }
        if (this._req.url === '/temporary') {
            return this._location('/target');
        }
        this._res.setHeader('location', '/target');
        return false;
    }

}
