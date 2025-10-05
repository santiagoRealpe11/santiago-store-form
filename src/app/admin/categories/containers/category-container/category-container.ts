import { Component, inject } from '@angular/core';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories';
import { CategoryForm } from '../../components/category-form/category-form';
import { categoryModel } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-container',
  imports: [CategoryForm],
  templateUrl: './category-container.html',
  styleUrl: './category-container.css',
})
export class CategoryContainer {
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  category!: categoryModel;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.getCategory(params['id']);
      }
    });
  }

  crearCategory(data: Partial<categoryModel>) {
    this.categoriesService.createCategory(data).subscribe({
      next: (rta) => {
        console.log('Categoría creada:', rta);
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  updateCategoty(data: Partial<categoryModel>) {
    this.categoriesService.updateCategory(this.category.id, data).subscribe({
      next: (rta) => {
        this.router.navigate(['/admin/categories']);
      },
    });
  }

  getCategory(id: number) {
    this.categoriesService.getCategory(id).subscribe((data) => {
      this.category = data;
    });
  }
}
