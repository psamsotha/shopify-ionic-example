import { Component } from '@angular/core';
import { NavParams, NavController, ToastController } from 'ionic-angular';

import { IProduct, IVariant } from '../../shopify/models';
import { ShopifyService } from '../../shopify';
import { CartPage } from '../cart';


@Component({
  selector: 'product-detail-page',
  templateUrl: 'product-detail.page.html'
})
export class ProductDetailPage {

  product: IProduct;
  selectedVariant: IVariant;

  constructor(
    private params: NavParams,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private shopify: ShopifyService)
  {
    this.product = this.params.get('product');
    this.selectedVariant = this.product.variants[0];
  }

  addToCart() {
    this.shopify.addToCart(this.selectedVariant, this.product);
    const toast = this.toastCtrl.create({
      message: 'Item added to cart',
      duration: 2000,
      position: 'bottom',
      cssClass: 'CartAdd__toast'
    });
    toast.present();
  }

  selectVariant(variant: IVariant) {
    this.selectedVariant = variant;
  }

  goCheckout() {
    this.navCtrl.push(CartPage);
  }
}
