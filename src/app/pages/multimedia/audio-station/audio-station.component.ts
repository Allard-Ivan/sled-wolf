import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, NavigationError } from '@angular/router';

import { GlobalService } from './../../../shared/global.service';

@Component({
  selector: 'audio-station',
  templateUrl: './audio-station.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AudioStationComponent implements OnInit {

  searchTxt: string;

  constructor(
    private global: GlobalService,
    private routeInfo: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.searchTxt = params['search'];
    });
  }

}
