import { Component } from '@angular/core';

import { GlobalService } from './../../../shared/global.service';

@Component({
  selector: 'video-station',
  templateUrl: './video-station.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VideoStationComponent {

  constructor(
    private global: GlobalService
  ) {
  }
}
