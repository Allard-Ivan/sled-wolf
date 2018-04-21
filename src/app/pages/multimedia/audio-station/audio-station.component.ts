import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    private routeInfo: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.searchTxt = params['search'];
    });
  }

}
