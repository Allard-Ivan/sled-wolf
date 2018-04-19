import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild('youkuplayer')
  youkuplayer: ElementRef;

  constructor(private http: Http) {
  }

  ngOnInit() {
    // this.foo();
  }

  foo() {
    this.http.get('https://www.soku.com/search_video/q_银狐传说?f=1&kb=040200000000000__q_银狐传说&spm=a2hww.20027244.')
      .map(res => res.text())
      .subscribe(data => {
        let bar = data.match(/_log_vid=".*"/);
        let vidTotal = bar[0];
        let vid = vidTotal.slice(vidTotal.indexOf("\"") + 1, vidTotal.lastIndexOf("\""));
        let player = new YKU.Player('youkuplayer', this.youkuplayer.nativeElement, {
          styleid: '0',
          client_id: 'd61f1e601a312087',
          // vid: 'XMzUyMDQ1MTE5Mg==',
          vid: vid,
          newPlayer: true
        });
      });
  }
}
