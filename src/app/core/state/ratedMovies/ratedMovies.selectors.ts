/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { RatedMoviesState } from "../state.model";

export const ratedMovies: any = createSelector(
    (state: AppState) => state.ratedMovies,
    (state: RatedMoviesState) => state.ratedMovies
);