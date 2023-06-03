import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { catchError, finalize, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Pages } from "../../shared/enums/Pages";
import { CookieService } from "ngx-cookie-service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Animation } from "../../shared/services/animation.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    Animation.fadeIn
  ]
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  // @ts-ignore
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
