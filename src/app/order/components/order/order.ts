import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// Angular Material imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ProductModel } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class Order implements OnInit {
  private cartService = inject(CartService);

  products$: Observable<ProductModel[]>;

  constructor() {
    this.products$ = this.cartService.cart$;
  }

  ngOnInit(): void {
  }
}