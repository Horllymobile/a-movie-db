import { data } from './../../models/data';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../../services/movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page: number = 1;
  movies!: data;

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }



  getMovies(): void{
    this.moviesService.getMovies()
    .subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
