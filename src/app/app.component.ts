import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { GlobalVars } from '../providers/global-vars';
import {InAppBrowser} from '@ionic-native/in-app-browser'

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {FCM} from "@ionic-native/fcm";
import { HTTP } from '@ionic-native/http';
import {Storage} from '@ionic/storage';



declare var cordova: any;
declare var window: any;
declare var IRoot:any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'Login';
  //rootPage: any = 'Login';


  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  browser: any;
  showSideMenu: string = "main";

  pages: Array<{ title: string, component: any }>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private idle: Idle, private keepalive: Keepalive,
              private toast: Toast, public modalCtrl: ModalController, public globalVars: GlobalVars, public iab: InAppBrowser, private fcm: FCM,private http: HTTP) {

    platform.ready().then(() => {
      // ...whatever else is in your app.component
      return http.enableSSLPinning(true);
    })
      .catch(console.log);

    window.isRooted = function (successCallback, failureCallback) {
      cordova.exec(successCallback, failureCallback, "IRoot", "isRooted", []);
      //IRoot.isRootedRedBeerWithoutBusyBoxCheck(successCallback, failureCallback);
    };

    
  
      // saveToken(token); backend.registerToken(token);
   

   

    this.initializeApp();
    console.log("hgsdhjjksd", this.showSideMenu)

    this.globalVars.setsidemenu('main');    this.showSideMenu = this.globalVars.getSideMenu();
    console.log("this.globalVars.getSideMenu()", this.globalVars.getSideMenu())
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(200);
    //idle.setIdle(2);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;

      if (this.nav.getActive().name != "Login") {
        if (!this.globalVars.getLock()) {
          this.nav.setRoot('Login');
          let template = "<div>Ooops! seems the app has timed out due to inactivity<br>Kindly log in again</div>";
          let obj = {body: "", template: template, endUrl: "", completed: true, pageTo: 'Login'};
          let myModal = this.modalCtrl.create('ConfirmModal', obj);
          myModal.present();
          this.globalVars.setLock(true);
        }
        this.reset();
      } else {
        this.reset();
      }

    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
        /*if(this.nav.getActive().name!="Login"){
         toast.show('You will time out in ' + countdown + ' seconds!', '1000', 'bottom').subscribe(
         toast => {
         console.log(toast);
         }
         );
         }*/
      }
    );

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  initializeApp() {

    this.platform.ready().then(() => {
     this.platform.registerBackButtonAction(() => {

      this.storage.set('scantag','')
      this.storage.set('serialscan','')
        let body="";
        let endUrl=".GetDataphp";
        let template = "<div>Do you want to exit the app?</div>";
        let obj = {body: body, template: template, endUrl: endUrl, loanengine: true, pageTo: 'exitapp'};
        let myModal = this.modalCtrl.create('ConfirmModal', obj);
        myModal.present();

      });
      if (typeof (IRoot) !== 'undefined' && IRoot) {
        IRoot.isRooted((data) => {
          console.log("rooted phone",data);
          if (data == 1) {
        

            let body="";
            let endUrl="";
            let template = "<div>This application is not supported on rooted devices.Please restore or update your device.</div>";
            let obj = {body: body, template: template, endUrl: endUrl, loanengine: true, pageTo: 'rooted'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();

          } else {

            console.log("Welcome to Wakanda technological city.");

          }
        }, (data) => {
          console.log("Detection system failed.Alert!!We are under attack.", data);
        });
      }
        this.statusBar.styleDefault();

        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);


        this.fcm.subscribeToTopic('marketing');
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            this.nav.setRoot('Login');
            let template = "<div>" + data + "</div>";
            let obj = {body: "", template: template, endUrl: "", completed: true, pageTo: 'Login'};
            let myModal = this.modalCtrl.create('ConfirmModal', obj);
            myModal.present();
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          }
          ;
        })



   });



}

  getBrowser(url) {
    this.browser = this.iab.create(url);
    this.browser.show();
  }


  logmeout(page)
  {
    this.nav.push(page)
    this.globalVars.setLock(true);
    this.reset();
  }
  openalias(page)
  {
    this.globalVars.setsidemenu('visa')
    this.nav.setRoot(page)
  }
  open(page)
  {
    this.globalVars.setsidemenu('main')
    this.nav.setRoot(page)
  }
  openPage1(page) {
      this.nav.push(page);
  }
  openPage3(){   

    this.nav.setRoot('Login');
    this.globalVars.setLock(true);
      this.reset();
  }
  openPage2() {

       this.nav.push('Login');
   }

  visaactivate(page) {
    console.log('dfdfdffd');
    this.nav.setRoot(page);

  }
  gotofavourites(page)
  {
    this.nav.push(page);
  }
  openPagecontact(){
    console.log("hhjdshhjjhsdajjsjaj")
    this.nav.setRoot('visapay',{title:'sendcontact'})
  }
}
