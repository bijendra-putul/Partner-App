import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

import { CalldetailPage } from '../calldetail/calldetail.page';

 const routes: Routes = [
   {
     path: '',
     component: TabsPage,
     children: [
       {
         path: 'calldetail',
         component: CalldetailPage,
       },
       {
         path: 'demodetail',
         children: [
           {
             path: '',
             loadChildren: () => import('../demodetail/demodetail.module').then(m => m.DemodetailPageModule)
           },
         ]
       },
       {
         path: '',
         redirectTo: '/app/tabs/calldetail',
         //redirectTo: '/app/tabs',
         pathMatch: 'full'
       }
     ]
   }
 ];

// const routes: Routes = [
//   {
//     path: "",
//     component: TabsPage,
//     children: [
//       {
//         path: "calldetail",
//         children: [
//           {
//             path: "",
//             loadChildren: "../calldetail/calldetail.module#CalldetailPageModule"
//           }
//         ]
//       },
//       {
//         path: "demodetail",
//         children: [
//           {
//             path: "",
//             loadChildren: "../demodetail/demodetail.module#DemodetailPageModule"
//           }
//         ]
//       }
//     ]
//   }
// ];


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/calldetail/tab1',
//     pathMatch: 'full'

//   },
//   { 
//     path: '',
//     component: TabsPage,
//     children: [
//       {
//         path: 'tab2',
//         children: [
//           {
//             path: '',
//             loadChildren: () =>
//               import('../calldetail/calldetail.module').then(m => m.CalldetailPageModule)
//           }
//         ]
//       },
//       {
//         path: 'tab3',
//         children: [
//           {
//             path: '',
//             loadChildren: () => import('../demodetail/demodetail.module').then(m => m.DemodetailPageModule)
//           },
//         ]
//       },
      
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

