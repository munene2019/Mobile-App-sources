import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class PlatformProvider {
  public isAndroid: boolean;
  public isIOS: boolean;
  public isSafari: boolean;
  public isCordova: boolean;
  public isNW: boolean;
  public ua: string;
  public isMobile: boolean;
  public isDevel: boolean;

  constructor(private platform: Platform) {
    let ua = navigator ? navigator.userAgent : null;

    if (!ua) {
      ua = 'dummy user-agent';
    }

    // Fixes IOS WebKit UA
    ua = ua.replace(/\(\d+\)$/, '');

    this.isAndroid = this.platform.is('android');
    this.isIOS = this.platform.is('ios');
    this.ua = ua;
    this.isCordova = this.platform.is('cordova');
    this.isMobile = this.platform.is('mobile');
    this.isDevel = !this.isMobile && !this.isNW;
  }

  public getBrowserName(): string {
    let userAgent = window.navigator.userAgent;
    let browsers = {
      chrome: /chrome/i,
      safari: /safari/i,
      firefox: /firefox/i,
      ie: /internet explorer/i
    };

    for (let key in browsers) {
      if (browsers[key].test(userAgent)) {
        return key;
      }
    }

    return 'unknown';
  }

}
