import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { catchError, throwError } from "rxjs";
import { Message } from "../../enums/Message";

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent implements OnInit {
  public userForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewUserDialogComponent>,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  protected addUser() {
    this.errorMessage = "";

    const user = {
      username: this.userForm.controls['username'].value,
      password: this.userForm.controls['password'].value,
      createdAt: new Date().toISOString(),
    };

    this.authService.create(user).pipe(
      catchError(error => {
        if (error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })).subscribe(() => {
        this.dialogRef.close();
        this.userForm.reset();
    });

  }

  protected cancel() {
    this.dialogRef.close();
    this.userForm.reset();
  }
}
