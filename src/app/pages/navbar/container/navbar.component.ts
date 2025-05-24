import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { TravelersComponent } from '../../travelers/container/travelers.component';
import { CityComponent } from '../../city/container/city.component';

@Component({
  selector: 'app-navbar',
  imports: [
     RouterLink, 
     RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  
})
export class NavbarComponent implements OnInit {

   routes: Routes = [
    { path: 'travel', component: TravelersComponent },
    { path: 'city', component: CityComponent },
  ];

  constructor( 
  ){

  }

  ngOnInit(): void {
    console.info('...Ejecutando Navbar');
  }

  calledTravel() {
    console.info(".... LLamando a lista Viajeros")
  }


  calledCity() {
    console.info(".... LLamando a lista Viajeros")
  }

}
