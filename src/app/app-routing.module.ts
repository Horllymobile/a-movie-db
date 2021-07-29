import { MovieComponent } from './page/movie/movie.component';
import { DiscoverComponent } from './page/discover/discover.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component'

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'discover', component: DiscoverComponent},
  {path: 'movie/:movie_id', component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
