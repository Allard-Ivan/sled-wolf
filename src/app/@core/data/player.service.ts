import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

export class Track {
  id: string;
  name: string;
  artist: string;
  url: string;
  cover: SafeStyle;
}

@Injectable()
export class PlayerService {
  current: number;
  playlist: Track[] = [
    {
      id: "-1",
      name: 'Don\'t Wanna Fight',
      artist: 'Alabama Shakes',
      url: 'https://p.scdn.co/mp3-preview/6156cdbca425a894972c02fca9d76c0b70e001af',
      cover: 'assets/images/cover1.jpg',
    },
    {
      id: "-1",
      name: 'Harder',
      artist: 'Daft Punk',
      url: 'https://p.scdn.co/mp3-preview/92a04c7c0e96bf93a1b1b1cae7dfff1921969a7b',
      cover: 'assets/images/cover2.jpg',
    }
  ];

  constructor(private sanitization:DomSanitizer) {
    this.playlist.forEach(track => {
      track.cover  = this.sanitization.bypassSecurityTrustStyle(`url(${track.cover})`);
    });

  }

  random(): Track {
    this.current = Math.floor(Math.random() * this.playlist.length);
    return this.playlist[this.current];
  }

  next(): Track {
    return this.getNextTrack();
  }

  prev() {
    return this.getPrevTrack();
  }

  playTrack(trackName: string): Track {
    // trackName = trackName.toLowerCase();
    return this.playlist.find(item => item.name.toLowerCase().indexOf(trackName) != -1);
  }

  private getNextTrack(): Track {
    if (this.current === this.playlist.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }

    return this.playlist[this.current];
  }

  private getPrevTrack(): Track {
    if (this.current === 0) {
      this.current = this.playlist.length - 1;
    } else {
      this.current--;
    }

    return this.playlist[this.current];
  }
}
