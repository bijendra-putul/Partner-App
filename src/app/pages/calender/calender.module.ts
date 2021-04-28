import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CalenderPage } from './calender.page';
import { CalenderPageRoutingModule } from './calender-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalenderPageRoutingModule
  ],
  declarations: [CalenderPage]
})
export class CalenderPageModule {}
