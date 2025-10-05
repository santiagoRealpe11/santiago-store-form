import { Component, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MyValidators } from '../../../../utils/validators';
import { categoryModel } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories';
@Component({
  selector: 'app-category-form',
  imports: [
    MatCardModule,
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
  private http = inject(HttpClient);
  form: FormGroup;
  isUploading = false;
  isNew = true;

  @Input()
  set category(data: categoryModel) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter<categoryModel>();
  @Output() update = new EventEmitter<categoryModel>();

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        MyValidators.validateCategory(this.categoriesService),
      ],
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
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
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
