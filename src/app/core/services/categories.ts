import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryModel } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<categoryModel[]>(`${environment.url_api}/categories`);
  }

  createCategory(data: Partial<categoryModel>) {
    return this.http.post<categoryModel>(`${environment.url_api}/categories`, data);
  }

  updateCategory(id: number, data: Partial<categoryModel>) {
    return this.http.put<categoryModel>(`${environment.url_api}/categories/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete<boolean>(`${environment.url_api}/categories/${id}`);
  }
}
 