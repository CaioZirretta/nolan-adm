import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginRequest } from "../../shared/types/login";
import { AuthService } from "../../shared/services/auth.service";


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
    if (!this.username) {
      this.errorMessage = "teste username";
      return;
    }
    if (!this.password) {
      this.errorMessage = "teste password";
      return;
    }
    this.errorMessage = "";
    console.log(event)
  }

  private handleError(error: Error): void {

  }
}
