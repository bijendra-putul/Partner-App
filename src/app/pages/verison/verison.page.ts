import { Component, OnInit } from "@angular/core";
import { Market } from "@ionic-native/market/ngx";
import { Router } from "@angular/router";
import { Platform, NavController } from "@ionic/angular";
@Component({
  selector: "app-verison",
  templateUrl: "./verison.page.html",
  styleUrls: ["./verison.page.scss"],
})
export class VerisonPage implements OnInit {
  backButtonSubscription: any;
  constructor(
    private market: Market,
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  updateVesion() {
    //this.market.open("com.tech.bandhu");
    this.market.open("com.vendor.space");
    //this.iab.create('https://play.google.com/store/apps/details?id=com.tech.bandhu', "_system", "location=no");
  }
  updatelater() {
    this.router.navigate(["login"]);
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      601,
      async () => {
        if (
          this.router.isActive("version", true) &&
          this.router.url === "version"
        ) {
          this.navCtrl.pop();
        }
      }
    );
  }
}
