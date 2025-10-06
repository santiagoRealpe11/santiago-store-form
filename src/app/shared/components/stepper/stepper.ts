import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Stepper),
      multi: true,
    },
  ],
})
export class Stepper implements OnInit, ControlValueAccessor {
  currentValue = 0;
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled!: boolean;
  constructor() {}

  ngOnInit(): void {}
  add() {
    this.currentValue = this.currentValue + 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue = this.currentValue - 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
