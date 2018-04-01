import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { BaseHttpService } from '../../../@core/service/base-http.service';
import { ListHandler } from './../../../@core/utils/list-handler';

import { WeekReport } from './../../../shared/week-report/week-report';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  dateItems: string[] = [];

  reports: Observable<any[]>;

  menu$: Observable<any>;
  
  number$: Observable<any>;

  reportsHandler: ListHandler;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      dayOfWeek: {
        title: 'Day of Week',
        type: 'string',
      },
      workContent: {
        title: 'Work Content',
        type: 'string',
      },
      workType: {
        title: 'Work Type',
        type: 'string',
        width: '150px',
      },
      complexiy: {
        title: 'Complexiy',
        type: 'string',
      },
      workingHours: {
        title: 'Working Hours',
        type: 'number',
      },
      completion: {
        title: 'Completion',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private http: BaseHttpService) {
    // const data = this.service.getData();

    this.dateItems = ['2018-3-1', '2018-2-1'];
    this.reportsHandler = this.http.listHandler('reports');
    // let foo = {
    //   "dayOfWeek": "Monday",
    //   "workContent": "搭建 app 后台服务框架",
    //   "workType": "编码/单元测试",
    //   "complexiy": "中",
    //   "workingHours":2,
    //   "completion": "项目骨架完成。登录、注册接口合一。"
    // };
    // this.reportsHandler.add(foo);
    this.reports = this.reportsHandler.get();

    // this.number$ = this.http.listHandler('/numbers').get({
    //   queryFn: (ref) =>  ref.orderByChild('name').equalTo('one'),
    //   isKey: true
    // });
    this.reports.subscribe(data => {
      this.source.load(data);
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log('Yeah, it\'s create');
    event.confirm.resolve();
  }
  
  onEditConfirm(event): void {
    console.log('Yeah, it\'s edit');
    event.confirm.resolve();
  }
}
