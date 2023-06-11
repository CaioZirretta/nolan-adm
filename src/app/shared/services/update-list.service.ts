import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateListService {
  public updateList:EventEmitter<void> = new EventEmitter<void>()
  constructor() { }
}
