import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { HomePage } from '../home';
import { BlogPage } from '../blog';
import { ShopPage } from '../shop';
import { IntroPage } from '../intro/intro.page';


interface PageInterface {
  title: string;
  component: any;
  icon: string;
}

@Component({
  selector: 'menu-page',
  templateUrl: 'menu.page.html'
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  appPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Shop', component: ShopPage, icon: 'cart' },
    { title: 'Blog', component: BlogPage, icon: 'create'}
  ]

  openPage(page: PageInterface) {
    this.nav.setRoot(page.component);
  }

  openIntro() {
    this.nav.setRoot(IntroPage);
  }
}
