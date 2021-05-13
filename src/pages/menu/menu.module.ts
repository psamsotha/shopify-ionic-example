import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { MenuPage } from './menu.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ MenuPage ],
  entryComponents: [ MenuPage ]
})
export class MenuModule {
  static forRoot() {
    return {
      ngModule: MenuModule
    }
  }
}
