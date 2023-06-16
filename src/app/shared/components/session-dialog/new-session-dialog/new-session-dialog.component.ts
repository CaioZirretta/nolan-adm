import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UpdateListService } from "../../../services/update-list.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Session } from "../../../types/Session";
import { SessionService } from "../../../services/session.service";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { Room } from "../../../types/Room";
import { MovieService } from "../../../services/movie.service";
import { MovieIdName } from "../../../types/Movie";

@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.css']
})
export class NewSessionDialogComponent implements OnInit {
  public sessionForm: FormGroup;
  public errorMessage: string;
  protected movieList: MovieIdName[];

  constructor(private formBuilder: FormBuilder,
              private updateListService: UpdateListService,
              public dialogRef: MatDialogRef<NewSessionDialogComponent>,
              private sessionService: SessionService,
              private movieService: MovieService,
              @Inject(MAT_DIALOG_DATA) public room: Room) {
  }

  ngOnInit() {
    this.sessionForm = this.formBuilder.group({
      time: ['', [Validators.required]],
      // movieId: ['', [Validators.required]],
      movieName: ['', [Validators.required]],
    });

    this.movieService.listIdName().subscribe(response => {
      this.movieList = response;
    });
  }

  protected addSession() {
    this.errorMessage = "";
    const movieId: string = this.movieList.filter(movie => movie.name === this.sessionForm.controls['movieName'].value)[0].id;

    const session: Session = {
      roomNumber: this.room.number,
      sits: [],
      time: this.sessionForm.controls['time'].value,
      movieId,
      movieName: this.sessionForm.controls['movieName'].value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessionService.add(session).pipe(
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
