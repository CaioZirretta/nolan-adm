import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieService } from "../../../services/movie.service";
import { Movie } from "../../../types/Movie";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { UpdateListService } from "../../../services/update-list.service";

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
  styleUrls: ['./edit-movie-dialog.component.css']
})
export class EditMovieDialogComponent implements OnInit {
  public movieForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              private updateListService: UpdateListService,
              public dialogRef: MatDialogRef<EditMovieDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public movie: Movie) {
  }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      name: [this.movie.name, [Validators.required]],
      synopis: [this.movie.synopsis, [Validators.required]],
      synopsisExpanded: [this.movie.synopsis_expanded, [Validators.required]],
      banner: [this.movie.banner, [Validators.required]],
    });
  }

  protected onFileSelected(event: any){
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      this.movieForm.controls['banner'].setValue(base64Image);
    };

    reader.readAsDataURL(file);
  }

  protected editMovie() {
    this.errorMessage = "";

    const movie: Movie = {
      id: this.movie.id,
      name: this.movieForm.controls['name'].value,
      synopsis: this.movieForm.controls['synopis'].value,
      synopsis_expanded: this.movieForm.controls['synopsisExpanded'].value,
      banner: this.movieForm.controls['banner'].value,
    };

    this.movieService.edit(movie).pipe(
      catchError(error => {
        // Adicionar verificação para resposta sobre tamanho de arquivo
        if(error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })
    ).subscribe((response) => {
      this.updateListService.updateList.emit();
      this.dialogRef.close();
      this.movieForm.reset();
    });
  }

  protected cancel() {
    this.dialogRef.close();
    this.movieForm.reset();
  }
}
