import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private movies:any[] = [];
  private series:any[] = [];
  constructor() { }
  
  getMovieFavorites(){
    return this.movies;
  }
  
  addMovieFavorite(newFavorite){
    this.movies = [...this.movies, ...newFavorite];
    return this.movies;
  }
  
  removeMovieFavorite(idx){
    this.movies.splice(idx, 1);
  }
  
  getSerieFavorites(){
    return this.series;
  }
  
  addSerieFavorite(newFavorite){
    this.series = [...this.series, ...newFavorite];
    return this.series;
  }
  
  removeSerieFavorite(idx){
    this.series.splice(idx, 1);
  }
  
}
