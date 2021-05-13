import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductListPage } from '../products';
import { ShopifyService, VENDORS } from '../../shopify';
import { CartPage } from '../cart';


@Component({
  selector: 'shop-page',
  templateUrl: 'shop.page.html'
})
export class ShopPage {

  vendors = VENDORS;

  constructor(
    private navCtrl: NavController,
    private shopify: ShopifyService) {}

  ngOnInit() {
    this.shopify.initCheckout();
  }

  goToVendor(vendor) {
    this.navCtrl.push(ProductListPage, {
      vendor
    });
  }

  goCheckout() {
    this.navCtrl.push(CartPage);
  }
}
