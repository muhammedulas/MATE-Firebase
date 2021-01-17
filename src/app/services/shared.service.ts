import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public _globalSearch:Subject<string> = new Subject

constructor() { }

  setSearchValue(val){
    this._globalSearch.next(val)
  }
  getSearchValue(){
    return this._globalSearch
  }
}
