import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import { TranslateMessagesService } from '../../../services/translate-messages.service';
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

  classNavbar:string = ""

  constructor(
    private translateService: TranslateService,
    private translateMessage:TranslateMessagesService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformID: any
  ) {
  }

  ngOnInit(): void {
    //Disable use of localstorage if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      //Set deafult languge on localstorage value
      let language = localStorage.getItem("lang")
      if(language){
        this.selectedItem=language
      }else{
        this.selectedItem="en"
      }
    }
  }

  ngAfterViewInit() {

  }

  /**
  * Changes class on navbar menu
  */
  changeClass(){
    if(this.classNavbar == "active"){
      this.classNavbar = ""
    }else{
      this.classNavbar="active"
    }
  }

  /**
  * Changes the global language configuration.
  * @constructor
  * @param {string} language - Language selected as a string
  */
  changeLanguage(language:string){
    //Disable use of localstorage if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      //Save on localstorage language configuration
      localStorage.setItem("lang", language.toLowerCase());
      //Set language option on select
      this.selectedItem = language.toLowerCase();
      //Set global language configuration
      this.translateService.use(language.toLowerCase());
      //Send changed language to other components
      this.translateMessage.changeLanguage(language.toLowerCase());
    }
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
