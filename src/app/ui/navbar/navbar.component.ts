import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.changeIsMobile();
  }

  public isMobile:Boolean = window.matchMedia("(max-width: 900px)").matches;

  constructor() { }

  ngOnInit() {

  }

  toggleMenu(){
    this.isMobile = !this.isMobile;
  }

  hideMenu(){
    this.isMobile = true;
  }

  changeIsMobile(){
    this.isMobile = window.matchMedia("(max-width: 900px)").matches;
  }

  

}
