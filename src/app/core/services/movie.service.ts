import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { Movie, MovieShort } from '../models/movie.model';
import { PaginatedResponse } from '../models/response.model';
import { initialFilterPagination } from '../helpers/consts-helper';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly _baseUrl = environment.apiUrl;

  private _selectedMovie: ReplaySubject<Movie> = new ReplaySubject<Movie>(1);
  private _movies: BehaviorSubject<MovieShort[]> = new BehaviorSubject<MovieShort[]>([]);
  private _ratedMovies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private _bookedMovies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  
  public filterPagination = initialFilterPagination;

  constructor(private _http: HttpClient) {}

  get selectedMovie$(): Observable<Movie> {
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
    const updatedRatedMovies = this._ratedMovies
      .getValue()
      .filter((movie) => movie.imdbID !== movieToRate.imdbID);
    updatedRatedMovies.push(movieToRate);
    
    this._ratedMovies.next(updatedRatedMovies);
  }

  private adjustCustomFields(movie: Movie): void {
    this.checkPersonalRating(movie);
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

  private getPaginationQueryParams(): string {
    return this.filterPagination.year
      ? `&s=${this.filterPagination.search}&page=${this.filterPagination.page}&y=${this.filterPagination.year}`
      : `&s=${this.filterPagination.search}&page=${this.filterPagination.page}`
  }
}
