import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductModel } from '../../models/product.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<ProductModel[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string) {
    return this.http.get<ProductModel>(`${environment.url_api}/products/${id}`);
  }

  updateProduct(id: string, changes: Partial<ProductModel>) {
    return this.http.put<ProductModel>(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete<void>(`${environment.url_api}/products/${id}`);
  }
  createProduct(dto: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) {
    return this.http.post(`${environment.url_api}/products`, dto);
  }
}
