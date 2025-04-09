import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const noAuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  
  return !authService.checkIfAuthenticated();
};
