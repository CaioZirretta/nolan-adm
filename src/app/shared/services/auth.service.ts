import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../types/Login";
import { CookieService } from "ngx-cookie-service";
import jwtDecode from 'jwt-decode';



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

    if(token) {
      const decodedToken: any = jwtDecode(token);
      const currentTimestamp: number = Math.floor(Date.now() / 1000);

      if(decodedToken.exp && decodedToken.exp < currentTimestamp) {
        return false;
      }
    }

    return !!token;
  }
}
