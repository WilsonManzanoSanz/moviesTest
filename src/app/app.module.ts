import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Components
import { MoviesComponent } from './pages/movies/movies.component';
import { SeriesComponent } from './pages/series/series.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
// Routes
import { APP_ROUTING } from './pages/app.routes';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';

// Services 
import { MovieService } from './services/movie.service';
import { FavoritesService} from './services/favorites.service';
// HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SeriesComponent,
    FavoritesComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MovieService,
    FavoritesService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
