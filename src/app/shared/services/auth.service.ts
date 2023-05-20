import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/login'

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<string> {
    const body = {user, password}

    return this.http.post<string>(this.url, body);
  }
}
