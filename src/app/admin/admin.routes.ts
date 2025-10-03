import { Routes } from '@angular/router';
import { Nav } from './components/nav/nav';
import { BasicForm } from './components/basic-form/basic-form';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Nav,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
        {
          path: 'products',
          loadChildren: () => import('./products/products.routes').then(m => m.PRODUCTS_ROUTES)
        },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.routes').then((m) => m.CATEGORIES_ROUTES),
      },
      {
        path:'basic',
        component: BasicForm
      }
    ],
  },
];
