import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class RestapiService {
  //token:any;
  baseUrl = "https://esellerhub.dev.techjockey.com/api";
  //baseUrl = "https://www.techjockey.com/channelpartnerapi";
  
  constructor(private httpClient: HttpClient, public sanitizer: DomSanitizer) {
   
    
  }
  token = localStorage.getItem("auth_key");
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };
  
  httpOptionstoken = {
    headers: new HttpHeaders({
      Accept: "application/json",
      'Content-Type': 'application/json',
      'Authentication': `Bearer ${this.token}`
     
    })
  };
  
  get_data(cotroller: string) {
    return this.httpClient.get(this.baseUrl + "/" + cotroller);
  }
  post_data(cotroller: string, data: any) {
    return this.httpClient.post(
      this.baseUrl + "/" + cotroller,
      data,
      this.httpOptions
    );
  }
  post_datafortoken(cotroller: string, data: any) {
    return this.httpClient.post(
      this.baseUrl + "/" + cotroller,
      data,
      this.httpOptionstoken
    );
  }
}
