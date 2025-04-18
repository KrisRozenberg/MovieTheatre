import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.model";

export const getMovieById = createAction(
    '[Movie Service] Get Movie by Id',
    props<{ id: string }>()
);

export const getMovieByIdSuccess = createAction(
    '[Selected Movie Effects] Get Movie by Id Success',
    props<{ movie: Movie }>()
);

export const getMovieByIdFailure = createAction(
    '[Selected Movie Effects] Get Movie by Id Failure',
    props<{ error: string }>()
);

export const updateSelectedMovie = createAction(
    '[Movie Page | User Profile Page] Update Selected Movie',
    props<{ movie: Movie }>()
)