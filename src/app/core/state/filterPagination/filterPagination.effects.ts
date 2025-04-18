import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { changeSearch, changeYear } from "./filterPagination.action";
import { getMovies } from "../moviesList/moviesList.actions";
import { of, switchMap } from "rxjs";

@Injectable()
export class FilterPaginationEffects {
    constructor(private _actions$: Actions) {}

    changeSearch$ = createEffect(() => 
        this._actions$.pipe(
            ofType(changeSearch),
            switchMap(() => of(getMovies()))
        )
    );

    changeYear$ = createEffect(() =>
        this._actions$.pipe(
            ofType(changeYear),
            switchMap(() => of(getMovies()))
        )
    )
}