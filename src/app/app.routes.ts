import { Routes } from '@angular/router';
import { AppUrlsHelper } from './core/helpers/urls-helper';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { dashboardResolver } from './pages/dashboard/dashboard.resolver';
import { MovieComponent } from './pages/movie/movie.component';
import { movieResolver } from './pages/movie/movie.resolver';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: `${AppUrlsHelper.dashboard}` },

    {
        path: 'sign-in',
        component: SignInComponent,
        canMatch: [noAuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: { movies: dashboardResolver }
    },
    {
        path: 'movie/:id',
        component: MovieComponent,
        resolve: { movie: movieResolver }
    }
];
