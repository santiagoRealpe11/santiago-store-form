import { Routes } from '@angular/router';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const PAGE_NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    component: PageNotFound
  }
];