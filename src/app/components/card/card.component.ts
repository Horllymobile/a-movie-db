import { movie } from './../../models/movie';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  tmdbImageUrl = `https://image.tmdb.org/t/p/original/`;

  @Input() movieIn!: movie;
  constructor() { }

  ngOnInit(): void {
    this.tmdbImageUrl = this.tmdbImageUrl +  this.movieIn.poster_path
    // console.log(this.tmdbImageUrl);
  }

}
