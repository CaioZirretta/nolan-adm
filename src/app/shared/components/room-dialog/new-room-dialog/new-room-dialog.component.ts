import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UpdateListService } from "../../../services/update-list.service";
import { MatDialogRef } from "@angular/material/dialog";
import { Movie } from "../../../types/Movie";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { RoomService } from "../../../services/room.service";
import { Room } from "../../../types/Room";

@Component({
  selector: 'app-new-room-dialog',
  templateUrl: './new-room-dialog.component.html',
  styleUrls: ['./new-room-dialog.component.css']
})
export class NewRoomDialogComponent implements OnInit {
  public roomForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private updateListService: UpdateListService,
              public dialogRef: MatDialogRef<NewRoomDialogComponent>,
              private roomService: RoomService) {
  }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      number: ['', [Validators.required]],
    });
  }

  addRoom() {
    this.errorMessage = "";

    const room: Room = {
      number: parseInt(this.roomForm.controls['number'].value),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.roomService.add(room).pipe(
      catchError(error => {
        // Adicionar verificação para tamanho de arquivo
        if (error.status === 0) {
          this.errorMessage = Message.API_COMMUNICATION_ERROR;
        } else {
          this.errorMessage = error.message;
        }
        return throwError(error);
      })
    ).subscribe((response) => {
      this.updateListService.updateList.emit();
      this.dialogRef.close();
      this.roomForm.reset();
    });
  }

  cancel() {
    this.dialogRef.close();
    this.roomForm.reset();
  }
}
