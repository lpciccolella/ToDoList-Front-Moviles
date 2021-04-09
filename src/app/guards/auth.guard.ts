import { Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor( private _router: Router ) { }

  canActivate(): boolean {
    if(localStorage.getItem('token') !== null)
    return true;
    this._router.navigate(['/']);
  }
}
