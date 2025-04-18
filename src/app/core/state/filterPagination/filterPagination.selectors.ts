/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { FilterPaginationState } from "../state.model";

export const searchFilter: any = createSelector(
    (state: AppState) => state.filterPagination,
    (state: FilterPaginationState) => state.search
);

export const yearFilter: any = createSelector(
    (state: AppState) => state.filterPagination,
    (state: FilterPaginationState) => state.year
);

export const filterPaginationState: any = createSelector(
    (state: AppState) => state.filterPagination,
    (state: FilterPaginationState) => state
);