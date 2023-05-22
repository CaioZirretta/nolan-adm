import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../types/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3333/login'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { user: username, password }

    return this.http.post<LoginResponse>(this.url, body);
  }
}
