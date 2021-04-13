import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public priorities = [
    {
      priority: 'High Priority',
      color: 'danger'
    },
    {
      priority: 'Medium Priority',
      color: 'warning'
    },
    {
      priority: 'Low Priority',
      color: 'secondary'
    }
  ];
  constructor(private _popOverCtrl: PopoverController) { }

  ngOnInit() { }

  public selectPriority(priority: string) {
    this._popOverCtrl.dismiss({
      priority
    });
  }
}
