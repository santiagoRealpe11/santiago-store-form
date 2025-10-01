// app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
      },
      {
        path: 'products',
        loadChildren: () => import('./product-info/product-info.routes').then(m => m.PRODUCTINFO_ROUTES)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contatc.routes').then(m => m.CONTACT_ROUTES)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.routes').then(m => m.ORDER_ROUTES)
      },
      {
        path: 'demo',
        loadChildren: () => import('./demo/demo.routes').then(m => m.DEMO_ROUTES)
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.routes').then(m => m.PAGE_NOT_FOUND_ROUTES)
  }
];
