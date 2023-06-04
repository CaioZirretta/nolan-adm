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
import { NewMovieDialogComponent } from './shared/components/new-movie-dialog/new-movie-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { EditMovieDialogComponent } from './shared/components/edit-movie-dialog/edit-movie-dialog.component';
import { DeleteMovieDialogComponent } from './shared/components/delete-movie-dialog/delete-movie-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MovieCardComponent,
    NewMovieDialogComponent,
    EditMovieDialogComponent,
    DeleteMovieDialogComponent,
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
    MatButtonModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
