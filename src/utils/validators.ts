import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MyValidators {
  static isPriceValid(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }
}
