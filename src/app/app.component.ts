import { Component, OnInit } from '@angular/core'
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Misojo';
  constructor(
  ) {
  }
  ngOnInit(): void {
    AOS.init();
  }
}
