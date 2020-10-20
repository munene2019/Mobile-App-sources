import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmModal } from './confirm-modal';

@NgModule({
  declarations: [
    ConfirmModal,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmModal),
  ],
  exports: [
    ConfirmModal
  ]
})
export class ConfirmModalModule {}
