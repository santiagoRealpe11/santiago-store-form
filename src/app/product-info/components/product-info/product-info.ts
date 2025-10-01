import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe, SlicePipe } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductModel } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart';
@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, UpperCasePipe, SlicePipe, MatCardModule, MatButtonModule],
  templateUrl: './product-info.html',
  styleUrls: ['./product-info.css'],
})
export class ProductInfo implements OnInit, OnDestroy {
  private cartService = inject(CartService);

  @Input() product!: ProductModel;
  @Output() productClicked: EventEmitter<number> = new EventEmitter();

  today = new Date();

  constructor() {
    console.log('1. constructor');
  }

  ngOnInit(): void {
    console.log('3. ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('5. ngOnDestroy');
  }

  addCart(): void {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product);
  }
}
