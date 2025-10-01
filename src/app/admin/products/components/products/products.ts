import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ProductsService } from '../../../../core/services/products/products-service';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  private productsService = inject(ProductsService);

  products: ProductModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'images', 'price', 'actions'];

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }
}
