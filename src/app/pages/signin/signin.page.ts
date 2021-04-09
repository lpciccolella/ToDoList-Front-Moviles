import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { FormComponent } from 'src/app/components/form/form.component';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  @ViewChild(FormComponent) formComponent: FormComponent;

  public signInForm: any = [
    { id: 'email', placeholder: 'Email' },
    { id: 'password', type: 'password', placeholder: 'Password' }
  ];
  public userSubscription: Subscription;

  constructor(private _router: Router, private _authService: AuthService, private _utilsService: UtilsService) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.formComponent.formData['email'] = '';
    this.formComponent.formData['password'] = '';
    this.userSubscription?.unsubscribe();
  }

  public postData(data: any) {
    this._utilsService.present('Please wait...');
    this.userSubscription = this._authService.signIn(data).subscribe(res => {
      setTimeout(() => {
        this._utilsService.dismiss();
        this._router.navigate(['home/tasks']);
        window.localStorage.setItem('token', res.token);
      }, 500);
    }, (err) => {
      setTimeout(() => {
        this._utilsService.dismiss();
        this._utilsService.presentToast(err.error.error, 'danger');
      }, 500);
    });
  }
}
