import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {
  NewMovieDialogComponent
} from "../../shared/components/movie-dialog/new-movie-dialog/new-movie-dialog.component";
import { Movie } from "../../shared/types/Movie";
import { MovieService } from "../../shared/services/movie.service";
import { UpdateListService } from "../../shared/services/update-list.service";
import { Room, RoomWithSession } from "../../shared/types/Room";
import { RoomService } from "../../shared/services/room.service";
import { SessionService } from "../../shared/services/session.service";
import {
  DeleteMovieDialogComponent
} from "../../shared/components/movie-dialog/delete-movie-dialog/delete-movie-dialog.component";
import {
  DeleteRoomDialogComponent
} from "../../shared/components/room-dialog/delete-room-dialog/delete-room-dialog.component";
import { NewRoomDialogComponent } from "../../shared/components/room-dialog/new-room-dialog/new-room-dialog.component";
import { Session } from "../../shared/types/Session";
import {
  NewSessionDialogComponent
} from "../../shared/components/session-dialog/new-session-dialog/new-session-dialog.component";
import {
  EditSessionDialogComponent
} from "../../shared/components/session-dialog/edit-session-dialog/edit-session-dialog.component";
import {
  DeleteSessionDialogComponent
} from "../../shared/components/session-dialog/delete-session-dialog/delete-session-dialog.component";
import { DateUtils } from "../../shared/utils/DateUtils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieList: Movie[] = [];
  roomWithSessionList: RoomWithSession[] = [];

  constructor(public dialog: MatDialog,
              private elementRef: ElementRef,
              private movieService: MovieService,
              private roomService: RoomService,
              private sessionService: SessionService,
              private updateListService: UpdateListService) {
  }

  ngOnInit() {
    this.updateAllLists();
    this.updateListService.updateList.subscribe(() => {
      this.updateAllLists();
    });
  }

  protected addMovie() {
    const dialogRef = this.dialog.open(NewMovieDialogComponent);
    this.lockBody();

    dialogRef.afterClosed().subscribe((response) => {
      this.unlockBody();
    });
  }

  protected addRoom() {
    const dialogRef = this.dialog.open(NewRoomDialogComponent);
    this.lockBody();

    dialogRef.afterClosed().subscribe((response) => {
      this.unlockBody();
    });
  }

  protected deleteRoom(room: Room) {
    const dialogRef = this.dialog.open(DeleteRoomDialogComponent, {
      data: { id: room.id }
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe(response => {
      this.unlockBody();
      this.updateRoomList();
    });
  }

  protected addSession(room: Room) {
    const dialogRef = this.dialog.open(NewSessionDialogComponent,{
      data: room
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe(() => {
      this.unlockBody();
    })
  }

  protected editSession(session: Session) {
    const dialogRef = this.dialog.open(EditSessionDialogComponent,{
      data: session
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe(() => {
      this.unlockBody();
    })
  }

  protected deleteSession(session: Session) {
    const dialogRef = this.dialog.open(DeleteSessionDialogComponent,{
      data: session
    });
    this.lockBody();

    dialogRef.afterClosed().subscribe(() => {
      this.unlockBody();
    })
  }

  protected isSessionlessRoom(room: RoomWithSession) {
    return (room.sessions.length===0);
  }

  protected formatDateToView(date: Date) {
    const dateObject = new Date(date);

    const day = (dateObject.getDate()).toString().padStart(2,"0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2,"0");
    const year = dateObject.getFullYear();
    const hours = (dateObject.getHours() + DateUtils.TimeZone).toString().padStart(2,"0");
    const minutes = (dateObject.getMinutes()).toString().padStart(2,"0");


    const dateView: string = `${day}/${month}/${year} - ${hours}:${minutes}`;
    return dateView;
  }

  protected updateAllLists() {
    this.updateMovieList();
    this.updateRoomList();
  }

  private updateMovieList() {
    this.movieService.list().subscribe(response => {
      this.movieList = response;
    });
  }

  private updateRoomList() {
    this.roomService.listWithSession().subscribe(response => {
      this.roomWithSessionList = response;
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
