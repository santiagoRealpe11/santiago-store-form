import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ProductsService } from '../../../core/services/products/products-service';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  product: ProductModel | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string): void {
    this.productsService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  createProduct(): void {
    const newProduct: any = {
      title: 'nuevo desde angular',
      images: ['https://placeimg.com/640/480/any'],
      price: 3000,
      description: 'nuevo producto',
      categoryId: 1,
    };
    this.productsService.createProduct(newProduct).subscribe((product) => {
      console.log(product);
    });
  }

  updateProduct(): void {
    if (!this.product) return;

    const updateProduct: Partial<ProductModel> = {
      price: 555555,
      description: 'edicion titulo',
    };
    this.productsService
      .updateProduct(this.product.id.toString(), updateProduct)
      .subscribe((product) => {
        console.log(product);
        this.product = product;
      });
  }

  deleteProduct(): void {
    if (!this.product) return;

    this.productsService.deleteProduct(this.product.id.toString()).subscribe((rta) => {
      console.log(rta);
    });
  }
}
