import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasUser().pipe(
    map(user => user !== null), // true si existe usuario
    tap(hasUser => {
      if (!hasUser) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
