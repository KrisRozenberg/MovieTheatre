import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Observable } from 'rxjs';
import { MovieShort } from '../../core/models/movie.model';

export const dashboardResolver: ResolveFn<MovieShort[]> = (): Observable<MovieShort[]> => {
  const movieService = inject(MovieService);
  return movieService.getMoviesPaginated();
};
