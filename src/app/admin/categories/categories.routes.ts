import { Routes } from '@angular/router';
import { Categories } from './components/categories/categories';
import { CategoryForm} from './components/category-form/category-form';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: Categories
  },
  {
    path: 'create',
    component: CategoryForm
  },
  {
    path: 'edit/:id',
    component: CategoryForm
  }
];