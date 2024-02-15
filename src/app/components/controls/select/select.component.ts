import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.less'
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onSelect(event:any): void {
    this.optionSelected.emit(event.target.value);
  }
}
