import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthRes } from '../interfaces/authRes';
import { SignInUser } from '../interfaces/SignInUser';
import { SignUpUser } from '../interfaces/SignUpUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signUpUrl = 'https://todolist-moviles.herokuapp.com/signup';
  private _signInUrl = 'https://todolist-moviles.herokuapp.com/signin';

  constructor(private http: HttpClient) { }

  public signUp(user: SignUpUser): Observable<AuthRes> {
    return this.http.post<AuthRes>(this._signUpUrl, user);
  }

  public signIn(user: SignInUser): Observable<AuthRes> {
    return this.http.post<AuthRes>(this._signInUrl, user);
  }

}
