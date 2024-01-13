import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateMessagesService {

  constructor(
    private translateService: TranslateService,
    private titleService: Title
  ) { }

  private dataSubject = new Subject<string>();
  language$ = this.dataSubject.asObservable();

  /**
  * Set language Observable value
  * @constructor
  * @param {string} language - Language selected
  */
  changeLanguage(language: string): void {
    this.dataSubject.next(language);
  }

  /**
  * Change title based on translation
  * @constructor
  * @param {string} title - Message key to get title translation
  */
  setTitle(title:string){
    let translatedTitle = ""
    //Get title from translate message service
    this.translateService.get("TITLE."+title).subscribe((res: string) => {
      translatedTitle = res
      //Set title on page
      this.titleService.setTitle(translatedTitle);
    });
  }

  /**
  * Get translation from Translate Service.
  * @constructor
  * @param {string} message - Message key to get translation
  * @returns {string} Translated message
  */
  getMessage(message_key:string):string{
    let message = ""
    this.translateService.get(message_key).subscribe((res: string) => {
      message = res
    });
    return message;
  }
}
