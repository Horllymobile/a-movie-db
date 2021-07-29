import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { data } from './../../models/data';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { State } from 'src/app/store/state/app.state';

import * as moviesAction from './../../store/movie.action';
import * as movieSelectors from './../../store/movie.selector'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy {
  page: number = 1;
  length!: number;
  pageSize!: number;
  movies!: data;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  sub!: Subscription


  // Navigator Our put
  pageEvent!: PageEvent;


  constructor(
    private moviesService: MoviesService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(moviesAction.loadDiscover());

    setTimeout(() => {
      this.sub = this.store.select(movieSelectors.getDiscovers)
      .subscribe(movies => {
        console.log(movies)
        this.movies = movies
        this.pageSize =  movies.results.length
        this.length = movies.total_results
      })
    }, 2000)

  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }


  setPageSizeOption(setPageSizeOptionsInput: string){
    console.log('clicked');
    if (setPageSizeOptionsInput) {
      this.movies.results = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(moviesAction.loadMoviesPaginated({pageIndex: event.pageIndex}))
    this.sub = this.store.select(movieSelectors.getDiscovers)
    .subscribe(movies => {
      this.movies = movies
      this.pageSize = movies.total_pages
      this.length = movies.total_results
    })
  }

  sort(){
    // console.log(this.movies.results.sort((a:movie, b:movie) => a.popularity + b.popularity));
  }
}
