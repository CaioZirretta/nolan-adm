import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UpdateListService } from "../../../services/update-list.service";
import { catchError, throwError } from "rxjs";
import { Message } from "../../../enums/Message";
import { SessionService } from "../../../services/session.service";

@Component({
  selector: 'app-delete-session-dialog',
  templateUrl: './delete-session-dialog.component.html',
  styleUrls: ['./delete-session-dialog.component.css']
})
export class DeleteSessionDialogComponent implements OnInit {
  public errorMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteSessionDialogComponent>,
              private sessionService: SessionService,
              private updateListService: UpdateListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  deleteSession() {
    this.errorMessage = "";

    const sessionId: string = this.data.id!

    this.sessionService.remove(sessionId).pipe(
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
