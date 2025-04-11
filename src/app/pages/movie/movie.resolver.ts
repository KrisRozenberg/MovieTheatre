import { ResolveFn } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { Observable } from 'rxjs';
import { MovieService } from '../../core/services/movie.service';
import { inject } from '@angular/core';

export const movieResolver: ResolveFn<Movie> = (route): Observable<Movie> => {
  const movieService = inject(MovieService);
  const id = route.paramMap.get('id');
  return movieService.getMovieById(id!);
};
