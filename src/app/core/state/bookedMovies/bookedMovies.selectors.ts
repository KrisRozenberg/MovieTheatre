/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { BookedMoviesState } from "../state.model";

export const bookedMovies: any = createSelector(
    (state: AppState) => state.bookedMovies,
    (state: BookedMoviesState) => state.bookedMovies
);