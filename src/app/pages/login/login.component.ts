import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginRequest } from "../../shared/types/login";
import { AuthService } from "../../shared/services/auth.service";
import { finalize, tap } from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  loginForm: FormGroup;

  constructor(private elementRef: ElementRef,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const loginRequest = new LoginRequest();
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login(event: Event): void {
    const loginButton = this.elementRef.nativeElement.querySelector(".form-login-button");

    // if (!this.username) {
    //   this.errorMessage = "Insira um usuário!";
    //   return;
    // }
    // if (!this.password) {
    //   this.errorMessage = "Insira a senha!";
    //   return;
    // }
    // this.errorMessage = "";
    console.log("disabling");
    loginButton.disabled = "disabled";
    loginButton.classList.add("disabled");
    this.authService.login(this.username, this.password).pipe(
      tap(response => {
        console.log(response);
      }),
      finalize(() => {
        loginButton.disabled = "";
        loginButton.classList.remove("disabled");
      })
    ).subscribe();
  }

  private handleError(error: Error): void {

  }
}
