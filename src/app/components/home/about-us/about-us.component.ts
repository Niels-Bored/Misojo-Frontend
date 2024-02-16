import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateMessagesService } from '../../../services/translate-messages.service';

@Component({
  selector: 'app-follow-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.less'
})
export class AboutUsComponent {
  constructor(
    private translateMessage: TranslateMessagesService,
    @Inject(PLATFORM_ID) private platformID: any
    ) { }

  ngOnInit(): void {
    this.translateMessage.setTitle("ABOUT");

    this.translateMessage.language$.subscribe((language) => {
      this.translateMessage.setTitle("ABOUT");
    });

    //Disable use of document if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      // Disable aos wait if screen is small
      if (window.innerHeight < 600) {
        document.querySelectorAll('[data-aos]')?.forEach((elem) =>
          elem.setAttribute('data-aos-delay', '0')
        )
      }
    }
  }
}
