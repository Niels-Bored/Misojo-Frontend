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
    this.translateService.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');
  }
}
