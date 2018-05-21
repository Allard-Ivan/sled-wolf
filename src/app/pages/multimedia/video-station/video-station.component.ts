import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'video-station',
  templateUrl: './video-station.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class VideoStationComponent implements OnInit {

  @ViewChild('youkuplayer')
  youkuplayer: ElementRef;

  constructor(private http: Http,
              private routeInfo: ActivatedRoute,) {
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      const searchTxt = params['search'];
      let url = 'https://www.soku.com/search_video/q_' + searchTxt;
      this.http.get(url)
      .map(res => res.text())
      .subscribe(data => {
        let bar = data.match(/id_.*?\./);
        let vidTotal = bar[0];
        let vid = vidTotal.slice(vidTotal.indexOf('_') + 1, vidTotal.lastIndexOf('.'));
        let player = new YKU.Player('youkuplayer', this.youkuplayer.nativeElement, {
          styleid: '0',
          client_id: 'd61f1e601a312087',
          vid: vid,
          newPlayer: true
        });
      });
    });
  }

}
