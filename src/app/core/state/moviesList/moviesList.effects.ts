import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MovieService } from "../../services/movie.service";
import { switchMap, map, catchError, of, withLatestFrom, Observable, filter } from "rxjs";
import { getMovies, getMoviesSuccess, getMoviesFailure } from "./moviesList.actions";
import { select, Store } from "@ngrx/store";
import { filterPaginationState } from "../filterPagination/filterPagination.selectors";
import { FilterPagination } from "../../models/helper.model";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";

@Injectable()
export class MoviesListEffects {
    constructor(
        private _actions$: Actions,
        private _movieService: MovieService,
        private _store: Store
    ) {}

    getMovies$ = createEffect(() => 
        this._actions$.pipe(
            ofType(getMovies),
            withLatestFrom(this._store.pipe(select(filterPaginationState)) as Observable<FilterPagination>),
            switchMap(([, filterPagination]) => 
                this._movieService.getMoviesPaginated(filterPagination).pipe(
                    map(movies => (getMoviesSuccess({ movies: movies}))),
                    catchError(error => of(getMoviesFailure({error})))
                )
            )
        )
    );

    prefetchMovies$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigationAction) => r.payload.routerState.url === '/movies'),
            switchMap(() => of(getMovies()))
        )
    });
}