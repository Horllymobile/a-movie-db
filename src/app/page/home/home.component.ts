import { State } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { movie } from './../../models/movie';
import { data } from './../../models/data';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
import { PageEvent } from '@angular/material/paginator'

import { getMovies } from './../../store/movie.selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page: number = 1;
  length!: number;
  pageSize!: number;
  movies$!: Observable<data>;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];


  // Navigator Our put
  pageEvent!: PageEvent;


  constructor(
    private moviesService: MoviesService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }


  setPageSizeOption(setPageSizeOptionsInput: string){
    console.log('clicked');
    if (setPageSizeOptionsInput) {
      // this.movies.results = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.moviesService.getMovies(event.pageIndex)
    .subscribe(
      (resData) => {
          this.movies$ = this.store.select(getMovies)
        this.movies$.subscribe(data => {
          if(data !== null) this.length = data.total_results;
        })
        this.pageSize = 20
      },
      error => {
        console.log(error);
      }
    )
  }


  getMovies(): void{
    this.moviesService.getMovies(1)
    .subscribe(
      (resData) => {
          this.movies$ = this.store.select(getMovies)
        this.movies$.subscribe(data => {
          if(data !== null) this.length = data.total_results;
        })
        this.pageSize = 20
      },
      error => {
        console.log(error);
      }
    )
  }

}
