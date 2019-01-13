import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FavoritesService} from '../../../services/favorites/favorites.service';
import { MovieService} from '../../../services/movies/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeView();
  }

  @Input() movie:any;
  @Input() movieService;
  showTrailer:boolean = false;
  selectedFavorite: boolean = false;
  isMobile = window.matchMedia( "(max-width: 1025px)" );

  constructor(private favoriteService:FavoritesService, public domSanitizer:DomSanitizer, private movieService:MovieService ) { }

  ngOnInit() {
  }

  addNewFavorite(movie){
    this.selectedFavorite = true;
    this.favoriteService.addMovieFavorite(movie);
  }
  
  changeView(){
    this.isMobile = window.matchMedia( "(max-width: 1025px)" );
  }
  
  showVideo(){
    this.movieService.getVideo(this.movie.id).subscribe(
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
