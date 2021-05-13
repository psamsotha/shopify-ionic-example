import { NgModule } from '@angular/core';

import { BlogModule } from './blog';
import { CartModule } from './cart';
import { HomeModule } from './home';
import { IntroModule } from './intro';
import { MenuModule } from './menu';
import { ProductsModule } from './products';
import { ShopModule } from './shop';


@NgModule({
  imports: [
    BlogModule.forRoot(),
    CartModule.forRoot(),
    HomeModule.forRoot(),
    IntroModule.forRoot(),
    MenuModule.forRoot(),
    ProductsModule.forRoot(),
    ShopModule.forRoot(),
  ]
})
export class PagesModule {
  static forRoot() {
    return {
      ngModule: PagesModule
    }
  }
}
