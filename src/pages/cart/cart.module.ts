import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CartPage } from './cart.page';
import { ItemUpdateModal } from './item-update.modal';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ CartPage, ItemUpdateModal ],
  entryComponents: [ CartPage, ItemUpdateModal ]
})
export class CartModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CartModule
    }
  }
}
