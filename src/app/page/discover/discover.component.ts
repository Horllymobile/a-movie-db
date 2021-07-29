import { data } from './../../models/data';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  page: number = 1;
  length!: number;
  pageSize!: number;
  movies!: data;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];


  // Navigator Our put
  pageEvent!: PageEvent;


  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getDiscovers();
  }


  setPageSizeOption(setPageSizeOptionsInput: string){
    console.log('clicked');
    if (setPageSizeOptionsInput) {
      this.movies.results = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    console.log(event.pageIndex);
    this.moviesService.getDiscover(event.pageIndex)
    .subscribe(
      (resData: any) => {
        this.movies = resData;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  sort(){
    // console.log(this.movies.results.sort((a:movie, b:movie) => a.popularity + b.popularity));
  }


  getDiscovers(): void{
    // this.moviesService.getDiscover(1)
    // .subscribe(
    //   (resData: data) => {
    //     this.movies = resData;
    //     this.length = this.movies.total_results
    //     this.pageSize = 20
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // )
  }

}
