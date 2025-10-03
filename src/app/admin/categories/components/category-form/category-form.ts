import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../../core/services/categories';
import { HttpClient } from '@angular/common/http';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; // ✅ Importa esto
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [
    MatCardModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);
  private storage = inject(Storage); // ✅ Inyecta Storage
  private http = inject(HttpClient);
  form: FormGroup;
  isUploading = false;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      this.crearCategory();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private crearCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data).subscribe({
      next: (rta) => {
        console.log('✅ Categoría creada:', rta);
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('❌ Error:', err);
      },
    });
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const image = input.files[0];

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
          console.log('✅ Imagen subida:', imageUrl);

          // Guardamos en el form la URL, no en el input file
          this.form.patchValue({ image: imageUrl });

          this.isUploading = false;
        },
        error: (err) => {
          console.error('❌ Error:', err);
          alert('Error al subir imagen');
          this.isUploading = false;
        },
      });
  }
}
