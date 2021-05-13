import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { StayWinningApp } from './app.component';
import { SharedModule } from '../shared';
import { PagesModule } from '../pages';
import { ShopifyModule } from '../shopify';


@NgModule({
  declarations: [
    StayWinningApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(StayWinningApp),
    IonicStorageModule.forRoot(),

    SharedModule,
    PagesModule.forRoot(),
    ShopifyModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StayWinningApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
