import { HttpErrorResponse } from '@angular/common/http';
import { MoviesService } from 'src/app/services/movies.service';
import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movieActions from './movie.action';

@Injectable()
export class MovieEffects {
  constructor(
    private action$: Actions,
    private movieService: MoviesService
  ){}


  loadMovies$ = createEffect(() => {
    return this.action$.pipe(
      ofType(movieActions.loadMovies),
      mergeMap(() => this.movieService.getMovies(1).pipe(
        map((movies) =>  movieActions.loadMoviesSuccess({movies: movies})),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of(movieActions.loadMoviesError({error: err.message}));
        })
      ))
    )
  })

  loadMovie$ = createEffect(() => {
    return this.action$.pipe(
      ofType(movieActions.loadMovie),
      concatMap((action) => this.movieService.getMovie(action.movie_id).pipe(
        map((movie) =>  {
          console.log(movie)
          return movieActions.currentSelected({currentSelectedMovie: movie})
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of(movieActions.loadMoviesError({error: err.message}));
        })
      ))
    )
  })

  loadMoviesPaginated$ = createEffect(() => {
    return this.action$.pipe(
      ofType(movieActions.loadMoviesPaginated),
      concatMap((action) => {
        return this.movieService.getMovies(action.pageIndex)
        .pipe(
          map(movies => movieActions.loadMoviesPaginatedSuccess({movies})),
          catchError(error => of(movieActions.loadMoviesError({error})))
        )
      })
    )
  })

  loadDiscoverMovie$ = createEffect(() => {
    return this.action$.pipe(
      ofType(movieActions.loadDiscover),
      mergeMap(() => this.movieService.getDiscover(1).pipe(
        map((discover) => {
          return movieActions.loadDiscoverSuccess({discover})
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of(movieActions.loadMoviesError({error: err.message}));
        })
      ))
    )
  })

  // loadDiscoverMoviePaginated$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(movieActions.loadMoviesPaginated),
  //     concatMap((action) => this.movieService.getDiscover(action.pageIndex).pipe(
  //       map((discover) => {
  //         console.log(discover)
  //         return movieActions.loadDiscoverSuccess({discover})
  //       }),
  //       catchError((err: HttpErrorResponse) => {
  //         console.log(err);
  //         return of(movieActions.loadMoviesError({error: err.message}));
  //       })
  //     ))
  //   )
  // })
}
