import { Component, Inject, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { RestapiService } from "../../services/restapi.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  venderid = {
    vendor_id:'',
    brand_id:''
  }
  getbrand: any;
  brand_id: any;
  vendor_id:any;
  contactform: FormGroup;
  phoneno:[];
  phoenvalue: FormArray;
  checkedbtn : boolean = true
  checkedIdx=0;
  contactno: [];
  getcontactno: any;
  contact_number:any;
  callbackagent = {
    vendor_id:'',
    acd_uuid:'',
    agent_number:'',
  }
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
  acd_uuid: any;
  callbackdata: any;
  modalCtrl: any;
  firstchoobox: any;
  public itemChecked;
  public log;
  
  constructor(
    private restapiService: RestapiService,
    public navParams: NavParams,
    private modalController: ModalController,
    private fb: FormBuilder,
    public toastController: ToastController,
  ) { 
    this.brand_id = this.navParams.get("brand_id");
    this.acd_uuid = this.navParams.get("acd_uuid");
    console.log(this.acd_uuid);
    this.vendor_id = localStorage.getItem("vendor_id");
  }

  ngOnInit() {
    this.getbrandcontact();
    localStorage.setItem("brand_id", this.brand_id);
    console.log(this.brand_id);
    this.callbackAgent();
    this.radioGroupChange();
  }
  
  getbrandcontact(){
    this.venderid.vendor_id = localStorage.getItem("vendor_id");
    let authkey = localStorage.getItem("auth_key");
    this.venderid.brand_id = this.brand_id;
    this.venderid.vendor_id = this.vendor_id;
    console.log(authkey);
    this.restapiService
    .post_datafortoken("get_brand_contact", this.venderid)
    .subscribe((res:any)=>{
      this.getbrand = res.data;
       this.getcontactno = this.getbrand.contact_number
       console.log(this.getcontactno);
    });
  }

  callbackAgent(){
    this.callbackagent.vendor_id = localStorage.getItem("vendor_id");
    this.callbackagent.acd_uuid = this.acd_uuid;
    this.callbackagent.agent_number = this.selectedRadioGroup.value;
    this.restapiService
    .post_datafortoken("callback", this.callbackagent)
    .subscribe((res:any)=>{
      this.callbackdata = res.data;
      this.presentToast(res.message);
      if(res.status == true){
       this.dismiss();
      }
    });
  }


  radioGroupChange(event?) {
    this.selectedRadioGroup = event.detail;
    console.log("selected value : " + this.selectedRadioGroup.value);
     if (this.selectedRadioGroup.value == undefined) {
       this.callbackAgent();
     }
    console.log()
  }
  

  radioSelect(event) {
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }
  selectFilters( val: string) {
    this.selectedRadioGroup = val;
  }
  
  goBack() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
       message: message,
       duration: 2000
     });
     toast.present();
    }
    dismiss() {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
  

}
