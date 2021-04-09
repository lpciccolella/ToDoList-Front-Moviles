import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _getUserInfoUrl: string = "https://todolist-moviles.herokuapp.com/profile";
  private _signOutUserUrl: string = "https://todolist-moviles.herokuapp.com/signout";

  constructor(private _http: HttpClient) { }

  public getUserInfo(token: string): Observable<any> {
    return this._http.get<any>(this._getUserInfoUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
  };

  public signOutUser(token: string): Observable<any> {
    return this._http.get<any>(this._signOutUserUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
  };
}
