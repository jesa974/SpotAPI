import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { isEmpty } from 'lodash';
import { switchMap } from 'rxjs/operators/switchMap';
import { TokenService } from 'spotify-auth';
import { Subscription } from 'rxjs/Subscription';

export interface owner {
  id: string;
  name: string;
  type: string;
}

export interface playlist {
  collaboratif: string;
  description: string;
  image: string;
  name: string;
  tracks: string;
  url: string;
  master: owner;
}

@Component({
  selector: 'playlists-info',
  template: `
    <div *ngIf="Access()">
      <ul style="padding-inline-start: 0" *ngFor="let currentPlay of ListPlaylists">
        <playlists-details style="margin-top: 50px" [cur_playlist]="currentPlay"></playlists-details>
      </ul>
    </div>
    <div *ngIf="!Access()">
      <app-wait [details]="'No playlist available'"></app-wait>
    </div>
  `,
  styleUrls: []
})
export class PlaylistsComponent implements OnInit , OnDestroy{

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}

  private stream: Subscription | null = null;
  public  playlists: {} = {};
  public ListPlaylists: playlist[] = [];
  private total: number = 0;
  private tmp: owner[] = [];

  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {

    const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
      return this.infoSvc.fetchUserPlaylists();
    }));

    this.stream = stream.subscribe((x) => this.playlists = x);

    this.infoSvc.fetchUserPlaylists().subscribe((x:any) => {
      this.total = this.playlists["total"];

      for (let index = 0; index < this.total; index++) {
        this.ListPlaylists.push({
          collaboratif: '',
          description: '',
          image: '',
          name: '',
          tracks: '',
          url: '',
          master: null
        });

        this.tmp.push({
          id: '',
          name: '',
          type: ''
        });
      }

      for (let index = 0; index < this.total; index++) {
        this.tmp[index].id = this.playlists["items"][index]["owner"]["id"];
        this.tmp[index].name = this.playlists["items"][index]["owner"]["display_name"];
        this.tmp[index].type = this.playlists["items"][index]["owner"]["type"];
      }

      for (let index = 0; index < this.total; index++) {
        this.ListPlaylists[index].collaboratif = this.playlists["items"][index]["collaborative"];
        this.ListPlaylists[index].description = this.playlists["items"][index]["description"];
        this.ListPlaylists[index].image = this.playlists["items"][index]["images"][0]["url"];
        this.ListPlaylists[index].name = this.playlists["items"][index]["name"];
        this.ListPlaylists[index].tracks = this.playlists["items"][index]["tracks"]["total"];
        this.ListPlaylists[index].url = this.playlists["items"][index]["external_urls"]["spotify"];
        this.ListPlaylists[index].master = this.tmp[index];
      }
    });

  }

  public hasPlaylists(): boolean {
    return !isEmpty(this.playlists);
  }

  public get jPlaylists(): {} {
    return JSON.stringify(this.playlists, null, 2);
  }

  public Access(): boolean {
    if(this.tokenSvc.oAuthToken) {
      return true;
    }
    else {
      return false;
    }
  }
}

