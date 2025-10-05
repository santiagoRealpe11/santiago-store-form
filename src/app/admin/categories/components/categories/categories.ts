import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories';
import { categoryModel } from '../../../../core/models/category.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})
export class Categories implements OnInit {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  categories: categoryModel[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener categorías:', err);
        this.isLoading = false;
      },
    });
  }

  deleteCategory(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        // quitar de la lista local sin recargar
        this.categories = this.categories.filter((c) => c.id !== id);
        console.log('✅ Categoría eliminada');
      },
      error: (err) => {
        console.error('❌ Error al eliminar:', err);
        alert('No se pudo eliminar la categoría');
      },
    });
  }

  goToCreate() {
    this.router.navigate(['/admin/categories/create']);
  }
}
