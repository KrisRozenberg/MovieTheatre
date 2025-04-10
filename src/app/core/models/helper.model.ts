export interface JwtDecodedAccessableInfo {
    userId: number | string;
    username: string;
}

export interface FilterPagination {
    totalResults: number;
    page: number;
    search: string;
    year?: number;
}
