import { State } from './../store/state/app.state';
import { data } from './../models/data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { loadMovies, loadMoviesSuccess, loadDiscover, loadDiscoverSuccess } from './../store/movie.action';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3';

  constructor(
    private store: Store<State>,
    private http: HttpClient
  ) { }

  getMovies(page: number): Observable<any>{
    if(page === 0) {
      return this.http.get<data>(`${this.url}/movie/popular?page=${page + 1}&&api_key=${environment.apiKey}`)
      .pipe(
        map((movies) => {
          this.store.dispatch(loadMoviesSuccess({movies: movies}))
          return movies;
        }),
        catchError(e => e)
      );
    }

    console.log(page);
    return this.http.get<data>(`${this.url}/movie/popular?page=${page}&&api_key=${environment.apiKey}`)
      .pipe(
        map((movies) => {
          this.store.dispatch(loadMoviesSuccess({movies: movies}))
          return movies;
        }),
      );

  }

  getDiscover(page: number): Observable<any>{
    if(page === 0) {
      return this.http.get<data>(`${this.url}/discover/movie?page=${page}&&api_key=${environment.apiKey}`)
      .pipe(
        map((movies) => {
          this.store.dispatch(loadDiscoverSuccess({discover: movies}))
          return movies;
        }),
        catchError(e => e)
      );
    }
    return this.http.get<data>(`${this.url}/discover/movie?page=${page}&&api_key=${environment.apiKey}`)
    .pipe(
      map((movies) => {
        this.store.dispatch(loadDiscoverSuccess({discover: movies}))
        return movies;
      }),
      catchError(e => e)
    );
  }
}
