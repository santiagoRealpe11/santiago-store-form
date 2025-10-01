import { Routes } from '@angular/router';
import { ProductsInfo } from './components/products-info/products-info';
import { ProductDetail } from './components/product-detail/product-detail';

export const PRODUCTINFO_ROUTES: Routes = [
  {
    path: '',
    component: ProductsInfo,
  },
  {
    path: ':id',
    component: ProductDetail,
  },
];
