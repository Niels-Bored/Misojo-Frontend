import { Component, OnInit } from '@angular/core'
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
    private translateService: TranslateService
  ) {
  }
  ngOnInit(): void {
    AOS.init();
    let language = localStorage.getItem("lang")
    if(language){
      this.translateService.setDefaultLang(language);
    }else{
      this.translateService.setDefaultLang('en');
    }
  }
}
