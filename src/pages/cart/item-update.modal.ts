import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController, AlertController } from 'ionic-angular';


export interface UpdateData {
  type: 'remove'|'update'|'cancel';
  lineItem?: any;
}


@Component({
  selector: 'item-update.modal',
  templateUrl: 'item-update.modal.html'
})
export class ItemUpdateModal {

  lineItem: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController
  ) {
    this.lineItem = this.params.get('lineItem');
  }

  dismiss() {
    let data: UpdateData = { type: 'cancel' };
    this.viewCtrl.dismiss(data);
  }

  incrementQty() {
    this.lineItem.quantity++;
  }

  decrementQty() {
    this.lineItem.quantity--;
  }

  removeItem() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `Do you reall want to remove "${this.lineItem.productName}" from the cart?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            let data: UpdateData = {
              type: 'remove',
              lineItem: this.lineItem
            };
            this.viewCtrl.dismiss(data);
          }
        },
        {
          text: 'No',
          handler: () => { /* noop */ }
        }
      ]
    });
    confirm.present();
  }

  update() {
    let data: UpdateData = {
      type: 'update',
      lineItem: this.lineItem
    };
    this.viewCtrl.dismiss(data);
  }

  cancel() {
    this.dismiss();
  }
}
