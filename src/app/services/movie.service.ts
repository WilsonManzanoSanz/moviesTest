import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { of } from "rxjs/observable/of";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  public params;
  public headers = new HttpHeaders({
  'Content-Type': 'application/json',
   'Access-Control-Allow-Origin':'*'
  });
  public years = ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', 
                  '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014','2016',
                 '2017', '2018'];
  
  constructor(private http: HttpClient) { 
    this.params = new HttpParams().set('include_video',true).set('api_key', 'a1d5fa35e02203e65e413e3e806bcd1d');
  }
  
  getMovies(){
    return this.http.get(`${environment.base_api}discover/movie`, {params: this.params});
  }
  
  getGenres(){
    return this.http.get(`${environment.base_api}genre/movie/list`, {params: this.params});
  }
  
  getYears(){
    return this.years;
  }
  
  searchMovie(term: string): Observable<any[]>{
    if(term){
      console.log(term);
      let newParams = new HttpParams().set('query',term).set('api_key', 'a1d5fa35e02203e65e413e3e806bcd1d');
      return this.http.get(`${environment.base_api}search/movie`, {params:newParams});
    };
    else {
      console.log('return');
      return this.getMovies();
    }
  }
}
