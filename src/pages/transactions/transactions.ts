import {Component, PipeTransform} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  ModalController,
  Platform
} from 'ionic-angular';

import {GlobalVars} from '../../providers/global-vars';
import {ApiConnect} from '../../providers/api-connect';
import {ConnectivityService} from '../../providers/connectivity-service';
import {Toast} from '@ionic-native/toast';
import {Keyboard} from '@ionic-native/keyboard';
import {Device} from '@ionic-native/device';
import {Firebase} from '@ionic-native/firebase';
import {Storage} from '@ionic/storage';
import * as $ from 'jquery'
import { hhh } from '@ionic-native/clipboard';
import { CompileMetadataResolver } from '@angular/compiler';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  bi:boolean=false
  ft:boolean=false;  
  title: string;
  objectblock: any = {};
  loader:any;
  body: any;
  data: any;
  error:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public keyboard: Keyboard,
    public globalVars: GlobalVars, public apiConnect: ApiConnect, public loadingController: LoadingController,
    private toast: Toast, public connectivityService: ConnectivityService, public modalCtrl: ModalController, private device: Device,
    public platform: Platform, private storage: Storage, private firebase: Firebase ) {
    this.title = navParams.get('title');
    console.log("his title", this.title);
    if (this.title == "Funds Transfer") {
    this.ft = true;   
    this.bi=false
   
   
    } 
   else  if (this.title == "Balance Inquiry") {
      this.ft = false;   
      this.bi=true
     
     
      }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  fundsTransfer(objectblock) {
    if(this.objectblock.RecepientNo=="" ||this.objectblock.RecepientNo==undefined){
      this.error=1;
    }
    else if(this.objectblock.RecepientNo.length<10 ||this.objectblock.RecepientNo.length>12){
      this.error=1;
    }
    if(this.objectblock.amount=="" ||this.objectblock.amount==undefined){
      this.error=2;

    }
    if(this.objectblock.amount <10){
      this.error=3;

    }
   
  else {
    let  phoneno="254"+ this.objectblock.RecepientNo;
   
      let loader = this.loadingController.create({content: 'Submitting Request'});
      loader.present();
      if (this.connectivityService.isOnline()) {
        let  phoneno=this.objectblock.RecepientNo.substring(10, 1);
        phoneno= "254"+ phoneno;
        this.body = {
          service: "FT",
          phoneNumber:this.globalVars.getUsername(),
          Amount:this.objectblock.amount,
          RecepientNo:phoneno   
         

        };


        console.log("my body request",this.body)
        this.apiConnect.FundsTransfer(this.body).then(data => {
        loader.dismiss();
          this.data = data;
          console.log("full data",this.data);

          if(this.data.data==='' ||this.data.data===undefined){
            console.log("connect error",this.data);
            let body = "";
            let endUrl = "";
            let template = "<div>Service unaivable.Kindly try again</div>";
            let obj = {body: body, template: template, endUrl: endUrl, funds: true, pageTo: ''};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();

          }
          else{

          var resObject = JSON.parse(this.data.data);
          console.log("kke");
         console.log(" resObject.details.message", resObject);

         
          if (resObject.status == 0) {
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.data.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'LoancheckPage'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
           
          }
          else if(resObject.status == 1){
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.data.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'LoancheckPage'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
          }
         
          else{
            let body = "";
            let endUrl = "";
            let template = "<div>Service unavailable</div>";

            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'Login'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();

          }
        }


        });
      }

      else {
        this.toast.show("Please connect to the Internet", '8000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          });
      }
  }

  }
  bal(objectblock) {

    
      let loader = this.loadingController.create({content: 'Submitting Request'});
      loader.present();
      if (this.connectivityService.isOnline()) {

        this.body = {
          service: "BI",
          phoneNumber:this.globalVars.getUsername(),         
         

        };


        console.log("my body request",this.body)
        this.apiConnect.BalInquiry(this.body).then(data => {
        loader.dismiss();
          this.data = data;
          console.log("full data",this.data);

          if(this.data.data==='' ||this.data.data===undefined){
            console.log("connect error",this.data);
            let body = "";
            let endUrl = "";
            let template = "<div>Service unaivable.Kindly try again</div>";
            let obj = {body: body, template: template, endUrl: endUrl, loans: true, pageTo: ''};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();

          }
          else{

          var resObject = JSON.parse(this.data.data);
          console.log("kke");
         console.log(" resObject.details.message", resObject);

         
          if (resObject.status == 0) {
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.data.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'LoancheckPage'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
         
          }
          else if(resObject.status == 1){
            let body = "";
            let endUrl = "";
            let template = "<div> Your Account balance is Kshs."+ resObject.data.AvailableBal + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'LoancheckPage'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
          }
          else if(resObject.status == 99){
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'LoancheckPage'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
          }
          else{
            let body = "";
            let endUrl = "";
            let template = "<div>Service unavailable</div>";

            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'Login'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();

          }
        }


        });
      }

      else {
        this.toast.show("Please connect to the Internet", '8000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          });
      }


  }
}
