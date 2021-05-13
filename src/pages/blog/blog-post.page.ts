import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { IBlogPost } from './blog.page';


@Component({
  selector: 'blog-post-page',
  templateUrl: 'blog-post.page.html'
})
export class BlogPostPage {

  post: IBlogPost;

  constructor(params: NavParams) {
    this.post = params.get('post');
  }
}
