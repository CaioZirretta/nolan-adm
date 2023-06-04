import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Pages } from "../enums/Pages";
import { LoginComponent } from "../../pages/login/login.component";


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();

  // TODO verificar uma forma de fazer essa verificação sem causar um loop entre
  //  o isAuthenticated e o desvio das páginas
  if ((route.component === LoginComponent) && isAuthenticated) {
    router.navigate([Pages.HOME]);
    return true;
  }

  if (isAuthenticated) {
    return true;
  }

  router.navigate(["/" + Pages.LOGIN]);
  return false;
};
