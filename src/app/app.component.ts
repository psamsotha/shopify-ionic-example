import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { MenuPage } from '../pages/menu';
import { IntroPage } from '../pages/intro';
import { STORAGE_KEY_SEEN_INTRO } from '../constants';


@Component({
  templateUrl: 'app.html'
})
export class StayWinningApp {

  rootPage: any = MenuPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public storage: Storage,
    public splashScreen: SplashScreen,
  ) {

    this.storage.get(STORAGE_KEY_SEEN_INTRO)
      .then(hasSeenTutorial => {
        if (hasSeenTutorial) {
          this.rootPage = MenuPage;
        } else {
          this.rootPage = IntroPage;
        }
        this.platformReady();
      });
  }

  platformReady() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#000000');
      this.statusBar.styleLightContent();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
      
    });
  }
}
