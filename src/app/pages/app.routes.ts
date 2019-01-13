import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { FavoritesComponent } from './favorites/favorites.component';

const APP_ROUTE: Routes = [
    { path: 'movies', component:  MoviesComponent},
    { path: 'series', component: SeriesComponent},
    { path: 'favorites', component: FavoritesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'movies' }
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTE);