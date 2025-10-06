import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
// Angular Material imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductModel } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
  ],
  templateUrl: './order.html',
  styleUrls: ['./order.css'],
})
export class Order implements OnInit {
  private cartService = inject(CartService);
  private formBuilder = inject(FormBuilder);
  products$: Observable<ProductModel[]>;
  form = this.buildForm();
  constructor() {
    this.products$ = this.cartService.cart$;
    this.form = this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      address: this.formBuilder.array([]),
    });
  }

  addAddressField() {
    this.addressField.push(this.createAddressFiedl());
  }

  private createAddressFiedl() {
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  save() {
    console.log(this.form.value);
  }

  get addressField() {
    return this.form.get('address') as FormArray;
  }

  removeAddressField(index: number): void {
    this.addressField.removeAt(index);
  }
}
