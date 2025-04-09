export interface MovieShort {
    Title: string;
    Year: number;
    Rated: string; //pg-13
    Runtime: string;
    Genre: string; //enum[]
    Plot: string;
    Country: string;
    Poster: string;
    imdbRatings: number;
    imdbVotes: number;
    imdbID: string;
}

export interface Movie {
    Title: string;
    Year: number;
    Rated: string; //pg-13
    Released: string; //date
    Runtime: string;
    Genre: string; //enum[]
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbRatings: number;
    imdbVotes: number;
    imdbID: string;
    Type: string; //movie
}