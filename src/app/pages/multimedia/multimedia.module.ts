import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { MultimediaRoutingModule, routedComponents } from './multimedia-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { PlayerComponent } from "./player/player.component";

@NgModule({
  imports: [
    ThemeModule,
    MultimediaRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    PlayerComponent
  ],
  providers: [
    SmartTableService,
  ],
})
export class MultimediaModule { }
