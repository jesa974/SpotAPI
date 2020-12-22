import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoService } from './info.service';
import { isEmpty } from 'lodash';
import { TokenService } from 'spotify-auth';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';

export interface utilisateur {
  image: string;
  email: string;
  name: string;
  country: string;
  id: string;
  type: string;
  followers: number;
  url: string;
}

@Component({
  selector: 'user-info',
  template: `
    <div *ngIf="Access()">
      <user-details [UserCurrent] = "cur_user"></user-details>
    </div>
    <div *ngIf="!Access()">
      <app-wait [details]="'No user information available'"></app-wait>
    </div>
  `,
  styleUrls: []
})
export class UserComponent implements OnInit , OnDestroy{

  public constructor(private infoSvc: InfoService, private tokenSvc: TokenService){}

  private stream: Subscription | null = null;
  public user: {} = {};
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

  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }
  ngOnInit(): void {

    const stream = this.tokenSvc.authTokens.pipe(switchMap((x) => {
        return this.infoSvc.fetchUserInfo();
    }));

    this.stream = stream.subscribe((x) => this.user = x);

    this.infoSvc.fetchUserInfo().subscribe((x:any) => {
      this.cur_user.image = this.user["images"][0]["url"];
      this.cur_user.country = this.user["country"];
      this.cur_user.name = this.user["display_name"];
      this.cur_user.email = this.user["email"];
      this.cur_user.id = this.user["id"];
      this.cur_user.type = this.user["type"];
      this.cur_user.followers = this.user["followers"]["total"];
      this.cur_user.url = this.user["external_urls"]["spotify"];
    });
  }

  public hasUser(): boolean{
    return !isEmpty(this.user);
  }

  public get jUser(): {} {
    return JSON.stringify(this.user, null, 2);
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
