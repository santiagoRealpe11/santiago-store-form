import { Routes } from '@angular/router';
import { Categories } from './components/categories/categories';
import { CategoryForm} from './components/category-form/category-form';
import { CategoryContainer } from './containers/category-container/category-container';
export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: Categories
  },
  {
    path: 'create',
    component: CategoryContainer
  },
  {
    path: 'edit/:id',
    component: CategoryContainer
  }
];