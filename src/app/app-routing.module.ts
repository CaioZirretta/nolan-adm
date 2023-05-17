import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from "./shared/enums/Pages";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: Pages.LOGIN,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
