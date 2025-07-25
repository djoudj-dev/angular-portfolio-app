import { Routes } from '@angular/router';
import { Home } from '@features/visitor/home/home';
import { Forbidden } from '@shared/components/forbidden/forbidden';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(
        (mod) => mod.ADMIN_ROUTES
      ),
  },
  {
    path: 'forbidden',
    component: Forbidden
  },
];
