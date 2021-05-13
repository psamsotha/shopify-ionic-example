import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../../shared';

import { ProductListPage } from './product-list.page';
import { ProductDetailPage } from './product-detail.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ProductListPage,
    ProductDetailPage
  ],
  entryComponents: [
    ProductListPage,
    ProductDetailPage
  ]
})
export class ProductsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProductsModule
    }
  }
}
