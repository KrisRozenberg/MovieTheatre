import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Movie, MovieShort, Ticket } from '../models/movie.model';
import { PaginatedResponse } from '../models/response.model';
import { initialFilterPagination } from '../helpers/consts-helper';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly _baseUrl = environment.apiUrl;

  private _selectedMovie: BehaviorSubject<Movie|null> = new BehaviorSubject<Movie|null>(null);
  private _movies: BehaviorSubject<MovieShort[]> = new BehaviorSubject<MovieShort[]>([]);
  private _ratedMovies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private _bookedMovies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  
  public filterPagination = initialFilterPagination;

  constructor(private _http: HttpClient) {}

  get selectedMovie$(): Observable<Movie | null> {
    return this._selectedMovie.asObservable();
  }

  get movies$(): Observable<MovieShort[]> {
    return this._movies.asObservable();
  }

  get ratedMovies$(): Observable<Movie[]> {
    return this._ratedMovies.asObservable();
  }

  get bookedMovies$(): Observable<Movie[]> {
    return this._bookedMovies.asObservable();
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this._http.get<Movie>(`${this._baseUrl}&i=${movieId}`).pipe(
      map((res) => {
        this.adjustCustomFields(res);
        this._selectedMovie.next(res);
        return res;
      })
    );
  }

  getMoviesPaginated(): Observable<MovieShort[]> {
    return this._http.get<PaginatedResponse<MovieShort>>(`${this._baseUrl}${this.getPaginationQueryParams()}`).pipe(
      map((res) => {
        this.filterPagination.totalResults = res.totalResults;
        this._movies.next(res.Search ?? []);
        return res.Search ?? [];
      })
    )
  }

  rateMovie(movieToRate: Movie): void {
    const ratedMovies = this._ratedMovies.getValue();

    const foundMovie = ratedMovies
      .find((movie) => movie.imdbID === movieToRate.imdbID);
    if (foundMovie) {
      foundMovie.personalRating = movieToRate.personalRating;
    }
    else {
      ratedMovies.push(movieToRate);
    }
    
    this._ratedMovies.next(ratedMovies);
  }

  bookTickets(tickets: Ticket[]): void {
    const movieToBook = this._selectedMovie.getValue()!;
    movieToBook.bookedTickets = tickets;

    const bookedMovies = this._bookedMovies
      .getValue()
      .filter((movie) => movie.imdbID !== movieToBook.imdbID);
    bookedMovies.push(movieToBook);

    this._bookedMovies.next(bookedMovies);
  }

  cancelBooking(movieId: string): void {
    const updatedBookedMovies = this._bookedMovies
      .getValue()
      .filter((movie) => movie.imdbID !== movieId);

    this._bookedMovies.next(updatedBookedMovies);
  }

  private adjustCustomFields(movie: Movie): void {
    this.checkPersonalRating(movie);
    this.checkBookedTickets(movie);
    movie.comments = [];
  }

  private checkPersonalRating(movieToCheck: Movie): void {
    const optionalRatedMovie = this._ratedMovies
      .getValue()
      .find((movie) => movie.imdbID === movieToCheck.imdbID);
    if (optionalRatedMovie) {
      movieToCheck.personalRating = optionalRatedMovie.personalRating;
    }
  }

  private checkBookedTickets(movieToCheck: Movie): void {
    const optionalBookedMovie = this._bookedMovies
      .getValue()
      .find((movie) => movie.imdbID === movieToCheck.imdbID);
    if (optionalBookedMovie) {
      movieToCheck.bookedTickets = optionalBookedMovie.bookedTickets;
    }
  }

  private getPaginationQueryParams(): string {
    return this.filterPagination.year
      ? `&s=${this.filterPagination.search}&page=${this.filterPagination.page}&y=${this.filterPagination.year}`
      : `&s=${this.filterPagination.search}&page=${this.filterPagination.page}`
  }
}
