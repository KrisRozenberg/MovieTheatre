import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Observable } from 'rxjs';
import { Movie, MovieShort } from '../../core/models/movie.model';

export const moviesListResolver: ResolveFn<MovieShort[]> = (): Observable<MovieShort[]> => {
  const movieService = inject(MovieService);
  return movieService.getMoviesPaginated();
};

export const movieResolver: ResolveFn<Movie> = (route): Observable<Movie> => {
  const movieService = inject(MovieService);
  const id = route.paramMap.get('id');
  return movieService.getMovieById(id!);
};
