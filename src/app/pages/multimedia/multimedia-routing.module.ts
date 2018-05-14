import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultimediaComponent } from './multimedia.component';
import { AudioStationComponent } from './audio-station/audio-station.component';
import { VideoStationComponent } from './video-station/video-station.component';
import { ImageStationComponent } from './image-station/image-station.component';

const routes: Routes = [{
  path: '',
  component: MultimediaComponent,
  children: [{
    path: 'audio-station/:search',
    component: AudioStationComponent,
  },{
    path: 'video-station/:search',
    component: VideoStationComponent,
  },{
    path: 'image-station/:search',
    component: ImageStationComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultimediaRoutingModule { }

export const routedComponents = [
  MultimediaComponent,
  AudioStationComponent,
  VideoStationComponent,
  ImageStationComponent
];
