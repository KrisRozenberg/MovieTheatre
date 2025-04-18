import { createReducer, on } from "@ngrx/store";
import { RequestStatusEnum } from "../../helpers/consts-helper";
import { MoviesListState } from "../state.model";
import { getMovies, getMoviesFailure, getMoviesSuccess } from "./moviesList.actions";

export const initialMoviesListState: MoviesListState = {
    moviesList: [],
    error: '',
    status: RequestStatusEnum.PENDING
};

export const moviesListReducer = createReducer(
    initialMoviesListState,
    on(getMovies, (state) => ({...state, status: RequestStatusEnum.LOADING})),
    on(getMoviesSuccess, (state, { movies }) => ({
        moviesList: movies, 
        error: '',
        status: RequestStatusEnum.SUCCESS
    })),
    on(getMoviesFailure, (state, { error }) => ({
        ...state, 
        error: error, 
        status: RequestStatusEnum.ERROR
    }))
);