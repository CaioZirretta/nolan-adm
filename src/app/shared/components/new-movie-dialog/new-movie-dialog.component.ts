import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MovieService } from "../../services/movie.service";
import { Movie } from "../../types/Movie";
import { catchError, finalize, tap, throwError } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";
import { Message } from "../../enums/Message";
import { UpdateMovieListService } from "../../services/update-movie-list.service";

@Component({
  selector: 'new-movie-dialog',
  templateUrl: './new-movie-dialog.component.html',
  styleUrls: ['./new-movie-dialog.component.css']
})
export class NewMovieDialogComponent implements OnInit {
  public movieForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private updateMovieListService: UpdateMovieListService,
              public dialogRef: MatDialogRef<NewMovieDialogComponent>,
              private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      name: ['sad', [Validators.required]],
      synopis: ['asd', [Validators.required]],
      synopsisExpanded: ['ads', [Validators.required]],
      banner: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      this.movieForm.controls['banner'].setValue(base64Image);
    };

    reader.readAsDataURL(file);
  }

  addMovie() {
    this.errorMessage = "";

    const movie: Movie = {
      name: this.movieForm.controls['name'].value,
      synopsis: this.movieForm.controls['synopis'].value,
      synopsis_expanded: this.movieForm.controls['synopsisExpanded'].value,
      banner: this.movieForm.controls['banner'].value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.movieService.add(movie).pipe(
      catchError(error => {
        // Adicionar verificação para tamanho de arquivo
        if(error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })
    ).subscribe((response) => {
      this.updateMovieListService.updateList.emit();
      this.dialogRef.close();
      this.movieForm.reset();
    });
  }

  cancel() {
    this.dialogRef.close();
    this.movieForm.reset();
  }
}
