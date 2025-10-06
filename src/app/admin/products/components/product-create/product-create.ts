import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http'; // ✅ Agregado
import { Stepper } from '../../../../shared/components/stepper/stepper';
import { MyValidators } from '../../../../utils/validators';
import { ProductsService } from '../../../../core/services/products/products-service';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesService } from '../../../../core/services/categories';
import { categoryModel } from '../../../../core/models/category.model';
@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    Stepper,
  ],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css'],
})
export class ProductCreate {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private categoriesService = inject(CategoriesService);
  private formBuilder = inject(FormBuilder);
  categories: categoryModel[] = [];
  form = this.buildForm();

  constructor() {
    this.form = this.buildForm();
    this.stockChanges();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      stock: [10, [Validators.required]],
    });

    this.form.get('stock')?.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  imageUrl = signal<string | null>(null);
  isUploading = false;

  private stockChanges() {
    this.form.get('stock')?.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log(formValue);
      const dto = {
        title: formValue.title!,
        price: Number(formValue.price),
        description: formValue.description!,
        categoryId: 1,
        images: [formValue.image || 'https://placehold.co/600x400'],
      };

      this.productsService.createProduct(dto).subscribe(() => {
        this.router.navigate(['./admin/products']);
      });
    }
  }

  ngOnInit() {
    this.getCategories();
  }

  // Método adaptado con ImgBB
  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const image = input.files[0];

    // Validaciones
    if (!image.type.startsWith('image/')) {
      alert('Selecciona una imagen válida');
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      alert('Imagen muy grande. Máximo 5MB');
      return;
    }

    this.isUploading = true;

    const formData = new FormData();
    formData.append('image', image);

    this.http
      .post('https://api.imgbb.com/1/upload?key=9a533a8102b13bac299dff8f6d46958f', formData)
      .subscribe({
        next: (response: any) => {
          const imageUrl = response.data.url;
          console.log('Imagen subida:', imageUrl);

          // Actualizar el signal y el formulario
          this.imageUrl.set(imageUrl);
          this.form.patchValue({ image: imageUrl });

          this.isUploading = false;
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          alert('Error al subir imagen');
          this.isUploading = false;
        },
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
