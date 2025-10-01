import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor en el template
import { ProductInfo } from '../product-info/product-info';
import { ProductModel } from './../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products/products-service';

@Component({
  selector: 'app-products-info',
  standalone: true, // ✅ CLAVE: Componente independiente de Angular 20
  imports: [CommonModule, ProductInfo], // Importamos CommonModule para usar *ngFor
  templateUrl: './products-info.html',
  styleUrls: ['./products-info.css'],
})
export class ProductsInfo implements OnInit {
  // ✅ Uso de la función inject() en lugar del constructor
  private productsService = inject(ProductsService);

  products: ProductModel[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
