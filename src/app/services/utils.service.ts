import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public isLoading: boolean = false;
  public toast: any;

  constructor(private _loadingCtrl: LoadingController, private _toastCtrl: ToastController) { }

  public async present(message: string) {
    this.isLoading = true;
    return await this._loadingCtrl.create({
      message
    }).then(l => {
      l.present().then(() => {
        if (!this.isLoading) {
          l.dismiss();
        }
      });
    });
  }

  public async dismiss() {
    this.isLoading = false;
    return await this._loadingCtrl.dismiss();
  }

  public async presentToast(message: string, color: string) {
    this.toast = await this._toastCtrl.create({
      message,
      color,
      duration: 2000
    });
    return this.toast.present();
  }

  public async activateNotifications(time: any, date: any) {
    await LocalNotifications.requestPermission();
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Task Reminder',
          body: '30 minutes left until your task begins',
          schedule: { at: new Date(date + " " + time) }
        }
      ]
    });
  }
}
