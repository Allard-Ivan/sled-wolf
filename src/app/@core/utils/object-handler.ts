import { AngularFireDatabase, QueryFn, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { dbTimeObject } from './db-time.function';

// 建立一個config interface藉此來實做未來要傳的參數名稱型態
export interface RealTimeDbConfig {
    isKey: boolean;
    queryFn?: QueryFn;
}

export class ObjectHandler {
    url: string;
    _fireObj: AngularFireObject<{}>;
    constructor(private _db: AngularFireDatabase, private _url) {
      this.url = _url;
      this._fireObj = this._db.object(_url);
    }

    get(url: string, config: RealTimeDbConfig = { isKey: true }) {
        const req = this._db.object(url);
        return config.isKey ?
          req.snapshotChanges().map(action => ({ key: action.key, ...action.payload.val() })) :
          req.valueChanges();
    }

    add<T>(data: T) {
      return Observable.fromPromise(this._fireObj.set(dbTimeObject(data)));
    }

    drop() {
      return Observable.fromPromise(this._fireObj.remove());
    }
  }