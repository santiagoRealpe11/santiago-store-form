import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs';
import { CategoriesService } from '../core/services/categories';
export class MyValidators {
  static isPriceValid(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return { invalid_password: true };
    }
    return null;
  }

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkAvailability(value).pipe(
        map((response) => {
          const isAvailable = response;
          if (!isAvailable) return { not_available: true };

          return null;
        })
      );
    };
  }
}

function containsNumber(value: string) {
  return value.split('').find((v) => isNumber(v)) !== undefined;
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}
