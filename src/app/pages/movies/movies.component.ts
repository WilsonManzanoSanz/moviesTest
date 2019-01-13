import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FavoritesService} from '../../services/favorites.service';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  
  public movies = [];
  public searchTerms = new Subject<string>();
  
  constructor(private movieService: MovieService, private favoriteService:FavoritesService) {
  }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
    this.getYears();
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(
        (term: string) => {
          return this.movieService.searchMovie(term);
        })
    ).subscribe(
        data => {
          this.movies = data['results'].map(value => {
            value.poster_path = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
            return value;
          })
        }, 
        error => console.error(error)
    );
  }
  
  getMovies(){
    this.movieService.getMovies().subscribe(
      response => {
        this.movies = response['results'].map(value => {
          value.poster_path = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
          return value;
        })
      },
      error => console.error(error)); 
  }
  
  getYears(){
    this.years = this.movieService.getYears();
  }
  
  getGenres(){
    console.log('hello')
    this.movieService.getGenres().subscribe(
    response => {
      this.genres = response.genres;
      console.log(response);
    }, error => console.error(error));
  }
  
  searchMovie(term: string): void {
    this.searchTerms.next(term);
  }
  
  addNewFavorite(movie){
    console.log(this.favoriteService.addFavorite(movie));
  }
    /*
    this.searchMovies.searchMovie().subscribe(
      response => console.log(response), 
      error => console.error(error));
      */
}
