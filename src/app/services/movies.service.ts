import { data } from './../models/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<data>{
    return this.http.get<data>(`${this.url}/movie/popular?api_key=${environment.apiKey}`);
  }
}
