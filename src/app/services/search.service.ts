import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private searchDataSource = new Subject<string>();

  //searchData$ = this.searchDataSource.asObservable();

  setSearchData(data: string) {
    this.searchDataSource.next(data);
  }

  getSearchData() {
    return this.searchDataSource.asObservable();
  }

}
