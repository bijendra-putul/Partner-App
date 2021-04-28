

import { Component, OnInit} from '@angular/core';
import { RestapiService } from "../../services/restapi.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { ToastController } from '@ionic/angular';


//import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
 
  passwordForm: FormGroup;
  forgotpassword = {
    email:''
  }
  passworddata: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restapiService: RestapiService,
    private toastController: ToastController,
    ) {
      this.passwordForm = new FormGroup({
        email: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
       ]),
       
    });
    
    }

    
     ngOnInit() {
       
     }
    
     ionViewWillEnter() {
     // this.registerLoginbtn();
     }
  


     passwordlogin() {
      this.forgotpassword.email = this.passwordForm.value.email;
      this.restapiService
        .post_data("forgot_password", this.forgotpassword)
        .subscribe((res: any) => {
          if(res.status == true){
            this.prsentToast( res.message)
         }
         else{
          this.prsentToast( res.message)
         }
          this.passworddata = res.data;
          console.log(this.passworddata );
       });  
       
  }
  async prsentToast(message) {
    const toast = await this.toastController.create({
      position: "bottom",
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
}
