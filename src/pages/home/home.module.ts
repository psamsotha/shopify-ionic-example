import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { HomePage } from './home.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ HomePage ],
  entryComponents: [ HomePage ]
})
export class HomeModule {
  static forRoot() {
    return {
      ngModule: HomeModule
    }
  }
}
