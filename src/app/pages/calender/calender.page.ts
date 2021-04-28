import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController, NavController, Platform } from '@ionic/angular';
import { RestapiService } from "../../services/restapi.service";
import { ValueTransformer } from '@angular/compiler/src/util';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
 // navParams = new NavParams();
 isLast: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3.5,
    spaceBetween:10,
    autoplay:false
   };
   rescheduledemodata = {
     id:'',
     acd_uuid:'',
     brand_id:'',
     vendor_id:'',
     demo_date:'',
     first_time_option:'',
     second_time_option:'',
     third_time_option:''
   }
  
  reschedule: any;
  demoid: any;
  acduid: any;
  vendor_id: any;
  brand_id: any;
  id: any;
  productname: any;
  dates: any;
  retDates = [];
  minuttimecheck = [];
  //retTime = [];
  selectedIndex: number = null;
  selectedTime: number = null;
  selectedTime2: number = null;
  selectedTime3: number = null;
  times: any[];
  dayinput: any;
  dateinput: any;
  timeinput: any;
 // deomdatevalue = []
  DateArray = []
  startdate: any;
  newdateformat = []
  timearray = [];
  timearray2 = [];
  timearray3 = [];
  
  shouldDisable = true;
  status: boolean = false;
  info: any;
  
  rettimetime: any;
  rettime: any;
  zeroarray: any;
  showDiv = {
    timepicker : false,
  }
  status1: boolean = false;
  clickonseconddiv:boolean = true;
  arraythreevalue: void;
  firstevent: any;
  starttime: any;
  starttimehh:any;
  starttimemm:any;
  starttimess:any;
  slicearray: any[];
  startdatehh:any;
  startdatemm:any;
  startdatess:any;
  pos: any;
  positionvalue: any;
  positionvaluearray: any;
  lastarryindex: any;
  firsttimeslot: any;
  formatestarttime: any;
  formatestarttimemm: boolean;
  formatestarttimehh: boolean;
  firlshourvalue: any;
  deletvalue = [];
  addnextpostion: number;
  addpreviouspostion: number;
  bothvalueadd: number;
  starttimehs: string;
  constructor(
   public restapiService:RestapiService,
   public navParams: NavParams,
   public modalController: ModalController,
   public alertController: AlertController,
   public toastController: ToastController,
   public modalCtrl: ModalController,
   public navCtrl: NavController,
   private platform: Platform,
    ) {   
    this.id = this.navParams.get("id");
    this.acduid = this.navParams.get("acd_uuid");
    this.brand_id = this.navParams.get("brand_id");
    this.productname = this.navParams.get("product_name");
    this.startdate = this.navParams.get("start_date");
    this.startdatehh = this.navParams.get("start_date");
    this.startdatemm = this.navParams.get("start_date");
    this.startdatess = this.navParams.get("start_date");
    console.log(this.brand_id);
    console.log(this.acduid);
    console.log("---9089---");
    console.log(this.startdate);
    console.log("---909034---");
    this.brand_id = this.navParams.get("brand_id");
    this.starttime = formatDate(this.startdate, 'HH:mm:SS', 'en-US', '+0530');
    this.starttimehs = formatDate(this.startdate, 'HH:mm', 'en-US', '+0530');
    this.starttimehh = formatDate(this.startdatehh, 'HH', 'en-US', '+0530');
    this.starttimemm = formatDate(this.startdatehh, 'mm', 'en-US', '+0530');
    this.starttimess = formatDate(this.startdatehh, 'SS', 'en-US', '+0530');
    console.log(this.starttime);
    console.log("---909013434---");
    console.log(this.starttimehh);
    console.log(this.starttimemm);
    console.log(this.starttimess);
    console.log(this.retDates);
    console.log(this.slicearray);
    // this.pos = this.retDates.map(function(e) { return e.time}).indexOf(this.starttime);
    console.log("---90901---");
    //this.positionvaluearray = this.positionvalue;
    console.log("---90901sds---");
    console.log(this.positionvalue);
    console.log("---90901sds---");
    }

  ngOnInit() {
    this.getDates();
    this.getTime();
    //this.dbclic();
  }
   

  rescheduledemo(){
    this.rescheduledemodata.id = this.id;
    this.rescheduledemodata.acd_uuid = this.acduid;
    this.rescheduledemodata.brand_id = this.brand_id
    this.rescheduledemodata.vendor_id = localStorage.getItem("vendor_id");
    this.rescheduledemodata.demo_date = this.startdate;
    //this.firsttimeslot = this.timearray.slice(0,this.timearray.length-1);
    //this.firsttimeslot = this.timearray.slice(0,this.timearray.length-1);
    this.rescheduledemodata.first_time_option = this.newdateformat[0] + " " + this.timearray[this.timearray.length-1];
    this.rescheduledemodata.second_time_option = this.newdateformat[1] + " " + this.timearray2[this.timearray2.length-1];
    this.rescheduledemodata.third_time_option = this.newdateformat[2] + " " + this.timearray3[this.timearray3.length-1];
    console.log(this.rescheduledemodata.first_time_option);
    console.log(this.rescheduledemodata.second_time_option);
    console.log(this.rescheduledemodata.third_time_option);
    this.restapiService
    .post_datafortoken("reschedule_demo", this.rescheduledemodata)
    .subscribe((res:any)=>{
      this.reschedule = res.data;
      //this.reschedule.start_date;
     
      this.presentToast(res.message);
      if(res.status == true){
       this.dismiss();
      }
    });
    
  }

  getDates() {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var todayDate = new Date(this.startdate);
    var currDate = new Date();
    var numberOfDays = 1;
    var remDays = [0, 6];
    //alert(currDate.getHours());
    for (var i = 0; i < 3; i++) {
        if (currDate.getHours() > 18 && todayDate.getFullYear() == currDate.getFullYear() && todayDate.getDate() == currDate.getDate() && todayDate.getMonth() == currDate.getMonth()) {
            todayDate.setDate(todayDate.getDate() + numberOfDays);
        }
        switch (todayDate.getDay()) {
            case 6:
                todayDate.setDate(todayDate.getDate() + (numberOfDays * 2));
                break;
            case 0:
                todayDate.setDate(todayDate.getDate() + (numberOfDays));
                break;
            default:
                break;
        }
        this.retDates.push({"day": weekday[todayDate.getDay()], "date": todayDate.getDate()});
        todayDate.setDate(todayDate.getDate() + numberOfDays);
    }
  }
  
  getTime() {
    var daytime = new Array();
    daytime[0]="10:00:00"
    daytime[1]="10:15:00"
    daytime[2]="10:30:00"
    daytime[3]="10:45:00"
    daytime[4]="11:00:00"
    daytime[5]="11:15:00"
    daytime[6]="11:30:00"
    daytime[7]="11:45:00"
    daytime[8]="12:00:00"
    daytime[9]="12:15:00"
    daytime[10]="12:30:00"
    daytime[11]="12:45:00"
    daytime[12]="13:00:00"
    daytime[13]="13:15:00"
    daytime[14]="13:30:00"
    daytime[15]="13:45:00"
    daytime[16]="14:00:00"
    daytime[17]="14:15:00"
    daytime[18]="14:30:00"
    daytime[19]="14:45:00"
    daytime[20]="15:00:00"
    daytime[21]="15:15:00"
    daytime[22]="15:30:00"
    daytime[23]="15:45:00"
    daytime[24]="16:00:00"
    daytime[25]="16:15:00"
    daytime[26]="16:30:00"
    daytime[27]="16:45:00"
    daytime[28]="17:00:00"
    daytime[29]="17:15:00"
    daytime[30]="17:30:00"
    daytime[31]="17:45:00"
    daytime[32]="18:00:00"
    daytime[33]="18:15:00"
    daytime[34]="18:30:00"
    daytime[35]="18:45:00"
    daytime[36]="19:00:00"
    var todaytime = new Date();
    var numberOftime = 6;

    var minute = new Array();
    minute[0]="5"
    minute[1]="10"
    minute[2]="20"
    minute[3]="25"
    minute[4]="35"
    minute[5]="40"
    minute[6]="50"
    minute[7]="55"
    
    for(var i = 0; i < daytime.length; i++) {
      this.retDates.push({"time" : daytime[i]});
      if (this.retDates[i].time === this.starttime) {
         //this.starttime + 1;
         this.positionvalue = i + 1
         this.lastarryindex = this.retDates[i].time.length - 1;
         //this.positionvaluearray.push(this.positionvalue)
           console.log('position: ' + i);
           console.log(this.positionvalue);
           console.log(this.lastarryindex);
           console.log('hjhjhj');
      }
      else{
        this.positionvalue = 3
         }
      
    }
    
  }
  
  
