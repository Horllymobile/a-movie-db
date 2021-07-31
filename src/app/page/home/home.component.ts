import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { State } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { data } from './../../models/data';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { PageEvent } from '@angular/material/paginator';
import { sortBy } from 'lodash'

import { FormControl } from '@angular/forms';

import * as moviesAction from './../../store/movie.action'
import * as movieSelectors from './../../store/movie.selector';
import { movie } from 'src/app/models/movie';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  length!: number;
  pageSize: number = 20;
  movies!: movie[];
  loaded = false;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  isError: boolean = false;
  errorMessage$!: Observable<string>;
  sub!:Subscription
  movies$!: Observable<data>
  // Navigator Our put
  pageEvent!: PageEvent;
  options = [];
  searchOption = new FormControl();
  sortOption = new FormControl();
  filterOption$!: Observable<any>;

  constructor(
    private moviesService: MoviesService,
    private store: Store<State>
  ) {
    this.filterOption$ = this.searchOption.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '');
      })
    )

    this.filterOption$ = this.sortOption.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.sort(val || '');
      })
    )
   }

  ngOnInit(): void {
    this.filterOption$.subscribe((res) => {
      this.movies = res;
    });
    this.store.dispatch(moviesAction.loadMovies());
    this.movies$ = this.store.select(movieSelectors.getMovies);
    setTimeout(() => {
      this.sub = this.store.select(movieSelectors.getMovies).subscribe(movies => {
        this.loaded = true;
        this.length = movies.total_results
      });
    },2000)

    this.errorMessage$ = this.store.select(movieSelectors.getMoviesError);
  }


  filter(value: string): Observable<movie[]>{
    return this.movies$.pipe(
      map(response => response.results.filter((option: movie) => {
        const filterd = option.title.toLowerCase().indexOf(value.toLowerCase()) === 0;
        return filterd;
      }))
    )
  }


  onScrolled(e:any){

  }

  sort(option: string): Observable<movie[]>{
    return this.movies$.pipe(
      map(res => {
        return sortBy(res.results, [option]);
      })
    )
  }

  handlePageEvent(event: PageEvent): void {
    console.log(event.pageIndex);
    this.store.dispatch(moviesAction.loadMoviesPaginated({pageIndex: event.pageIndex}));
    this.errorMessage$ = this.store.select(movieSelectors.getMoviesError);

    this.sub = this.store.select(movieSelectors.getMovies)
      .subscribe(
        (data) => this.movies = data.results
    )
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
