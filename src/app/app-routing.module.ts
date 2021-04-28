import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs-page/tabs-page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule),
   
    //canActivate: [AuthGuard],
    //component: TabsPage
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then( m => m.ForgetpasswordPageModule)
    
  },
  //  {
  //     path: 'contact-details',
  //      loadChildren: () => import('./pages/contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  //  },
  //  {
  //    path: 'calender',
  //    loadChildren: () => import('./pages/calender/calender.module').then( m => m.CalenderPageModule)
  //  },

  // {
  //   path: "contact-details",
  //   loadChildren:
  //     "./pages/contact-details/contact-details.module#ContactDetailsPageModule"
  // },
  // {
  //   path: "calender",
  //   loadChildren:
  //     "./pages/calender/calender.module#CalenderPageModule"
  // },
  {
    path: "version",
    loadChildren: () =>
      import("./pages/verison/verison.module").then(m => m.VerisonPageModule)
  },
];
// const routes: Routes = [
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
//   },

//   {
//     path: 'caldetail',
//     loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule),
//     canActivate: [AuthGuard]
//     //canActivate: [AuthGuard],
//     //component: TabsPage
//   },
//   {
//     path: 'forgetpassword',
//     loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then( m => m.ForgetpasswordPageModule)
    
//   },
//   {
//     path: 'contact-details',
//     loadChildren: () => import('./pages/contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
//   },
//   {
//     path: 'calender',
//     loadChildren: () => import('./pages/calender/calender.module').then( m => m.CalenderPageModule)
//   }
  
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
