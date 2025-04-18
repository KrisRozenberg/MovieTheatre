import { createReducer, on } from "@ngrx/store";
import { SelectedMovieState } from "../state.model";
import { getMovieById, getMovieByIdFailure, getMovieByIdSuccess, updateSelectedMovie } from "./selectedMovie.actions";
import { RequestStatusEnum } from "../../helpers/consts-helper";

export const initialSelectedMovieState: SelectedMovieState = {
    selectedMovie: null,
    error: '',
    status: RequestStatusEnum.PENDING
};

export const selectedMovieReducer = createReducer(
    initialSelectedMovieState,
    on(getMovieById, (state) => ({...state, status: RequestStatusEnum.LOADING})),
    on(getMovieByIdSuccess, (state, { movie }) => ({
        selectedMovie: movie, 
        error: '',
        status: RequestStatusEnum.SUCCESS
    })),
    on(getMovieByIdFailure, (state, { error }) => ({
        selectedMovie: null,
        error: error, 
        status: RequestStatusEnum.ERROR
    })),
    on(updateSelectedMovie, (state, { movie }) => ({
        ...state,
        selectedMovie: movie
    }))
);