import { createAction, props } from "@ngrx/store";

export const changeSearch = createAction(
    '[Movies List Page] Search Filter Value Changed',
    props<{ search: string }>()
);

export const changeYear = createAction(
    '[Movies List Page] Year Filter Value Changed',
    props<{ year: string }>()
);