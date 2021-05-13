import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ClothingSizePipe } from './pipes/clothing-size.pipe';
import { EllipsesPipe } from './pipes/ellipses.pipe';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    ClothingSizePipe,
    EllipsesPipe,
    SafePipe
  ],
  exports: [
    CommonModule,
    IonicModule,

    ClothingSizePipe,
    EllipsesPipe,
    SafePipe
  ],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule
    }
  }
}
