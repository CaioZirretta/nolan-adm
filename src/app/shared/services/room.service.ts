import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Room, RoomWithSession } from "../types/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private token: string = this.cookieService.get('token');
  private url: string = 'http://localhost:3333/room';
  private headers: Record<string, HttpHeaders> = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  listWithSession(): Observable<RoomWithSession[]> {
    return this.httpClient.get<RoomWithSession[]>(`${this.url}/sessions`, this.headers);
  }

  listWithSessionsByRoomNumber(number: number): Observable<RoomWithSession> {
    return this.httpClient.get<RoomWithSession>(`${this.url}/sessions/${number}`, this.headers);
  }

  add(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.url, room, this.headers);
  }

  edit(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(this.url, room, this.headers);
  }

  remove(id: string): Observable<Room> {
    return this.httpClient.delete<Room>(`${this.url}/${id}`, this.headers);
  }

}
