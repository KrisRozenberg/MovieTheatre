/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MoviesListState } from "../state.model";

export const moviesList: any = createSelector(
    (state: AppState) => state.moviesList,
    (state: MoviesListState) => state.moviesList
);

export const moviesListStatus: any = createSelector(
    (state: AppState) => state.moviesList,
    (state: MoviesListState) => state.status
);

export const moviesListError: any = createSelector(
    (state: AppState) => state.moviesList,
    (state: MoviesListState) => state.error
);