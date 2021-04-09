import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { FormComponent } from 'src/app/components/form/form.component';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild(FormComponent) formComponent: FormComponent;

  public showPassword: boolean = false;
  public passwordToggleIcon: string = 'eye-outline';
  public signUpForm: any = [
    { id: 'name', placeholder: 'Name' },
    { id: 'email', placeholder: 'Email' },
    { id: 'password', type: 'password', placeholder: 'Password' }
  ];
  public userSubscription: Subscription;

  constructor(private _router: Router,
    private _authService: AuthService,
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.formComponent.formData['name'] = '';
    this.formComponent.formData['email'] = '';
    this.formComponent.formData['password'] = '';
    this.userSubscription?.unsubscribe();
  }

  public postData(data: any) {
    this._utilsService.present('Please wait...');
    this.userSubscription = this._authService.signUp(data).subscribe(() => {
      setTimeout(() => {
        this._utilsService.dismiss();
        this._router.navigate(['/signin']);
      }, 500);
    }, (err) => {
      setTimeout(() => {
        this._utilsService.dismiss();
        this._utilsService.presentToast(err.error.error, 'danger');
      }, 500);
    });
  }
}
