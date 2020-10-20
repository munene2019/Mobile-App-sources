import {Component, PipeTransform} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  LoadingController,
  ModalController,
  App,
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
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  objectblock: any = {};  
  error: number = 0;
  data: any;  
  loader:any;
  body: any;
  constructor(private device: Device, public globalVars: GlobalVars,public appCtrl: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              
              public loadingController: LoadingController,
              public modalCtrl: ModalController,
              private toast: Toast,public connectivityService: ConnectivityService, public apiConnect: ApiConnect,
            
        
              ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  login(page) {


    this.appCtrl.getRootNav().setRoot(page);

  }
  submit(objectblock) {

    if(this.objectblock.mobileno=="" ||objectblock.mobileno==undefined){
      this.error=1;

    }
    else if(this.objectblock.nationalid=="" ||this.objectblock.nationalid==undefined){
      this.error=2;
    }
    else if(this.objectblock.fname=="" ||this.objectblock.fname==undefined){
      this.error=3;
    }
    else if(this.objectblock.lname=="" ||this.objectblock.lname==undefined){
      this.error=4;
    }
  
   else {
      let loader = this.loadingController.create({content: 'Submitting Request'});
      loader.present();
      if (this.connectivityService.isOnline()) {
        let  phoneno=this.objectblock.mobileno.substring(10, 1);
        phoneno= "254"+ phoneno;
       
      
       
        
        this.body = {
          service: "registration",
          phoneNumber:phoneno,
          NationalID:this.objectblock.nationalid,
          FirstName:this.objectblock.fname,
          LastName:this.objectblock.lname,
          uuid:this.device.uuid,
         

        };


        console.log("my body request",this.body)
        this.apiConnect.Login(this.body).then(data => {
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


            this.navCtrl.setRoot("HomePage")
          }
          else if(resObject.status == 1){
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
            let template = "<div>"+ resObject.data.message + " </div>";
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
