import { Component, HostBinding, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { PlayerService, Track } from '../../../@core/data/player.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Http } from '@angular/http';

export enum SearchType {
  Single,
  SongList
}

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
              private http: Http) {
    this.track = this.playerService.random();
    this.createPlayer();
    this.getProgress();
  }

  ngOnInit() {
    window.onkeypress = event => {
      if (32 === event.keyCode) {
        this.playPause();
      }
    }
  }

  ngOnChanges() {
    const musicUri = 'http://120.78.84.240:3000';
    let url: string = '';
    const searchArr = this.search.split(':');
    if (searchArr.length === 2) {
      url = musicUri + '/search?type=1000&keywords=' + searchArr[1];
      this.http.get(url).map(res => res.json())
        .subscribe(songlist => {
          const playlist = songlist.result.playlists[0];
          url = musicUri + '/playlist/detail?id=' + playlist.id;
          const trackArr: Track[] = [];
          this.http.get(url).map(res => res.json())
            .subscribe(list => {
              const tracks = list.result.tracks;
              this.playerService.playlist = [];
              let trackIds = '';
              tracks.forEach(song => {
                const track = this.trackProduction(song, SearchType.SongList);
                trackArr.push(track);
                trackIds += track.id + ',';
              });
              trackIds = trackIds.substring(0, trackIds.length - 1);
              url = musicUri + '/music/url?id=' + trackIds;
              this.http.get(url).map(res => res.json())
                .subscribe(trackList => {
                  console.log(trackList);
                  const trackListData = trackList.data;
                  for (let i = 0; i < trackListData.length; i++) {
                    trackArr[i].url = trackListData[i].url;
                  }
                });
              setTimeout(() => {
                this.playerService.current = 0;
                this.playerService.playlist = trackArr;
                this.track = trackArr[0];
                this.reload();
              }, 400);
          });
        })
    } else {
      url = musicUri + '/search?keywords=' + this.search;
      this.http.get(url).map(res => res.json())
        .subscribe(data => {
          const song = data.result.songs[0];
          const track = this.trackProduction(song, SearchType.Single);
          url = musicUri + '/song/detail?ids=' + track.id;
          this.http.get(url).map(res => res.json())
          .subscribe(songDetails => {
            track.cover = this.sanitization.bypassSecurityTrustStyle(`url(${songDetails.songs[0].al.picUrl})`);
          });
          url = musicUri + '/music/url?id=' + track.id;
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


  trackProduction(song, type: SearchType): Track {
    const track = new Track();
    track.id = song.id;
    track.name = song.name;
    track.artist = song.artists[0].name;
    switch(type) {
      case SearchType.Single:
        break;
      case SearchType.SongList:
        track.cover = this.sanitization.bypassSecurityTrustStyle(`url(${song.album.picUrl})`);
        break;
    }
    return track;
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
