import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const logoutGuard: CanActivateFn = () => {
  inject(Auth).logout();
  return inject(Router).createUrlTree(['/login']);
};
