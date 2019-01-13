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

// Pipes
import { PhotoMoviePipe } from './pipes/photo.pipe.';
// HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
// Form module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieCardComponent } from './pages/movies/movie-card/movie-card.component';
import { SerieCardComponent } from './pages/series/serie-card/serie-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoMoviePipe,
    MoviesComponent,
    SeriesComponent,
    FavoritesComponent,
    NavbarComponent,
    FooterComponent,
    MovieCardComponent,
    SerieCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
