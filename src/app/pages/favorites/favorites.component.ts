import { Component, OnInit } from '@angular/core';
import {FavoritesService} from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public movies:any;
  public series:any;
  
  constructor(private favoriteService:FavoritesService) { }

  ngOnInit() {
    this.movies = this.favoriteService.getMovieFavorites();
    this.series = this.favoriteService.getSerieFavorites();
    console.log(this.movies);
    console.log(this.series);
  }

}
