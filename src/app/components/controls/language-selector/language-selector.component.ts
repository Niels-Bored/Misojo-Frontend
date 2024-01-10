import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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
