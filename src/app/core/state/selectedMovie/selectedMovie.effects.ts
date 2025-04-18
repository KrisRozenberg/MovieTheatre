import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MovieService } from "../../services/movie.service";
import { getMovieById, getMovieByIdFailure, getMovieByIdSuccess } from "./selectedMovie.actions";
import { switchMap, map, catchError, of, filter } from "rxjs";
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";

@Injectable()
export class SelectedMovieEffects {
    constructor(
        private _actions$: Actions,
        private _movieService: MovieService
    ) {}

    getMovieById$ = createEffect(() => 
        this._actions$.pipe(
            ofType(getMovieById),
            switchMap((action) => 
                this._movieService.getMovieById(action.id).pipe(
                    map(movie => (getMovieByIdSuccess({ movie: movie}))),
                    catchError(error => of(getMovieByIdFailure({error})))
                )
            )
        )
    );

    prefetchMovieById$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigationAction) => r.payload.routerState.url.startsWith('/movies/tt')),
            map((r: RouterNavigationAction) => r.payload.event.url.slice(8)),
            switchMap((id) => of(getMovieById({id})))
        )
    });
}