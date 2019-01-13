import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private favorites:any[] = []
  constructor() { }
  
  getFavorites(){
    return this.favorites;
  }
  
  addFavorite(newFavorite){
    this.favorites = [...this.favorites, ...newFavorite];
    return this.favorites;
  }
  
  removeFavorite(idx){
    this.favorites.splice(idx, 1);
  }
  
}
