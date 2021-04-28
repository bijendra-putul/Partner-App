import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContactDetailsPage } from '../contact-details/contact-details.page';
import { CalldetailPageRoutingModule } from './calldetail-routing.module';
import { CalldetailPage } from './calldetail.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ContactDetailsPageModule  } from '../contact-details/contact-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CalldetailPageRoutingModule,
    ContactDetailsPageModule
  ],
  declarations: [CalldetailPage],
  entryComponents: [
    ContactDetailsPage
  ]
  
})
export class CalldetailPageModule {}
