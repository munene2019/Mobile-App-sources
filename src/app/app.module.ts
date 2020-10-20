import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ApiConnect } from '../providers/api-connect';
import { ConnectivityService } from '../providers/connectivity-service';
import { LocationService } from '../providers/location-service';
import { GoogleMaps } from '../providers/google-maps';
import { GlobalVars } from '../providers/global-vars';
import { ContactsProvider } from '../providers/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HTTP } from '@ionic-native/http';
import { AlertServiceProvider } from '../providers/alert-service/alert-service';
import { Firebase } from '@ionic-native/firebase';// this includes the core NgIdleModule but includes keepalive providers
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { FCM } from '@ionic-native/fcm';

import { QRScanner } from '@ionic-native/qr-scanner';
import { ScanProvider } from "../providers/scan/scan";
import { PlatformProvider } from '../providers/platform/platform';
import { Camera } from "@ionic-native/camera";
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(
      MyApp, {
        backButtonText: '',
        backButtonIcon: 'ios-arrow-back',
        iconMode: 'md'
      }),
    NgIdleKeepaliveModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    BarcodeScanner,
    StatusBar,
    HTTP,
    SplashScreen,
    Network,
    Toast,
    Keyboard,
    Geolocation,
    Device,
    Contacts,
    ContactsProvider,
    ApiConnect,
    Camera,
    ConnectivityService,
    GlobalVars,
    FCM,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertServiceProvider,
    Firebase,
    InAppBrowser,
    SocialSharing,
    QRScanner,
    PlatformProvider,
    
  ]
})
export class AppModule { }
