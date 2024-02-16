import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.less']
})
export class LanguageSelectorComponent implements OnInit {
  @Output() seleccion = new EventEmitter<string>();
  @Input() text = '';
  @Input() ariaLabelContent = '';
  @Input() tabIndexNumber = 0;

  english:boolean = false

  constructor(
    @Inject(PLATFORM_ID) private platformID: any
  ) { }

  ngOnInit(): void {
    //Disable use of localstorage if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      let language = localStorage.getItem("lang")
      if(language){
        if(language=="en"){
          this.english=true;
        }else{
          this.english=false;
        }
      }else{
        this.english=true;
      }
    }

  }

  /**
  * Select a language option.
  * @constructor
  * @param {string} language - Language selected as a string
  */
  selectLangauge(language:string){
    this.seleccion.emit(language);
    if(language=="en"){
      this.english=true;
    }else{
      this.english=false;
    }
  }
}
