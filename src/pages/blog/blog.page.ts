import { Component } from '@angular/core';

import { blogData } from './mock.data';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { BlogPostPage } from './blog-post.page';


export interface IBlogPost {
  title: string;
  img: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.page.html'
})
export class BlogPage {
  posts: IBlogPost[] = blogData as IBlogPost[];

  constructor(private navCtrl: NavController) {}

  openPost(post) {
    this.navCtrl.push(BlogPostPage, { post });
  }
}
