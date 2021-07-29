import { data } from './../models/data';
import { movie } from './../models/movie';
import { createAction, props } from '@ngrx/store';



export const loadMovies = createAction('[LOAD MOVIES] MOVIES')

export const loadMoviesSuccess = createAction('[LOAD MOVIES Success] MOVIES', props<{movies: data}>())

export const currentSelected = createAction('[CURRENT MOVIE] MOVIES', props<{currentSelectedMovie: movie}>())

