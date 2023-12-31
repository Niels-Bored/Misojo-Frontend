import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  selectedItem:string = ""

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    let language = localStorage.getItem("lang")
    if(language){
      this.selectedItem=language
    }else{
      this.selectedItem="en"
    }
  }

  changeLanguaje(language:string){
    localStorage.setItem("lang", language);
    this.selectedItem = language;
    this.translateService.use(language);
  }

}
