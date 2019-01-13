import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService} from '../../../services/favorites/favorites.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie:any;
  isMobile = window.matchMedia( "(max-width: 700px)" );
  constructor(private favoriteService:FavoritesService) { }

  ngOnInit() {
  }

  addNewFavorite(movie){
    console.log(this.favoriteService.addMovieFavorite(movie));
  }

}
