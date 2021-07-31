import { State } from './../store/state/app.state';
import { data } from './../models/data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as moviesAction from './../store/movie.action';
import { movie } from '../models/movie';

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
          this.store.dispatch(moviesAction.loadMoviesSuccess({movies: movies}))
          return movies;
        }),
        catchError(e => e)
      );
    }
    return this.http.get<data>(`${this.url}/movie/popular?page=${page}&&api_key=${environment.apiKey}`)
      .pipe(
        map((movies) => {
          this.store.dispatch(moviesAction.loadMoviesSuccess({movies: movies}))
          return movies;
        }),
      );

  }

  getDiscover(page: number): Observable<any>{
    if(page === 0) {
      return this.http.get<data>(`${this.url}/discover/movie?page=${page}&&api_key=${environment.apiKey}`)
      .pipe(
        map((movies) => {
          this.store.dispatch(moviesAction.loadDiscoverSuccess({discover: movies}))
          return movies;
        }),
        catchError(e => e)
      );
    }
    return this.http.get<data>(`${this.url}/discover/movie?page=${page}&&api_key=${environment.apiKey}`)
    .pipe(
      map((movies) => {
        this.store.dispatch(moviesAction.loadDiscoverSuccess({discover: movies}))
        return movies;
      }),
      catchError(e => e)
    );
  }

  getMovie(movie_id: number): Observable<any> {
    return this.http.get<movie>(`${this.url}/movie/${movie_id}?api_key=${environment.apiKey}`)
    .pipe(
      map((resMovie) => resMovie),
      catchError(err => err)
    )
  }
}
