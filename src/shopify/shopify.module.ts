import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { Apollo } from 'apollo-angular/Apollo';
import { HttpLink } from 'apollo-angular-link-http/HttpLink';
import { HttpHeaders } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ShopifyService } from './shopify.service';
import { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN } from '../constants';


@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  exports: [
    ApolloModule
  ]
})
export class ShopifyModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const uri = `https://${SHOPIFY_STORE_DOMAIN}/api/graphql`;
    const headers = new HttpHeaders({
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    });

    const http = httpLink.create({ uri, headers });

    apollo.create({
      link: http,
      cache: new InMemoryCache()
    })
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShopifyModule,
      providers: [
        ShopifyService
      ]
    }
  }
}
