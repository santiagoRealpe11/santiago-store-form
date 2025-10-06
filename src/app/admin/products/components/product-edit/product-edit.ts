import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // ✅ Agregado
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../../../core/models/product.model';
import { MyValidators } from '../../../../utils/validators';
import { ProductsService } from '../../../../core/services/products/products-service';
import { CategoriesService } from '../../../../core/services/categories';
import { categoryModel } from '../../../../core/models/category.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // ✅ Agregado
  ],
})
export class ProductEdit implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  form = this.buildForm();
  id!: string;
  categories: categoryModel[] = [];
  // states = [
  //   { name: 'arizona', abbrev: 'AZ' },
  //   { name: 'California', abbrev: 'CA' },
  //   { name: 'Colorado', abbrev: 'CO' },
  //   { name: 'New York', abbrev: 'NY' },
  //   { name: 'Pennsylvania', abbrev: 'PA' },
  // ];
  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit() {
    // Cargar categorías primero

    // Luego cargar el producto
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.form.patchValue(product);
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product);
      this.productsService.updateProduct(this.id, product).subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  private getCategories() {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
