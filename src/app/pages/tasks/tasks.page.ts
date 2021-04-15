import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MenuData } from 'src/app/interfaces/MenuData';
import { TasksService } from 'src/app/services/tasks.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss']
})
export class TasksPage {

  public menuData: MenuData[] = [];
  public tasks: any = [];
  public tasksSubscription: Subscription;
  public changeSubscription: Subscription;
  public tasksPinned: any[] = [];
  public tasksNotPinned: any[] = [];
  public searchTask: any = '';
  public token: string;

  constructor(private _tasksService: TasksService,
    private _utilsService: UtilsService,
    private _modalCtrl: ModalController
  ) {
    this.token = localStorage.getItem('token');
    this.changeSubscription = this._tasksService.detectChange().subscribe((res) => {
      const index = this.tasks.findIndex((v: any) => v._id === res._id);
      if (index !== -1) {
        this.tasks[index] = res;
      } else {
        this.tasks = [...this.tasks, res];
      };
      this.tasksNotPinned = this.tasks.filter((t: any) => t.pinned == false);
      this.tasksPinned = this.tasks.filter((t: any) => t.pinned == true);
    });
  }

  public reorder(event: any) {
    event.detail.complete();
  }

  ngOnInit() {
    this._utilsService.present('Please wait...');
    this.tasksSubscription = this._tasksService.getTasksByUser(this.token).subscribe((res: any) => {
      this.tasks = res.tasks;
      this.tasksNotPinned = this.tasks.filter((t: any) => t.pinned == false);
      this.tasksPinned = this.tasks.filter((t: any) => t.pinned == true);
      this._utilsService.dismiss();
    });
  }

  ionViewWillEnter() {
    this.tasksSubscription = this._tasksService.getTasksByUser(this.token).subscribe((res: any) => {
      this.tasks = res.tasks;
      this.tasksNotPinned = this.tasks.filter((t: any) => t.pinned == false);
      this.tasksPinned = this.tasks.filter((t: any) => t.pinned == true);
    });
  }

  public searchTasks(event: any) {
    this.searchTask = event.detail.value;
  }

  ionViewDidLeave() {
    this.tasksSubscription.unsubscribe();
    this.changeSubscription.unsubscribe();
  }

  ionViewWillLeave() {
    this._tasksService.tasks = this.tasks;
  }

  public async openCreateTaskModal() {
    const modal = await this._modalCtrl.create({
      component: ModalComponent
    });
    return await modal.present();
  }

  public deletedTask(task: any) {
    this.tasks = this.tasks.filter(v => v._id !== task._id)
    this.tasksNotPinned = this.tasks.filter((t: any) => t.pinned == false);
    this.tasksPinned = this.tasks.filter((t: any) => t.pinned == true);
  }
}
