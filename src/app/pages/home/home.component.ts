import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NewMovieDialogComponent } from "../../shared/components/new-movie-dialog/new-movie-dialog.component";
import { Movie } from "../../shared/types/Movie";
import { MovieService } from "../../shared/services/movie.service";
import { ActivatedRoute } from "@angular/router";
import { EditMovieDialogComponent } from "../../shared/components/edit-movie-dialog/edit-movie-dialog.component";
import { UpdateMovieListService } from "../../shared/services/update-movie-list.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieList: Movie[] = [];

  constructor(public dialog: MatDialog,
              private elementRef: ElementRef,
              private movieService: MovieService,
              private updateMovieListService: UpdateMovieListService) {
  }

  ngOnInit() {
    this.updateMovieList();
    this.updateMovieListService.updateList.subscribe(() => {
      this.updateMovieList();
    });
  }

  addMovie() {
    const dialogRef = this.dialog.open(NewMovieDialogComponent);
    this.lockBody();

    dialogRef.afterClosed().subscribe((response) => {
      this.unlockBody();
    });
  }

  private updateMovieList() {
    this.movieService.list().subscribe(response => {
      this.movieList = response;
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
