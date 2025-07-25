import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string;

  if (!requiredRole) {
    console.error('RoleGuard: no role specified for route');
    return redirectToForbidden(router);
  }

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      // Check if user is logged in
      if (!user) {
        return router.createUrlTree(['/admin/login'], {
          queryParams: { returnUrl: state.url }
        });
      }

      // Check if user has the required role
      if (user.roles.includes(requiredRole)) {
        return true;
      }

      // Redirect to forbidden page
      return redirectToForbidden(router);
    })
  );
};

function redirectToForbidden(router: Router) {
  // Check if we're in the admin section
  const url = router.url;
  const forbiddenUrl = url.startsWith('/admin') ? '/admin/forbidden' : '/forbidden';

  return router.createUrlTree([forbiddenUrl]);
}
