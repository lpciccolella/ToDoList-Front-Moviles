import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { ModalComponent } from '../modal/modal.component';
import { TasksService } from 'src/app/services/tasks.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() task: any;
  @Output() deletedTask = new EventEmitter<string>()
  public priorityType: string;

  constructor(private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _tasksService: TasksService,
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
    if (this.task.priority === "High Priority") {
      this.priorityType = "danger";
    } if (this.task.priority === "Medium Priority") {
      this.priorityType = "warning";
    } if (this.task.priority === "Low Priority") {
      this.priorityType = "secondary";
    }
  }

  public async viewTask() {
    const modal = await this._modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        task: this.task
      }
    });
    return await modal.present();
  }

  public async deleteTask() {
    const alert = await this._alertCtrl.create({
      header: 'Are you sure, you want to delete it?',
      message: 'Be careful!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this._utilsService.present('Please wait...');
            this._tasksService.deleteTask(this.task._id).subscribe((res: any) => {
              setTimeout(() => {
                this._utilsService.dismiss();
                this.deletedTask.emit(this.task);
                this._utilsService.presentToast(res.message, 'danger');
              }, 500);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
