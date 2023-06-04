import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NewMovieDialogComponent } from "../../shared/components/new-movie-dialog/new-movie-dialog.component";
import { Movie } from "../../shared/types/Movie";
import { MovieService } from "../../shared/services/movie.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieList: Movie[] = [] ;

  constructor(public dialog: MatDialog,
              private elementRef: ElementRef,
              private movieService: MovieService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.movieService.list().subscribe(response => {
      this.movieList = response;
      console.log(response);
    })
  }

  addMovie() {
    const dialogRef = this.dialog.open(NewMovieDialogComponent);

    const body = this.elementRef.nativeElement.ownerDocument.body;
    body.style.pointerEvents = 'none';
    body.style.overflow = 'hidden';

    dialogRef.afterClosed().subscribe((response) => {
      body.style.pointerEvents = 'all';
      body.style.overflow = 'visible';
    });
  }
}
