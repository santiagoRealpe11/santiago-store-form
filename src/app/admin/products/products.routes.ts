import { Routes } from '@angular/router';

import { Products } from './components/products/products';
import { ProductCreate } from './components/product-create/product-create';
import { ProductEdit } from './components/product-edit/product-edit';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: Products,
  },
  {
    path: 'create',
    component: ProductCreate,
  },
  {
    path: 'edit/:id',
    component: ProductEdit,
  },
];
