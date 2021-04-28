import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { RestapiService } from "../../services/restapi.service";
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ContactDetailsPage } from '../contact-details/contact-details.page';

import { TokenStorageService } from '../../services/token-storage.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from "@ionic/angular";

//import { PipeTransform, Pipe } from '@angular/core';



@Component({
  selector: 'app-calldetail',
  templateUrl: './calldetail.page.html',
  styleUrls: ['./calldetail.page.scss'],
})

export class CalldetailPage implements OnInit {
  
  length: number;
  term = '';
  segmentModel = "All"
  loginlogout = {
    vendor_id:'',
    email:'',
  }
  callinfo: any;
  authkey:any;
  rcpi: string;
  showSearchbar: boolean;
  missedcalldata: void;
  connecteddata: any;
  scheduleddata: any;
  calldetailinformation: any;
  disableCategory = false;
  searchFilter = {
    vendor_id:'',
    name: "",
    limit: 10,
    brand_id:'',
    start_date:'',
    call_status:'',
    auth_key:'',
    start: 0,
    results: 10,
    brand: {
      brands: [],
    }
  };
  callitem:any;
  vendorid: string;
  vendoridinfo: void;
  brandidinfo: any;
  logindata: any;
  calldetalstorage = [] ;
  productList: any;
  respons: any;
  infinite:any;
  descending: boolean = false;
  order: number;
  column: string = 'name';
  searchQuery: string = '';
  itemsdata:[]; 
  infinitedata: any;
  constructor(
   private restapiService:RestapiService,
   private modalController:ModalController,
   private tokenStorageService:TokenStorageService,
   public datepipe: DatePipe,
   private router: Router,
   public toastController: ToastController,
   public loadingController: LoadingController
  ) {
    this.calldetail();
   }

  ngOnInit() {
    
    this.vendorid = sessionStorage.getItem("vendor_id");
    this.presentLoading();
  
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
  segmentChanged(event){
    console.log(this.segmentModel);
    console.log(event);
  }
  
 
  onClear(event){
    //this.showSearchbar == false;
    //this.showSearchbar = !this.showSearchbar;
    this.term = ""
  }


  calldetail(infiniteScroll?, event?){
    this.searchFilter.auth_key = localStorage.getItem("auth_key");
    let authkey = localStorage.getItem("auth_key");
    this.searchFilter.vendor_id = localStorage.getItem("vendor_id");
    this.searchFilter.brand_id = localStorage.getItem("brand_id");
    //this.searchFilter.limit = this.searchFilter.limit + "20";
    return this.restapiService
    .post_data("call_list", this.searchFilter)
    .subscribe((res:any)=>{
     this.callinfo = res.data;
     this.infinitedata = res;
     if (this.infinitedata.status) {
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
     }
     //this.itemsdata.push(this.callinfo)
     console.log(this.itemsdata);
     this.missedcalldata = this.callinfo.filter((item: { call_status: string; }) => item.call_status === 'Missed');
     this.connecteddata = this.callinfo.filter((item: { call_status: string; }) => item.call_status === 'Connected');
     this.scheduleddata = this.callinfo.filter((item: { call_status: string; }) => item.call_status === 'Scheduled');
    
     
     
     
     if (event) {
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
    });
    
  }
   

  loadMore(infiniteScroll) {
      //this.searchFilter.results = this.searchFilter.results + 10;
      this.searchFilter.limit = this.searchFilter.limit + 10;
      this.calldetail(infiniteScroll);
      console.log("---10---")
      console.log(this.searchFilter.results);
      console.log("---11---")
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
