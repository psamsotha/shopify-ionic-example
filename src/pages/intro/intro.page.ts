import { Component, ViewChild } from '@angular/core';
import { Slides, MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MenuPage } from '../menu';
import { STORAGE_KEY_SEEN_INTRO } from '../../constants';


@Component({
  selector: 'intro-page',
  templateUrl: 'intro.page.html'
})
export class IntroPage {
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  startApp() {
    this.navCtrl.push(MenuPage).then(() => {
      this.storage.set(STORAGE_KEY_SEEN_INTRO, 'true');
    });
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
