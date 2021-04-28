import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemodetailPageRoutingModule } from './demodetail-routing.module';
//import { ContactDetailsPage } from '../contact-details/contact-details.page';
import { CalenderPage } from '../calender/calender.page';
import { DemodetailPage } from './demodetail.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalenderPageModule  } from '../calender/calender.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    DemodetailPageRoutingModule,
    CalenderPageModule
    
    
  ],
  declarations: [DemodetailPage],
  entryComponents: [
    CalenderPage
  ]
})
export class DemodetailPageModule {}
