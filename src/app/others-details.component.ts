import { Component, Input } from '@angular/core';
import { utilisateur } from './user.component'
import { playlist } from './playlists.component';
import { album } from './albums.component';

export interface search {
  id: string;
  type: string;
}

@Component({
  selector: 'other-details',
  template: `

    <div *ngIf="SearchCurrent.type == 'Playlists'">
      <div *ngIf="PlaylistList.length != 0">
        <ul style="padding-inline-start: 0" *ngFor="let currentPlay of PlaylistList">
          <playlists-details style="margin-top: 50px" [cur_playlist]="currentPlay"></playlists-details>
        </ul>
      </div>
    </div>

    <div *ngIf="SearchCurrent.type == 'Infos'">
      <div *ngIf="UserCurrent.name != ''">
        <user-details style="margin-top: 50px" [UserCurrent]="UserCurrent"></user-details>
      </div>
    </div>

  `,
  styleUrls: []
})
export class OthersDetailsComponent {
  @Input() SearchCurrent: search;
  @Input() PlaylistList: playlist[];
  @Input() UserCurrent: utilisateur;

}
