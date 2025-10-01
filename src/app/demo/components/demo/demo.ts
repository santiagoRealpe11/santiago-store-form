import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExponentialPipe } from '../../../shared/pipes/exponential-pipe';
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [FormsModule, ExponentialPipe],
  templateUrl: './demo.html',
  styleUrls: ['./demo.css'],
})
export class Demo {
  title = 'platzi-store';
  items = ['nicolas', 'julian', 'perez'];
  objeto = {};
  power = 10;

  ngOnInit(): void {
    // code
  }

  addItem(): void {
    this.items.push('nuevo item');
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
}
