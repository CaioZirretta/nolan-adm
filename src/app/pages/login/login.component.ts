import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { catchError, finalize, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(`300ms cubic-bezier(0.645, 0.045, 0.355, 1)`, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  // TODO Reformular formulário, usar o de inserir Filmes como exemplo
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  loginForm: FormGroup;

  constructor(private elementRef: ElementRef,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login(): void {
    const loginButton = this.elementRef.nativeElement.querySelector(".form-login-button");

    this.errorMessage = "";
    loginButton.disabled = "disabled";
    loginButton.classList.add("disabled");

    this.authService.login(this.username, this.password).pipe(
      tap(response => {
        console.log(response);
        this.cookieService.set("token", response.token);
      }),
      catchError((error: any) => {
        this.errorMessage = error.error.message.message;
        return throwError(error);
      }),
      finalize(() => {
        setTimeout(() => {
          loginButton.disabled = "";
          loginButton.classList.remove("disabled");

        }, 500);
      })
    ).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }

  private handleError(error: Error): void {

  }
}
