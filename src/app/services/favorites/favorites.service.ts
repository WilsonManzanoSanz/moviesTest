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
    const isRepeated = this.movies.filter(value => value.id === newFavorite.id);
    if(this.movies.length === 0 || isRepeated.length < 1){
       this.movies = [...this.movies, ...newFavorite];
    }
  }
  
  removeMovieFavorite(idx){
    this.movies.splice(idx, 1);
  }
  
  getSerieFavorites(){
    return this.series;
  }
  
  addSerieFavorite(newFavorite){
    const isRepeated = this.series.filter(value => value.id === newFavorite.id);
    if(this.series.length === 0 || isRepeated.length < 1){
       this.series = [...this.series, ...newFavorite];
    }
    return this.series;
  }
  
  removeSerieFavorite(idx){
    this.series.splice(idx, 1);
  }
  
}
