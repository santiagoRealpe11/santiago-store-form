import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductModel[] = [];
  private cart = new BehaviorSubject<ProductModel[]>([]);

  cart$ = this.cart.asObservable();

  addCart(product: ProductModel): void {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }

  removeFromCart(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.cart.next(this.products);
  }

  clearCart(): void {
    this.products = [];
    this.cart.next(this.products);
  }

  getTotal(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }
}