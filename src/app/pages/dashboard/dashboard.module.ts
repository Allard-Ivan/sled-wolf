import { NgModule } from '@angular/core';
import { HttpModule } from "@angular//http";

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { PlayerComponent } from "./player/player.component";


@NgModule({
  imports: [
    ThemeModule,
    HttpModule
  ],
  declarations: [
    DashboardComponent,
    PlayerComponent
  ],
})
export class DashboardModule { }
