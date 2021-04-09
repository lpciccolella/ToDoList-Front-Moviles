import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userInfo: any = {
    name: '',
    email: ''
  };
  public token: string;
  public profileSubscription: Subscription;
  constructor(private _userService: UserService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.profileSubscription = this._userService.getUserInfo(this.token).subscribe((res: any) => {
      this.userInfo['name'] = res.user.name;
      this.userInfo['email'] = res.user.email;
    })
  }

  ionViewDidLeave() {
    this.userInfo['name'] = '';
    this.userInfo['email'] = '';
    this.profileSubscription.unsubscribe();
  }
}
