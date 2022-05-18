import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(data: any): (boolean | undefined) {
    let dataStr: string;
    let newData: Array<any>

    if(typeof data == 'object') {
      const previousData = this.getData();

      if (typeof previousData == 'object') {
        if(previousData.some((x: any) => x.id === data.id)) return false;
        newData = [...previousData, data];
      } else {
        newData = [data];
      }

      dataStr = JSON.stringify(newData);
      localStorage.setItem("favoriteComics", dataStr);
      return true;
    }

    return;
  }

  getData(): (any | boolean) {
    const dataStr = localStorage.getItem("favoriteComics");
    if(dataStr !== null) {
      const data = JSON.parse(dataStr);
      return data;
    }
    return false;
  }

  deleteData(id: (number | string)): boolean {
    let dataStr: string;
    let newData: Array<any>

    if(typeof id === 'number' || typeof id === 'string') {
      const previousData = this.getData();

      if (typeof previousData == 'object') {
        newData = previousData.filter((x: any) => x.id !== id)
      } else {
        return false;
      }

      dataStr = JSON.stringify(newData);
      localStorage.setItem("favoriteComics", dataStr);
      return true;
    }

    return false;
  }

}
