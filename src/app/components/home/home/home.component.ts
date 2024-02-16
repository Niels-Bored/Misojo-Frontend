import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{

  userName: string = "John Smith Zapata Bernal";
  userEmail: string = "jnsmith990000000000@gmail.com";
  currentRoute: string = "";

  constructor(
    private router:Router,
    private sessionService:SessionServiceService
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

  cutStringValue(value:string, type:string){
    let stringLenght = 0
    if(type == "name"){
      stringLenght = 13;
    }
    if(type == "email"){
      stringLenght = 16;
    }
    if(value.length <=stringLenght){
      return value
    }
    return value.substring(0, stringLenght)+"...";
  }

  logout(){
    this.sessionService.clearSessionKeys();
    this.router.navigate(["/login"])
  }
}
