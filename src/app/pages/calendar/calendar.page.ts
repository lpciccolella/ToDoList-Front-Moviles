import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {

  public date: string;
  public type: string;
  public pendingTasks = [];

  constructor(private _tasksService: TasksService) { }

  onChange(event: any) {
    let tasksDate = this._tasksService.tasks.filter((v) => {
      if (event._d.toString().split(" ").slice(0, 4).join('') === (new Date(v.date?.split('T')[0] + " " + v.time)).toString().split(" ").slice(0, 4).join("")) {
        return true;
      }
    });
    this.pendingTasks = tasksDate;
  };
}

