import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ShopPage } from '../shop';
import { BlogPage } from '../blog';
import { PlaylistPage } from '../playlist';
import { LifeHacksPage } from '../life-hacks';


interface IPageInterface {
  title: string;
  component: any;
  img: string;
}

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html'
})
export class HomePage {

  pages: IPageInterface[] = [
    { title: 'Shop', component: ShopPage, img: 'shop' },
    { title: 'Music', component: PlaylistPage, img: 'concert'},
    { title: 'Life Hacks', component: LifeHacksPage, img: 'tools'},
    { title: 'Blog Posts', component: BlogPage, img: 'blog' }
  ]

  constructor(
    public navCtrl: NavController
  ) { }

  goToPage(page: IPageInterface) {
    this.navCtrl.push(page.component);
  }
}
