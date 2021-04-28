import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalldetailPage } from './calldetail.page';

const routes: Routes = [
  {
    path: '',
    component: CalldetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalldetailPageRoutingModule {}
