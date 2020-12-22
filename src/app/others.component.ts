import { Component, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { TokenService } from 'spotify-auth';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { utilisateur } from './user.component'
import { playlist, owner } from './playlists.component';

export interface search {
  id: string;
  type: string;
}

@Component({
  selector: 'other-info',
  template: `
    <div *ngIf="Access()">
      <app-form style="margin-top: 50px" [cur_search]="this.tmp_search" [formType]="true" (newSearch)="makeSearch($event)"></app-form>
      <other-details style="margin-top: 50px" *ngIf="display_search"
        [SearchCurrent]="tmp_search"
        [PlaylistList]="ListPlaylists"
        [UserCurrent]="cur_user"
      ></other-details>
    </div>
    <div *ngIf="!Access()">
      <app-wait [details]="'No search information available'"></app-wait>
    </div>
  `,
  styleUrls: []
})
export class OthersComponent implements OnDestroy{

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}

  private stream: Subscription | null = null;
  public all: {} = {};
  public ListPlaylists: playlist[] = [];
  public cur_user: utilisateur = {
    image: '',
    country: '',
    name: '',
    id: '',
    type: '',
    followers: 0,
    email: '',
    url: ''
  }
  public tmp_search: search = {
    id: 'val061',
    type: 'Infos'
  }
  private total: number = 0;
  private tmp: owner[] = [];
  public display_search: boolean = false;

  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {}

  public get jOthers(): {} {
    return JSON.stringify(this.all, null, 2);
  }

  openSearch() {
    this.display_search = true;
  }

  closeSearch() {
    this.display_search = false;
  }

  makeSearch(mySearch: search) {

    const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
      return this.infoSvc.fetchAllOtherInfo(this.tmp_search);
    }));

    this.stream = stream.subscribe((x) => this.all = x);

    if(mySearch.type == 'Playlists') {

      this.infoSvc.fetchAllOtherInfo(this.tmp_search).subscribe((x:any) => {
        this.total = this.all["total"];

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
          this.tmp[index].id = this.all["items"][index]["owner"]["id"];
          this.tmp[index].name = this.all["items"][index]["owner"]["display_name"];
          this.tmp[index].type = this.all["items"][index]["owner"]["type"];
        }

        for (let index = 0; index < this.total; index++) {
          this.ListPlaylists[index].collaboratif = this.all["items"][index]["collaborative"];
          this.ListPlaylists[index].description = this.all["items"][index]["description"];
          this.ListPlaylists[index].image = this.all["items"][index]["images"][0]["url"];
          this.ListPlaylists[index].name = this.all["items"][index]["name"];
          this.ListPlaylists[index].tracks = this.all["items"][index]["tracks"]["total"];
          this.ListPlaylists[index].url = this.all["items"][index]["external_urls"]["spotify"];
          this.ListPlaylists[index].master = this.tmp[index];
        }
      });
    }
    else if (mySearch.type == 'Infos') {

      this.infoSvc.fetchAllOtherInfo(this.tmp_search).subscribe((x:any) => {
        this.cur_user.image = this.all["images"][0]["url"];
        this.cur_user.country = this.all["country"];
        this.cur_user.name = this.all["display_name"];
        this.cur_user.email = this.all["email"];
        this.cur_user.id = this.all["id"];
        this.cur_user.type = this.all["type"];
        this.cur_user.followers = this.all["followers"]["total"];
        this.cur_user.url = this.all["external_urls"]["spotify"];
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
