import { Component, ElementRef, Input } from '@angular/core';
import { Animation } from "../../services/animation.service";
import { Movie } from "../../types/Movie";
import { EditMovieDialogComponent } from "../movie-dialog/edit-movie-dialog/edit-movie-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteMovieDialogComponent } from "../movie-dialog/delete-movie-dialog/delete-movie-dialog.component";

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  animations: [Animation.fadeIn(300)]
})
export class MovieCardComponent {
  // @Input({ required: true }) imageSrc: string = "";
  // @Input({ required: true }) title: string = "";
  @Input({ required: true }) movie: Movie;

  constructor(public dialog: MatDialog,
              private elementRef: ElementRef) {
  }

  protected editMovie(movie: Movie) {
    const dialogRef = this.dialog.open(EditMovieDialogComponent, {
      data: movie
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe((response) => {
      this.unlockBody();
    });
  }

  protected deleteMovie(movie: Movie) {
    const dialogRef = this.dialog.open(DeleteMovieDialogComponent, {
      data: { id: movie.id }
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe(response => {
      this.unlockBody();
    });
  }

  private lockBody() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    body.style.pointerEvents = 'none';
    body.style.overflow = 'hidden';
  }

  private unlockBody() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    body.style.pointerEvents = 'all';
    body.style.overflow = 'visible';
  }
}
