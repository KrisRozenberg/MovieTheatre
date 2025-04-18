import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, take } from 'rxjs';
import { Movie, MovieShort} from '../models/movie.model';
import { PaginatedResponse } from '../models/response.model';
import { Store } from '@ngrx/store';
import { FilterPagination } from '../models/helper.model';
import { selectedMovie } from '../state/selectedMovie/selectedMovie.selectors';
import { ratedMovies } from '../state/ratedMovies/ratedMovies.selectors';
import { bookedMovies } from '../state/bookedMovies/bookedMovies.selectors';
import { updateSelectedMovie } from '../state/selectedMovie/selectedMovie.actions';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _store: Store
  ) {}

  getMovieById(movieId: string): Observable<Movie> {
    return this._http.get<Movie>(`${this._baseUrl}&i=${movieId}`).pipe(
      map((res) => {
        this.adjustCustomFields(res);
        return res;
      })
    );
  }

  getMoviesPaginated(filterPagination: FilterPagination): Observable<MovieShort[]> {
    return this._http.get<PaginatedResponse<MovieShort>>(
      `${this._baseUrl}${this.getPaginationQueryParams(filterPagination)}`
    ).pipe(
      map((res) => {
        return res.Search ?? [];
      })
    )
  }

  addComment(comment: string): void {
    this._store.select<Movie>(selectedMovie).pipe(take(1)).subscribe((selectedMovie) => {
      const newCommentsArray = [...selectedMovie.comments];
      newCommentsArray.unshift(comment);
      const movie = {...selectedMovie, comments: newCommentsArray };
      this._store.dispatch(updateSelectedMovie({ movie }));
    })
  }

  private adjustCustomFields(movie: Movie): void {
    this.checkPersonalRating(movie);
    this.checkBookedTickets(movie);
    movie.comments = [];
  }

  private checkPersonalRating(movieToCheck: Movie): void {
    this._store.select<Movie[]>(ratedMovies)
      .pipe(take(1))
      .subscribe((ratedMovies) => {
        const optionalRatedMovie = ratedMovies
          .find((movie) => movie.imdbID === movieToCheck.imdbID);
        if (optionalRatedMovie) {
          movieToCheck.personalRating = optionalRatedMovie.personalRating;
        }
      })
  }

  private checkBookedTickets(movieToCheck: Movie): void {
    this._store.select<Movie[]>(bookedMovies)
      .pipe(take(1))
      .subscribe((bookedMovies) => {
        const optionalBookedMovie = bookedMovies
          .find((movie) => movie.imdbID === movieToCheck.imdbID);
        if (optionalBookedMovie) {
          movieToCheck.bookedTickets = optionalBookedMovie.bookedTickets;
        }
      })
  }

  private getPaginationQueryParams(filterPagination: FilterPagination): string {
    return filterPagination.year
      ? `&s=${filterPagination.search}&page=${filterPagination.page}&y=${filterPagination.year}`
      : `&s=${filterPagination.search}&page=${filterPagination.page}`
  }
}
