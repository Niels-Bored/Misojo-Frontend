import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  @ViewChild('myElement') myElement: ElementRef | undefined;

  selectedItem:string = ""
  variable:string = ""

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    //Set deafult languge on localstorage value
    let language = localStorage.getItem("lang")
    if(language){
      this.selectedItem=language
    }else{
      this.selectedItem="en"
    }
  }

  ngAfterViewInit() {

  }

  /**
  * Changes the global language configuration.
  * @constructor
  * @param {string} language - Language selected as a string
  */
  changeLanguage(language:string){
    //Save on localstorage language configuration
    localStorage.setItem("lang", language.toLowerCase());
    //Set language option on select
    this.selectedItem = language.toLowerCase();
    //Set global language configuration
    this.translateService.use(language.toLowerCase());
  }

  /**
  * Change focus to the end of navbar content
  */
  redirecToMainContent(){
    //Dynamically change tabindex at the end of navbar
    this.variable = '0'
    //Set focus at the end of tab index
    this.renderer.selectRootElement(this.myElement!.nativeElement).focus();
  }

}
