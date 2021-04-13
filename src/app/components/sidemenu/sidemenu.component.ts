import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuData } from 'src/app/interfaces/MenuData';
import { MenuDataService } from 'src/app/services/menuData.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  public menuData: Observable<MenuData[]>;

  constructor(private _menuDataService: MenuDataService, private _userService: UserService) { }

  ngOnInit() {
    this.menuData = this._menuDataService.getMenuData();
  }
}
