import { createReducer, on } from "@ngrx/store";
import { BookedMoviesState } from "../state.model";
import { bookMovie, cancelBooking } from "./bookedMovies.actions";

export const initialBookedMoviesState: BookedMoviesState = {
    bookedMovies: []
};

export const bookedMoviesReducer = createReducer(
    initialBookedMoviesState,
    on(bookMovie, (state, { movie }) => {
        const bookedMovies = state.bookedMovies
            .filter((movieIncluded) => movieIncluded.imdbID !== movie.imdbID);
        bookedMovies.push(movie);

        return { bookedMovies: bookedMovies }
    }),
    on(cancelBooking, (state, { movieId }) => {
        const bookedMovies = state.bookedMovies
            .filter((movie) => movie.imdbID !== movieId);

        return { bookedMovies: bookedMovies }
    })
);