import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{

  userName: string = "John Smith";
  userEmail: string = "jnsmith99@gmail.com";
  currentRoute: string = "";

  constructor(
    private router:Router
  ){
  }

  ngOnInit(): void{
  }

  /**
  * Return if the route is the same as the selected one.
  * @constructor
  * @param {string} route - The selected route
  */
  activateOption(route:string){
    this.currentRoute = this.router.url;
    return route==this.currentRoute
  }
}
