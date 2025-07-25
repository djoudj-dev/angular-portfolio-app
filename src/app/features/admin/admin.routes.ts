import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { roleGuard } from '@core/guards/role.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Admin Login',
    loadComponent: () =>
      import('./login/login').then(
        (component) => component.Login,
      ),
  },
  {
    path: 'dashboard',
    title: 'Admin Dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./dashboard/dashboard').then(
        (component) => component.Dashboard,
      ),
  },
  {
    path: 'forbidden',
    title: 'Access Denied',
    loadComponent: () =>
      import('../../shared/components/forbidden/forbidden').then(
        (component) => component.Forbidden,
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
