import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./shared/services/auth.service";
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { NewMovieDialogComponent } from './shared/components/movie-dialog/new-movie-dialog/new-movie-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { EditMovieDialogComponent } from './shared/components/movie-dialog/edit-movie-dialog/edit-movie-dialog.component';
import { DeleteMovieDialogComponent } from './shared/components/movie-dialog/delete-movie-dialog/delete-movie-dialog.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { DeleteRoomDialogComponent } from './shared/components/room-dialog/delete-room-dialog/delete-room-dialog.component';
import { NewRoomDialogComponent } from './shared/components/room-dialog/new-room-dialog/new-room-dialog.component';
import { NewSessionDialogComponent } from './shared/components/session-dialog/new-session-dialog/new-session-dialog.component';
import { EditSessionDialogComponent } from './shared/components/session-dialog/edit-session-dialog/edit-session-dialog.component';
import { DeleteSessionDialogComponent } from './shared/components/session-dialog/delete-session-dialog/delete-session-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieCardComponent,
    NewMovieDialogComponent,
    EditMovieDialogComponent,
    DeleteMovieDialogComponent,
    DeleteRoomDialogComponent,
    NewRoomDialogComponent,
    NewSessionDialogComponent,
    EditSessionDialogComponent,
    DeleteSessionDialogComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
