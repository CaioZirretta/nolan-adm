import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../types/login";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3333/login';

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };

    return this.http.post<LoginResponse>(this.url, body);
  }

  isAuthenticated(): boolean {
    const token: string = this.cookieService.get('token');

    return !!token;
  }
}
