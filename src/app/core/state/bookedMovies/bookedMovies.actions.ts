import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.model";

export const bookMovie = createAction(
    '[Movie Page] Book Movie',
    props<{ movie: Movie }>()
);

export const cancelBooking = createAction(
    '[User Profile Page] Cancel Movie Booking',
    props<{ movieId: string }>()
);