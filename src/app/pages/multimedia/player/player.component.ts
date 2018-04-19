import { Component, HostBinding, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { PlayerService, Track } from '../../../@core/data/player.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-player',
  styleUrls: ['./player.component.scss'],
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  search: string;

  track: Track;
  player: HTMLAudioElement;
  shuffle: boolean;
  currentProgress: number;
  progressTimer: NodeJS.Timer;
  timerDestory: boolean = true;

  constructor(private playerService: PlayerService,
              private sanitization:DomSanitizer,
              private themeService: NbThemeService, 
              private http: Http) {
    this.track = this.playerService.random();
    this.createPlayer();
    this.getProgress();
  }

  ngOnInit() {
    // window.onkeydown = event => {
    //   if (32 === event.keyCode) {
    //     this.playPause();
    //   }
    // }
    this.themeService.changeTheme('cosmic');
  }

  ngOnChanges() {
    const musicUri = 'https://api.imjad.cn/cloudmusic/?';
    let url: string = '';
    const searchArr = this.search.split(':');
    if (searchArr.length === 2) {
      url = musicUri + 'type=search&search_type=1000&s=' + searchArr[1];
      this.http.get(url).map(res => res.json())
        .subscribe(songlist => {
          const arr = songlist.result[0].playlists;
          const tracks: Track[] = [];
          arr.foreach(elem => {
            const track: Track = new Track();
            const trackId = elem.id;
            track.name = elem.name;
            track.artist = elem.creator.nickname;
            track.cover = this.sanitization.bypassSecurityTrustStyle(`url(${elem.coverImgUrl})`);
            url = musicUri + 'type=song&id=' + trackId;
            this.http.get(url).map(res => res.json())
              .subscribe(dataSong => {
                track.url = dataSong.data[0].url;
                if (track) {
                  this.playerService.playlist.push(track);
                }
            });
          });
          this.playerService.playlist = tracks;
          this.playerService.current = 0;
          this.track = tracks[0];
          this.reload();
        })
    } else {
      url = musicUri + 'type=search&s=' + this.search;
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
    }
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
