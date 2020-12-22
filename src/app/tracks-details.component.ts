import { Component, Input } from '@angular/core';
import { artist, track } from './top.component';

@Component({
  selector: 'tracks-details',
  template: `
    <div>
      <h2>{{TrackCurrent.name}}</h2>
      <p>Popularity : {{TrackCurrent.popularity}}</p>
      <a href={{TrackCurrent.url}}>
        <img src={{TrackCurrent.img}}/>
      </a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})

export class TracksDetailsComponent {
  @Input() TrackCurrent: track;

  name: string;
  popularity: string;
  duration: string;
  img: string;
  url: string;
}
