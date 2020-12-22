import { Component, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { TokenService } from 'spotify-auth';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { search } from './others.component';

export interface artist {
  name: string;
  popularity: string;
  followers: string;
  img: string;
  url: string;
}

export interface track {
  name: string;
  popularity: string;
  img: string;
  url: string;
}

@Component({
  selector: 'top-info',
  template: `
    <div *ngIf="Access()">
      <app-form style="margin-top: 50px" [cur_search]="this.tmp_search" [formType]="false" (newSearch)="makeSearch($event)"></app-form>
      <top-details style="margin-top: 50px" *ngIf="display_search"
        [SearchCurrent]="tmp_search"
        [TracksList]="ListTracks"
        [ArtistsList]="ListArtists"
      ></top-details>
    </div>
    <div *ngIf="!Access()">
      <app-wait [details]="'No top information available'"></app-wait>
    </div>
  `,
  styleUrls: []
})
export class TopComponent implements OnDestroy{

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}

  private stream: Subscription | null = null;
  public all: {} = {};
  public tmp_search: search = {
    id: '',
    type: 'Tracks'
  }
  public ListTracks: track[] = [];
  public ListArtists: artist[] = [];
  private total: number = 0;
  public display_search: boolean = false;

  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {}

  public get jOthers(): {} {
    return JSON.stringify(this.all["items"], null, 2);
  }

  openSearch() {
    this.display_search = true;
  }

  closeSearch() {
    this.display_search = false;
  }

  makeSearch(mySearch: search) {

    const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
      return this.infoSvc.fetchUserTop(this.tmp_search);
    }));

    this.stream = stream.subscribe((x) => this.all = x);

    if(mySearch.type == 'Tracks') {
      this.total = 0;

      this.infoSvc.fetchUserTop(this.tmp_search).subscribe((x:any) => {
        this.total = this.all["limit"];

        for (let index = 0; index < this.total; index++) {
          this.ListTracks.push({
            name: '',
            popularity: '',
            img: '',
            url: ''
          });
        }
      });

      this.infoSvc.fetchUserTop(this.tmp_search).subscribe((x:any) => {
        this.total = this.all["limit"];

        for (let index = 0; index < this.total; index++) {
          this.ListTracks[index].name = this.all["items"][index]["name"];
          this.ListTracks[index].popularity = this.all["items"][index]["popularity"];
          this.ListTracks[index].img = this.all["items"][index]["album"]["images"][1]["url"];
          this.ListTracks[index].url = this.all["items"][index]["external_urls"]["spotify"];
        }
      });
    }
    else if (mySearch.type == 'Artists') {
      this.total = 0;

      this.infoSvc.fetchUserTop(this.tmp_search).subscribe((x:any) => {
        this.total = this.all["limit"];

        for (let index = 0; index < this.total; index++) {
          this.ListArtists.push({
            name: '',
            popularity: '',
            followers: '',
            img: '',
            url: ''
          });
        }

          for (let index = 0; index < this.total; index++) {
            this.ListArtists[index].name = this.all["items"][index]["name"];
            this.ListArtists[index].popularity = this.all["items"][index]["popularity"];
            this.ListArtists[index].followers = this.all["items"][index]["followers"]["total"];
            this.ListArtists[index].img = this.all["items"][index]["images"][0]["url"];
            this.ListArtists[index].url = this.all["items"][index]["external_urls"]["spotify"];
          }
      });
    }

    this.openSearch();
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
