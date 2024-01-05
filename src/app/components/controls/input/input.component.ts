import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  styleUrls: ['./input.component.less']
})
export class InputComponent implements ControlValueAccessor {
  value: any = null;

  @Input() uppercase:boolean = false;
  @Input() type = 'text';
  @Input("class") className = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() placeHolderText = '';
  @Input() ariaLabelContent = '';
  @Input() ariaLabelledBy = '';
  @Input() tabIndexNumber = 0;
  @Input() control: any;
  @Input() submitted: boolean = false;
  @Input() error: boolean = false;
  @Input() appearance: 'standard' | 'fill' = 'standard';

  ngOnInit(): void{
  }

  constructor() { }

  /**
  * Assign written value on input
  */
  writeValue(val: any): void {
    this.value = val;
  }

  /**
  * Register change event on component
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
  * Register touch event on component
  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(val: any): void {}
  public onTouched(): void {}

  /**
  * Detects change event on component
  */

  change(event: any): void {
    this.value = event?.target?.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
