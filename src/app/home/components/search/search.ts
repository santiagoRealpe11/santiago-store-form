import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  searchField = new FormControl();
  private http = inject(HttpClient);
  results: any[] = [];

  ngOnInit() {
    this.searchField.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value && value.trim()) {
        this.getData(value);
      } else {
        this.results = [];
      }
    });
  }

  private getData(query: string) {
    const API = 'LpmiBtVurpV52odoNdQiSS8xfAnEZLxQ';
    this.http
      .get(`https://api.giphy.com/v1/stickers/search?q=${query}&api_key=${API}&limit=6`)
      .pipe(
        map((response: any) => {
          return response.data.map((items: any) => items.images.downsized);
        })
      )
      .subscribe((data) => {
        this.results = data;
      });
  }
}
