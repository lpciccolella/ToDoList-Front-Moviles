import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';

import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalComponent } from './modal/modal.component';
import { TaskComponent } from './task/task.component';
import { PopoverComponent } from './popover/popover.component';
import { DatetimeModalComponent } from './datetime-modal/datetime-modal.component';

@NgModule({
  declarations: [
    FormComponent,
    HeaderComponent,
    SidemenuComponent,
    ModalComponent,
    TaskComponent,
    PopoverComponent,
    DatetimeModalComponent
  ],
  exports: [
    FormComponent,
    HeaderComponent,
    SidemenuComponent,
    ModalComponent,
    TaskComponent,
    PopoverComponent,
    DatetimeModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
