import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ListHandler } from './../utils/list-handler';
import { ObjectHandler } from './../utils/object-handler';

// 建立一個config interface藉此來實做未來要傳的參數名稱型態
export interface BaseHttpConfig {
  isKey: boolean;
  queryFn?: QueryFn;
}

@Injectable()
export class BaseHttpService {
  
  constructor(private _db: AngularFireDatabase) { }

  listHandler(url: string) {
    return new ListHandler(this._db, url);
  }

  objectHandler(url: string) {
    return new ObjectHandler(this._db, url);
  }
}
