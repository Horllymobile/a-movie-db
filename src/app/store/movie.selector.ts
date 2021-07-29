import { MovieState } from './movie.reducer';
import { createFeatureSelector, createSelector} from '@ngrx/store';


const getFeatureMovies = createFeatureSelector<MovieState>("movies");

export const getMovies = createSelector(
  getFeatureMovies,
  (state) => state.movies
);

export const getCurrentlySelectedMovie = createSelector(
  getFeatureMovies,
  (state) => state.currentSelectedMovie
);

export const getMoviesError = createSelector(
  getFeatureMovies,
  (state) => state.error
);

export const getDiscovers = createSelector(
  getFeatureMovies,
  (state) => state.discover
)

