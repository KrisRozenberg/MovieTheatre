import { createReducer, on } from "@ngrx/store";
import { RatedMoviesState } from "../state.model";
import { rateMovie } from "./ratedMovies.actions";

export const initialRatedMoviesState: RatedMoviesState = {
    ratedMovies: []
};

export const ratedMoviesReducer = createReducer(
    initialRatedMoviesState,
    on(rateMovie, (state, { movie }) => {
        const ratedMovies = [...state.ratedMovies];

        const foundMovie = ratedMovies
            .find((movieIncluded) => movieIncluded.imdbID === movie.imdbID);
        if (foundMovie) {
            const updatedMovie = {...foundMovie, personalRating: movie.personalRating};
            const foundMovieIndex = ratedMovies.indexOf(foundMovie);
            ratedMovies.splice(foundMovieIndex, 1, updatedMovie);
        }
        else {
            ratedMovies.push(movie);
        }

        return { ratedMovies }
    })
);