import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slides: { img: string, description: string }[] = [
    {
      img: " ",
      description: " "
    }
  ]

  constructor(private _navCtrl: NavController) { }

  ngOnInit() {
  }

  public start() {
    this._navCtrl.navigateBack('/signup');
  }

}
