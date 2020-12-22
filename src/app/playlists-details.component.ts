import { Component, Input } from '@angular/core';
import { playlist } from './playlists.component';

@Component({
  selector: 'playlists-details',
  template: `
    <div *ngIf="cur_playlist.name != ''">
      <h2>{{cur_playlist.name}} - {{cur_playlist.tracks}} tracks</h2>
      <p>{{cur_playlist.description}}</p>
      <p>{{cur_playlist.master.id}} - {{cur_playlist.master.name}}</p>
      <a href={{cur_playlist.url}}>
        <img style="width: 600px" src={{cur_playlist.image}}/>
      </a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class PlaylistsDetailsComponent {

  @Input() cur_playlist: playlist;


}

