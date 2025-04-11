export interface MovieShort {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
}

export interface Movie {
    Title: string;
    Year: number;
    Rated: string; //pg-13
    Released: string; //date
    Runtime: string;
    Genre: string; //enum[]
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbRatings: number;
    imdbVotes: number;
    imdbID: string;
    Type: string; //movie
    personalRating: number;
    comments: string[];
}