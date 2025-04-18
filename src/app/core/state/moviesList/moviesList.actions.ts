import { createAction, props } from "@ngrx/store";
import { MovieShort } from "../../models/movie.model";

export const getMovies = createAction(
    '[Movies List Resolver | Movies List Page] Get Movies List'
);

export const getMoviesSuccess = createAction(
    '[Movies List Effects] Get Movies List Success',
    props<{ movies: MovieShort[] }>()
);

export const getMoviesFailure = createAction(
    '[Movies List Effects] Get Movies List Failure',
    props<{ error: string }>()
);