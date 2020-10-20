import { Component } from '@angular/core';
import { IonicPage, App, NavParams, ViewController, LoadingController, NavController} from 'ionic-angular';
import { GlobalVars } from '../../providers/global-vars';
import { ApiConnect } from '../../providers/api-connect';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Toast } from '@ionic-native/toast';
import * as $ from 'jquery'
import { Nav, Platform, ModalController } from 'ionic-angular';
/**
 * Generated class for the ConfirmModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-confirm-modal',
  templateUrl: 'confirm-modal.html',
})
export class ConfirmModal {
  template:string="<div></div>";
  body:any;
  endUrl:any;
  data:any;
  funds:boolean=false;
  completed:boolean=false;;
  pageTo:string="Login";
  title:any;
  message:string;
  constructor(public platform: Platform,public appCtrl: App, public navParams: NavParams, public viewCtrl: ViewController,
              public globalVars: GlobalVars, public apiConnect: ApiConnect, public loadingController: LoadingController,
              private toast: Toast, public connectivityService: ConnectivityService, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.body = navParams.get('body');
    console.log("this.body ",this.body);
    this.endUrl = navParams.get('endUrl');
    this.template = navParams.get('template');
    this.completed = navParams.get('completed');
    this.pageTo = navParams.get('pageTo');

    console.log("my page",this.pageTo)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmModal');
  }
  // closeModal() {
  //   this.viewCtrl.dismiss();
  //   this.navCtrl.setRoot('MainServices');
  // }

  okModal()
  {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot('b2bfinal');
  }
 
 
 
  




  okengine(){

    console.log("rootedddddddddd",this.pageTo);
    if(this.pageTo=="rooted")
    {
      this.platform.exitApp();
    }
    else if(this.pageTo=="exitapp")
    {
      this.platform.exitApp();
    }

    else {
      console.log("hereeeeeeeee");
      this.viewCtrl.dismiss();
    }

  }
  cancelModal(){
console.log("this.pageTo",this.pageTo);
this.viewCtrl.dismiss();  
   

  }


 
  

  closeModal() {
    console.log("pageto",this.pageTo)
    if(this.template=="<div>Ooops! seems you have taken too long to respond.<br>Kindly log in again</div>"){

      this.viewCtrl.dismiss();
     
    }

    if(this.pageTo=="ChangePasswordPage"){
      this.appCtrl.getRootNav().setRoot('ChangePasswordPage');
    this.viewCtrl.dismiss();
    }
    else if(this.pageTo=="Login"){
      this.viewCtrl.dismiss();
      console.log("merchantpage",this.pageTo)
      this.appCtrl.getRootNav().setRoot('Login');
      // console.log( this.appCtrl.getRootNav().push('visapay'));
    }  

    else if(this.pageTo=="Login"){
      this.viewCtrl.dismiss();
      console.log("pageto2222",this.pageTo)
      this.appCtrl.getRootNav().setRoot('Login');
      console.log( this.appCtrl.getRootNav().setRoot('Login'));
    }
    else if(this.pageTo=="Login"){
      this.viewCtrl.dismiss();
      console.log("pageto2222",this.pageTo)
      this.appCtrl.getRootNav().setRoot('Login');
      console.log( this.appCtrl.getRootNav().setRoot('Login'));
    }
   

   
   

    else{
      this.viewCtrl.dismiss();

    }
  }


}
