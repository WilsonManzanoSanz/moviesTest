import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies/movie.service';
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
  
  public years = [];
  public genres = [];
  public movies = [];
  public selectedGenre = '';
  public selectedYear= '';
  public searchQuery;
  public actualPage:number;
  public lastPage:number;
  public pages:any[] = [];
  public searchTerms = new Subject<string>();
  
  constructor(private movieService: MovieService) {
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
          this.selectedGenre = '';
          this.selectedYear = '';
          this.movies = data['results'];
        }
    );
  }
  
  getMovies(page = 1, genre = '', year = ''){
    this.movieService.getMovies(page, genre, year).subscribe(
      response => {
        this.movies = response['results'];
        this.actualPage = response.page;
        this.lastPage = response.total_pages;
        this.addPages();
      },
      error => console.error(error)); 
  }
  
  addPages(){
    this.pages = [this.actualPage];
    for (let i = this.actualPage; i > 1 && i < this.actualPage-4; i--){
      this.pages.push(this.actualPage - i);
    }
    for (let i = 1; i <  5 && i < this.lastPage;i++){
      this.pages.push(this.actualPage + i);
    }
    if(this.pages[0]!== 1){
      this.pages.unshift(1); 
    }
    this.pages.push(this.lastPage);
  }
  
  changePage(idx){
    if(this.searchQuery === ''){
      this.getMovies()
    }
  }
  
  /*
  filterMovie(value){
    this.searchQuery = '';
    this.movieService.getMovies(this.selectedGenre, this.selectedYear).subscribe(
      response => {
        this.movies = response['results'];
      },
      error => console.error(error)); 
  }
  */
  getYears(){
    this.years = this.movieService.getYears();
  }
  
  getGenres(){
    this.movieService.getGenres().subscribe(
    response => {
      this.genres = response.genres;
    }, error => console.error(error));
  }
  
  searchMovie(term: string): void {
    this.searchTerms.next(term);
  }
    /*
    this.searchMovies.searchMovie().subscribe(
      response => console.log(response), 
      error => console.error(error));
      */
}
