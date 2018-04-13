import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { BaseHttpService } from '../../../@core/service/base-http.service';
import { ListHandler } from './../../../@core/utils/list-handler';

import { WeekReport } from './../../../shared/week-report/week-report';
import { GlobalService } from './../../../shared/global.service';

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

  menu$: Observable<any>;
  
  number$: Observable<any>;

  reportsHandler: ListHandler;

  weekSelect: string = 'This Week';

  currentWeek: number;

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

  constructor(
    private service: SmartTableService,
    private http: BaseHttpService,
    private global: GlobalService
  ) {
    // const data = this.service.getData();
    // const foo: Date = new Date();
    // foo.getDate() * foo.getMonth() * 
    this.dateItems = this.global.getWeeks();
    this.currentWeek = this.global.getWeek();
    this.reportsHandler = this.http.listHandler('reports');
    /*let foo = {
      "dayOfWeek": "Monday",
      "workContent": "搭建 app 后台服务框架",
      "workType": "编码/单元测试",
      "complexiy": "中",
      "workingHours":2,
      "completion": "项目骨架完成。登录、注册接口合一。"
    };
    this.reportsHandler.add(foo);
    this.number$ = this.http.listHandler('/numbers').get({
      queryFn: (ref) =>  ref.orderByChild('name').equalTo('one'),
      isKey: true
    });*/
    this.reportsHandler.get({
      queryFn: (ref) =>  ref.orderByChild('weekIndex').equalTo(this.currentWeek),
      isKey: true
    }).subscribe(data => {
      this.source.load(data);
    });
  }

  foo(weekSelect) {
    this.weekSelect = weekSelect;
    let selectWeek: number;
    if (weekSelect === 'This Week') {
      selectWeek = this.currentWeek;
    } else {
      selectWeek = parseInt(weekSelect.split('-')[1]);
    }
    this.reportsHandler.get({
      queryFn: (ref) =>  ref.orderByChild('weekIndex').equalTo(selectWeek),
      isKey: true
    }).subscribe(data => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event);
      const report: WeekReport = event.data;
      this.reportsHandler.drop(report.key)
      .subscribe(
        () => event.confirm.resolve()
        , (error) => event.confirm.reject()
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    const report: WeekReport = event.newData;
    report.weekIndex = this.currentWeek;
    this.reportsHandler.add(report)
    .subscribe(
      () => event.confirm.resolve()
      , (error) => event.confirm.reject()
    );
  }
  
  onEditConfirm(event): void {
    const report: WeekReport = event.newData;
    this.reportsHandler.update(report.key, report)
    .subscribe(
      () => event.confirm.resolve()
      , (error) => event.confirm.reject()
    );
  }
}
