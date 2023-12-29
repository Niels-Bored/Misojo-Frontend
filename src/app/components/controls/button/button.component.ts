import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {

  @Input() text = '';
  @Input() ariaLabelContent = '';
  @Input() tabIndexNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
