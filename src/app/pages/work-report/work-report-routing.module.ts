import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkReportComponent } from './work-report.component';
import { MainWorkComponent } from './main-work/main-work.component';

const routes: Routes = [{
  path: '',
  component: WorkReportComponent,
  children: [{
    path: 'main-work',
    component: MainWorkComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkReportRoutingModule { }

export const routedComponents = [
  WorkReportComponent,
  MainWorkComponent,
];
