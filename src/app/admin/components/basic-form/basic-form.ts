import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './basic-form.html',
  styleUrl: './basic-form.css',
})
export class BasicForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: any) {
    const ctrlValue = this.monthField.value || new Date();
    ctrlValue.setMonth(normalizedMonthAndYear.getMonth());
    ctrlValue.setFullYear(normalizedMonthAndYear.getFullYear());
    this.monthField.setValue(ctrlValue);
    datepicker.close();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: [
          '',
          [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)],
        ],
      }),
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      color: [''],
      date: ['', [Validators.required]],
      month: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: [''],
      price: [50],
      week: [''],
      time: [''],
      search: [''],
      description: [''],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: [''],
    });
  }

  // ============ GETTERS DE CAMPOS ============

  get nameField() {
    return this.form.get('fullName.name')!;
  }

  get lastNameField() {
    return this.form.get('fullName.lastName')!;
  }

  get emailField() {
    return this.form.get('email')!;
  }

  get phoneField() {
    return this.form.get('phone')!;
  }

  get colorField() {
    return this.form.get('color')!;
  }

  get dateField() {
    return this.form.get('date')!;
  }

  get monthField() {
    return this.form.get('month')!;
  }

  get ageField() {
    return this.form.get('age')!;
  }

  get passwordField() {
    return this.form.get('password')!;
  }

  get priceField() {
    return this.form.get('price')!;
  }

  get weekField() {
    return this.form.get('week')!;
  }

  get timeField() {
    return this.form.get('time')!;
  }

  get searchField() {
    return this.form.get('search')!;
  }

  get descriptionField() {
    return this.form.get('description')!;
  }

  get categoryField() {
    return this.form.get('category')!;
  }

  get tagField() {
    return this.form.get('tag')!;
  }

  get agreeField() {
    return this.form.get('agree')!;
  }

  get genderField() {
    return this.form.get('gender')!;
  }

  get zoneField() {
    return this.form.get('zone')!;
  }

  // ============ GETTERS DE VALIDACIÓN ============

  // Name
  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }
  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  // Last Name
  get isLastNameFieldValid() {
    return this.lastNameField.touched && this.lastNameField.valid;
  }
  get isLastNameFieldInvalid() {
    return this.lastNameField.touched && this.lastNameField.invalid;
  }

  // Email
  get isEmailFieldValid() {
    return this.emailField.touched && this.emailField.valid;
  }
  get isEmailFieldInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }

  // Phone
  get isPhoneFieldValid() {
    return this.phoneField.touched && this.phoneField.valid;
  }
  get isPhoneFieldInvalid() {
    return this.phoneField.touched && this.phoneField.invalid;
  }

  // Date
  get isDateFieldValid() {
    return this.dateField.touched && this.dateField.valid;
  }
  get isDateFieldInvalid() {
    return this.dateField.touched && this.dateField.invalid;
  }

  // Age
  get isAgeFieldValid() {
    return this.ageField.touched && this.ageField.valid;
  }
  get isAgeFieldInvalid() {
    return this.ageField.touched && this.ageField.invalid;
  }

  // Agree
  get isAgreeFieldValid() {
    return this.agreeField.touched && this.agreeField.valid;
  }
  get isAgreeFieldInvalid() {
    return this.agreeField.touched && this.agreeField.invalid;
  }
}
