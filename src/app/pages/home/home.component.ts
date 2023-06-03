import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NewMovieDialogComponent } from "../../shared/components/new-movie-dialog/new-movie-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MatDialog){}

  addMovie() {
    const dialogRef = this.dialog.open(NewMovieDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
