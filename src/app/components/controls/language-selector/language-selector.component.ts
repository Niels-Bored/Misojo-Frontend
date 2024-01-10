import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.less']
})
export class LanguageSelectorComponent implements OnInit {
  @Output() seleccion = new EventEmitter<string>();
  optionSelected = "En";
  imageSelected = "../../../../assets/Images/usa.png";

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * Select a language option.
  * @constructor
  * @param {string} language - Language selected as a string
  */
  selectLangauge(language:string, image:string){
    this.optionSelected=language;
    this.imageSelected=image;
    this.seleccion.emit(this.optionSelected);
  }

}
