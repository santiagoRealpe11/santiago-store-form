import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer implements OnInit {
  emailField: FormControl;
  currentYear = new Date().getFullYear();

  constructor() {
    this.emailField = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit(): void {}

  sendMail(): void {
    if (this.emailField.valid) {
      console.log(this.emailField.value);
      // Aquí puedes agregar lógica para enviar el correo
      alert('Email enviado: ' + this.emailField.value);
      this.emailField.reset();
    }
  }
}
