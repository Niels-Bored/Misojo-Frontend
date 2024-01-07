import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateMessagesService {

  constructor(
    private translateService: TranslateService
  ) { }

  getMessage(message_key:string):string{
    let message = ""
    this.translateService.get(message_key).subscribe((res: string) => {
      message = res
    });
    return message;
  }
}
