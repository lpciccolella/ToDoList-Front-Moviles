import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input() public authForm: any;
  @Input('button') buttonTitle: any;
  @Output() public formEvent = new EventEmitter();
  public formData = {};

  constructor() { }

  ngOnInit() {
  }

  public sendData() {
    this.formEvent.emit(this.formData);
  }
}
