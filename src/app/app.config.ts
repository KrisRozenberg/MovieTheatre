import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { moviesListReducer } from './core/state/moviesList/moviesList.reducer';
import { selectedMovieReducer } from './core/state/selectedMovie/selectedMovie.reducer';
import { filterPaginationReducer } from './core/state/filterPagination/filterPagination.reducer';
import { ratedMoviesReducer } from './core/state/ratedMovies/ratedMovies.reducer';
import { bookedMoviesReducer } from './core/state/bookedMovies/bookedMovies.reducer';
import { MoviesListEffects } from './core/state/moviesList/moviesList.effects';
import { SelectedMovieEffects } from './core/state/selectedMovie/selectedMovie.effects';
import { FilterPaginationEffects } from './core/state/filterPagination/filterPagination.effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    AuthService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    provideStore({
      'moviesList': moviesListReducer,
      'filterPagination': filterPaginationReducer,
      'selectedMovie': selectedMovieReducer,
      'ratedMovies': ratedMoviesReducer,
      'bookedMovies': bookedMoviesReducer,
      router: routerReducer
    }),
    provideEffects(
      MoviesListEffects,
      SelectedMovieEffects,
      FilterPaginationEffects
    ),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
