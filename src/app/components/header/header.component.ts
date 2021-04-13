import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() public header: string;
  @Input() public hasBack: boolean;
  @Input() public routeBack: string;
  @Input() public showSideMenu: boolean;
  @Input() public deleteButton: boolean;
  @Input() public headerAuthButton: string;
  @Input() public showHeaderAuthButton: boolean;
  @Input() public authRedirect: string;
  @Input() public dateTimeButtons: boolean;
  @Input() public date: any;
  @Input() public time: any;

  constructor(private _modalCtrl: ModalController, private _taskService: TasksService) { }

  ngOnInit() { }

  public closeDateTimeModal() {
    this._modalCtrl.dismiss();
  }

  public saveDateTime() {
    this._taskService.changeDateTime({ date: this.date, time: this.time });
    this._modalCtrl.dismiss();
  }

}
