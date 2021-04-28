import { Component, OnInit } from '@angular/core';
import { RestapiService } from "../../services/restapi.service";
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { CalenderPage } from '../calender/calender.page';

import { ContactDetailsPage } from '../contact-details/contact-details.page';
import { NgSelectOption } from '@angular/forms';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

import { Router } from '@angular/router';


import { TokenStorageService } from '../../services/token-storage.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-demodetail',
  templateUrl: './demodetail.page.html',
  styleUrls: ['./demodetail.page.scss'],
})
export class DemodetailPage implements OnInit {
  term = '';
  segmentModeldemo = "one"
  showSearchbar: boolean;
  demolist = {
    vendor_id:'',
    call_status:'',
    limit:30,
    search:'',
    auth_key:'',
    brand_id:'',
    start: 0,
    results: 20,
  }
  acceptdemo ={
    id:'',
    vendor_id:'',
    acd_uuid:'',
    call_status:''
  }
  demoinfo: any;
  demorcpi: string;
  calldetail: any;
  missedcall: any;
  conectedcall: any;
  vendorid: string;
  missedcalldatademo: any;
  connecteddatademo: any;
  scheduleddatademo: any;
  pendingdata: any;
  acceptdemodata: any;
  demoid: any;
  acduid: void;
  demoalldata = [];
  demoalldata2: any;
  edited: any;
  acceptmessage: any;
  
  today= new Date();
  jstoday = '';
  toastOpen: boolean = true;

  toastOpenclosed: boolean = true;
  accepttime: string;
  jstoday2: string;
  acceptdemotime = [];
  startdate: any;
  demostartdate: any;
  msg = "";
  nCnt:0;
  disableButton: boolean = false;
  constructor(
   private restapiService:RestapiService,
   private modalController:ModalController,
   private toastController: ToastController,
   private alertController: AlertController,
   public loadingController: LoadingController,
   private tokenStorageService:TokenStorageService,
   private navCtrl: NavController,
   private router: Router,
  ) {
    
    this.vendorid = sessionStorage.getItem("vendor_id");
  
   }
 
  ngOnInit() {
    this.demodetail();
    this.presentLoading();
    //this.acceptdemolist();
  }
  
  segmentChanged(event){
    console.log(this.segmentModeldemo);
    console.log(event);
  }

  async brand_detail(id: any, acd_uuid:any) {
    const productDetail = await this.modalController.create({
      component: ContactDetailsPage,
      componentProps: {
        brand_id: id,
        acd_uuid:acd_uuid
      },
      cssClass: 'callnodetails'
    });
    return await productDetail.present();
  }
  demodetail(event?,infiniteScroll?){
    this.disableButton = true;
    this.demolist.vendor_id = localStorage.getItem("vendor_id");
    this.demolist.brand_id = localStorage.getItem("brand_id");
    this.demolist.auth_key = localStorage.getItem("auth_key");
    let authkey = localStorage.getItem("auth_key");
    return this.restapiService
    .post_datafortoken("demo_list", this.demolist)
    .subscribe((res:any)=>{
      this.demoinfo = res.data;
      //this.demostartdate = this.demoinfo.start_date;
      //console.log(this.demostartdate);
      //console.log(this.demoinfo);
      
      this.pendingdata  = this.demoinfo.filter((item: { call_status: string; }) => item.call_status == 'Pending');
      this.missedcalldatademo  = this.demoinfo.filter((item: { call_status: string; }) => item.call_status == 'Missed');
      this.connecteddatademo = this.demoinfo.filter((item: { call_status: string; }) => item.call_status == 'Connected');
      this.scheduleddatademo = this.demoinfo.filter((item: { call_status: string; }) => item.call_status == 'Scheduled');
      
      this.acceptdemolist(this.demoinfo.id, this.demoinfo.acd_uuid, this.demoinfo.call_status);
      this.disableButton = true;
      if (event) {
        setTimeout(() => {
          event.target.complete();
        }, 2000);
      }
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    });

  }
   

   loadMore(infiniteScroll) {
    //this.searchFilter.results = this.searchFilter.results + 10;
    this.demolist.limit = this.demolist.limit + 10;
    this.demodetail(infiniteScroll);
}
   
   
   load(refresher) {
    refresher.target.complete();
   }
 
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async acceptdemolist(id?:any, acd_uuid?:any, call_status?:any){
    this.disableButton = true;
    this.acceptdemo.id = id;
    this.acceptdemo.acd_uuid = acd_uuid;
    this.acceptdemo.vendor_id = localStorage.getItem("vendor_id");
    this.acceptdemo.call_status = call_status;
    this.restapiService
    .post_data("accept_demo", this.acceptdemo)
    .subscribe((res:any)=>{
      //this.nCnt = 0
      if(call_status === "Pending")  {
       
        setTimeout(
          function() {
           this.presentAlert(res.message)
           //this.disableButton = false;
          }.bind(this),
          1000
        );
      }
      if(call_status === "Confirmed" || call_status === "Connected" || call_status === "Rescheduled"){
       
        setTimeout(
          function() {
            this.presentAlert("Demo Already Confirmed.")
            //this.disableButton = false;
          }.bind(this),
          1000
        );
      }
     
      this.acceptdemodata = res.data;
      this.jstoday = formatDate(this.today, 'dd-MMM-yyyy hh:mm:ss', 'en-US', '+0530');

     
     });
     
    
    setTimeout(
      function() {
       // this.disableButton = true;
        this.edited = false;
        console.log(this.edited);
      }.bind(this),
      3000
    );
       
    

  }

  
  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      
    });
    await alert.present();
  }
  async resheduleDemo(
    id:any, 
    acd_uuid:any, 
    brandid:any,
    productname:any,
    start_date:any
     ) {
    const modal = await this.modalController.create({
      component: CalenderPage,
      cssClass: 'resheduledemo',
      componentProps: {
        id:id,
        acd_uuid:acd_uuid,
        brand_id:brandid,
        productname:productname,
        start_date:start_date
      },
    });
    return await modal.present();
  }
  personTrackByFn(index: number) {
    return index;
}
logout(){
  this.tokenStorageService.logOut();
  this.router.navigate(["login"]);
 }
 async presentToast(message) {
  const toast = await this.toastController.create({
     message: message,
     duration: 2000
   });
   toast.present();
  }

 
}
