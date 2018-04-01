import { AngularFireDatabase, QueryFn, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { dbTimeObject } from './db-time.function';

// 建立一個config interface藉此來實做未來要傳的參數名稱型態
export interface RealTimeDbConfig {
    isKey: boolean;
    queryFn?: QueryFn;
}

export class ListHandler {
    url: string;
    _fireList: AngularFireList<{}>;
    constructor(private _db: AngularFireDatabase, private _url) {
      this.url = _url;
      this._fireList = this._db.list(_url);
    }
    get(config: RealTimeDbConfig = { isKey: true }) {
      const req = config.queryFn ?
      this._db.list(this.url, config.queryFn) : this._fireList;
      return config.isKey ?
        req.snapshotChanges().map(
          actions => actions.map(action => ({ key: action.key, ...action.payload.val() }))) :
        req.valueChanges();
    }
    add<T>(data: T) {
      return Observable.fromPromise(this._fireList.push(dbTimeObject(data)));
    }
    delete(key: string): Observable<any> {
      return key ?
        Observable.fromPromise(this._fireList.remove(key)) :
        Observable.throw(new Error('no key!'));
    }
    update<T>(key, data: T) {
      return Observable.fromPromise(this._fireList.update(key, dbTimeObject(data, false)));
    }
    set<T>(key, data: T) {
      return Observable.fromPromise(this._fireList.set(key, dbTimeObject(data, false)));
    }
    drop() {
      return Observable.fromPromise(this._fireList.remove());
    }
  }