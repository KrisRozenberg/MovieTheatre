import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.model";

export const rateMovie = createAction(
    '[Movie Page | User Profile Page] Rate Movie',
    props<{ movie: Movie }>()
);