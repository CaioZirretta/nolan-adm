import { provideRouter, ResolveFn } from '@angular/router';
import { Movie } from "../types/Movie";
import { MovieService } from "../services/movie.service";
import { inject } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { HomeComponent } from "../../pages/home/home.component";
import { AppComponent } from "../../app.component";

export const movieResolver: ResolveFn<Movie[]> = (route, state) => {
  return inject(MovieService).list();
};

bootstrapApplication(AppComponent, {
  providers: [provideRouter([{
    path: '/',
    component: HomeComponent,
    resolve: { movie: movieResolver },
  }])]
});
