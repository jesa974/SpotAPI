import { Component, Input } from '@angular/core';
import { InfoService } from './info.service';
import { TokenService } from 'spotify-auth';
import { search } from './others.component';
import { artist, track } from './top.component';

@Component({
  selector: 'top-details',
  template: `
    <div *ngIf="SearchCurrent.type == 'Tracks'">
      <div *ngIf="TracksList.length != 0">
        <ul style="padding-inline-start: 0" *ngFor="let currentTrack of TracksList">
          <tracks-details style="margin-top: 50px" [TrackCurrent]="currentTrack" ></tracks-details>
        </ul>
      </div>
    </div>

    <div *ngIf="SearchCurrent.type == 'Artists'">
      <div *ngIf="ArtistsList.length != 0">
        <ul style="padding-inline-start: 0" *ngFor="let currentArtist of ArtistsList">
          <artists-details style="margin-top: 50px" [ArtistCurrent]="currentArtist" ></artists-details>
        </ul>
      </div>
    </div>
  `,
  styleUrls: []
})
export class TopDetailsComponent {

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}
  @Input() SearchCurrent: search;
  @Input() TracksList: track[];
  @Input() ArtistsList: artist[];
}
