import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Movie, MovieShort } from '../models/movie.model';
import { PaginatedResponse } from '../models/response.model';
import { initialFilterPagination } from '../helpers/consts-helper';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly _baseUrl = environment.apiUrl;

  private _selectedMovie: BehaviorSubject<Movie | null> = new BehaviorSubject<Movie | null>(null);
  private _movies: BehaviorSubject<MovieShort[]> = new BehaviorSubject<MovieShort[]>([]);
  
  public filterPagination = initialFilterPagination;

  constructor(private _http: HttpClient) {}

  get selectedMovie$(): Observable<Movie | null> {
    return this._selectedMovie.asObservable();
  }

  get movies$(): Observable<MovieShort[]> {
    return this._movies.asObservable();
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this._http.get<Movie>(`${this._baseUrl}i=${movieId}`);
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

  private getPaginationQueryParams(): string {
    return this.filterPagination.year
      ? `&s=${this.filterPagination.search}&page=${this.filterPagination.page}&y=${this.filterPagination.year}`
      : `&s=${this.filterPagination.search}&page=${this.filterPagination.page}`
  }
}
