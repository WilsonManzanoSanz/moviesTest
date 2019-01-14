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
  public searchQuery = '';
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
        response => {
          this.movies = response['results'];
          this.addPages(response);
          this.cleanFilters();
        }
    );
  }
  
  getMovies(page = 1){
    this.searchQuery = '';
    this.movieService.getMovies(page, this.selectedGenre, this.selectedYear).subscribe(
      response => {
        this.movies = response['results'];
        this.addPages(response);
      },
      error => console.error(error)); 
  }
  
  addPages(response){
    this.actualPage = response.page;
    this.lastPage = response.total_pages;
    this.pages = [this.actualPage];
    let x = 0;
    for (let i = this.actualPage-1; i > 1 && x < 3; i--){
      x++;
      this.pages.push(i);
    }
    this.pages.reverse();
    let y = this.actualPage;
    for (let i = 1; i <  4 && y < this.lastPage;i++){
      y++;
      this.pages.push(this.actualPage + i);
    }
    if(this.pages[0]!== 1){
      this.pages.unshift(1); 
    }
    //this.pages.push(this.lastPage);
  }
  
  changePage(idx){
    if(!this.searchQuery && this.actualPage !== idx){
      this.getMovies(idx);
      document.getElementById('navbar').scrollIntoView();
    } else {
       this.movieService.searchMovie(this.searchQuery, idx).subscribe(
         response => { 
            this.movies = response['results'];
            this.addPages(response);
            this.cleanFilters();
         }, 
        error => console.error(error));
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
  
  cleanFilters(){
    this.selectedGenre = '';
    this.selectedYear = '';
  }
    /*
    this.searchMovies.searchMovie().subscribe(
      response => console.log(response), 
      error => console.error(error));
      */
}
