import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movie } from "../types/Movie";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private token: string = this.cookieService.get('token');
  private url: string = 'http://localhost:3333/movie';
  private headers: Record<string, HttpHeaders> = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  list(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url, this.headers);
  }

  add(movie: Movie): Observable<any> {
    return this.httpClient.post<Movie>(this.url, movie, this.headers);
  }

  remove(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + id, this.headers);
  }
}
