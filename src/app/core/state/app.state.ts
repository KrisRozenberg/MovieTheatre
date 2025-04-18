import { RouterReducerState } from "@ngrx/router-store";
import { BookedMoviesState, FilterPaginationState, MoviesListState, RatedMoviesState, SelectedMovieState } from "./state.model";

export interface AppState {
    moviesList: MoviesListState;
    filterPagination: FilterPaginationState;
    selectedMovie: SelectedMovieState;
    ratedMovies: RatedMoviesState;
    bookedMovies: BookedMoviesState;
    router: RouterReducerState;
}