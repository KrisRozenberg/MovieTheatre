import { createReducer, on } from "@ngrx/store";
import { FilterPaginationState } from "../state.model";
import { changeSearch, changeYear } from "./filterPagination.action";

export const initialFilterPaginationState: FilterPaginationState = {
    page: 1,
    search: 'lady'
};

export const filterPaginationReducer = createReducer(
    initialFilterPaginationState,
    on(changeSearch, (state, { search }) => ({ ...state, search: search })),
    on(changeYear, (state, { year }) => {
        const stateCopied = {...state};
        if (year) {
            stateCopied.year = Number(year);
        }
        else {
            delete stateCopied.year;
        }
        return stateCopied;
    })
);