import { Component, OnInit } from '@angular/core';
import { SerieService } from '../../services/series/series.service';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  
  public years = [];
  public genres = [];
  public series = [];
  public selectedGenre = '';
  public selectedYear = '';
  public searchQuery = '';
  public actualPage:number;
  public lastPage:number;
  public pages:any[] = [];
  public searchTerms = new Subject<string>();
  
  constructor(private serieService: SerieService) {
  }

  ngOnInit() {
    this.getSeries();
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
          return this.serieService.searchSerie(term);
        })
    ).subscribe(
        response => {
          this.series = response['results'];
          this.addPages(response);
          this.cleanFilters();
        }
    );
  }
  
  getSeries(page = 1){
    this.searchQuery = '';
    this.serieService.getSeries(page, this.selectedGenre, this.selectedYear).subscribe(
      response => {
        this.series = response['results'];
        this.addPages(response);
      },
      error => console.error(error)); 
  }

  /*filterSerie(value){
    this.searchQuery = '';
    this.serieService.getSeries(this.selectedGenre, this.selectedYear).subscribe(
      response => {
        this.series = response['results'];
      },
      error => console.error(error)); 
  }
  */
  getYears(){
    this.years = this.serieService.getYears();
  }
  
  getGenres(){
    console.log('hello')
    this.serieService.getGenres().subscribe(
    response => {
      this.genres = response.genres;
      console.log(response);
    }, error => console.error(error));
  }
  
  searchSeries(term: string): void {
    this.searchTerms.next(term);
  }
  
  addPages(response){
    this.actualPage = response.page;
    this.lastPage = response.total_pages;
    this.pages = [this.actualPage];
    let x = 0;
    for (let i = this.actualPage-1; i > 1 && x < 4; i--){
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
      this.getSeries(idx);
      document.getElementById('navbar').scrollIntoView();
    } else {
       this.serieService.searchSerie(this.searchQuery, idx).subscribe(
         response => { 
            this.series = response['results'];
            this.addPages(response);
            this.cleanFilters();
         }, 
        error => console.error(error));
    }
  }
  
  cleanFilters(){
    this.selectedGenre = '';
    this.selectedYear = '';
  }
    /*
    this.searchSeries.searchSerie().subscribe(
      response => console.log(response), 
      error => console.error(error));
      */
}
