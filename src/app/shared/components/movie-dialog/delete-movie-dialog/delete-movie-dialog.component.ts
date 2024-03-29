import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieService } from "../../../services/movie.service";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { UpdateListService } from "../../../services/update-list.service";

@Component({
  selector: 'app-delete-movie-dialog',
  templateUrl: './delete-movie-dialog.component.html',
  styleUrls: ['./delete-movie-dialog.component.css']
})
export class DeleteMovieDialogComponent implements OnInit{
  public errorMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteMovieDialogComponent>,
              private movieService: MovieService,
              private updateListService: UpdateListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  protected deleteMovie() {
    this.errorMessage = "";

    const movieId: string = this.data.id!

    this.movieService.remove(movieId).pipe(
      catchError(error => {
        // Adicionar verificação para resposta sobre tamanho de arquivo
        if(error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })
    ).subscribe(() => {
      this.updateListService.updateList.emit();
      this.dialogRef.close();
    });
  }

  protected cancel() {
    this.dialogRef.close();
  }
}
