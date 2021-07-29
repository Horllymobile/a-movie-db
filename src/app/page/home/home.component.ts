import { HttpErrorResponse } from '@angular/common/http';
import { State } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { movie } from './../../models/movie';
import { data } from './../../models/data';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { PageEvent } from '@angular/material/paginator'

import * as moviesAction from './../../store/movie.action'
import * as movieSelectors from './../../store/movie.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  length!: number;
  pageSize: number = 20;
  movies!: data;
  loaded = false;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  isError: boolean = false;
  errorMessage$!: Observable<string>;
  sub!:Subscription
  movies$!: Observable<data>
  // Navigator Our put
  pageEvent!: PageEvent;


  constructor(
    private moviesService: MoviesService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(moviesAction.loadMovies());
    this.movies$ = this.store.select(movieSelectors.getMovies);
    setTimeout(() => {
      console.log(this.movies$);
      this.sub = this.store.select(movieSelectors.getMovies).subscribe(movies => {
        // console.log(movies)
        this.loaded = true;
        this.movies = movies;
        this.length = movies.total_results
      });
    },2000)

    this.errorMessage$ = this.store.select(movieSelectors.getMoviesError);
  }


  setPageSizeOption(setPageSizeOptionsInput: string){
    console.log('clicked');
    if (setPageSizeOptionsInput) {
      // this.movies.results = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent): void {

    this.store.dispatch(moviesAction.loadMoviesPaginated({pageIndex: event.pageIndex}));
    this.errorMessage$ = this.store.select(movieSelectors.getMoviesError);

    this.sub = this.store.select(movieSelectors.getMovies)
      .subscribe(
        (data) => this.movies = data
    )
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
