import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { BaseHttpService } from '../../../@core/service/base-http.service';
import { ListHandler } from './../../../@core/utils/list-handler';

import { WeekReport } from './../../../shared/week-report/week-report';
import { GlobalService } from './../../../shared/global.service';
import { ModalComponent } from './../../../shared/modal/modal.component';

@Component({
  selector: 'main-work',
  templateUrl: './main-work.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MainWorkComponent {

  dateItems: string[] = [];

  menu$: Observable<any>;
  number$: Observable<any>;

  reportsHandler: ListHandler;

  weekSelect: string = 'This Week';
  weekIndex: number;
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
    private global: GlobalService,
    private modalService: NgbModal
  ) {
    // const data = this.service.getData();
    // const foo: Date = new Date();
    // foo.getDate() * foo.getMonth() * 
    this.dateItems = this.global.getWeeks();
    this.currentWeek = this.global.getWeek();
    this.weekIndex = this.currentWeek;
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

  weekSelectionChanged(weekSelect) {
    this.weekSelect = weekSelect;
    this.weekIndex = weekSelect === 'This Week' ? this.currentWeek : parseInt(weekSelect.split('-')[1]);
    this.reportsHandler.get({
      queryFn: (ref) =>  ref.orderByChild('weekIndex').equalTo(this.weekIndex),
      isKey: true
    }).subscribe(data => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Report Delete';
    activeModal.componentInstance.modalContent = `Do you really want to delete it?`;
    activeModal.componentInstance.determine = () => {
      const report: WeekReport = event.data;
      this.reportsHandler.drop(report.key)
      .subscribe(
        () => event.confirm.resolve()
        , (error) => event.confirm.reject()
      );
      activeModal.close();
    };
  }

  onCreateConfirm(event): void {
    const report: WeekReport = event.newData;
    report.weekIndex = this.weekIndex;
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
