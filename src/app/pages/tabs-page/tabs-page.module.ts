import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { CalldetailPageModule} from '../calldetail/calldetail.module';
import { DemodetailPageModule } from '../demodetail/demodetail.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabsPageRoutingModule,
    CalldetailPageModule,
    DemodetailPageModule,
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
