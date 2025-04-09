import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.checkIfAuthenticated()) {
    const redirectURL = `/${segments.join('/')}`;
    const urlTree = router.parseUrl(`sign-in?redirectURL=${redirectURL}`);

    return urlTree;
  }
  else {
    return true;
  }
};
