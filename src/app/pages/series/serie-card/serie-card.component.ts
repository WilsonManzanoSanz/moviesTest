import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FavoritesService} from '../../../services/favorites/favorites.service';
import { SerieService} from '../../../services/series/series.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.css']
})
export class SerieCardComponent implements OnInit {

  @Input() serie:any;
  selectedFavorite: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeView();
  }
  isMobile = window.matchMedia( "(max-width: 1025px)" );
  constructor(private favoriteService:FavoritesService, public domSanitizer:DomSanitizer, private serieService:SerieService) { }

  ngOnInit() {
  }

  addNewFavorite(serie){
    this.selectedFavorite = true;
    this.favoriteService.addSerieFavorite(this.serie);
  }
  
  changeView(){
    this.isMobile = window.matchMedia( "(max-width: 1025px)" );
  }
  
  showVideo(){
    this.serieService.getVideo(this.serie.id).subscribe(
      response => {
        this.showTrailer = true;
        this.videoLink = (response.results.length > 0) && ('https://www.youtube.com/embed/'+response.results[0].key);
        console.log(this.videoLink);
      },
      error => console.error(error)
    );
  }
  
  closeVideo(){
    this.showTrailer = false;
  }

}
