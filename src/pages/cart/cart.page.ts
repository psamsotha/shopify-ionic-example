import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ICheckout } from '../../shopify/models';
import { ShopifyService } from '../../shopify'
import { ItemUpdateModal, UpdateData } from './item-update.modal';


@Component({
  selector: 'cart-page',
  templateUrl: 'cart.page.html'
})
export class CartPage {

  cart: ICheckout;

  constructor(
    private shopify: ShopifyService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private appBrowser: InAppBrowser
  ) { }

  ngOnInit() {
    this.shopify.cart$.subscribe(cart => {
      this.cart = cart
    });
  }

  getTotal(item) {
    if (item) {
      return parseFloat(item.variant.price) * item.quantity;
    } else {
      return this.cart.lineItems.reduce((total, item) => {
        return total + parseFloat(item.variant.price) * item.quantity;
      }, 0);
    }
  }

  checkout() {
    let browserInstance = this.appBrowser.create(this.cart.webUrl);
    browserInstance.show();
  }

  continueShopping() {
    this.navCtrl.pop();
  }

  updateItem(lineItem) {
    let modal = this.modalCtrl.create(ItemUpdateModal, {
      lineItem: Object.assign({}, lineItem)
    });
    modal.onDidDismiss((data: UpdateData) => {
      switch (data.type) {
        case 'update':
          this.shopify.updateItem(data.lineItem);
          break;
        case 'remove':
          this.shopify.removeItem(data.lineItem);
        case 'cancel':
        default:
          return;
      }
    });
    modal.present();
  }

  clearCart() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to clear all the cart items?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.shopify.clearCart();
          }
        },
        {
          text: 'No',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }
}
