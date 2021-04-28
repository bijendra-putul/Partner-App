import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemodetailPage } from './demodetail.page';

const routes: Routes = [
  {
    path: '',
    component: DemodetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemodetailPageRoutingModule {}
