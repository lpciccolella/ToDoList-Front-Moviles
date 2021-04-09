import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private _utilsService: UtilsService,
    private _userService: UserService
  ) {
  }

  ngOnInit() { }

  public signOut() {
    let token = localStorage.getItem('token');
    this._utilsService.present('Please wait...');
    this._userService.signOutUser(token).subscribe((res: any) => {
      setTimeout(() => {
        this._utilsService.dismiss();
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }, 500);
    });
  }
}
