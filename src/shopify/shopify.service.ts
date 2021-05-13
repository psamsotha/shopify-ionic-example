import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

import { Apollo } from 'apollo-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { buildClient, Shopify } from 'shopify-buy';

import { PRODUCT_BY_VENDOR_QUERY } from './graphql/operations';
import { IVariant, IProduct, ICheckout, ICheckoutItem, Checkout, cleanProductData } from './models';
import { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN, STORAGE_KEY_SHOPIFY_CHECKOUT } from '../constants';


export interface IProductStore {
  [vendor: string]: {
    hasNextPage: boolean;
    products: IProduct[];
  }
}

@Injectable()
export class ShopifyService {

  private _client: any;
  private _checkout: ICheckout = new Checkout();
  private _cart$: Subject<ICheckout> = new BehaviorSubject(this._checkout);
  private _store: IProductStore = {}
  private _store$: Subject<IProductStore> = new BehaviorSubject({});


  constructor(private apollo: Apollo, private storage: Storage) {
    const config: Shopify.Config = {
      domain: SHOPIFY_STORE_DOMAIN,
      storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN
    };
    this._client = buildClient(config);

    this._storeAndUpdateCheckout = this._storeAndUpdateCheckout.bind(this);
  }

  get cart$(): Observable<ICheckout> {
    return this._cart$.asObservable();
  }

  get cartItemCount$(): Observable<number> {
    return this._cart$.asObservable()
      .map(cart => cart.lineItems.length)
      .distinctUntilChanged();
  }

  /**
   * Check if the vendor already loaded once.
   *
   * @param vendor the vendor name
   */
  hasVendorLoaded(vendor: string) {
    return !!this._store[vendor];
  }

  getProductsByVendor(vendor: string): Observable<IProduct[]> {
    return this._store$.asObservable()
      .filter(store => typeof store[vendor] !== 'undefined')
      .map(store => store[vendor].products);
  }

  /**
   * Load products by vendor. When products load,
   * emit them to subject.
   *
   * @param vendor the vendor name.
   */
  loadVendorProducts(vendor: string): void {
    this.apollo.query({
      query: PRODUCT_BY_VENDOR_QUERY,
      variables: {
        vendorQuery: `vendor:${vendor}`
      }
    })
    .map((result: any) => {
      this._store[vendor] = {
        hasNextPage: result.data.shop.products.pageInfo.hasNextPage,
        products: result.data.shop.products.edges
          .map(edge => edge.node)
          .map(product => cleanProductData(product)),

      };
      return this._store;
    })
    .first()
    .subscribe(store => this._store$.next(store));
  }

  /**
   * Should be called by view to initialize the
   * Shopify checkout.
   */
  initCheckout(): void {
    this.storage.get(STORAGE_KEY_SHOPIFY_CHECKOUT)
      .then(checkout => {
        if (!checkout) {
          this._client.checkout.create()
            .then(this._storeAndUpdateCheckout)
        } else {
          this._checkout = JSON.parse(checkout);
          this._updateCheckout();
        }
      })
  }

  /**
   * Add to cart. Optimistic UI update.
   */
  addToCart(variant: IVariant, product: IProduct) {
    this._checkout.lineItems.push({
      quantity: 1,
      variant: variant
    });
    this._updateCheckout();

    this._client.checkout.addLineItems(this._checkout.id, [
      {
        quantity: 1,
        variantId: variant.id,
        // some variants will not have images.
        // we store the product image in a custom attribute
        // for later use.
        customAttributes: [{
          key: 'productImageSrc',
          value: product.images[0].src
        }]
      }
    ]).then(this._storeAndUpdateCheckout);
  }

  /**
   * Clear cart items. Optimistic UI update.
   */
  clearCart() {
    const lineItemIds = this._checkout.lineItems.map(item => item.id);

    // optimistic update
    this._checkout.lineItems.length = 0;
    this._updateCheckout();

    // backend update
    this._client.checkout.removeLineItems(this._checkout.id, lineItemIds)
      .then(this._storeAndUpdateCheckout);
  }

  /**
   * Update cart item. Optimistic UI update.
   */
  updateItem(item: ICheckoutItem) {
    this._findItemIndex(item, (idx) => {
      this._checkout.lineItems[idx] = item;
    })
    const updateData = this._checkout.lineItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      variantId: item.variant.id
    }));
    this._updateCheckout();

    this._client.checkout.updateLineItems(this._checkout.id, updateData)
      .then(this._storeAndUpdateCheckout)
  }

  /**
   * Remove cart item. Optimistic UI update.
   */
  removeItem(item: ICheckoutItem) {
    const lineItemsIds = [item.id];

    this._findItemIndex(item, (idx) => {
      this._checkout.lineItems.splice(idx, 1);
    });
    this._updateCheckout();

    this._client.checkout.removeLineItems(this._checkout.id, lineItemsIds)
      .then(this._storeAndUpdateCheckout);
  }

  _findItemIndex(item, callback: (idx: number) => void) {
    let itemFound = false;
    for (let i = 0; i < this._checkout.lineItems.length; i++) {
      if (this._checkout.lineItems[i].id === item.id) {
        itemFound = true;
        callback(i);
        break;
      }
    }
    if (!itemFound) {
      console.warn('trying to remove an item not in cart.');
    }
  }

  private _storeAndUpdateCheckout(checkout) {
    this._checkout = checkout;
    this._storeCheckout();
    this._updateCheckout();
  }

  private _updateCheckout() {
    this._cart$.next(this._checkout);
  }

  private _storeCheckout() {
    this.storage.set(STORAGE_KEY_SHOPIFY_CHECKOUT, JSON.stringify(this._checkout));
  }
}