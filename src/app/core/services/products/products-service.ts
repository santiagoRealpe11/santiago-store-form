import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductModel } from '../../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.url_api}/products/${id}`);
  }

  updateProduct(id: string, changes: Partial<ProductModel>): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.url_api}/products/${id}`);
  }

  createProduct(dto: any): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${environment.url_api}/products`, dto);
  }
}
