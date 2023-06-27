import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Session } from "../types/Session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private token: string = this.cookieService.get('token');
  private url: string = 'http://localhost:3333/session';
  private headers: Record<string, HttpHeaders> = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  list(): Observable<Session[]>{
    return this.httpClient.get<Session[]>(this.url, this.headers);

  }

  searchById(id: string): Observable<Session[]>{
    return this.httpClient.get<Session[]>(`${this.url}/?id=${id}`, this.headers);

  }

  searchByRoom(roomNumber: number): Observable<Session[]>{
    return this.httpClient.get<Session[]>(`${this.url}/room/?roomNumber=${roomNumber}`, this.headers);
  }

  searchByMovieName(name: string): Observable<Session[]>{
    return this.httpClient.get<Session[]>(`${this.url}/movie/?movieName=${name}`)
  }

  add(session: Session): Observable<Session> {
    return this.httpClient.post<Session>(this.url, session, this.headers);
  }

  edit(session: Session): Observable<Session> {
    return this.httpClient.put<Session>(this.url, session, this.headers);
  }

  remove(id: string): Observable<Session> {
    return this.httpClient.delete<Session>(`${this.url}/${id}`, this.headers);
  }
}
