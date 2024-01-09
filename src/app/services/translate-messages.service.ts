import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateMessagesService {

  constructor(
    private translateService: TranslateService
  ) { }

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
