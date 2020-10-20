import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from "rxjs/Rx";
import { HTTP, HTTPResponse } from '@ionic-native/http';
import {GlobalVars} from "./global-vars";




/*
  Generated class for the ApiConnect provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiConnect {
  data: any;

  constructor(public globalvars: GlobalVars,public http: Http, public httpNative: HTTP) {

  }

 
  BalInquiry(body) {
    console.log("bodyyyyyy",body);
    let url='http://192.168.100.2:7001/BalanceInquiryAdapter/BI';
   
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    console.log("url",url);
    let options = new RequestOptions({ headers: headers });

    // don't have the data yet
    return new Promise(resolve => {

      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      this.http.post(url, body, options)
        .timeout(40000)
        .map(res => res.text())
        .subscribe((data) => {

          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference

          this.data = data;
         // console.log("response",data);
          resolve({data:this.data,error:""});

        },(err) => {
          if(err!='Request timed out kindly try again later'){
            err="Connection error";
          }
          resolve({data:"",error:err});

        });
    });

  }
  FundsTransfer(body) {
    console.log("bodyyyyyy",body);
    let url='http://192.168.100.2:7001/FundsTransferAdapter/FT';
    let headers = new Headers({
      'Content-Type': 'application/json',
    });

    let options = new RequestOptions({ headers: headers });

    // don't have the data yet
    return new Promise(resolve => {

      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      this.http.post(url, body, options)
        .timeout(40000)
        .map(res => res.text())
        .subscribe((data) => {

          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference

          this.data = data;
         // console.log("response",data);
          resolve({data:this.data,error:""});

        },(err) => {
          if(err!='Request timed out kindly try again later'){
            err="Connection error";
          }
          resolve({data:"",error:err});

        });
    });

  }
  Login(body) {
    console.log("bodyyyyyy",body);
    let url='http://192.168.100.2:7001/LoginRegistrationAdapter/CustomerLogin_Registration';
   
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    console.log("url",url);
    let options = new RequestOptions({ headers: headers });

    // don't have the data yet
    return new Promise(resolve => {

      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      this.http.post(url, body, options)
        .timeout(40000)
        .map(res => res.text())
        .subscribe((data) => {

          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference

          this.data = data;
         // console.log("response",data);
          resolve({data:this.data,error:""});

        },(err) => {
          if(err!='Request timed out kindly try again later'){
            err="Connection error";
          }
          resolve({data:"",error:err});

        });
    });

  }
 

 


}


