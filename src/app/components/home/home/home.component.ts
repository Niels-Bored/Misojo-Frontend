import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SessionServiceService } from 'src/app/services/session-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{

  @ViewChild('myElement') myElement: ElementRef | undefined;

  public dynamicTabIndex:string = ""
  public userName: string = "John Smith Zapata Bernal";
  public userEmail: string = "jnsmith990000000000@gmail.com";
  public currentRoute: string = "";

  constructor(
    private router:Router,
    private renderer: Renderer2,
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
    return "/home/"+route==this.currentRoute
  }

  /**
  * Cut overflow string value.
  * @constructor
  * @param {string} value - String value
  * @param {string} type - String type
  */
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

  /**
  * Redirect and set tab index on selected option.
  * @constructor
  * @param {string} route - String value
  */
  redirectTo(route:string){
    this.router.navigate(["/home/"+route]);
    this.redirecToMainContent()
  }

  /**
  * Change focus to the end of navbar content
  */
  redirecToMainContent(){
    //Dynamically change tabindex at the end of navbar
    this.dynamicTabIndex = '0'
    //Set focus at the end of tab index
    this.renderer.selectRootElement(this.myElement!.nativeElement).focus();

  }

  /**
  * Clear session values and redirect to login.
  */
  logout(){
    this.sessionService.clearSessionKeys();
    this.router.navigate(["/login"])
  }
}
