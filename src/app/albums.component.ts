import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { omit } from 'lodash';
import { isEmpty } from 'lodash';
import { TokenService } from 'spotify-auth';
import { Subscription } from 'rxjs/Subscription';

export interface album {
  image: string;
  label: string;
  name: string;
  releaseDate: string;
  url: string;
}

@Component({
  selector: 'albums-info',
  template: `
    <div *ngIf="Access()">
      <ul *ngFor="let currentAlb of ListAlbum">
        <albums-details style="margin-top: 50px" [cur_album]="currentAlb"></albums-details>
      </ul>
    </div>
    <div *ngIf="!Access()">
      <app-wait [details]="'No album available'"></app-wait>
    </div>
  `,
  styleUrls: []
})
export class AlbumsComponent implements OnInit , OnDestroy{

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}

  private stream: Subscription | null = null;
  public  albums: {} = {};
  private total: number = 0;
  public  ListAlbum: album[] = [];

  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {

    this.infoSvc.fetchUserAlbums().subscribe((x:any) => {
      if(x.items){
        this.albums = x.items.map((y:any) => omit(y.album, ['available_markets', 'tracks.items']));
      }else{
        this.albums = x;
      }

      while (this.albums[this.total]["name"] != '') {
        this.total = this.total + 1;

        this.ListAlbum.push({
          image: '',
          label: '',
          name: '',
          releaseDate: '',
          url: ''
        });
      }
    });

    this.infoSvc.fetchUserAlbums().subscribe((x:any) => {

      for (let index = 0; index < this.total; index++) {
        this.ListAlbum[index].image = this.albums[index]["images"][1]["url"];
        this.ListAlbum[index].label = this.albums[index]["label"];
        this.ListAlbum[index].name = this.albums[index]["name"];
        this.ListAlbum[index].releaseDate = this.albums[index]["release_date"];
        this.ListAlbum[index].url = this.albums[index]["external_urls"]["spotify"];
      }
    });
  }

  public hasAlbums(): boolean {
    return !isEmpty(this.albums);
  }

  public get jAlbums(): {} {
    return JSON.stringify(this.albums, null, 2);
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

