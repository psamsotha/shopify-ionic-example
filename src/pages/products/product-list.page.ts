import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavParams, LoadingController, NavController } from 'ionic-angular';

import { IProduct } from '../../shopify/models/product';
import { ShopifyService } from '../../shopify/shopify.service';
import { ProductDetailPage } from './product-detail.page';
import { CartPage } from '../cart';


@Component({
  selector: 'product-list-page',
  templateUrl: 'product-list.page.html'
})
export class ProductListPage {

  vendor: { name: string, slug: string };
  products: IProduct[];
  productsSub: Subscription;

  loading: any;

  constructor(
    params: NavParams,
    private navCtrl: NavController,
    private shopify: ShopifyService,
    private loadingCtrl: LoadingController) {

    this.vendor = params.get('vendor');
  }

  ngOnInit() {
    if (!this.shopify.hasVendorLoaded(this.vendor.name)) {
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent'
      });
      this.loading.present()
    }
    this.shopify.loadVendorProducts(this.vendor.name);
    this.productsSub = this.shopify.getProductsByVendor(this.vendor.name)
      .subscribe(products => {
        if (!this.products) {
          this.products = products.filter(product => product.images[0] !== undefined);
          if (this.loading) {
            this.loading.dismiss().then(() => {
              this.loading = null;
            });
          }
        }
      });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

  openProduct(product) {
    this.navCtrl.push(ProductDetailPage, { product });
  }

  goCheckout() {
    this.navCtrl.push(CartPage);
  }
}