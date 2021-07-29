import { MovieState } from './movie.reducer';
import { data } from './../models/data';
import { movie } from './../models/movie';
import { createAction, props } from '@ngrx/store';



export const loadMovies = createAction('[LOAD MOVIES] MOVIES');


export const loadMoviesSuccess = createAction('[LOAD MOVIES SUCCESS] MOVIES', props<{movies: data}>());

export const loadMovie = createAction('[MOVIE] ONE MOVIE', props<{movie_id: number}>());

export const currentSelected = createAction('[MOVIE] SELECTED MOVIE', props<{currentSelectedMovie: movie}>())

export const loadDiscover = createAction('[LOAD MOVIES DISCOVER]  MOVIES')

export const loadDiscoverSuccess = createAction('[LOAD MOVIES DISCOVER SUCCESS] MOVIES', props<{discover: data}>())


export const loadMoviesError = createAction('[LOAD MOVIES ERROR] MOVIES', props<{error: string}>());

export const loadMoviesPaginated = createAction('[LOAD MOVIES PAGINATED] MOVIES', props<{pageIndex: number}>())

export const loadMoviesPaginatedSuccess = createAction('[LOAD MOVIES PAGINATED SUCCESS] MOVIES', props<{movies: data}>())