clickEvent(){
    this.status1 = !this.status1; 
}
setIndex(index: number, day:any, date:any) {
      
      this.dayinput = day;
      this.dateinput = date;
      var d = new Date();
      var datenew = day;
      var month = d.getMonth() + 1; 
      var year = d.getFullYear();
      var dateStr = date + "-" + month + "-" + year;
      this.newdateformat.push(dateStr);
      this.shouldDisable = false;
      this.showDiv.timepicker = true;
      if(index ==  0){
       // this.clickonseconddiv = false
        this.selectedIndex = index;
      }
       if(index == 1){
        //this.clickonseconddiv = false
        this.selectedIndex = index;
       }
       if(index == 2){
         this.selectedIndex = index;
       }
   }

setIndextime(indextime: number,time:any) {
     this.selectedTime = indextime;
     this.timeinput = time;
     this.timearray.push(this.timeinput);
     console.log(this.timeinput);
     console.log("---90df---");
     //this.firstevent = events; 
}
setIndextime2(indextime: number,time:any) {
  this.selectedTime2 = indextime;
  this.timeinput = time;
  this.timearray2.push(this.timeinput);
  console.log(this.timeinput);
  console.log("---90df---");
  //this.firstevent = events; 
}

setIndextime3(indextime: number,time:any) {
  this.selectedTime3 = indextime;
  this.timeinput = time;
  this.timearray3.push(this.timeinput);
  console.log(this.timeinput);
  console.log("---90df---");
  //this.firstevent = events; 
}
rescheduledemodismess() {
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
