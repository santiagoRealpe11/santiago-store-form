import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../../core/services/auth';
import { MyValidators } from '../../../utils/validators';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  form: FormGroup;

  constructor() {
    this.form = this.buildForm();
    this.validacionCondicional();
  }

  ngOnInit(): void {}

  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService
        .createUser(value.email, value.password)
        .then(() => {
          this.router.navigate(['/auth/login']);
        })
        .catch((error) => {
          alert('Error al registrar: ' + error.message);
        });
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
        confirmPassword: ['', [Validators.required]],
        type: ['company', [Validators.required]],
        companyName: ['', [Validators.required]],
      },
      {
        validators: MyValidators.passwordMatchValidator,
      }
    );
  }

  private validacionCondicional() {
    this.typeField?.valueChanges.subscribe((value) => {
      console.log(value);
      if (value == 'company') {
        this.companyNameField?.setValidators([Validators.required]);
      } else {
        this.companyNameField?.setValidators(null);
      }
      this.companyNameField?.updateValueAndValidity();
    });
  }

  get typeField() {
    return this.form.get('type');
  }
  get companyNameField() {
    return this.form.get('companyName');
  }
}
