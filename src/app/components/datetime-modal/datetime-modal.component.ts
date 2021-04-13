import { Component, Input, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-datetime-modal',
  templateUrl: './datetime-modal.component.html',
  styleUrls: ['./datetime-modal.component.scss'],
})
export class DatetimeModalComponent implements OnInit {

  public currentDate: Date = new Date();

  @Input() public date: any;

  @Input() public time: any;

  constructor() {

  }

  ngOnInit() { }

  public assignDate(event: any) {
    let date = event.detail.value.split('T')[0];
    this.date = date;
  }

  public assignTime(event: any) {
    let time = event.detail.value.split('T')[1].split('.')[0];
    this.time = time;
  }

}
