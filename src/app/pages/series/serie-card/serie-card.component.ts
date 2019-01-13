import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService} from '../../../services/favorites/favorites.service';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.css']
})
export class SerieCardComponent implements OnInit {

  @Input() serie:any;
  isMobile = window.matchMedia( "(max-width: 700px)" );
  constructor(private favoriteService:FavoritesService) { }

  ngOnInit() {
  }

  addNewFavorite(serie){
    console.log(this.favoriteService.addSerieFavorite(serie));
  }

}
