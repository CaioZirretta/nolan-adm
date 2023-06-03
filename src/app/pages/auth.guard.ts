import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../shared/services/auth.service";
import { inject } from "@angular/core";
import { Pages } from "../shared/enums/Pages";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();

  if(isAuthenticated) {
    return true;
  }
  router.navigate(["/" + Pages.LOGIN]);
  return false;
};
