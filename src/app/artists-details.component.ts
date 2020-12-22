import { Component, Input } from '@angular/core';
import { artist } from './top.component';

@Component({
  selector: 'artists-details',
  template: `
    <div>
      <h2>{{ArtistCurrent.name}}</h2>
      <p>Popularity : {{ArtistCurrent.popularity}}</p>
      <p>Followers : {{ArtistCurrent.followers}}</p>
      <a href={{ArtistCurrent.url}}>
        <img style="width: 600px" src={{ArtistCurrent.img}}/>
      </a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class ArtistsDetailsComponent {
  @Input() ArtistCurrent: artist;

}
