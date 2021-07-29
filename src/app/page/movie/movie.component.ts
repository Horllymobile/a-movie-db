import { movie } from './../../models/movie';
import { Observable } from 'rxjs';
import { MoviesService } from './../../services/movies.service';
import { State } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as moviesActions from './../../store/movie.action';
import * as moviesSelectors from './../../store/movie.selector'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie$!: Observable<movie>
  tmdbImageUrl = `https://image.tmdb.org/t/p/original/`;
  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private movieServce: MoviesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['movie_id'];
    this.store.dispatch(moviesActions.loadMovie({movie_id: id}))

    this.movie$ = this.store.select(moviesSelectors.getCurrentlySelectedMovie);
    setTimeout(() => {
      this.movie$.subscribe(movie => {
        this.tmdbImageUrl + movie.poster_path
      })
    } ,1000);
  }

  changeImage(path: string){
    console.log(path);
  }


}
