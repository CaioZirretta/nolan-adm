import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginRequest } from "../../shared/types/login";
import { AuthService } from "../../shared/services/auth.service";
import { finalize, tap } from "rxjs";
import { Router } from "@angular/router";
import { Pages } from "../../shared/enums/Pages";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

    loginButton.disabled = "disabled";
    loginButton.classList.add("disabled");

    this.authService.login(this.username, this.password).pipe(
      tap(response => {
        this.cookieService.set("token", response.token);
      }),
      finalize(() => {
        loginButton.disabled = "";
        loginButton.classList.remove("disabled");
      })
    ).subscribe(() => {
      this.router.navigate(["/" + Pages.HOME]);
    });
  }

  private handleError(error: Error): void {

  }
}
