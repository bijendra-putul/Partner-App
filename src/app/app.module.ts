import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/auth.interceptor';

import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links/ngx"
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { HttpModule } from "@angular/http";

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";


@NgModule({
  declarations: [AppComponent],
  
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule],
    
  providers: [
    authInterceptorProviders,
    StatusBar,
    SplashScreen,
    WebView,
    NativeStorage,
    DatePipe,
    Push,
    FirebaseDynamicLinks,
    Deeplinks,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
     
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
