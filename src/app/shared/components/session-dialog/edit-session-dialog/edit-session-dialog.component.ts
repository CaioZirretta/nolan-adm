import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MovieIdName } from "../../../types/Movie";
import { UpdateListService } from "../../../services/update-list.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SessionService } from "../../../services/session.service";
import { MovieService } from "../../../services/movie.service";
import { Session } from "../../../types/Session";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";

@Component({
  selector: 'app-edit-session-dialog',
  templateUrl: './edit-session-dialog.component.html',
  styleUrls: ['./edit-session-dialog.component.css']
})
export class EditSessionDialogComponent implements OnInit {
  public sessionForm: FormGroup;
  public errorMessage: string;
  protected movieList: MovieIdName[];

  constructor(private formBuilder: FormBuilder,
              private updateListService: UpdateListService,
              public dialogRef: MatDialogRef<EditSessionDialogComponent>,
              private sessionService: SessionService,
              private movieService: MovieService,
              @Inject(MAT_DIALOG_DATA) public session: Session) {
  }

  ngOnInit() {
    this.sessionForm = this.formBuilder.group({
      time: [new Date(this.session.time), [Validators.required]],
      movieName: [this.session.movieName, [Validators.required]],
    });

    this.movieService.listIdName().subscribe(response => {
      this.movieList = response;
    });
  }

  protected addSession() {
    this.errorMessage = "";
    const movieId: string = this.movieList.filter(movie => movie.name === this.sessionForm.controls['movieName'].value)[0].id;

    const session: Session = {
      id: this.session.id,
      roomNumber: this.session.roomNumber,
      sits: [],
      time: this.sessionForm.controls['time'].value,
      movieId,
      movieName: this.sessionForm.controls['movieName'].value,
      updatedAt: new Date(),
    };

    this.sessionService.edit(session).pipe(
      catchError(error => {
        if (error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })
    ).subscribe((response) => {
      this.updateListService.updateList.emit();
      this.dialogRef.close();
      this.sessionForm.reset();
    });
  }

  protected cancel() {
    this.dialogRef.close();
    this.sessionForm.reset();
  }
}
