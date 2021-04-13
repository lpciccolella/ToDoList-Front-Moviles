import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuData } from '../interfaces/MenuData';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  constructor(private _http: HttpClient) { }

  public getMenuData() {
    return this._http.get<MenuData[]>('assets/data/menu-data.json');
  }
}
