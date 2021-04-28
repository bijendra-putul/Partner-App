import { Component, OnInit} from '@angular/core';
import { RestapiService } from "../../services/restapi.service";
import { Router } from "@angular/router";
import { NavController, ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TokenStorageService } from '../../services/token-storage.service';
import { Platform } from "@ionic/angular";

//import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerlogin = {
    email:'',
    password:''
  };
  edited: any;
  loginForm: FormGroup;
  loginverify: any;
  rcpi: string;
  logininfo: any;
  successmessage:{
    data:'';
  };
  backButtonSubscription: any;

  
  isLoggedIn = false;
  isLoginFailed = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restapiService: RestapiService,
    private webview: WebView,
    public navCtrl: NavController,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController, 
    public toastController: ToastController,
    private tokenStorage: TokenStorageService,
    private tokenStorageService:TokenStorageService,
    private platform: Platform
    ) {
      this.loginForm = new FormGroup({
        email: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
       ]),
       password: new FormControl("", [
       Validators.required,
       Validators.minLength(4)
      ]),
    });
    
    }

    
     ngOnInit() {
       //this.registerLoginbtn();

       if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.tokenStorageService.getUser();
      }
     }
    
    
  
     ngAfterViewInit() {
      this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
        601,
        async () => {
          if (
            this.router.isActive("login", true) &&
            this.router.url === "login"
          ) {
            this.navCtrl.pop();
          }
        }
      );
    }

    registerLoginbtn() {
      //this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.registerlogin.email = this.loginForm.value.email;
      this.registerlogin.password = this.loginForm.value.password;
      localStorage.setItem("email", this.loginForm.value.email);
      localStorage.setItem('password', this.loginForm.value.password);
      sessionStorage.setItem("email", this.loginForm.value.email);
      sessionStorage.setItem('password', this.loginForm.value.password);
      this.edited = true;
      console.log(this.registerlogin.email);
      console.log(this.registerlogin.password);
      return this.restapiService
        .post_data("login", this.registerlogin)
        .subscribe((res: any) => {
          this.logininfo = res.data;
          this.presentToast(res.message);
          this.tokenStorage.saveToken(this.logininfo.auth_key);
          this.tokenStorage.saveUser(this.logininfo);
          this.edited = true;
          if(this.tokenStorage.saveToken){
             localStorage.setItem("vendor_id", res.data.vendor_id);
             sessionStorage.setItem('vendor_id', res.data.vendor_id);
            this.router.navigate(["app/calldetail"]);
           }
           else{
             this.router.navigate(["login"]);
            
           }
          // //this.presentToast();
       });
      
      
      
       
       
  }

  
  async presentToast(message) {
   const toast = await this.toastController.create({
       message: message,
      duration: 2000
    });
    toast.present();
   }

  gotoforgetpassword(){
    //this.navCtrl(["forgetpassword"]);
    //this.navCtrl.navigateForward(["forgetpasswordPage"]);
    this.router.navigate(["forgetpassword"]);
   }
   
  //  reloadPage() {
  //   window.location.reload();
  // }
}
