import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieService } from "../../../services/movie.service";
import { Movie } from "../../../types/Movie";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { Router } from "@angular/router";
import { Pages } from "../../../enums/Pages";
import { UpdateMovieListService } from "../../../services/update-movie-list.service";

@Component({
  selector: 'app-delete-movie-dialog',
  templateUrl: './delete-movie-dialog.component.html',
  styleUrls: ['./delete-movie-dialog.component.css']
})
export class DeleteMovieDialogComponent implements OnInit{
  public errorMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteMovieDialogComponent>,
              private movieService: MovieService,
              private updateMovieListService: UpdateMovieListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  deleteMovie() {
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
      this.updateMovieListService.updateList.emit();
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
