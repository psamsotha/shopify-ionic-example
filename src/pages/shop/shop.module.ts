import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { ShopPage } from './shop.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ ShopPage ],
  entryComponents: [ ShopPage ]
})
export class ShopModule {
  static forRoot() {
    return {
      ngModule: ShopModule
    }
  }
}
