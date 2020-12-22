import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { InfoService } from './info.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user.component';
import { LoginComponent } from './login.component';
import { AlbumsComponent } from './albums.component';
import { SpotifyAuthModule } from 'spotify-auth';
import { SpotifyAuthInterceptor2 } from './spotify-auth.interceptor';
import { AlbumsDetailsComponent } from './albums-details.component';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsDetailsComponent } from './playlists-details.component';
import { OthersComponent } from './others.component';
import { FormComponent } from './form.component';
import {FormsModule} from "@angular/forms";
import { OthersDetailsComponent } from './others-details.component';
import { WaitComponent } from './wait.component';
import { UserDetailsComponent } from './user-details.component';
import { TopComponent } from './top.component';
import { TopDetailsComponent } from './top-details.component';
import { ArtistsDetailsComponent } from './artists-details.component';
import { TracksDetailsComponent } from './tracks-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'top',
    component: TopComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'playlists',
    component: PlaylistsComponent
  },
  {
    path: 'others',
    component: OthersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  SpotifyAuthModule.authRoutes()[0]
];

@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    SpotifyAuthModule.forRoot(),
    RouterModule.forRoot(routes, {
      // useHash: true
    }),
  ],
  declarations: [
     AppComponent,
     UserComponent,
     LoginComponent,
     AlbumsComponent,
     AlbumsDetailsComponent,
     PlaylistsComponent,
     PlaylistsDetailsComponent,
     OthersComponent,
     FormComponent,
     OthersDetailsComponent,
     WaitComponent,
     UserDetailsComponent,
     TopComponent,
     TopDetailsComponent,
     ArtistsDetailsComponent,
     TracksDetailsComponent
    ],
  bootstrap:    [ AppComponent ],
  exports: [],
  providers: [
    InfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor2, //Force interception.
      multi: true
    }
  ]
})
export class AppModule {}
