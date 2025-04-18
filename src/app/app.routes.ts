import { Routes } from '@angular/router';
import { AppUrlsHelper } from './core/helpers/urls-helper';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';
import { MoviesListComponent } from './pages/movies/movies-list/movies-list.component';
import { movieResolver, moviesListResolver } from './pages/movies/movies.resolver';
import { MovieComponent } from './pages/movies/movie/movie.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: `${AppUrlsHelper.moviesList}` },

    {
        path: AppUrlsHelper.signIn,
        component: SignInComponent,
        canMatch: [noAuthGuard]
    },
    {
        path: AppUrlsHelper.moviesList,
        children: [
            {
                path: '',
                component: MoviesListComponent,
                resolve: { isMoviesListLoaded: moviesListResolver }
            },
            {
                path: ':id',
                component: MovieComponent,
                resolve: { isMovieLoaded: movieResolver }
            }
        ]

    },
    {
        path: AppUrlsHelper.profile,
        component: UserProfileComponent,
        canMatch: [authGuard]
    }
];
