import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  
  public params;
  public headers = new HttpHeaders({
  'Content-Type': 'application/json',
   'Access-Control-Allow-Origin':'*'
  });
  public years = ['1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', 
                  '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014','2016',
                 '2017', '2018'];
  
  constructor(private http: HttpClient) { 
    this.params = new HttpParams().set('include_video','true');
  }
  
  getSeries(page:number = 1 ,genre:string = '', year:string=''){
    let newGenre = new HttpParams().set('with_genres', genre).set('first_air_date_year', year).set('page',String(page));
    return this.http.get<any>(`${environment.base_api}discover/tv`, {params: newGenre});
  }
  
  getGenres(){
    return this.http.get<any>(`${environment.base_api}genre/tv/list`, {params: this.params});
  }
  
  getYears(){
    return this.years;
  }
  
  searchSerie(term: string, page:number = 1): Observable<any>{
    if(term){
      console.log(term);
      let newParams = new HttpParams().set('query',term).set('page', String(page));
      return this.http.get<any>(`${environment.base_api}search/tv`, {params:newParams});
    }
    else {
      return this.getSeries();
    }
  }
  
  getVideo(id){
    return this.http.get<any>(`${environment.base_api}tv/${id}/videos`, {params: this.params});
  }
}
