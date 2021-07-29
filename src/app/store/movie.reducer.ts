import { data } from './../models/data';
import { createReducer, on } from '@ngrx/store'
import { movie } from '../models/movie';

import { loadMovies, loadMoviesSuccess, currentSelected, loadDiscover, loadDiscoverSuccess, loadMoviesPaginated } from './movie.action';


export interface MovieState {
  movies: data,
  discover: data,
  currentSelectedMovie: movie,
  error: string,
  pageIndex: number
}

const initialState: MovieState = {
  movies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  },
  discover: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  },
  currentSelectedMovie: {
    id: 0,
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  },
  error: '',
  pageIndex: 1
}

export const movieReducer = createReducer<MovieState>(
  initialState,
  on(loadMovies, (state) => {
    return {
      ...state
    }
  }),
  on(loadMoviesSuccess, (state, action): MovieState => {
    return {
      ...state,
      movies: action.movies
    }
  }),
  on(currentSelected, (state, action): MovieState => {
    return {
      ...state,
      currentSelectedMovie: action.currentSelectedMovie
    }
  }),
  on(loadDiscover, (state): MovieState => {
    return {
      ...state,
    }
  }),
  on(loadDiscoverSuccess, (state, action): MovieState => {
    return {
      ...state,
      discover: action.discover
    }
  }),
  on(loadMoviesPaginated, (state, action): MovieState => {
    return {
      ...state,
      pageIndex: action.pageIndex
    }
  }),
)

