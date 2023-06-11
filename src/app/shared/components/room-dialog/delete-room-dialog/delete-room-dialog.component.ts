import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UpdateListService } from "../../../services/update-list.service";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { RoomService } from "../../../services/room.service";

@Component({
  selector: 'app-delete-room-dialog',
  templateUrl: './delete-room-dialog.component.html',
  styleUrls: ['./delete-room-dialog.component.css']
})
export class DeleteRoomDialogComponent implements OnInit{
  public errorMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteRoomDialogComponent>,
              private roomService: RoomService,
              private updateListService: UpdateListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  deleteMovie() {
    this.errorMessage = "";

    const roomId: string = this.data.id!

    this.roomService.remove(roomId).pipe(
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

  cancel() {
    this.dialogRef.close();
  }
}
