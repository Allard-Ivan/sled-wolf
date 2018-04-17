import { Component, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { PlayerService, Track } from '../../../@core/data/player.service';
import { NbSearchService } from "@nebular/theme/components/search/search.service";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-player',
  styleUrls: ['./player.component.scss'],
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  track: Track;
  player: HTMLAudioElement;
  shuffle: boolean;
  currentProgress: number;
  progressTimer: NodeJS.Timer;
  timerDestory: boolean = true;

  constructor(private playerService: PlayerService,
              private searchService: NbSearchService,
              private sanitization:DomSanitizer,
              private http: Http) {
    this.track = this.playerService.random();
    this.createPlayer();
    this.getProgress();
  }

  ngOnInit() {
    this.searchService.onSearchSubmit().subscribe(data => {
      const musicUri = 'https://api.imjad.cn/cloudmusic/?';
      let url: string = musicUri + 'type=search&s=' + data.term;
      this.http.get(url).map(res => res.json())
        .subscribe(data => {
          const song = data.result.songs[0];
          let track: Track = new Track();
          const trackId = song.id;
          track.name = song.name;
          track.artist = song.ar[0].name;
          track.cover = this.sanitization.bypassSecurityTrustStyle(`url(${song.al.picUrl})`);
          url = musicUri + 'type=song&id=' + trackId;
          this.http.get(url).map(res => res.json())
            .subscribe(dataSong => {
              track.url = dataSong.data[0].url;
              this.track = track;
              if (this.track) {
                this.playerService.playlist.push(track);
                this.playerService.next();
                this.reload();
              }
            });
      });
    });
  }

  ngOnDestroy() {
    this.player.pause();
    this.player.src = '';
    this.player.load();
    if (!this.timerDestory) {
      clearInterval(this.progressTimer);
    }
  }

  prev() {
    if (!this.player.loop) {
      if (this.shuffle) {
        this.track = this.playerService.random();
      } else {
        this.track = this.playerService.prev();
      }
    }

    this.reload();
  }

  next() {
    if (!this.player.loop) {
      if (this.shuffle) {
        this.track = this.playerService.random();
      } else {
        this.track = this.playerService.next();
      }
    }

    this.reload();
  }

  playPause() {
    if (this.player.paused) {
      this.timerDestory = false;
      this.player.play();
      this.progressTimer = setInterval(() => {
        this.getProgress();
      }, 1000);
    } else {
      this.timerDestory = true;
      this.player.pause();
      clearInterval(this.progressTimer);
    }
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  toggleLoop() {
    this.player.loop = !this.player.loop;
  }

  setVolume(volume: number) {
    this.player.volume = volume / 100;
  }

  getVolume(): number {
    return this.player.volume * 100;
  }

  setProgress(duration: number) {
    this.player.currentTime = this.player.duration * duration / 100;
    this.getProgress();
  }

  getProgress() {
    this.currentProgress = this.player.currentTime / this.player.duration * 100 || 0;
  }

  private createPlayer() {
    this.player = new Audio();
    this.player.onended = () => this.next();
    this.setTrack();
  }

  private reload() {
    this.setTrack();
    this.player.play();
    this.getProgress();
    if (this.timerDestory) {
      this.timerDestory = false;
      this.progressTimer = setInterval(() => {
        this.getProgress();
      }, 1000);
    }
  }

  private setTrack() {
    this.player.src = this.track.url;
    this.player.load();
  }
}
