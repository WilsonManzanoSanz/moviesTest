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
  public searchQuery;
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
        data => {
          this.selectedGenre = '';
          this.selectedYear = '';
          this.series = data['results'];
        }
    );
  }
  
  getSeries(){
    this.serieService.getSeries().subscribe(
      response => {
        this.series = response['results'];
      },
      error => console.error(error)); 
  }

  filterSerie(value){
    this.searchQuery = '';
    this.serieService.getSeries(this.selectedGenre, this.selectedYear).subscribe(
      response => {
        this.series = response['results'];
      },
      error => console.error(error)); 
  }
  
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
    /*
    this.searchSeries.searchSerie().subscribe(
      response => console.log(response), 
      error => console.error(error));
      */
}
