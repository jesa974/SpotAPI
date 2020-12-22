import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { search } from './others.component';

@Injectable()
export class InfoService {

  private apiUserUrl: string = 'https://api.spotify.com/v1/me';
  private apiAlbumsUrl: string = 'https://api.spotify.com/v1/me/albums';
  private apiPlaylistsUrl: string = 'https://api.spotify.com/v1/me/playlists'
  private apiTopUrl: string = 'https://api.spotify.com/v1/me/top/';
  private apiAllOtherUrl: string = 'https://api.spotify.com/v1/users/';

  private user: {} = {};
  private user$: BehaviorSubject<{}>;

  constructor(
      private http: HttpClient,
      private router: Router
    ) {
    this.user$ = new BehaviorSubject<{}>(this.user);
  }

  public fetchUserInfo(): Observable<{}> {
    return this.http.get(this.apiUserUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError('getSelf'))
    );
  }

  public fetchUserAlbums(): Observable<{}>{
    return this.http.get(this.apiAlbumsUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError('getSelfAlbums'))
    );
  }

  public fetchUserPlaylists(): Observable<{}>{
    return this.http.get(this.apiPlaylistsUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError('getSelfPlaylists'))
    );
  }

  public fetchUserTop(newSearch: search): Observable<{}>{

    this.apiTopUrl = 'https://api.spotify.com/v1/me/top/';

    if (newSearch.type == 'Tracks') {
      this.apiTopUrl = this.apiTopUrl + 'tracks?offset=0&limit=20'
    }
    else {
      if (newSearch.type == 'Artists') {
        this.apiTopUrl = this.apiTopUrl + 'artists?offset=0&limit=20';
      }
    }

    return this.http.get(this.apiTopUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError('getSelfTop'))
    );
  }

  public fetchAllOtherInfo(newSearch: search): Observable<{}> {

    this.apiAllOtherUrl = 'https://api.spotify.com/v1/users/';

    if (newSearch.type == 'Infos') {
      this.apiAllOtherUrl = this.apiAllOtherUrl + newSearch.id
    }
    else {
      if (newSearch.type == 'Playlists') {
        this.apiAllOtherUrl = this.apiAllOtherUrl + newSearch.id + '/playlists?offset=0&limit=50';
      }
    }

    return this.http.get(this.apiAllOtherUrl).pipe(
      tap((user: {}) => {
        this.user$.next(this.user);
      }),
      catchError(this.handleError('getOther'))
    );
  }

  public getUserStream(): Observable<{}> {
    return this.user$.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }


}
