import { Component, Input } from '@angular/core';
import { album } from './albums.component'

@Component({
  selector: 'albums-details',
  template: `
    <div *ngIf="cur_album.label != ''">
      <h2>{{cur_album.label}} - {{cur_album.name}} : {{cur_album.releaseDate}}</h2>
      <a href={{cur_album.url}}>
        <img src={{cur_album.image}}/>
      </a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class AlbumsDetailsComponent {

  @Input() cur_album: album;


}

