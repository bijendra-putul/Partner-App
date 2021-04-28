import { Component, OnInit ,OnDestroy } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestapiService } from "./services/restapi.service";
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";
import { FirebaseDynamicLinks } from "@ionic-native/firebase-dynamic-links/ngx"
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { CalldetailPage } from "./pages/calldetail/calldetail.page"
import { DemodetailPage } from "./pages/demodetail/demodetail.page"
import { getItem } from 'localforage';
//import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  registerlogin = {
    email:'',
    password:''
  };
  isLoggedIn = false;
  logininfo: any;
  backButtonSubscription;
  counter = 0;
  Network:any;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private restapiService: RestapiService,
    private tokenStorageService:TokenStorageService,
    private push: Push,
    private deeplinks: Deeplinks,  
    //private oneSignal: OneSignal,    
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    private tokenStorage: TokenStorageService,
    public toastController: ToastController,
    //private network: Network
  ) {
    this.initializeApp();
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      //navigator["app"].exitApp();
      if (this.counter == 0) {
        this.counter++;
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else {
        // console.log("exitapp");
        navigator["app"].exitApp();
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
         const user = this.tokenStorageService.getUser();
         this.router.navigate(["app/calldetail"]);
        }
        else{
          this.router.navigate(["login"]);
        }
        return this.restapiService
        .post_data("check_version", { version: "1.0.0" })
        .subscribe((res: any) => {
          if (res.status) {
            //this.presentUpdate(res.data.playstore);
            //localStorage.removeItem("name");
            //localStorage.removeItem("phone");
            sessionStorage.clear();
            this.router.navigate(["version"]);
        }
      });

                  // watch network for a disconnection
            //let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            //  console.log('network was disconnected :-(');
            //  this.Network = "network was disconnected :-('"
             
           // });

            // stop disconnect watch
           // disconnectSubscription.unsubscribe();


            // watch network for a connection
            // let connectSubscription = this.network.onConnect().subscribe(() => {
            //   console.log('network connected!');
            //   this.Network = "network was disconnected :-('"
            //   setTimeout(() => {
            //     if (this.network.type === 'wifi') {
            //       console.log('we got a wifi connection, woohoo!');
            //     }
            //   }, 3000);
            // });
            // this.presentToast(this.Network);
            // stop connect watch
            //connectSubscription.unsubscribe(); 
      
       this.pushSetup();
       this.deeplinks.route({ "/app/:id1":CalldetailPage,
          "/app/:id2":DemodetailPage, 
          //"products:productId": HelpPage
          }).subscribe((match) => { 
          console.log("Successfully matched route", match);           
          // tslint:disable-next-line:no-unused-expression           
          if (match.$args.id1 === "calldetail") 
          {  this.router.onSameUrlNavigation = "reload"; 
          this.router.navigate(["app/calldetail"]);  
          console.log(this.router.navigate(["app/calldetail"]))          
          }            
          if (match.$args.id1 === "demodetail") {              
          // this.router.onSameUrlNavigation = \"reload\";            
          this.router.navigate(["app/demodetail"]);            
          }              
          }, (nomatch) => {            
          // nomatch.$link - the full link data          
          console.error("Got a deeplink that didn't match", nomatch);         
          });      
                                              
          this.firebaseDynamicLinks.onDynamicLink().subscribe((res: any) => console.log(res),   
          (error: any) => console.log(error));  
          });  
  }
     
  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: "417156632270"
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject
      .on("notification")
      .subscribe((notification: any) =>
        console.log("Received a notification", notification)
      );

    pushObject
      .on("registration")
      .subscribe((registration: any) =>
        console.log("Device registered", registration)
      );

    pushObject
      .on("error")
      .subscribe(error => console.error("Error with Push plugin", error));
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
        message:message,
       duration: 2000
     });
     toast.present();
    }

//   Loginagain() {
//     //this.isLoggedIn = !!this.tokenStorageService.getToken();
//     this.registerlogin.email = localStorage.getItem("email");
//     this.registerlogin.password = localStorage.getItem("password");
    
//     console.log(this.registerlogin.email);
//     console.log(this.registerlogin.password);
//      return this.restapiService
//       .post_data("login", this.registerlogin)
//       .subscribe((res: any) => {
//         this.logininfo = res.data;
        
//         this.tokenStorage.saveUser(this.logininfo);
//         this.tokenStorage.saveToken(this.logininfo.auth_key).then(data => {
//             localStorage.setItem("vendor_id", res.data.vendor_id);
//             sessionStorage.setItem('vendor_id', res.data.vendor_id);
//             this.router.navigate(["app/calldetail"]);
//         });
//      }); 
// }

}
