import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Data } from 'src/app/interfaces/Data';
import { Task } from 'src/app/interfaces/Task';

import { TasksService } from 'src/app/services/tasks.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DatetimeModalComponent } from '../datetime-modal/datetime-modal.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() task: any;
  public pinnedIcon: string = 'eyedrop-outline';
  public title: string;
  public description: string;
  public priority: string;
  public date: string;
  public time: string;
  public pinned: boolean;
  public dateSubscription: Subscription;
  public timeSubscription: Subscription;

  constructor(private _modalCtrl: ModalController,
    private _tasksService: TasksService,
    private _utilsService: UtilsService,
    private _popOverCtrl: PopoverController
  ) {
    this._tasksService.detectChangeDateTime().subscribe((data: Data) => {
      const { date, time } = data;
      this.date = date;
      this.time = time;
    });
  }

  ngOnInit() {
    if (this.task) {
      this.title = this.task["title"];
      this.description = this.task["description"];
      this.time = this.task.time;
      this.pinned = this.task.pinned;
      this.date = this.task.date?.split('T')[0];
      this.priority = this.task.priority;
      if (this.task.pinned) {
        this.pinnedIcon = 'eyedrop';
      } else {
        this.pinnedIcon = 'eyedrop-outline';
      }
    }
  }

  public togglePinnedIcon() {
    if (!this.pinned) {
      this.pinnedIcon = 'eyedrop';
    } else {
      this.pinnedIcon = 'eyedrop-outline';
    }
    this.pinned = !this.pinned;
  }

  public goBack() {
    this._modalCtrl.dismiss();
  }

  public createTask(title: string, description: string) {
    let task: Task = {
      ...this.task,
      title: this.title,
      description: this.description,
      priority: this.priority,
      pinned: this.pinned,
      time: this.time,
      date: this.date
    };
    if (!title || !description) {
      this._utilsService.present('Please wait...');
      setTimeout(() => {
        this._utilsService.dismiss();
        this._utilsService.presentToast("You can't create an empty task", 'danger');
      }, 500);
    } else {
      if (this.task) {
        this.onUpdateTaskEvent(task).then((res: any) => {
          this._utilsService.activateNotifications(this.time, this.date);
          this._tasksService.changeValue({ ...res.task });
          setTimeout(() => {
            this._utilsService.dismiss();
            this._modalCtrl.dismiss();
            this._utilsService.presentToast(res.message, 'success');
          }, 500);
        });
      } else {
        this.onCreateTaskEvent(task).then((res: any) => {
          this._utilsService.activateNotifications(this.time, this.date);
          this._tasksService.changeValue({ ...res.task });
          setTimeout(() => {
            this._utilsService.dismiss();
            this._modalCtrl.dismiss();
            this._utilsService.presentToast(res.message, 'success');
          }, 500);
        });
      }
    }
  }

  public onUpdateTaskEvent(task: any) {
    this._utilsService.present('Please wait...');
    return this._tasksService.updateTask(task._id, task).toPromise();
  }

  public onCreateTaskEvent(task: any) {
    this._utilsService.present('Please wait...');
    return this._tasksService.createTask(task).toPromise();
  }

  public async showPriorities(event: any) {
    const popover = await this._popOverCtrl.create({
      component: PopoverComponent,
      event,
      mode: 'ios'
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.priority = data?.priority.priority;
  }

  public async openDateTime() {
    const modal = await this._modalCtrl.create({
      component: DatetimeModalComponent,
      componentProps: {
        date: this.date,
        time: this.time
      }
    });
    return await modal.present();
  }
}
