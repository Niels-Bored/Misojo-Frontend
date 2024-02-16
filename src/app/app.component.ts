import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Misojo';
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformID: any
  ) {
  }
  ngOnInit(): void {
    //Disable use of localstorage if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      AOS.init();
      let language = localStorage.getItem("lang")
      if(language){
        this.translateService.setDefaultLang(language);
      }else{
        this.translateService.setDefaultLang('en');
      }
    }

  }
}
