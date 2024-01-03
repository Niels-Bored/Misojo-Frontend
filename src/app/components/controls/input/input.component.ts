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
  @Input() tabIndexNumber = 0;
  @Input() control: any;
  @Input() submitted: boolean = false;
  @Input() error: boolean = false;
  @Input() appearance: 'standard' | 'fill' = 'standard';

  ngOnInit(): void{
  }

  constructor() { }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(val: any): void {}
  public onTouched(): void {}

  change(event: any): void {
    this.value = event?.target?.value;
    this.onChange(this.value);
    this.onTouched();
  }

  get errorClass() {
    return this.hasErrorInput()
      ? `${this.appearance} is-invalid-input`
      : this.appearance;
  }

  hasErrorInput():boolean {
    return (
      (this.submitted && this.control?.invalid) ||
      (this.control &&
        this.control.invalid &&
        (this.control.dirty || this.control.touched))
    );
  }
}
