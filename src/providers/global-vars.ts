import {Injectable} from '@angular/core';

import CryptoJS from 'crypto-js';

/*
 Generated class for the GlobalVars provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalVars {
  accounts: any = [];
  mobileNo: string;
pageto:any;
lock: boolean;
sidemenu:string;
logoutchek:any;



  constructor() {
    
  }

  doAESencrypt(data, uuid) {
    let encrypted = '' + CryptoJS.AES.decrypt(data, uuid);
    return encrypted;
  }
  setlogoutchek(value){
    this.logoutchek=value;
      }
      getlogoutchek(){
        return this.logoutchek;
      }
  setLock(value) {
    this.lock = value;
  }
  setsidemenu(value)
  {
    this.sidemenu=value;
  }
  setpageto(value){
    this.pageto=value;
  }
  getpageto(){
    return this.pageto;
  }
  getLock() {
    return this.lock;
  }
  getSideMenu()
  {
    return this.sidemenu;
  }




 

  setUsername(value) {
    this.mobileNo = value;
  }
 

  setAccounts(value) {
    this.accounts = value;
  }


  getUsername() {
    return this.mobileNo;
  }

  


}
