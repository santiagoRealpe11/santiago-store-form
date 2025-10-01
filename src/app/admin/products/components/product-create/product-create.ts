import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { getDownloadURL, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { MyValidators } from '../../../../utils/validators';
import { ProductsService } from '../../../../core/services/products/products-service';

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
  ],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css'],
})
export class ProductCreate {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private storage = inject(Storage);

  form = this.fb.group({
    id: [''],
    title: ['', [Validators.required]],
    price: ['', [Validators.required, MyValidators.isPriceValid]],
    description: ['', [Validators.required]],
    categoryId: [1, [Validators.required]], // puedes poner 1 por defecto
    image: [''], // URL temporal antes de pasarlo a arreglo
  });

  imageUrl = signal<string | null>(null);

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const formValue = this.form.value;

      const dto = {
        title: formValue.title!,
        price: Number(formValue.price), // 👈 convertir a number
        description: formValue.description!,
        categoryId: 1, // 👈 puedes cambiar esto por el valor real
        images: [formValue.image || 'https://placehold.co/600x400'], // 👈 si no hay imagen, usa placeholder
      };

      this.productsService.createProduct(dto).subscribe(() => {
        this.router.navigate(['./admin/products']);
      });
    }
  }

  async uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const name = `products/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, name);
    const task = uploadBytesResumable(storageRef, file);

    task.on('state_changed', async () => {
      const url = await getDownloadURL(storageRef);
      this.imageUrl.set(url);
      this.form.get('image')?.setValue(url);
    });
  }

  get priceField() {
    return this.form.get('price');
  }
}
