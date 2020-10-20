import {Component} from '@angular/core';
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
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var cordova: any;
declare var window: any;

@IonicPage(
  {name: 'Login'}
)

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login  {

  objectblock: any = {};
  valueforngif: boolean = true;
  isPasswordForm: boolean = false;
  isPasswordForm2: boolean = false;
  error: number = 0;
  data: any;
  smses: any;
  mobileNo: string = "";
  loader:any;
  body: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public keyboard: Keyboard,
              public globalVars: GlobalVars, public apiConnect: ApiConnect, public loadingController: LoadingController,
              private toast: Toast, public connectivityService: ConnectivityService, public modalCtrl: ModalController, private device: Device,
              public platform: Platform, private storage: Storage, private firebase: Firebase ) {
    
    this.platform.ready().then(() => {     

    
     
    });

  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');

  }

  openPage(page) {
    this.navCtrl.push(page)
  }

  
 
  
  submit(objectblock) {  
    

    if(objectblock.user=="" ||objectblock.user==undefined){
      this.error=1;

    }
    else if(objectblock.pass=="" ||objectblock.pass==undefined){
      this.error=2;
    }
   else {
      let phoneno= this.objectblock.user.substring(1, 10);
            phoneno="254"+ phoneno;
      let loader = this.loadingController.create({content: 'Submitting Request'});
      loader.present();
      if (this.connectivityService.isOnline()) {

        this.body = {
          service:"login",
          phoneNumber: phoneno,
          pin: this.objectblock.pass,
          uuid: this.device.uuid
        };


        console.log("my body request",this.body)
        this.apiConnect.Login(this.body).then(data => {
        loader.dismiss();
          this.data = data;
          console.log("full data",this.data.phoneNumber);

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
         console.log(" resObject.loanAccount", resObject.phoneNumber)
         
          if (resObject.status == 1) {
            
            this.globalVars.setAccounts(resObject.phoneNumber)
           
            
            this.storage.set('user',this.objectblock.user);
            this.storage.set('pass',this.objectblock.password);
            this.navCtrl.setRoot("HomePage")           
        
            this.globalVars.setUsername(phoneno);      
            


            
          }
          else if(resObject.status == 0){
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.data.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'Login'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
          }
          else if(resObject.status == 99){
            let body = "";
            let endUrl = "";
            let template = "<div>"+ resObject.message + " </div>";
            let obj = {body: this.body, template: template, endUrl: endUrl, completed: true, pageTo: 'Login'};
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

 



}
