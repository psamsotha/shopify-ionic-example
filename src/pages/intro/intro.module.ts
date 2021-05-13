import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { IntroPage } from './intro.page';


@NgModule({
  imports: [ SharedModule ],
  declarations: [ IntroPage ],
  entryComponents: [ IntroPage ]
})
export class IntroModule {
  static forRoot() {
    return {
      ngModule: IntroModule
    }
  }
}
