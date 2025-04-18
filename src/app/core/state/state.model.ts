import { RequestStatusEnum } from "../helpers/consts-helper";
import { Movie, MovieShort } from "../models/movie.model";

export interface MoviesListState {
    moviesList: MovieShort[];
    error: string;
    status: RequestStatusEnum;
};

export interface FilterPaginationState {
    page: number;
    search: string;
    year?: number;
};

export interface SelectedMovieState {
    selectedMovie: Movie | null;
    error: string;
    status: RequestStatusEnum;
};

export interface RatedMoviesState {
    ratedMovies: Movie[];
};

export interface BookedMoviesState {
    bookedMovies: Movie[];
};