/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SelectedMovieState } from "../state.model";

export const selectedMovie: any = createSelector(
    (state: AppState) => state.selectedMovie,
    (state: SelectedMovieState) => state.selectedMovie
);

export const selectedMovieStatus: any = createSelector(
    (state: AppState) => state.selectedMovie,
    (state: SelectedMovieState) => state.status
);

export const selectedMovieError: any = createSelector(
    (state: AppState) => state.selectedMovie,
    (state: SelectedMovieState) => state.error
);