import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { filter, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { moviesListStatus } from '../../core/state/moviesList/moviesList.selectors';
import { selectedMovieStatus } from '../../core/state/selectedMovie/selectedMovie.selectors';
import { RequestStatusEnum } from '../../core/helpers/consts-helper';

export const moviesListResolver: ResolveFn<boolean> = (): Observable<boolean> => {
  const store = inject(Store);
  return store.select(moviesListStatus)
    .pipe(
      filter((value: RequestStatusEnum): boolean => value === RequestStatusEnum.SUCCESS),
      switchMap((value) => of(value === RequestStatusEnum.SUCCESS))
    );
};

export const movieResolver: ResolveFn<boolean> = (): Observable<boolean> => {
  const store = inject(Store);
  return store.select(selectedMovieStatus)
    .pipe(
      filter((value: RequestStatusEnum): boolean => value === RequestStatusEnum.SUCCESS),
      switchMap((value) => of(value === RequestStatusEnum.SUCCESS))
    );
};
