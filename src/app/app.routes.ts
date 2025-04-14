import { Routes } from '@angular/router';
import { AppUrlsHelper } from './core/helpers/urls-helper';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';
import { MoviesListComponent } from './pages/movies/movies-list/movies-list.component';
import { movieResolver, moviesListResolver } from './pages/movies/movies.resolver';
import { MovieComponent } from './pages/movies/movie/movie.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: `${AppUrlsHelper.moviesList}` },

    {
        path: 'sign-in',
        component: SignInComponent,
        canMatch: [noAuthGuard]
    },
    {
        path: 'movies',
        children: [
            {
                path: '',
                component: MoviesListComponent,
                resolve: { movie: moviesListResolver }
            },
            {
                path: ':id',
                component: MovieComponent,
                resolve: { movie: movieResolver }
            }
        ]

    }
];
